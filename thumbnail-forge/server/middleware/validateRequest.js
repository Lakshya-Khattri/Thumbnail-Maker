// ─────────────────────────────────────────────────────────────
// server/middleware/validateRequest.js
// ─────────────────────────────────────────────────────────────

const { VALID_STYLE_IDS, VALID_MOOD_IDS } = require("../services/constants");

/**
 * Validates POST /api/thumbnail/suggest body
 */
function validateThumbnailRequest(req, res, next) {
  const { title, style, mood } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("title is required and must be a non-empty string");
  }
  if (title && title.trim().length > 200) {
    errors.push("title must be 200 characters or fewer");
  }
  if (style && !VALID_STYLE_IDS.includes(style)) {
    errors.push(`style must be one of: ${VALID_STYLE_IDS.join(", ")}`);
  }
  if (mood && !VALID_MOOD_IDS.includes(mood)) {
    errors.push(`mood must be one of: ${VALID_MOOD_IDS.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  next();
}

module.exports = { validateThumbnailRequest };
