// ─────────────────────────────────────────────────────────────
// client/components/Sidebar.jsx
// Left panel: 3 tabs (Content / Style / Advanced) + generate btn
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { STYLES, MOODS, FONT_SIZES, LAYOUTS, PRO_TIPS } from "../utils/constants";

// ── Reusable primitives ───────────────────────────────────────

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block", fontSize: 10, fontWeight: 800,
        color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: 8,
      }}>
        {label}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 5 }}>{hint}</div>
      )}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, multiline, accent }) {
  const base = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8,
    padding: "11px 14px", color: "#fff", fontSize: 14,
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };
  const handlers = {
    onFocus: (e) => { e.target.style.borderColor = accent; },
    onBlur:  (e) => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; },
  };
  return multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{ ...base, resize: "vertical" }}
      {...handlers}
    />
  ) : (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={base}
      {...handlers}
    />
  );
}

// ── Tabs ──────────────────────────────────────────────────────

const TABS = ["content", "style", "advanced"];

export default function Sidebar({
  // content
  title, setTitle, subtitle, setSubtitle,
  channelName, setChannelName,
  // style
  style, setStyle, mood, setMood,
  layout, setLayout,
  // advanced
  fontSize, setFontSize, bigNumber, setBigNumber,
  // generate
  onGenerate, loading, accent,
  // AI results
  aiSuggestions, aiError, onApplyVariant,
  // history
  history, onApplySnapshot,
}) {
  const [tab, setTab] = useState("content");

  return (
    <div style={{
      borderRight: "1px solid rgba(255,255,255,0.07)",
      overflowY: "auto", background: "rgba(255,255,255,0.01)",
    }}>
      {/* ── Tab bar ── */}
      <div style={{ padding: "16px 20px 0", position: "sticky", top: 0, background: "rgba(6,6,15,0.95)", zIndex: 10 }}>
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3 }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "8px 0", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: "none", cursor: "pointer", borderRadius: 8, transition: "all 0.18s",
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#000" : "rgba(255,255,255,0.35)",
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 32px" }}>

        {/* ── Content Tab ── */}
        {tab === "content" && (
          <>
            <Field label="Video Title *">
              <TextInput value={title} onChange={setTitle} multiline accent={accent}
                placeholder="e.g. I Quit My $200K Job and Never Looked Back" />
            </Field>
            <Field label="Subtitle / Tagline" hint="Short supporting line shown at bottom">
              <TextInput value={subtitle} onChange={setSubtitle} accent={accent}
                placeholder="e.g. The truth they don't want you to know" />
            </Field>
            <Field label="Channel Name" hint="Displayed as @channelname">
              <TextInput value={channelName} onChange={setChannelName} accent={accent}
                placeholder="e.g. TechWithMark" />
            </Field>
          </>
        )}

        {/* ── Style Tab ── */}
        {tab === "style" && (
          <>
            <Field label="Thumbnail Style">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {STYLES.map((s) => (
                  <button key={s.id} onClick={() => setStyle(s.id)} style={{
                    padding: "12px 10px", textAlign: "left",
                    border: style === s.id ? `2px solid ${accent}` : "1px solid rgba(255,255,255,0.08)",
                    background: style === s.id ? `${accent}14` : "rgba(255,255,255,0.02)",
                    borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: style === s.id ? accent : "rgba(255,255,255,0.6)" }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Color Mood">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {MOODS.map((m) => (
                  <button key={m.id} onClick={() => setMood(m.id)} style={{
                    padding: "10px 12px", display: "flex", alignItems: "center", gap: 9,
                    border: mood === m.id ? `2px solid ${m.accent}` : "1px solid rgba(255,255,255,0.07)",
                    background: mood === m.id ? `${m.accent}16` : "rgba(255,255,255,0.02)",
                    borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: m.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: mood === m.id ? "#fff" : "rgba(255,255,255,0.45)" }}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Layout">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 7 }}>
                {LAYOUTS.map((l) => (
                  <button key={l.id} onClick={() => setLayout(l.id)} style={{
                    padding: "10px 12px", display: "flex", alignItems: "center", gap: 8,
                    border: layout === l.id ? `2px solid ${accent}` : "1px solid rgba(255,255,255,0.07)",
                    background: layout === l.id ? `${accent}14` : "rgba(255,255,255,0.02)",
                    borderRadius: 9, cursor: "pointer",
                  }}>
                    <span style={{ fontSize: 16 }}>{l.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: layout === l.id ? accent : "rgba(255,255,255,0.45)" }}>
                      {l.label}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
          </>
        )}

        {/* ── Advanced Tab ── */}
        {tab === "advanced" && (
          <>
            <Field label="Font Size">
              <div style={{ display: "flex", gap: 7 }}>
                {FONT_SIZES.map((f) => (
                  <button key={f.id} onClick={() => setFontSize(f.id)} style={{
                    flex: 1, padding: "10px 0", fontWeight: 700, fontSize: 12,
                    border: fontSize === f.id ? `2px solid ${accent}` : "1px solid rgba(255,255,255,0.08)",
                    background: fontSize === f.id ? `${accent}14` : "rgba(255,255,255,0.02)",
                    color: fontSize === f.id ? accent : "rgba(255,255,255,0.45)",
                    borderRadius: 8, cursor: "pointer",
                  }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Background Number / Stat" hint="Large watermark number in background">
              <TextInput value={bigNumber} onChange={setBigNumber} accent={accent}
                placeholder="e.g. 1,000,000 or #1" />
            </Field>

            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, padding: "16px", marginTop: 4,
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: 12 }}>
                ✦ CLICK-THROUGH TIPS
              </div>
              {PRO_TIPS.map(({ tip, sub }, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: accent, fontSize: 14, fontWeight: 900, lineHeight: 1.5 }}>→</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>{tip}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Generate Button ── */}
        <button
          onClick={onGenerate}
          disabled={!title.trim() || loading}
          style={{
            width: "100%", marginTop: 24, padding: "16px",
            background: title.trim() ? accent : "rgba(255,255,255,0.04)",
            color: title.trim() ? "#000" : "rgba(255,255,255,0.2)",
            border: "none", borderRadius: 10,
            cursor: title.trim() ? "pointer" : "not-allowed",
            fontSize: 13, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase",
            transition: "all 0.25s",
            boxShadow: title.trim() ? `0 8px 32px ${accent}44` : "none",
          }}
        >
          {loading ? "⚡ Generating AI Suggestions..." : "⚡ Generate + AI Optimize"}
        </button>

        {/* ── AI error ── */}
        {aiError && (
          <div style={{
            marginTop: 14, background: "rgba(255,180,0,0.08)",
            border: "1px solid rgba(255,180,0,0.2)", borderRadius: 8,
            padding: "10px 14px", fontSize: 12, color: "rgba(255,200,100,0.7)",
          }}>
            ⚠️ {aiError}
          </div>
        )}

        {/* ── AI Suggestions ── */}
        {aiSuggestions && (
          <AISuggestionsPanel suggestions={aiSuggestions} accent={accent} onApply={onApplyVariant} />
        )}

        {/* ── History ── */}
        {history.length > 0 && (
          <HistoryPanel history={history} accent={accent} onApply={onApplySnapshot} />
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function AISuggestionsPanel({ suggestions, accent, onApply }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", marginBottom: 12 }}>
        ✦ AI VARIANT SUGGESTIONS — click to apply
      </div>
      {suggestions.variants?.map((v, i) => (
        <div
          key={i}
          onClick={() => onApply(v)}
          style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10, padding: "14px 16px", cursor: "pointer",
            transition: "all 0.2s", marginBottom: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = `${accent}10`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: accent, fontWeight: 800, letterSpacing: "0.12em" }}>VARIANT {i + 1}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>→ Apply</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, lineHeight: 1.3 }}>{v.title}</div>
          {v.subtitle && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{v.subtitle}</div>}
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
            💡 {v.tip}
          </div>
        </div>
      ))}
      {suggestions.colorStrategy && (
        <div style={{
          background: `${accent}10`, border: `1px solid ${accent}30`,
          borderRadius: 8, padding: "10px 14px", fontSize: 12,
          color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
        }}>
          <span style={{ color: accent, fontWeight: 700 }}>🎨 </span>
          {suggestions.colorStrategy}
        </div>
      )}
    </div>
  );
}

function HistoryPanel({ history, accent, onApply }) {
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", marginBottom: 12 }}>
        ◷ RECENT
      </div>
      {history.slice(0, 3).map((h, i) => (
        <div
          key={i}
          onClick={() => onApply(h)}
          style={{
            padding: "10px 12px", marginBottom: 6,
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent + "55"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {h.title}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
            {h.style} · {h.mood}
          </div>
        </div>
      ))}
    </div>
  );
}
