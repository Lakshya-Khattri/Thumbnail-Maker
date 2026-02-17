// ─────────────────────────────────────────────────────────────
// client/components/ThumbnailCanvas.jsx
// Renders thumbnail to HTML5 Canvas; redraws on data changes
// ─────────────────────────────────────────────────────────────

import { useRef, useEffect, useCallback } from "react";
import { drawThumbnail } from "../utils/canvasUtils";

/**
 * @param {{ data: Object, width?: number, height?: number, scale?: number }} props
 */
export default function ThumbnailCanvas({
  data,
  width  = 1280,
  height = 720,
  scale  = 0.5,
}) {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    if (!data) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    drawThumbnail(ctx, width, height, data);
  }, [data, width, height]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: width * scale, height: height * scale, display: "block" }}
      aria-label="YouTube thumbnail preview"
    />
  );
}
