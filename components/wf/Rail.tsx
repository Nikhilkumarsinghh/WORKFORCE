"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * 400, behavior: "smooth" });
  return (
    <div>
      <div className="wf-rail-nav" style={{ justifyContent: "flex-end", marginBottom: 14 }}>
        <button type="button" aria-label={`Previous ${label}`} onClick={() => go(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label={`Next ${label}`} onClick={() => go(1)}><ArrowRight size={18} /></button>
      </div>
      <div className="wf-rail" ref={r} tabIndex={0} role="region" aria-label={label}>{children}</div>
    </div>
  );
}
