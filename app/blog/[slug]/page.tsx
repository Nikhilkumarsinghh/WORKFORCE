import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { WORKFORCE_POSTS, getPostBySlug } from "../../../data/blog-posts";
import { Crumbs, Related, crumbLd } from "../../../components/wf/blocks";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => WORKFORCE_POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.excerpt, type: "article", url: `/blog/${post.slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const related = WORKFORCE_POSTS.filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.cat === post.cat) - Number(a.cat === post.cat)).slice(0, 3);
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, author: { "@type": "Organization", name: "UniqueToo Editorial Team" }, publisher: { "@type": "Organization", name: "UniqueToo Workforce Pvt. Ltd.", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } }, mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`, articleSection: post.cat },
    crumbLd(SITE_URL, [{ name: "Home", path: "" }, { name: "Insights", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
  ];
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wf-page-hero"><div className="wf-shell" style={{ maxWidth: 900 }}>
        <Crumbs items={[["Insights", "/blog"], [post.cat]]} /><span className="wf-eyebrow">{post.cat}</span><h1 style={{ fontSize: "clamp(30px,4.4vw,52px)" }}>{post.title}</h1>
        <p style={{ color: "var(--wf-body)", marginTop: 16, fontSize: 14.5 }}>{post.author} · {post.date} · {post.readingTime}</p>
      </div></section>
      <section className="wf-section"><div className="wf-shell wf-split">
        <article className="wf-prose" style={{ maxWidth: "none" }}>
          {post.body.map((p, i) => <p key={i} style={{ marginBottom: 22 }}>{p}</p>)}
          {post.takeaways?.length > 0 && <div className="wf-aside-card" style={{ marginTop: 36 }}><h3>Key takeaways</h3><ul className="wf-list">{post.takeaways.map((t) => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}</ul></div>}
        </article>
        <aside className="wf-aside">
          <div className="wf-aside-card dark"><h3>Need help with this?</h3><p>Talk to our team about hiring or register your profile.</p><Link href="/contact" className="wf-btn wf-btn-light">Contact us <ArrowRight size={16} /></Link></div>
          <div className="wf-aside-card"><h3>Explore</h3><ul className="wf-aside-links">{[["Our services", "/services"], ["Roles we hire for", "/roles"], ["Candidate guides", "/candidates"], ["Campus placement", "/campus-hiring"]].map(([l, h]) => <li key={h}><Link href={h}>{l}<ArrowRight size={15} /></Link></li>)}</ul></div>
        </aside>
      </div></section>
      <Related eyebrow="Keep reading" title="Related guides" items={related.map((r) => ({ href: `/blog/${r.slug}`, kicker: r.cat, title: r.title, text: r.excerpt }))} />
    </main>
  );
}
