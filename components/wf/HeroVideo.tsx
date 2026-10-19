"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/** Poster paints first (fast LCP); video loads after the page is idle, is skipped on Save-Data / reduced-motion. */
export default function HeroVideo({ poster }: { poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType || "");
    if (slow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pick = () => setSrc(window.innerWidth < 760 ? "/videos/hero-720.mp4" : "/videos/hero-1280.mp4");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (document.readyState === "complete") { w.requestIdleCallback ? w.requestIdleCallback(pick, { timeout: 1500 }) : setTimeout(pick, 600); return; }
    const onLoad = () => (w.requestIdleCallback ? w.requestIdleCallback(pick, { timeout: 1500 }) : setTimeout(pick, 600));
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };

  return (
    <>
      <Image src={poster} alt="" fill priority sizes="100vw" className="wf-vposter" style={{ objectFit: "cover" }} />
      {src && <video ref={ref} src={src} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} />}
      {src && <div className="wf-vctl"><button type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <Pause size={18} /> : <Play size={18} />}</button></div>}
    </>
  );
}
