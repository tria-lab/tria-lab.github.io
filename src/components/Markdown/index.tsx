import Heading from "./Heading"
import Image from "./Image"
import { A } from "@/components/Link"
import rehypeShiki from "@shikijs/rehype"
import type { ComponentProps } from "react"
import React from "react"
import { MarkdownAsync } from "react-markdown"
import { Components } from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

const renderInlineCode = ({ children, ...props }: ComponentProps<"code">) => {
  return (
    <code
      style={{
        backgroundColor: "#f0f0f0",
        padding: "2px 4px",
        borderRadius: "4px",
        fontFamily: "monospace",
        fontSize: "0.875rem",
      }}
      {...props}
    >
      {children}
    </code>
  )
}

const getTextContent = (children: React.ReactNode): string => {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child)
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getTextContent(child.props.children)
      }
      return ""
    })
    .join("")
}

const slugify = (children: React.ReactNode) => {
  return getTextContent(children)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
}

const renderHeading = (level: number, slugs: Map<string, number>) => {
  const Component = ({
    children,
    node: _node,
    ...props
  }: ComponentProps<"h1"> & { node?: unknown }) => {
    const slug = slugify(children) || `heading-${level}`
    const count = slugs.get(slug) || 0
    slugs.set(slug, count + 1)

    return (
      <Heading id={count ? `${slug}-${count + 1}` : slug} level={level} {...props}>
        {children}
      </Heading>
    )
  }
  Component.displayName = `HeadingLevel${level}`
  return Component
}

const createRenderers = (): Components => {
  const slugs = new Map<string, number>()

  return {
    a: ({ children, node: _node, ...props }) => (
      <A {...{ ...props, href: props.href || "" }}>{children}</A>
    ),

    code: ({ className, children, node: _node, ...props }) => {
      const isBlock =
        className || (Array.isArray(children) && children.some((c) => typeof c === "object"))
      if (isBlock) return <code {...props}>{children}</code>
      return renderInlineCode({ children, ...props })
    },

    h1: renderHeading(1, slugs),
    h2: renderHeading(2, slugs),
    h3: renderHeading(3, slugs),
    h4: renderHeading(4, slugs),
    h5: renderHeading(5, slugs),
    h6: renderHeading(6, slugs),

    hr: ({ node: _node, ...props }) => <hr className="my-5 border-t border-black" {...props} />,

    table: ({ children, node: _node, ...props }) => (
      <table className="my-5 w-full border-collapse" {...props}>
        {children}
      </table>
    ),

    tbody: ({ children, node: _node, ...props }) => <tbody {...props}>{children}</tbody>,

    td: ({ children, node: _node, ...props }) => (
      <td className="border-b border-black py-2 pr-4" {...props}>
        {children}
      </td>
    ),

    th: ({ children, node: _node, ...props }) => (
      <th className="border-b border-black py-2 pr-4 text-left font-semibold" {...props}>
        {children}
      </th>
    ),

    thead: ({ children, node: _node, ...props }) => <thead {...props}>{children}</thead>,

    tr: ({ children, node: _node, ...props }) => <tr {...props}>{children}</tr>,

    img: ({ alt, src, node: _node, ...props }) => (
      <Image alt={alt ? alt : ""} src={src ? String(src) : ""} {...props} />
    ),

    li: ({ children, node: _node, ...props }) => (
      <li className="text-base/8" {...props}>
        {children}
      </li>
    ),

    ol: ({ children, node: _node, ...props }) => (
      <ol className="ml-5 list-decimal" {...props}>
        {children}
      </ol>
    ),
    ul: ({ children, node: _node, ...props }) => (
      <ul className="ml-5 list-disc" {...props}>
        {children}
      </ul>
    ),

    p: ({ children, node: _node, ...props }) => (
      <p className="mb-4 text-base/8" {...props}>
        {children}
      </p>
    ),

    pre: ({ children, node: _node, ...props }) => <pre {...props}>{children}</pre>,
  }
}

export default async function Markdown({ children }: { children: string; type?: string }) {
  return (
    <MarkdownAsync
      components={createRenderers()}
      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
      rehypePlugins={[rehypeKatex, [rehypeShiki, { theme: "github-light" }]]}
    >
      {children}
    </MarkdownAsync>
  )
}
