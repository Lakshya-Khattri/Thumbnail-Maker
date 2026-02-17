// ─────────────────────────────────────────────────────────────
// client/hooks/useThumbnail.js
// Manages all thumbnail form state and derives thumbnailData
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import { MOODS } from "../utils/constants";

export function useThumbnail() {
  const [title,       setTitle]       = useState("");
  const [subtitle,    setSubtitle]    = useState("");
  const [channelName, setChannelName] = useState("");
  const [bigNumber,   setBigNumber]   = useState("");
  const [style,       setStyle]       = useState("cinematic");
  const [mood,        setMood]        = useState("dramatic");
  const [fontSize,    setFontSize]    = useState("medium");
  const [layout,      setLayout]      = useState("center");

  const moodObj = useMemo(
    () => MOODS.find((m) => m.id === mood) || MOODS[0],
    [mood]
  );

  const accent = moodObj.accent;

  /** Derived object passed to ThumbnailCanvas */
  const thumbnailData = useMemo(
    () => ({ title, subtitle, channelName, bigNumber, style, mood, fontSize, layout }),
    [title, subtitle, channelName, bigNumber, style, mood, fontSize, layout]
  );

  /** Apply an AI variant to the form */
  function applyVariant(variant) {
    if (variant.title)    setTitle(variant.title);
    if (variant.subtitle) setSubtitle(variant.subtitle);
  }

  /** Apply a full history snapshot */
  function applySnapshot(snap) {
    setTitle(snap.title);
    setSubtitle(snap.subtitle);
    setChannelName(snap.channelName || "");
    setBigNumber(snap.bigNumber || "");
    setStyle(snap.style);
    setMood(snap.mood);
    setFontSize(snap.fontSize);
    setLayout(snap.layout);
  }

  return {
    // Fields
    title, setTitle,
    subtitle, setSubtitle,
    channelName, setChannelName,
    bigNumber, setBigNumber,
    style, setStyle,
    mood, setMood,
    fontSize, setFontSize,
    layout, setLayout,
    // Derived
    moodObj,
    accent,
    thumbnailData,
    // Actions
    applyVariant,
    applySnapshot,
  };
}
