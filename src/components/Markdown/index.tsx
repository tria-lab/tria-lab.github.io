import Heading from "./Heading"
import Image from "./Image"
import Link from "./Link"
import type { ComponentProps } from "react"
import ReactMarkdown from "react-markdown"
import { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

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
  a: ({ children, ...props }) => <Link {...props}>{children}</Link>,

  code: ({ className, children, ...props }) =>
    className ? children : renderInlineCode({ children, ...props }),

  h1: renderHeading(1),
  h2: renderHeading(2),
  h3: renderHeading(3),
  h4: renderHeading(4),
  h5: renderHeading(5),
  h6: renderHeading(6),

  hr: (props) => <hr className="my-5 h-0 border-t border-none border-black" {...props} />,

  img: ({ alt, src, ...props }) => (
    <Image alt={alt ? alt : ""} src={src ? String(src) : ""} {...props} />
  ),

  li: ({ children, ...props }) => (
    <li className="mt-4 text-base/8 first:mt-10" {...props}>
      {children}
    </li>
  ),

  ol: ({ children, ...props }) => (
    <ol className="m-0 mb-6 ml-5" {...props}>
      {children}
    </ol>
  ),
  ul: ({ children, ...props }) => (
    <ul className="m-0 mb-6 ml-5" {...props}>
      {children}
    </ul>
  ),

  p: ({ children, ...props }) => (
    <p className="mb-4 text-base/8" {...props}>
      {children}
    </p>
  ),

  pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
}

export default function Markdown({ children }: { children: string; type?: string }) {
  return (
    <ReactMarkdown components={renderers} remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
      {children}
    </ReactMarkdown>
  )
}
