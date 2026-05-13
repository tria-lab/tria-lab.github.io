import Heading from "./Heading"
import Image from "./Image"
import { A } from "@/components/Link"
import type { ComponentProps } from "react"
import ReactMarkdown from "react-markdown"
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

const renderHeading = (level: number) => {
  const Component = ({ children, ...props }: ComponentProps<"h1">) => {
    return (
      <Heading level={level} {...props}>
        {children}
      </Heading>
    )
  }
  Component.displayName = `HeadingLevel${level}`
  return Component
}

const renderers: Components = {
  a: ({ children, node: _node, ...props }) => (
    <A {...{ ...props, href: props.href || "" }}>{children}</A>
  ),

  code: ({ className, children, node: _node, ...props }) =>
    className ? children : renderInlineCode({ children, ...props }),

  h1: renderHeading(1),
  h2: renderHeading(2),
  h3: renderHeading(3),
  h4: renderHeading(4),
  h5: renderHeading(5),
  h6: renderHeading(6),

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

export default function Markdown({ children }: { children: string; type?: string }) {
  return (
    <ReactMarkdown
      components={renderers}
      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  )
}
