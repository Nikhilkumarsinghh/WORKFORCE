import type { Metadata } from "next";
import Legal from "../../components/wf/Legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the UniqueToo website and services.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  const sections = [
    { title: "1. Acceptance of Terms", content: `By accessing or using the Unique Too website (uniquetoo.in) or any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.\n\nThese terms apply to all visitors, job seekers, employers, and partners who access our services.` },
    { title: "2. Description of Services", content: `Unique Too Workforce Pvt. Ltd. provides:\n\n• Workforce staffing and manpower solutions for businesses\n• Job search and application services for job seekers\n• Campus hiring coordination services\n• Security staffing and housekeeping services\n• Recruitment and placement services\n\nWe reserve the right to modify, suspend, or discontinue any service at any time.` },
    { title: "3. User Accounts & Registration", content: `When registering on our platform:\n\n• You must provide accurate and complete information\n• You are responsible for maintaining the confidentiality of your account\n• You must notify us immediately of any unauthorized use\n• One person or entity may not maintain multiple accounts\n• We reserve the right to terminate accounts that violate these terms` },
    { title: "4. For Job Seekers", content: `As a job seeker using our platform:\n\n• You confirm that all information provided in your profile and resume is accurate\n• You consent to us sharing your profile with potential employers when you apply for jobs\n• You agree not to misrepresent your qualifications, experience, or identity\n• You understand that we do not guarantee job placement\n• We charge no fees to job seekers for our job portal services` },
    { title: "5. For Employers & Clients", content: `As an employer or client using our services:\n\n• You agree to the service fees and payment terms agreed in your contract\n• You will provide accurate workforce requirements\n• You will not directly poach or hire workers placed by us outside the agreed terms for a period of 12 months\n• You are responsible for providing safe working conditions for deployed staff\n• You agree to our minimum engagement periods as specified in service agreements` },
    { title: "6. Prohibited Activities", content: `You may not:\n\n• Post false, misleading, or fraudulent information\n• Harass, intimidate, or discriminate against any user\n• Use our platform for any illegal purpose\n• Attempt to gain unauthorized access to our systems\n• Scrape, crawl, or extract data from our platform without permission\n• Use our brand name, logo, or content without written permission\n• Solicit other users for competing services` },
    { title: "7. Intellectual Property", content: `All content on uniquetoo.in — including text, graphics, logos, images, and software — is the property of Unique Too Workforce Pvt. Ltd. and is protected by Indian copyright law.\n\nYou may not copy, reproduce, distribute, or create derivative works without our express written consent.` },
    { title: "8. Limitation of Liability", content: `Unique Too shall not be liable for:\n\n• Any indirect, incidental, or consequential damages\n• Loss of profits or business opportunities\n• Actions or conduct of third-party employers or candidates\n• Technical errors, downtime, or data loss\n• Decisions made based on information provided on our platform\n\nOur total liability to you shall not exceed the fees paid to us in the last 3 months.` },
    { title: "9. Indemnification", content: `You agree to indemnify and hold harmless Unique Too, its directors, employees, and partners from any claims, losses, or damages arising from:\n\n• Your violation of these terms\n• Your misuse of our platform\n• Any content you post or submit\n• Your violation of any applicable laws` },
    { title: "10. Governing Law & Disputes", content: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.\n\nWe encourage you to contact us first to resolve any disputes amicably before pursuing legal action.` },
    { title: "11. Changes to Terms", content: `We may update these Terms of Service at any time. We will notify you of significant changes via email or a website notice. Continued use of our platform after changes constitutes acceptance of the new terms.` },
    { title: "12. Contact", content: `For questions about these terms:\n\nUnique Too Workforce Pvt. Ltd.\nChimbli, Pune -412105 Maharashtra\nIndia\n\nEmail: support@uniquetoo.in\nPhone: +91 9975315002` },
  ];
  return <Legal title="Terms of Service" updated="October 14, 2026 · Effective: October 14, 2026" intro="The terms that apply when you use the UniqueToo website and services." sections={sections} />;
}
