import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Workforce, Technology & Business Context",
  description: "Explore UniqueToo industry practices across manufacturing, engineering, logistics, construction, hospitality, healthcare, automotive, education and more.",
  openGraph: {
    title: "UniqueToo Industries | Context-led workforce and technology",
    description: "Industry practices built around people, process, technology and operating context.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UniqueToo industries" }],
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
