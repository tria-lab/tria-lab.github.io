/**
 * Vibe coded opengraph eslint plugin
 */
/** @type {import('eslint').Rule.RuleModule} */
export const requireOpengraph = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce OpenGraph metadata in Next.js page components",
      recommended: true,
    },
    fixable: undefined,
    schema: [],
    messages: {
      missingOpenGraph:
        "Page exports openGraph but it may be missing required fields (title, description, url).",
    },
  },
  create(context) {
    const filename = context.filename
    if (!filename || filename === "<input>") return {}
    if (!filename.includes("/app/")) return {}
    if (!/page\.(tsx|ts|jsx|js)$/.test(filename)) return {}

    return {
      ExportNamedDeclaration(node) {
        if (node.type !== "ExportNamedDeclaration") return
        if (!node.declaration) return

        if (node.declaration.type === "VariableDeclaration") {
          const metadataVar = node.declaration.declarations.find(
            (d) =>
              d.type === "VariableDeclarator" &&
              d.id.type === "Identifier" &&
              d.id.name === "metadata",
          )

          const init = metadataVar?.init

          if (!init || init.type !== "ObjectExpression") return

          const ogProp = init.properties.find(
            (prop) =>
              prop.type === "Property" &&
              !prop.computed &&
              prop.key.type === "Identifier" &&
              prop.key.name === "openGraph",
          )

          if (!ogProp) {
            context.report({ node, messageId: "missingOpenGraph" })
            return
          }

          if (ogProp.value.type === "CallExpression") {
            return
          }

          if (ogProp.value.type !== "ObjectExpression") {
            context.report({ node, messageId: "missingOpenGraph" })
            return
          }

          const ogValue = ogProp.value
          const hasTitle = ogValue.properties.some(
            (p) =>
              p.type === "Property" &&
              !p.computed &&
              p.key.type === "Identifier" &&
              p.key.name === "title",
          )
          const hasDescription = ogValue.properties.some(
            (p) =>
              p.type === "Property" &&
              !p.computed &&
              p.key.type === "Identifier" &&
              p.key.name === "description",
          )

          if (!hasTitle || !hasDescription) {
            context.report({ node, messageId: "missingOpenGraph" })
          }
        }
      },
    }
  },
}
