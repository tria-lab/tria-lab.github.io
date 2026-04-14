import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import * as React from "react"

function A({
  className,
  noIcon,
  ...props
}: React.ComponentProps<"a"> & {
  href: string
  noIcon?: boolean
}) {
  const external = props.href?.startsWith("http://") || props.href?.startsWith("https://") || false

  const E = external ? "a" : Link

  return (
    <E
      className={cn(
        `inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-2 transition-colors hover:text-hongik-medium-blue hover:decoration-hongik-medium-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hongik-medium-blue`,
        className,
      )}
      {...props}
      {...(external && { target: "_blank", rel: "noopener noreferrer nofollow" })}
    >
      {props.children}
      {!noIcon && external && <ExternalLink size={16} />}
    </E>
  )
}

export { A }
