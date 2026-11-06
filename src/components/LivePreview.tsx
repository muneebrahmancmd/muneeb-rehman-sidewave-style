"use client";

import { useEffect, useRef, useState } from "react";

/** Non-interactive, scaled iframe of a live site. Loads only when near the viewport. */
export default function LivePreview({ host, className = "" }: { host: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState({ s: 0.25, vw: 1280, h: 800 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const vw = w < 700 ? 420 : 1280;
      const s = w / vw;
      setScale({ s, vw, h: Math.ceil(h / s) });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSrc(`https://${host}/`);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [host]);

  return (
    <div ref={box} className={`live-preview ${className}`}>
      <div className="live-preview-ph" style={{ opacity: ready ? 0 : 1 }}>{host}</div>
      {src && (
        <iframe
          src={src}
          title={`Live preview: ${host}`}
          tabIndex={-1}
          aria-hidden
          referrerPolicy="no-referrer"
          onLoad={() => setReady(true)}
          style={{
            width: scale.vw,
            height: scale.h,
            transform: `scale(${scale.s})`,
            opacity: ready ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
