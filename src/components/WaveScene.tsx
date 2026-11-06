"use client";

import { useEffect, useRef } from "react";

/** Own animated 3D-style point-wave background (replaces the original third-party WebGL scene).
 *  `beat` (0..1) shifts the camera and colour as the visitor scrolls through the sections. */
export default function WaveScene({ beat, onReady }: { beat: number; onReady?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const beatRef = useRef(beat);
  beatRef.current = beat;
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, cur = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const COLS = 70, ROWS = 46;
    const t0 = performance.now();
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      cur += (beatRef.current - cur) * 0.05;
      ctx.fillStyle = "#07090d";
      ctx.fillRect(0, 0, w, h);
      const hue = 170 + cur * 150;
      const cam = 0.55 + cur * 0.5;
      const horizon = h * (0.34 + cur * 0.18);
      const cx = w / 2 + Math.sin(cur * 6) * w * 0.08;
      for (let r = 0; r < ROWS; r++) {
        const z = 1 - r / ROWS;
        const persp = 1 / (0.15 + (1 - z) * 2.4 * cam);
        const y0 = horizon + (h * 0.9 - horizon) * (1 - z) ** 1.6;
        for (let k = 0; k < COLS; k++) {
          const u = k / (COLS - 1) - 0.5;
          const amp = 38 * (1 - z * 0.4) * (0.4 + cur);
          const wave = Math.sin(u * 9 + t * 0.9 + r * 0.35) * Math.cos(r * 0.22 - t * 0.6) * amp * (1 - z);
          const x = cx + u * w * 1.9 * (1 - z) ** 0.8 + u * w * 0.25;
          const y = y0 + wave;
          const size = Math.max(0.6, 2.4 * (1 - z) + 0.4);
          const a = Math.min(1, 0.15 + (1 - z) * 0.9) * (0.5 + 0.5 * Math.sin(u * 4 + t + r));
          ctx.fillStyle = `hsla(${hue + u * 40 + r * 1.2},85%,${55 + wave}%,${a})`;
          ctx.fillRect(x, y, size, size);
          if (persp < 0) break;
        }
      }
      const g = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, h * 0.9);
      g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.65)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const rt = setTimeout(() => readyRef.current?.(), 500);
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <canvas ref={ref} id="webContainer" className="h-full w-full" />
    </div>
  );
}
