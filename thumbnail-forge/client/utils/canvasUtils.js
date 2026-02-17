// ─────────────────────────────────────────────────────────────
// client/utils/canvasUtils.js — Pure canvas drawing helpers
// ─────────────────────────────────────────────────────────────

import { MOODS, STYLES, FONT_SIZES } from "./constants";

/**
 * Wrap text into lines that fit within maxWidth.
 * Returns at most maxLines lines.
 */
export function wrapText(ctx, text, maxWidth, font, maxLines = 4) {
  ctx.font = font;
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

/**
 * Draw the full thumbnail onto a canvas context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W - canvas width
 * @param {number} H - canvas height
 * @param {Object} data - thumbnail config
 */
export function drawThumbnail(ctx, W, H, data) {
  const mood       = MOODS.find((m) => m.id === data.mood)      || MOODS[0];
  const styleObj   = STYLES.find((s) => s.id === data.style);
  const fontSize   = FONT_SIZES.find((f) => f.id === data.fontSize)?.size || 44;

  // ── 1. Background gradient ──────────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, mood.bg1);
  bgGrad.addColorStop(1, mood.bg2);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Layout overlay ───────────────────────────────────────
  if (data.layout === "split") {
    const splitGrad = ctx.createLinearGradient(W * 0.45, 0, W * 0.55, 0);
    splitGrad.addColorStop(0, mood.bg2 + "DD");
    splitGrad.addColorStop(1, mood.accent + "33");
    ctx.fillStyle = splitGrad;
    ctx.fillRect(W * 0.5, 0, W * 0.5, H);
  }

  if (data.layout === "bottom") {
    ctx.fillStyle = mood.accent + "22";
    ctx.fillRect(0, H * 0.72, W, H * 0.28);
    ctx.fillStyle = mood.accent;
    ctx.fillRect(0, H * 0.72, W, 4);
  }

  // ── 3. Diagonal slash ───────────────────────────────────────
  if (data.layout !== "bottom") {
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = mood.accent;
    ctx.beginPath();
    ctx.moveTo(W * 0.6, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W * 0.4, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ── 4. Radial glow ──────────────────────────────────────────
  const glowX = data.layout === "left" ? W * 0.25 : W * 0.5;
  const radGrad = ctx.createRadialGradient(glowX, H * 0.5, 0, glowX, H * 0.5, H * 0.7);
  radGrad.addColorStop(0, mood.accent + "28");
  radGrad.addColorStop(1, "transparent");
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, W, H);

  // ── 5. Grid texture ─────────────────────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();

  // ── 6. Left accent bar ──────────────────────────────────────
  if (data.layout !== "split") {
    ctx.fillStyle = mood.accent;
    ctx.fillRect(0, 0, 8, H);
  }

  // ── 7. Style badge ──────────────────────────────────────────
  if (styleObj) {
    ctx.save();
    ctx.font = "bold 20px 'Helvetica Neue', sans-serif";
    const badgeTxt = styleObj.label.toUpperCase();
    const tw = ctx.measureText(badgeTxt).width;
    ctx.fillStyle = mood.accent;
    ctx.beginPath();
    ctx.roundRect(28, 12, tw + 24, 34, 6);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillText(badgeTxt, 40, 36);
    ctx.restore();
  }

  // ── 8. Main title ───────────────────────────────────────────
  if (data.title) {
    const maxWidth = data.layout === "split" ? W * 0.44 : W - 100;
    const xOffset  = data.layout === "left" ? 40 : 50;
    const font     = `bold ${fontSize}px 'Georgia', serif`;
    const lines    = wrapText(ctx, data.title.toUpperCase(), maxWidth, font);
    const lineH    = fontSize * 1.2;
    const totalH   = lines.length * lineH;
    const startY   = data.layout === "bottom"
      ? H * 0.72 - totalH - 20
      : (H - totalH) / 2 + fontSize * 0.4;

    ctx.font = font;

    // Drop shadow
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    lines.forEach((line, i) => ctx.fillText(line, xOffset + 4, startY + i * lineH + 4));

    // White text
    ctx.fillStyle = "#FFFFFF";
    lines.forEach((line, i) => ctx.fillText(line, xOffset, startY + i * lineH));

    // Accent underline on last line
    const lastLine = lines[lines.length - 1];
    const lw = Math.min(ctx.measureText(lastLine).width, maxWidth);
    ctx.fillStyle = mood.accent;
    ctx.fillRect(xOffset, startY + (lines.length - 1) * lineH + 12, lw, 5);
  }

  // ── 9. Subtitle ─────────────────────────────────────────────
  if (data.subtitle) {
    ctx.save();
    ctx.font = "22px 'Helvetica Neue', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    const subX = data.layout === "left" ? 40 : 50;
    const subY = data.layout === "bottom" ? H - 28 : H - 50;
    ctx.fillText(data.subtitle, subX, subY);
    ctx.restore();
  }

  // ── 10. Background stat number ──────────────────────────────
  if (data.bigNumber) {
    ctx.save();
    ctx.font = "bold 220px 'Georgia', serif";
    ctx.fillStyle = "rgba(255,255,255,0.035)";
    ctx.textAlign = "right";
    ctx.fillText(data.bigNumber, W - 30, H + 20);
    ctx.restore();
  }

  // ── 11. Channel name ─────────────────────────────────────────
  if (data.channelName) {
    ctx.save();
    ctx.font = "bold 18px 'Helvetica Neue', sans-serif";
    ctx.fillStyle = mood.accent;
    ctx.fillText("@ " + data.channelName, 28, H - 22);
    ctx.restore();
  }

  // ── 12. Corner dots ──────────────────────────────────────────
  [0, 12, 24].forEach((offset, i) => {
    ctx.save();
    ctx.globalAlpha = 0.4 - i * 0.1;
    ctx.fillStyle = mood.accent;
    ctx.beginPath();
    ctx.arc(W - 30 - offset, 30, 5 - i, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

/**
 * Export canvas to a PNG download
 * @param {HTMLCanvasElement} canvas
 * @param {string} filename
 */
export function downloadCanvasAsPng(canvas, filename = "thumbnail.png") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
