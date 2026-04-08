import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,

  // https://nextjs.org/docs/app/guides/static-exports
  output: "export",
  trailingSlash: true,
}

export default nextConfig
