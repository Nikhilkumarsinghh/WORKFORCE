"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CONSENT_KEY = "ut-cookie-consent";
const SCRIPT_ID = "uniquetoo-adsense-script";

function isContentPage(pathname: string) {
  if (pathname.startsWith("/academy/verify")) return false;
  return /^\/(blog|resources|academy)(\/|$)/.test(pathname);
}

function hasMarketingConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    return Boolean(JSON.parse(raw)?.marketing);
  } catch {
    return false;
  }
}

export default function AdSenseLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
      const eligible = isContentPage(pathname) && hasMarketingConsent() && /^ca-pub-\d+$/.test(client);
      const existing = document.getElementById(SCRIPT_ID);
      if (!eligible) {
        existing?.remove();
        return;
      }
      if (existing) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      document.head.appendChild(script);
    };
    sync();
    window.addEventListener("ut:cookie-preferences-changed", sync);
    return () => window.removeEventListener("ut:cookie-preferences-changed", sync);
  }, [pathname]);

  return null;
}
