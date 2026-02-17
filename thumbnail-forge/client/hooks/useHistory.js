// ─────────────────────────────────────────────────────────────
// client/hooks/useHistory.js
// Persists up to 5 recent thumbnail snapshots in localStorage
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

const STORAGE_KEY = "thumbnail-forge-history";
const MAX_ITEMS = 5;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function useHistory() {
  const [history, setHistory] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(history);
  }, [history]);

  /**
   * Push a new snapshot to the front, cap at MAX_ITEMS
   * @param {Object} thumbnailData
   */
  function push(thumbnailData) {
    setHistory((prev) => {
      const entry = { ...thumbnailData, timestamp: Date.now() };
      const deduped = prev.filter(
        (h) => h.title !== thumbnailData.title || h.mood !== thumbnailData.mood
      );
      return [entry, ...deduped].slice(0, MAX_ITEMS);
    });
  }

  function clear() {
    setHistory([]);
  }

  return { history, push, clear };
}
