import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main style={{ minHeight: "68vh", display: "grid", placeItems: "center", background: "#f7f9fc", padding: "100px 24px" }}>
      <section style={{ width: "min(760px,100%)", textAlign: "center" }}>
        <span style={{ color: "#176B87", fontSize: 11, fontWeight: 900, letterSpacing: ".18em" }}>404 · PAGE NOT FOUND</span>
        <h1 style={{ margin: "16px 0 14px", fontSize: "clamp(48px,8vw,88px)", lineHeight: .95, letterSpacing: "-.05em", color: "#07111f" }}>This page took a wrong turn.</h1>
        <p style={{ margin: "0 auto 28px", maxWidth: 560, color: "#667085", lineHeight: 1.7, fontSize: 15 }}>The link may have changed or the page may no longer exist. Use the main navigation or return to the UniqueToo home page.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 17px", borderRadius: 6, background: "#07111f", color: "#fff", fontWeight: 800, fontSize: 12 }}><ArrowLeft size={15} /> Back home</Link>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 17px", borderRadius: 6, border: "1px solid #dfe5ee", background: "#fff", color: "#07111f", fontWeight: 800, fontSize: 12 }}>Contact UniqueToo <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
