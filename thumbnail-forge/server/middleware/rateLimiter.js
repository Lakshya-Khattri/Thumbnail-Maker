// ─────────────────────────────────────────────────────────────
// server/middleware/rateLimiter.js
// ─────────────────────────────────────────────────────────────

const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests — please wait before generating again.",
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

module.exports = { rateLimiter };
