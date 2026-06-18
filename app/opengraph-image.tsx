import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#22D3EE">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
            }}
          >
            DevArchitect
          </span>
        </div>
        <span
          style={{
            fontSize: 28,
            color: "#22D3EE",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Profesyonel Web Çözümleri
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
