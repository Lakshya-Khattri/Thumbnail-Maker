// ─────────────────────────────────────────────────────────────
// server/middleware/errorHandler.js
// ─────────────────────────────────────────────────────────────

function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== "production";

  console.error(`[ERROR] ${err.message}`);
  if (isDev) console.error(err.stack);

  // Claude API errors
  if (err.message?.startsWith("Claude API error")) {
    return res.status(502).json({
      error: "AI service error",
      message: isDev ? err.message : "Failed to get AI suggestions. Please try again.",
    });
  }

  // JSON parse errors from Claude
  if (err.message?.includes("parse")) {
    return res.status(502).json({
      error: "AI response parsing error",
      message: "Received an unexpected response from AI service.",
    });
  }

  // Generic server error
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: isDev ? err.message : "Something went wrong.",
  });
}

module.exports = { errorHandler };
