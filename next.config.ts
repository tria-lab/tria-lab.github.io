import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  reactCompiler: true,
  images: { unoptimized: true },
  // https://nextjs.org/docs/app/guides/static-exports
  output: "export",
  trailingSlash: true,
}

export default nextConfig
