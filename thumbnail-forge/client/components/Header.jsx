// ─────────────────────────────────────────────────────────────
// client/components/Header.jsx
// Sticky top navigation bar
// ─────────────────────────────────────────────────────────────

import { downloadCanvasAsPng } from "../utils/canvasUtils";

export default function Header({ hasTitle, accent }) {
  function handleDownload() {
    const canvas = document.querySelector("canvas");
    if (canvas) downloadCanvasAsPng(canvas, `thumbnail-${Date.now()}.png`);
  }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "rgba(6,6,15,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 32px", height: 58,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 34, height: 34, background: "#FF0000", borderRadius: 9,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, color: "#fff", fontWeight: 900, userSelect: "none",
        }}>
          ▶
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.05em" }}>
            THUMBNAIL FORGE
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em" }}>
            AI-POWERED CREATOR TOOL
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {hasTitle && (
          <button onClick={handleDownload} style={{
            padding: "7px 16px", background: accent, color: "#000",
            border: "none", borderRadius: 7, cursor: "pointer",
            fontSize: 12, fontWeight: 800, letterSpacing: "0.06em",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => { e.target.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
          >
            ↓ PNG
          </button>
        )}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
          Claude API
        </div>
      </div>
    </header>
  );
}
