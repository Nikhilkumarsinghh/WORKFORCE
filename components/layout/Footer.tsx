"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ADDRESS, COMPANY, EMAIL, WHATSAPP } from "../../lib/site";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "What we do", links: [["Recruitment", "/services/recruitment"], ["Industrial staffing", "/services/staffing"], ["Engineering hiring", "/services/engineering-hiring"], ["Blue-collar recruitment", "/services/blue-collar-recruitment"], ["Security services", "/services/security"], ["All services", "/services"]] },
  { title: "Industries & roles", links: [["Manufacturing", "/industries/manufacturing"], ["Logistics", "/industries/logistics"], ["Warehouse", "/industries/warehouse"], ["All industries", "/industries"], ["Roles we hire for", "/roles"], ["Locations", "/locations"]] },
  { title: "For candidates", links: [["Register for jobs", "/candidates#register"], ["Find jobs", "/jobs"], ["10th & 12th pass jobs", "/candidates/10th-pass-jobs"], ["ITI & diploma jobs", "/candidates/iti-diploma-jobs"], ["Fresher jobs", "/candidates/fresher-jobs"], ["Avoid job scams", "/candidates/avoid-job-scams"]] },
  { title: "Who we are", links: [["About UniqueToo", "/about"], ["Vision & values", "/about/vision"], ["Trust & compliance", "/trust"], ["Campus placement", "/campus-hiring"], ["Insights", "/blog"], ["Join our team", "/join-us"]] },
];

export default function Footer() {
  const openCookieSettings = () => window.dispatchEvent(new Event("ut:open-cookie-settings"));
  return (
    <footer className="wf-footer">
      <div className="wf-shell">
        <div className="wf-foot-top">
          <h2>Hiring people, or looking for work? Let&apos;s start the conversation.</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowUpRight size={16} /></Link>
            <Link href="/candidates#register" className="wf-btn wf-btn-outline-light">Register for jobs</Link>
          </div>
        </div>
        <div className="wf-foot-grid">
          <div className="wf-foot-brand">
            <Link href="/" aria-label="UniqueToo home"><Image src="/logo-footer.svg" alt="UniqueToo" width={200} height={48} /></Link>
            <p>Workforce and recruitment solutions for employers, colleges and candidates across India: skilled, semi-skilled and entry-level.</p>
            <div className="wf-foot-contact">
              <span><MapPin size={16} aria-hidden="true" />{ADDRESS}</span>
              <a href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true" />{EMAIL}</a>
            </div>
            <p style={{ marginTop: 16 }}><a className="wf-wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat with UniqueToo on WhatsApp"><SiWhatsapp size={22} aria-hidden="true" /></a></p>
          </div>
          {cols.map((c) => (
            <div className="wf-foot-col" key={c.title}>
              <h3>{c.title}</h3>
              <ul>{c.links.map(([l, h]) => <li key={h + l}><Link href={h}>{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="wf-foot-bottom">
          <span>© {new Date().getFullYear()} {COMPANY} All rights reserved.</span>
          <nav aria-label="Legal links">
            <Link href="/faq">FAQ</Link>
            <Link href="/site-map">Site map</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
            <Link href="/accessibility">Accessibility</Link>
            <button type="button" onClick={openCookieSettings}>Cookie settings</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
