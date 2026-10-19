"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AIChatWidget = dynamic(() => import("../common/AIChatWidget"), { ssr: false });
const CookieConsent = dynamic(() => import("../common/CookieConsent"), { ssr: false });
const AdSenseLoader = dynamic(() => import("../common/AdSenseLoader"), { ssr: false });

/** Non-critical widgets load after the page is interactive so they never block first paint. */
export default function LazyWidgets() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) { const id = w.requestIdleCallback(go, { timeout: 2500 }); return () => (window as unknown as { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id); }
    const t = window.setTimeout(go, 1500);
    return () => window.clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (<><CookieConsent /><AIChatWidget /><AdSenseLoader /></>);
}
