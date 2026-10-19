import type { Metadata } from "next";
import Legal from "../../components/wf/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How UniqueToo collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  const sections = [
    { title: "1. Information We Collect", content: `We collect information that you submit through the website, such as your name, email address, phone number, company, location, enquiry details and application details. If an upload field is enabled on a form, the file and its related metadata may also be collected. Basic technical data may be processed to operate the site, prevent abuse and diagnose errors. We collect form information when you voluntarily provide it.` },
    { title: "2. How We Use Your Information", content: `We use submitted information to respond to enquiries, review and manage applications that you submit, understand workforce or technology requirements, communicate about a request, operate and secure the website, and meet legal obligations. We do not sell personal information.` },
    { title: "3. Data Sharing", content: `We may share information with a potential employer when you apply for a role or clearly agree to that sharing, with service providers that help operate the website or handle communications, and with legal authorities where required by law. We limit sharing to the purpose and information reasonably needed for the relevant activity, subject to applicable legal and contractual requirements.` },
    { title: "4. Cookies", content: `Essential storage is used for core website preferences and security. Optional analytics and advertising technologies are only enabled where configured and after the visitor chooses the relevant optional consent. You can manage your choices through the Cookie Consent controls and your browser settings; disabling some storage may affect optional features.` },
    { title: "5. Advertising & Google AdSense", content: `If advertising is enabled on uniquetoo.in, third-party advertising vendors, including Google, may place and read cookies or use web beacons, IP addresses or similar identifiers to serve, personalise where permitted, and measure ads. Optional advertising scripts are configured to wait for the visitor's marketing consent choice on eligible editorial and resource pages. The advertising setup and any personalised ads remain subject to the vendor's policies and applicable consent requirements. Read how Google uses data when you use its partners' sites or apps, and manage personalised advertising choices through Google Ads Settings.` },
    { title: "6. Data Security", content: `We use reasonable technical and organisational measures to protect information, including access controls and encrypted transport where configured. No internet transmission or storage system can be guaranteed completely secure. Please protect your account credentials and avoid sending unnecessary sensitive information through general enquiry forms.` },
    { title: "7. Data Retention", content: `We retain information only for as long as reasonably needed for the purpose it was collected, service delivery, security, legal obligations and dispute resolution. Retention periods can differ by record type and may depend on the status of an application or business engagement. You can request access, correction or deletion by emailing contact@uniquetoo.in; some records may need to be retained where the law requires it.` },
    { title: "8. Your Rights", content: `You have the right to:\n\n• Access your personal data we hold\n• Correct inaccurate data\n• Request deletion of your data\n• Withdraw consent for marketing communications\n• File a complaint with a regulatory authority\n\nTo exercise these rights, contact us at contact@uniquetoo.in.` },
    { title: "9. Third-Party Links", content: `Our website may contain links to third-party sites (LinkedIn, WhatsApp, etc.). We are not responsible for their privacy practices. Please review their privacy policies separately.` },
    { title: "10. Children's Privacy", content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with information, please contact us immediately.` },
    { title: "11. Changes to This Policy", content: `We may update this Privacy Policy periodically. We will notify you of significant changes by posting a notice on our website. The "Last Updated" date at the bottom reflects the most recent revision.` },
    { title: "12. Contact Us", content: `For any privacy-related queries or to exercise your rights:\n\nUnique Too Workforce Pvt. Ltd.\n Chimbli, Pune -412105 Maharashtra\nIndia\n\nEmail: contact@uniquetoo.in\nPhone: +91 9975315002\nWorking Hours: Monday – Friday, 9:00 AM – 6:00 PM IST` },
  ];
  return <Legal title="Privacy Policy" updated="October 14, 2026" intro="How UniqueToo collects, uses and protects your personal information." sections={sections} />;
}
