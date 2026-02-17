// ─────────────────────────────────────────────────────────────
// client/components/PreviewPanel.jsx
// Right panel: live canvas preview, palette swatch, spec grid
// ─────────────────────────────────────────────────────────────

import ThumbnailCanvas from "./ThumbnailCanvas";
import { STYLES, MOODS, FONT_SIZES, LAYOUTS } from "../utils/constants";
import { downloadCanvasAsPng } from "../utils/canvasUtils";

export default function PreviewPanel({ thumbnailData, accent, moodObj, style, mood, fontSize, layout }) {
  const hasTitle = Boolean(thumbnailData?.title);

  function handleDownload() {
    const canvas = document.querySelector("canvas");
    if (canvas) downloadCanvasAsPng(canvas, `thumbnail-${Date.now()}.png`);
  }

  return (
    <div style={{ padding: "32px", overflowY: "auto" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>
              LIVE PREVIEW
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
              1280 × 720px · 16:9 · YouTube optimal
            </div>
          </div>
          {hasTitle && (
            <button onClick={handleDownload} style={{
              padding: "9px 20px",
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${accent}55`,
              color: accent, borderRadius: 8,
              cursor: "pointer", fontSize: 12, fontWeight: 700,
            }}>
              ↓ Download PNG
            </button>
          )}
        </div>

        {/* Canvas wrapper */}
        <div style={{
          background: "#0E0E18", borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.07)",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        }}>
          {hasTitle ? (
            <ThumbnailCanvas data={thumbnailData} width={1280} height={720} scale={0.5} />
          ) : (
            <div style={{
              width: 640, height: 360, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 16,
              color: "rgba(255,255,255,0.15)",
            }}>
              <div style={{ fontSize: 56 }}>▶</div>
              <div style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Enter a title to start
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.1)" }}>
                Your thumbnail will render here live
              </div>
            </div>
          )}
        </div>

        {/* Palette swatches */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>PALETTE</div>
          {[moodObj.bg1, moodObj.bg2, moodObj.accent].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Spec grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 20 }}>
          {[
            ["Style",  STYLES.find((s) => s.id === style)?.label     || "—"],
            ["Mood",   MOODS.find((m) => m.id === mood)?.label        || "—"],
            ["Layout", LAYOUTS.find((l) => l.id === layout)?.label    || "—"],
            ["Font",   FONT_SIZES.find((f) => f.id === fontSize)?.label || "—"],
          ].map(([k, v]) => (
            <div key={k} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "10px 14px",
            }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 4 }}>
                {k.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{v}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
