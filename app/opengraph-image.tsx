import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.displayName} — ${profile.seriesTitle}, ${profile.volume}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export: generated once at build time.
export const dynamic = "force-static";

/** Open Graph image in the light-novel cover style: obi, volume number and the long title. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f8f4ec", color: "#1d1a17", fontFamily: "serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760, padding: "64px 64px 0 72px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#6b6159" }}>
            {`${profile.seriesTitle} · ${profile.volume} · Pasto, Nariño`}
          </div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, marginTop: 28, letterSpacing: -2 }}>{profile.displayName}</div>
          <div style={{ fontSize: 34, marginTop: 18, color: "#4a423b" }}>{profile.role}</div>
          <div style={{ fontSize: 28, marginTop: 34, lineHeight: 1.35, color: "#1d1a17", maxWidth: 620 }}>{`«${profile.longTitle}»`}</div>
        </div>
        <div
          style={{
            display: "flex",
            background: "#b02018",
            color: "#f9f5ec",
            margin: "0 -64px 0 -72px",
            padding: "26px 72px",
            fontSize: 26,
          }}
        >
          Wear OS · Android · Flutter · Web — Actualmente estudiando Ingeniería de Software, UCC Pasto
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", background: "#391f13", padding: 40, alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 300,
            height: 400,
            background: "#b02018",
            color: "#f9f5ec",
            padding: 28,
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 16, letterSpacing: 4, textTransform: "uppercase" }}>{profile.seriesTitle}</div>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1 }}>Vol. 1</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontSize: 22 }}>{profile.displayName}</div>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                border: "3px solid #f9f5ec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              JM
            </div>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
