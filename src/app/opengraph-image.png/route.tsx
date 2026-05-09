import { siteConfig } from "@/lib/config"
import { ImageResponse } from "@vercel/og"

export const dynamic = "force-static"

export const IMAGE_WIDTH = 1200
export const IMAGE_HEIGHT = 630

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        backgroundImage: "radial-gradient(circle at 25% 25%, rgba(0,0,0,0.05) 0%, transparent 50%)",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          {siteConfig.title}
        </span>
        <span
          style={{
            fontSize: "28px",
            color: "#666666",
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </span>
      </div>
    </div>,
    {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
  ) as Response
}
