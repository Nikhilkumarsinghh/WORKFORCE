"use client";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Cookie, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ut-cookie-consent";
type Preferences = { necessary: true; analytics: boolean; marketing: boolean };

const defaults: Preferences = { necessary: true, analytics: false, marketing: false };

function readPreferences(): Preferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { necessary: true, analytics: Boolean(parsed.analytics), marketing: Boolean(parsed.marketing) };
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(defaults);

  useEffect(() => {
    const saved = readPreferences();
    if (saved) {
      setPrefs(saved);
      setVisible(false);
    } else {
      setVisible(true);
    }

    const openSettings = () => {
      const current = readPreferences();
      if (current) setPrefs(current);
      setPreferencesOpen(true);
      setVisible(true);
    };
    window.addEventListener("ut:open-cookie-settings", openSettings);
    return () => window.removeEventListener("ut:open-cookie-settings", openSettings);
  }, []);

  function save(next: Preferences) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Preferences still apply for the current page if storage is blocked. */ }
    setPrefs(next);
    setVisible(false);
    setPreferencesOpen(false);
    window.dispatchEvent(new Event("ut:cookie-preferences-changed"));
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="cookie-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => preferencesOpen && setPreferencesOpen(false)}
          />

          <motion.section
            className="cookie-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 35 }}
            transition={{ duration: 0.18 }}
          >
            {!preferencesOpen ? (
              <div className="cookie-content">
                <div className="cookie-icon"><Cookie size={21} /></div>
                <div className="cookie-copy">
                  <h2 id="cookie-title">Your privacy matters.</h2>
                  <p>We use essential cookies to keep UniqueToo working. Optional analytics and advertising technologies are only enabled where configured and after your choice. You can change your preference anytime from the footer.</p>
                  <Link href="/privacy-policy">Read our Privacy Policy</Link>
                </div>
                <div className="cookie-actions">
                  <button className="cookie-secondary" onClick={() => setPreferencesOpen(true)}><Settings size={15} /> Preferences</button>
                  <button className="cookie-secondary" onClick={() => save({ ...defaults })}>Reject optional</button>
                  <button className="cookie-primary" onClick={() => save({ necessary: true, analytics: true, marketing: true })}><Check size={15} /> Accept all</button>
                </div>
              </div>
            ) : (
              <div className="cookie-preferences">
                <div className="cookie-preferences-head">
                  <div>
                    <span className="cookie-eyebrow">PRIVACY CONTROL</span>
                    <h2>Cookie preferences</h2>
                  </div>
                  <button className="cookie-close" onClick={() => { setPreferencesOpen(false); setVisible(!readPreferences()); }} aria-label="Close cookie preferences"><X size={18} /></button>
                </div>

                <div className="cookie-options">
                  <CookieOption title="Strictly necessary" description="Required for navigation, security and core website functions." locked checked />
                  <CookieOption title="Analytics" description="Helps us understand website usage and improve performance." checked={prefs.analytics} onToggle={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))} />
                  <CookieOption title="Marketing & advertising" description="Allows optional advertising technologies, including Google AdSense where configured, on eligible content pages." checked={prefs.marketing} onToggle={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))} />
                </div>

                <div className="cookie-preferences-actions">
                  <button className="cookie-secondary" onClick={() => save(defaults)}>Reject optional</button>
                  <button className="cookie-primary" onClick={() => save(prefs)}>Save preferences</button>
                  <button className="cookie-primary" onClick={() => save({ necessary: true, analytics: true, marketing: true })}>Accept all</button>
                </div>
              </div>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}

function CookieOption({ title, description, checked, locked, onToggle }: { title: string; description: string; checked: boolean; locked?: boolean; onToggle?: () => void }) {
  return (
    <div className="cookie-option">
      <div><strong>{title}</strong><p>{description}</p></div>
      {locked ? <span className="cookie-locked">Always on</span> : <button className={`cookie-toggle ${checked ? "active" : ""}`} onClick={onToggle} aria-label={`${title} cookies ${checked ? "on" : "off"}`} aria-pressed={checked}><span /></button>}
    </div>
  );
}
