// ─────────────────────────────────────────────────────────────
// server/routes/thumbnail.js — AI suggestion endpoint
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const { generateSuggestions } = require("../services/claudeService");
const { validateThumbnailRequest } = require("../middleware/validateRequest");

/**
 * POST /api/thumbnail/suggest
 * Body: { title, channelName, style, mood, subtitle }
 * Returns: { variants, colorStrategy, textTip }
 */
router.post("/suggest", validateThumbnailRequest, async (req, res, next) => {
  try {
    const { title, channelName, style, mood, subtitle } = req.body;

    const suggestions = await generateSuggestions({
      title,
      channelName: channelName || "YouTube Channel",
      style,
      mood,
      subtitle: subtitle || "",
    });

    res.json({ success: true, data: suggestions });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/thumbnail/styles
 * Returns available thumbnail styles and moods
 */
router.get("/styles", (req, res) => {
  const { STYLES, MOODS, FONT_SIZES, LAYOUTS } = require("../services/constants");
  res.json({ success: true, data: { STYLES, MOODS, FONT_SIZES, LAYOUTS } });
});

module.exports = router;
