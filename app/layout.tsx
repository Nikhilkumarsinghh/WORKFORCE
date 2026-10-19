import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./workforce.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LeadCaptureProvider from "../components/common/LeadCaptureProvider";
import SiteEffects from "../components/wf/SiteEffects";
import LazyWidgets from "../components/wf/LazyWidgets";
import { COMPANY, EMAIL, SITE_URL } from "../lib/site";

const TITLE = "UniqueToo | Recruitment, Staffing & Campus Placement in India";
const DESC = "Recruitment, industrial staffing, engineering hiring and campus placement across India. Register for jobs (skilled, semi-skilled, non-skilled and freshers) or post a hiring requirement.";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#07111f" };

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s | UniqueToo" },
  description: DESC,
  applicationName: "UniqueToo",
  keywords: ["recruitment agency India", "manpower agency Pune", "industrial staffing", "campus placement", "jobs for 10th pass", "ITI jobs", "diploma jobs", "fresher jobs", "security guard jobs", "engineering hiring", "contract staffing India"],
  authors: [{ name: COMPANY }], creator: COMPANY, publisher: COMPANY,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, siteName: "UniqueToo", locale: "en_IN", type: "website", url: "/", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UniqueToo: recruitment, staffing and campus placement" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/apple-icon.png" },
  manifest: "/manifest.json",
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "EmploymentAgency", "@id": `${SITE_URL}/#organization`, name: COMPANY, alternateName: "UniqueToo", url: SITE_URL, logo: `${SITE_URL}/logo.svg`, image: `${SITE_URL}/og-image.png`, email: EMAIL, telephone: "+91-99753-15002", description: "Recruitment, industrial staffing, engineering hiring and campus placement for employers and candidates across India.", address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", postalCode: "412105", addressCountry: "IN" }, areaServed: { "@type": "Country", name: "India" }, knowsAbout: ["Recruitment", "Industrial staffing", "Campus placement", "Engineering hiring", "Blue-collar hiring"] },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "UniqueToo", publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en-IN" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const validAdsense = adsense && /^ca-pub-\d+$/.test(adsense);
  return (
    <html lang="en-IN" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('wf-js')" }} />
        {validAdsense ? <meta name="google-adsense-account" content={adsense} /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <LeadCaptureProvider>{children}</LeadCaptureProvider>
        <Footer />
        <SiteEffects />
        <LazyWidgets />
      </body>
    </html>
  );
}
