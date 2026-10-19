import Link from "next/link";
import { Crumbs } from "./blocks";

export default function Legal({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: { title: string; content: string }[] }) {
  return (
    <main id="main">
      <section className="wf-page-hero"><div className="wf-shell">
        <Crumbs items={[["Legal"], [title]]} /><span className="wf-eyebrow">Legal</span><h1>{title}</h1>
        <p className="wf-lead">{intro}</p><p style={{ color: "var(--wf-body)", fontSize: 14, marginTop: 12 }}>Last updated: {updated}</p>
      </div></section>
      <section className="wf-section"><div className="wf-shell wf-split">
        <article className="wf-prose" style={{ maxWidth: "none" }}>
          {sections.map((s) => <div key={s.title}><h2>{s.title}</h2><p style={{ whiteSpace: "pre-line" }}>{s.content}</p></div>)}
        </article>
        <aside className="wf-aside"><div className="wf-aside-card"><h3>Related</h3><ul className="wf-aside-links">
          {[["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookie-policy"], ["Accessibility", "/accessibility"], ["Contact us", "/contact"]].map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}
        </ul></div></aside>
      </div></section>
    </main>
  );
}
