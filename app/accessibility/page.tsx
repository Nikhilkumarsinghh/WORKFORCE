import type { Metadata } from "next";
import Legal from "../../components/wf/Legal";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our commitment to making the UniqueToo website usable for everyone.",
  alternates: { canonical: "/accessibility" },
};

const sections = [
    { title: "Design approach", content: "We aim to use readable contrast, keyboard-accessible controls, descriptive labels, responsive layouts, visible focus states and reduced-motion alternatives where practical." },
    { title: "Media and motion", content: "Animations are intended to support orientation rather than hide information. Users who prefer reduced motion should receive a calmer presentation." },
    { title: "Report a problem", content: "If a page, form or interaction creates an accessibility barrier, email contact@uniquetoo.in with the page address and a short description so the team can investigate." }
];

export default function Page() {
  return <Legal title="Accessibility" updated="October 2026" intro="Our commitment to making the UniqueToo website usable for everyone." sections={sections} />;
}
