import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import ContactHub from "../../components/wf/ContactHub";
import { PageHero } from "../../components/wf/blocks";
import { ADDRESS, EMAIL, WHATSAPP } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact Us: Hire Talent or Find a Job",
  description: "Contact UniqueToo Workforce in Pune to hire talent, make a job enquiry, partner as a college or write to us about anything else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact UniqueToo", url: "https://uniquetoo.in/contact" }) }} />
      <PageHero crumbs={[["Contact"]]} eyebrow="Contact" title={<>What&apos;s on <em>your mind?</em></>} text="We're here to help. Tell us what you're looking for and we'll connect you with the right people." />
      <section className="wf-section"><div className="wf-shell wf-form-wrap" style={{ gridTemplateColumns: "1.5fr .7fr" }}>
        <div data-reveal=""><ContactHub /></div>
        <aside className="wf-side" data-reveal="right">
          <div className="wf-info"><MapPin size={22} /><div><strong>Registered office</strong><span>{ADDRESS}</span><div style={{ marginTop: 6 }}><a className="wf-link" href="https://www.google.com/maps/search/?api=1&query=Chimbli+Pune+412105" target="_blank" rel="noopener noreferrer">Open in Maps <ArrowUpRight size={15} /></a></div></div></div>
          <div className="wf-info"><Mail size={22} /><div><strong>Email</strong><span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div></div>
          <div className="wf-info"><MessageCircle size={22} /><div><strong>WhatsApp</strong><span><a className="wf-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat with us <ArrowUpRight size={15} /></a></span></div></div>
          <div className="wf-note"><span>Never pay anyone for a job. If someone asks for money in UniqueToo&apos;s name, <Link href="/candidates/avoid-job-scams" className="wf-link">read this</Link> and email us.</span></div>
        </aside>
      </div></section>
    </main>
  );
}
