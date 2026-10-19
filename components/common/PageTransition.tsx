"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route UX helper only.
 * Navigation itself is intentionally left to Next.js <Link>/<a>.
 * We do not intercept clicks or insert artificial loading screens.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <div className="page-transition" data-route={pathname}>{children}</div>;
}
