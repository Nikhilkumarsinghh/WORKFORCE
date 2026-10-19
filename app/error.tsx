"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("UniqueToo page error", error); }, [error]);
  return (
    <main style={{ minHeight: "68vh", display: "grid", placeItems: "center", background: "#f7f9fc", padding: "100px 24px" }}>
      <section style={{ width: "min(680px,100%)", textAlign: "center" }}>
        <span style={{ color: "#176B87", fontSize: 11, fontWeight: 900, letterSpacing: ".18em" }}>TEMPORARY ERROR</span>
        <h1 style={{ margin: "15px 0 12px", fontSize: "clamp(40px,6vw,64px)", lineHeight: 1, letterSpacing: "-.045em", color: "#07111f" }}>Something didn&apos;t load correctly.</h1>
        <p style={{ color: "#667085", lineHeight: 1.7, fontSize: 14, marginBottom: 25 }}>Please try the page again. Your navigation and enquiry data are not affected by this screen.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <button onClick={() => reset()} style={{ border: 0, background: "#176B87", color: "#fff", padding: "12px 18px", borderRadius: 6, fontWeight: 800, cursor: "pointer" }}>Try again</button>
          <Link href="/" style={{ border: "1px solid #dfe5ee", background: "#fff", color: "#07111f", padding: "12px 18px", borderRadius: 6, fontWeight: 800 }}>Go home</Link>
        </div>
      </section>
    </main>
  );
}
