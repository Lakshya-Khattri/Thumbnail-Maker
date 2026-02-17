// ─────────────────────────────────────────────────────────────
// client/hooks/useAI.js
// Manages Claude API calls, suggestions state, and error handling
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { fetchSuggestions } from "../utils/api";

export function useAI() {
  const [suggestions, setSuggestions] = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  /**
   * Call the backend /api/thumbnail/suggest endpoint
   * @param {{ title, channelName, style, mood, subtitle }} payload
   */
  const generate = useCallback(async (payload) => {
    if (!payload.title?.trim()) return;

    setLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const data = await fetchSuggestions(payload);
      setSuggestions(data);
    } catch (err) {
      setError(err.message || "AI suggestions unavailable — your thumbnail is still ready!");
    } finally {
      setLoading(false);
    }
  }, []);

  function clearSuggestions() {
    setSuggestions(null);
    setError(null);
  }

  return { suggestions, loading, error, generate, clearSuggestions };
}
