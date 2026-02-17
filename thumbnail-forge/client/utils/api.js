// ─────────────────────────────────────────────────────────────
// client/utils/api.js — Backend API helpers
// ─────────────────────────────────────────────────────────────

import { API_BASE } from "./constants";

/**
 * POST to /api/thumbnail/suggest
 * @param {{ title, channelName, style, mood, subtitle }} payload
 * @returns {Promise<{ variants, colorStrategy, textTip }>}
 */
export async function fetchSuggestions(payload) {
  const res = await fetch(`${API_BASE}/api/thumbnail/suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Network error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

/**
 * GET /api/health
 * @returns {Promise<{ status, uptime, model }>}
 */
export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error("Server health check failed");
  return res.json();
}
