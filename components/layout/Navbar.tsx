"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "../../lib/content/services";
import { INDUSTRIES } from "../../lib/content/industries";

type L = [label: string, href: string];
const services: L[] = SERVICES.map((s) => [s.title, `/services/${s.slug}`]);
const industries: L[] = INDUSTRIES.map((i) => [i.title, `/industries/${i.slug}`]);
const roles: L[] = [["All roles we hire for", "/roles"], ["Production operator", "/roles/production-operator"], ["CNC / VMC operator", "/roles/cnc-operator"], ["Security guard", "/roles/security-guard"], ["Warehouse associate", "/roles/warehouse-associate"], ["Housekeeping attendant", "/roles/housekeeping-attendant"], ["Graduate engineer trainee", "/roles/graduate-engineer-trainee"], ["Customer support executive", "/roles/customer-support-executive"], ["Locations we serve", "/locations"]];
const getStarted: L[] = [["Register your profile", "/candidates#register"], ["Find jobs", "/jobs"], ["All candidate guides", "/candidates"]];
const guides: L[] = [["10th pass jobs", "/candidates/10th-pass-jobs"], ["12th pass jobs", "/candidates/12th-pass-jobs"], ["ITI & diploma jobs", "/candidates/iti-diploma-jobs"], ["Fresher jobs", "/candidates/fresher-jobs"], ["Security & housekeeping jobs", "/candidates/security-housekeeping-jobs"], ["Avoid job scams", "/candidates/avoid-job-scams"]];
const company: L[] = [["About UniqueToo", "/about"], ["Vision, mission & values", "/about/vision"], ["Trust & compliance", "/trust"], ["Locations", "/locations"], ["Join our team", "/join-us"], ["FAQ", "/faq"]];

const TABS = [
  { id: "services", label: "Services", items: services, all: ["All services", "/services"] as L },
  { id: "industries", label: "Industries", items: industries, all: ["All industries", "/industries"] as L },
  { id: "roles", label: "Roles & locations", items: roles, all: ["Hiring requirement", "/employers#requirement"] as L },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("services");
  const [mobile, setMobile] = useState(false);
  const timer = useRef<number | null>(null);

  const hold = (id: string) => { if (timer.current) window.clearTimeout(timer.current); setOpen(id); };
  const release = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 140); };

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [mobile]);

  const on = (...b: string[]) => b.some((x) => pathname === x || pathname.startsWith(`${x}/`));
  const cur = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <a href="#main" className="wf-skip">Skip to main content</a>
      <div id="wf-progress" className="wf-progress" aria-hidden="true" />
      <header className="wf-header" onMouseLeave={release}>
        <div className="wf-shell wf-header-inner">
          <Link href="/" className="wf-brand" aria-label="UniqueToo home"><Image src="/logo.svg" alt="UniqueToo" width={190} height={46} priority /></Link>

          <nav className="wf-nav" aria-label="Primary">
            <ul>
              <li onMouseEnter={() => hold("what")}>
                <button type="button" className={`wf-nav-link ${on("/services", "/industries", "/roles") ? "active" : ""}`} aria-expanded={open === "what"} onClick={() => setOpen(open === "what" ? null : "what")}>What we do <ChevronDown size={15} aria-hidden="true" /></button>
              </li>
              <li onMouseEnter={() => hold("cand")}>
                <button type="button" className={`wf-nav-link ${on("/candidates", "/jobs") ? "active" : ""}`} aria-expanded={open === "cand"} onClick={() => setOpen(open === "cand" ? null : "cand")}>For candidates <ChevronDown size={15} aria-hidden="true" /></button>
              </li>
              <li onMouseEnter={() => setOpen(null)}><Link href="/campus-hiring" className={`wf-nav-link ${on("/campus-hiring") ? "active" : ""}`}>Campus placement</Link></li>
              <li onMouseEnter={() => setOpen(null)}><Link href="/blog" className={`wf-nav-link ${on("/blog", "/resources") ? "active" : ""}`}>Insights</Link></li>
              <li onMouseEnter={() => hold("who")}>
                <button type="button" className={`wf-nav-link ${on("/about", "/trust", "/join-us", "/locations", "/faq") ? "active" : ""}`} aria-expanded={open === "who"} onClick={() => setOpen(open === "who" ? null : "who")}>Who we are <ChevronDown size={15} aria-hidden="true" /></button>
              </li>
            </ul>
          </nav>

          <div className="wf-actions">
            <Link href="/employers#requirement" className="wf-signin">Hire talent</Link>
            <Link href="/contact" className="wf-btn wf-btn-primary">Contact us <ArrowRight size={16} aria-hidden="true" /></Link>
            <button type="button" className="wf-burger" aria-label="Open menu" aria-expanded={mobile} aria-controls="wf-mobile" onClick={() => setMobile(true)}><Menu size={22} /></button>
          </div>
        </div>

        {/* Mega panels */}
        <div className={`wf-mega ${open === "what" ? "open" : ""}`} onMouseEnter={() => hold("what")} aria-hidden={open !== "what"}>
          <div className="wf-shell wf-mega-grid">
            <div className="wf-mega-intro">
              <span className="wf-eyebrow">What we do</span>
              <h2>Workforce solutions for every skill level.</h2>
              <p>Recruitment, staffing and campus placement for employers, with pathways for skilled and non-skilled candidates.</p>
              <Link href="/employers#requirement" className="wf-btn wf-btn-primary">Post a requirement <ArrowRight size={16} /></Link>
            </div>
            <div className="wf-mega-tabs" role="tablist" aria-label="Browse">
              {TABS.map((t) => <button key={t.id} role="tab" aria-selected={tab === t.id} onMouseEnter={() => setTab(t.id)} onFocus={() => setTab(t.id)} onClick={() => setTab(t.id)}>{t.label}<ArrowRight size={15} aria-hidden="true" /></button>)}
            </div>
            <div className="wf-mega-list" role="tabpanel">
              <ul>{cur.items.map(([l, h]) => <li key={h}><Link href={h} tabIndex={open === "what" ? 0 : -1}>{l}</Link></li>)}</ul>
              <Link href={cur.all[1]} className="wf-link" tabIndex={open === "what" ? 0 : -1}>{cur.all[0]} <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>

        <div className={`wf-mega ${open === "cand" ? "open" : ""}`} onMouseEnter={() => hold("cand")} aria-hidden={open !== "cand"}>
          <div className="wf-shell wf-mega-grid cand">
            <div className="wf-mega-intro">
              <span className="wf-eyebrow">For candidates</span>
              <h2>Work for everyone, not only the highly skilled.</h2>
              <p>Register once. Skilled, semi-skilled, non-skilled or fresher: we match you to employer requirements.</p>
              <Link href="/candidates#register" className="wf-btn wf-btn-primary">Register for jobs <ArrowRight size={16} /></Link>
            </div>
            <div className="wf-mega-list"><h3>Get started</h3><ul>{getStarted.map(([l, h]) => <li key={h}><Link href={h} tabIndex={open === "cand" ? 0 : -1}>{l}</Link></li>)}</ul></div>
            <div className="wf-mega-list"><h3>Guides by qualification</h3><ul>{guides.map(([l, h]) => <li key={h}><Link href={h} tabIndex={open === "cand" ? 0 : -1}>{l}</Link></li>)}</ul></div>
          </div>
        </div>

        <div className={`wf-mega ${open === "who" ? "open" : ""}`} onMouseEnter={() => hold("who")} aria-hidden={open !== "who"}>
          <div className="wf-shell wf-mega-grid cand">
            <div className="wf-mega-intro">
              <span className="wf-eyebrow">Who we are</span>
              <h2>A people-first workforce company.</h2>
              <p>Learn about our vision, how we work and the standards we hold ourselves to.</p>
              <Link href="/about" className="wf-btn wf-btn-primary">About UniqueToo <ArrowRight size={16} /></Link>
            </div>
            <div className="wf-mega-list"><h3>Company</h3><ul>{company.slice(0, 3).map(([l, h]) => <li key={h}><Link href={h} tabIndex={open === "who" ? 0 : -1}>{l}</Link></li>)}</ul></div>
            <div className="wf-mega-list"><h3>Explore</h3><ul>{company.slice(3).map(([l, h]) => <li key={h}><Link href={h} tabIndex={open === "who" ? 0 : -1}>{l}</Link></li>)}</ul></div>
          </div>
        </div>
      </header>
      <div className={`wf-scrim ${open ? "show" : ""}`} onClick={() => setOpen(null)} aria-hidden="true" />

      <div id="wf-mobile" className={`wf-mobile ${mobile ? "open" : ""}`} aria-hidden={!mobile} {...(!mobile ? { inert: true } : {})}>
        <div className="wf-mobile-top">
          <Link href="/" aria-label="UniqueToo home"><Image src="/logo.svg" alt="UniqueToo" width={160} height={39} /></Link>
          <button type="button" className="wf-burger" style={{ display: "grid" }} aria-label="Close menu" onClick={() => setMobile(false)}><X size={22} /></button>
        </div>
        <nav aria-label="Mobile">
          <details><summary>What we do<ChevronDown size={18} aria-hidden="true" /></summary>
            <strong className="wf-m-h">Services</strong>{services.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
            <strong className="wf-m-h">Industries</strong>{industries.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
            <Link href="/roles">Roles we hire for</Link><Link href="/locations">Locations</Link>
          </details>
          <details><summary>For candidates<ChevronDown size={18} aria-hidden="true" /></summary>{[...getStarted, ...guides].map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}</details>
          <Link href="/campus-hiring" className="wf-m-link">Campus placement</Link>
          <Link href="/blog" className="wf-m-link">Insights</Link>
          <details><summary>Who we are<ChevronDown size={18} aria-hidden="true" /></summary>{company.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}</details>
          <Link href="/contact" className="wf-m-link">Contact us</Link>
        </nav>
        <div className="wf-mobile-cta">
          <Link href="/candidates#register" className="wf-btn wf-btn-primary">Register for jobs</Link>
          <Link href="/employers#requirement" className="wf-btn wf-btn-ghost">Post a hiring requirement</Link>
        </div>
      </div>
    </>
  );
}
