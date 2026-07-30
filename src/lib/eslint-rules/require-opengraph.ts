import type { Rule } from "eslint"
import type { Expression, ObjectExpression, Pattern, Property } from "estree"

const descriptions = new Map<string, string>()
const descriptionsByFile = new Map<string, string[]>()

function getProperty(object: ObjectExpression, name: string) {
  return object.properties.find(
    (property): property is Property =>
      property.type === "Property" &&
      !property.computed &&
      ((property.key.type === "Identifier" && property.key.name === name) ||
        (property.key.type === "Literal" && property.key.value === name)),
  ) satisfies Property | undefined
}

function staticDescriptionKey(node: Expression | Pattern) {
  if (node.type === "Literal" && typeof node.value === "string")
    return `literal:${node.value}` as const

  if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
    return `literal:${node.quasis[0]?.value.cooked ?? ""}` as const
  }

  if (
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    node.callee.name === "t" &&
    node.arguments[0]?.type === "Literal" &&
    typeof node.arguments[0].value === "string"
  ) {
    return `translation:${node.arguments[0].value}` as const
  }

  if (
    node.type === "MemberExpression" &&
    !node.computed &&
    node.object.type === "Identifier" &&
    node.object.name === "siteConfig" &&
    node.property.type === "Identifier" &&
    node.property.name === "description"
  ) {
    return "reference:siteConfig.description" as const
  }
}

function clearDescriptionsForFile(filename: string) {
  for (const key of descriptionsByFile.get(filename) ?? []) {
    if (descriptions.get(key) === filename) descriptions.delete(key)
  }
  descriptionsByFile.delete(filename)
}

export const requireOpengraph = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce OpenGraph, hreflang, and unique descriptions in Next.js pages",
      recommended: true,
    },
    schema: [],
    messages: {
      missingMetadata: "Page must export metadata or generateMetadata().",
      missingOpenGraph: "Page metadata must include Open Graph title and description.",
      missingAlternates: "Page metadata must include alternates.languages for hreflang links.",
      duplicateDescription: "Page description duplicates the description in {{filename}}.",
    },
  },
  create(context) {
    const filename = context.filename
    if (!filename || filename === "<input>") return {}
    if (!filename.includes("/app/")) return {}
    if (!/page\.(tsx|ts|jsx|js)$/.test(filename)) return {}

    clearDescriptionsForFile(filename)

    let exportNode: Rule.Node | undefined
    let hasMetadataExport = false
    let hasGenerateMetadataExport = false
    let hasOpenGraph = false
    let hasAlternates = false
    let usesLocalizedMetadata = false

    function registerDescription(node: Expression | Pattern) {
      const key = staticDescriptionKey(node)
      if (!key) return

      const existingFilename = descriptions.get(key)
      if (existingFilename && existingFilename !== filename) {
        context.report({
          node,
          messageId: "duplicateDescription",
          data: { filename: existingFilename },
        })
        return
      }

      descriptions.set(key, filename)
      descriptionsByFile.set(filename, [...(descriptionsByFile.get(filename) ?? []), key])
    }

    function inspectMetadataObject(object: ObjectExpression) {
      const description = getProperty(object, "description")
      if (description?.type === "Property") registerDescription(description.value)

      const openGraph = getProperty(object, "openGraph")
      if (openGraph?.type === "Property") {
        if (openGraph.value.type === "CallExpression") {
          hasOpenGraph = true
        } else if (openGraph.value.type === "ObjectExpression") {
          const openGraphDescription = getProperty(openGraph.value, "description")
          hasOpenGraph = Boolean(getProperty(openGraph.value, "title") && openGraphDescription)
          if (!description && openGraphDescription?.type === "Property") {
            registerDescription(openGraphDescription.value)
          }
        }
      }

      const alternates = getProperty(object, "alternates")
      if (alternates?.type === "Property" && alternates.value.type === "ObjectExpression") {
        hasAlternates = Boolean(getProperty(alternates.value, "languages"))
      }
    }

    return {
      ExportNamedDeclaration(node) {
        if (!node.declaration) return

        if (
          node.declaration.type === "FunctionDeclaration" &&
          node.declaration.id?.name === "generateMetadata"
        ) {
          exportNode = node
          hasGenerateMetadataExport = true
          return
        }

        if (node.declaration.type !== "VariableDeclaration") return

        for (const declaration of node.declaration.declarations) {
          if (declaration.id.type !== "Identifier") continue

          if (declaration.id.name === "generateMetadata") {
            exportNode = node
            hasGenerateMetadataExport = true
            if (
              declaration.init?.type === "ArrowFunctionExpression" &&
              declaration.init.body.type === "ObjectExpression"
            ) {
              inspectMetadataObject(declaration.init.body)
            }
          }

          if (declaration.id.name === "metadata") {
            exportNode = node
            hasMetadataExport = true
            if (declaration.init?.type === "ObjectExpression") {
              inspectMetadataObject(declaration.init)
            }
          }
        }
      },
      CallExpression(node) {
        if (node.callee.type !== "Identifier" || node.callee.name !== "localizedMetadata") return

        const isInsideGenerateMetadata = context.sourceCode
          .getAncestors(node)
          .some(
            (ancestor) =>
              (ancestor.type === "FunctionDeclaration" &&
                ancestor.id?.name === "generateMetadata") ||
              (ancestor.type === "VariableDeclarator" &&
                ancestor.id.type === "Identifier" &&
                ancestor.id.name === "generateMetadata"),
          )
        if (!isInsideGenerateMetadata) return

        usesLocalizedMetadata = true
        const options = node.arguments[0]
        if (options?.type === "ObjectExpression") {
          const description = getProperty(options, "description")
          if (description?.type === "Property") registerDescription(description.value)
        }
      },
      ReturnStatement(node) {
        if (node.argument?.type !== "ObjectExpression") return

        const isInsideGenerateMetadata = context.sourceCode
          .getAncestors(node)
          .some(
            (ancestor) =>
              (ancestor.type === "FunctionDeclaration" &&
                ancestor.id?.name === "generateMetadata") ||
              (ancestor.type === "VariableDeclarator" &&
                ancestor.id.type === "Identifier" &&
                ancestor.id.name === "generateMetadata"),
          )
        if (isInsideGenerateMetadata) inspectMetadataObject(node.argument)
      },
      "Program:exit"(node) {
        if (!hasMetadataExport && !hasGenerateMetadataExport) {
          context.report({ node, messageId: "missingMetadata" })
          return
        }

        if (usesLocalizedMetadata) return

        if (!hasOpenGraph) {
          context.report({ node: exportNode ?? node, messageId: "missingOpenGraph" })
        }
        if (!hasAlternates) {
          context.report({ node: exportNode ?? node, messageId: "missingAlternates" })
        }
      },
    }
  },
} as const satisfies Rule.RuleModule
