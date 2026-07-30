import { siteConfig } from "@/lib/config"

export const openGraphImageSize = {
  width: 1200,
  height: 630,
}

export default function OpenGraphImage({
  label,
  title,
  detail,
}: {
  label: string
  title: string
  detail: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f8f7f3",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(13, 42, 76, 0.16) 0%, transparent 34%)",
        color: "#111827",
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#536171" }}>{siteConfig.title}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            width: 88,
            height: 8,
            backgroundColor: "#0d2a4c",
          }}
        />
        <span
          style={{
            maxWidth: 1040,
            fontSize: title.length > 55 ? 58 : 72,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 28, color: "#536171" }}>{detail}</span>
      </div>
    </div>
  )
}
