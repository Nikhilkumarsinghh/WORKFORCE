import type { Metadata } from "next";
import Legal from "../../components/wf/Legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How UniqueToo uses cookies and similar technologies.",
  alternates: { canonical: "/cookie-policy" },
};

const sections = [
    { title: "1. What cookies are", content: "Cookies are small files or similar browser technologies that allow a website to remember information or understand how pages are used. Some are necessary for the site to function; others are optional and depend on the services enabled." },
    { title: "2. How UniqueToo uses them", content: "We may use essential cookies for preferences and security, analytics technologies to understand aggregated site usage, and advertising technologies when advertising is enabled. We do not use cookies as a substitute for a clear privacy notice." },
    { title: "3. Advertising", content: "If Google AdSense or another approved advertising service is enabled, that service may use cookies or similar technologies subject to its own policies and applicable consent requirements. Advertising should remain separate from core business, job and informational content." },
    { title: "4. Your choices", content: "You can manage browser cookie controls and the cookie settings control provided on the website. Disabling some cookies can affect preferences or optional features. Where legally required, optional technologies should not be enabled until the relevant consent flow has been completed." },
    { title: "5. Changes", content: "We may update this policy when our technology or advertising configuration changes. The date on the page should be reviewed before relying on a particular implementation detail." },
    { title: "6. Advertising preferences", content: "If advertising is enabled, Google and other vendors may use cookies, web beacons, IP addresses or similar identifiers to serve and measure ads. Read how Google uses data on partner sites and manage advertising choices through Google Ads Settings. Optional advertising scripts on this site are configured to wait for the marketing consent choice." },
    { title: "7. Contact", content: "Questions about cookies or privacy can be sent to contact@uniquetoo.in.Last updated: 13 October 2026" }
];

export default function Page() {
  return <Legal title="Cookie Policy" updated="October 2026" intro="How UniqueToo uses cookies and similar technologies." sections={sections} />;
}
