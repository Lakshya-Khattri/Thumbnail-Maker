// ─────────────────────────────────────────────────────────────
// server/services/constants.js — Shared app constants
// ─────────────────────────────────────────────────────────────

const STYLES = [
  { id: "cinematic",  label: "Cinematic",  icon: "🎬", desc: "Dark, dramatic, film-like" },
  { id: "bold_text",  label: "Bold Text",  icon: "🔤", desc: "Typography-forward" },
  { id: "tutorial",   label: "Tutorial",   icon: "📚", desc: "Clear, instructional" },
  { id: "reaction",   label: "Reaction",   icon: "😲", desc: "Face-forward, emotive" },
  { id: "vlog",       label: "Vlog",       icon: "📸", desc: "Personal, authentic" },
  { id: "gaming",     label: "Gaming",     icon: "🎮", desc: "High-energy, neon" },
];

const MOODS = [
  { id: "energetic",    label: "Energetic",    bg1: "#1a0400", bg2: "#FF4D00", accent: "#FF9500" },
  { id: "professional", label: "Professional", bg1: "#020B1A", bg2: "#003580", accent: "#4A9EFF" },
  { id: "dramatic",     label: "Dramatic",     bg1: "#080010", bg2: "#5B0080", accent: "#C060FF" },
  { id: "warm",         label: "Warm",         bg1: "#120600", bg2: "#8B3A00", accent: "#FFB344" },
  { id: "mysterious",   label: "Mysterious",   bg1: "#010810", bg2: "#012040", accent: "#00AAFF" },
  { id: "playful",      label: "Playful",      bg1: "#001510", bg2: "#006644", accent: "#00E8A0" },
];

const FONT_SIZES = [
  { id: "small",  label: "Small",  size: 32 },
  { id: "medium", label: "Medium", size: 44 },
  { id: "large",  label: "Large",  size: 58 },
];

const LAYOUTS = [
  { id: "center", label: "Center",      icon: "⬛" },
  { id: "left",   label: "Left Heavy",  icon: "◀" },
  { id: "bottom", label: "Bottom Bar",  icon: "▬" },
  { id: "split",  label: "Split",       icon: "⬛⬛" },
];

const VALID_STYLE_IDS = STYLES.map((s) => s.id);
const VALID_MOOD_IDS  = MOODS.map((m) => m.id);

module.exports = { STYLES, MOODS, FONT_SIZES, LAYOUTS, VALID_STYLE_IDS, VALID_MOOD_IDS };
