import { notifyOwner } from "./notify";

export async function sendQuoteEmail(d: { name: string; email: string; phone: string; company?: string; workers: string; message: string; service?: string; industry?: string }) {
  return notifyOwner({ subject: `Quote request: ${d.service || d.industry || "General"} — ${d.name}`, title: "New quote request", kind: "Quote", replyTo: d.email, phone: d.phone, fields: { Name: d.name, Phone: d.phone, Email: d.email, Company: d.company, Workers: d.workers, Requirement: d.message } });
}
export async function sendContactEmail(d: { name: string; email: string; phone: string; company?: string; subject: string; message: string; type: string }) {
  return notifyOwner({ subject: `${d.type}: ${d.subject} — ${d.name}`, title: d.subject, kind: d.type, replyTo: d.email, phone: d.phone, fields: { Name: d.name, Phone: d.phone, Email: d.email, Company: d.company, Message: d.message } });
}
export async function sendApplyEmail(d: { name: string; email: string; phone: string; jobTitle: string; experience: string; location: string; education?: string; message?: string; resumeFile?: string }) {
  return notifyOwner({ subject: `Candidate: ${d.jobTitle} — ${d.name}`, title: d.jobTitle, kind: "Candidate profile / application", replyTo: d.email || undefined, phone: d.phone, fields: { Name: d.name, Phone: d.phone, Email: d.email, Location: d.location, Education: d.education, Experience: d.experience, Details: d.message, Resume: d.resumeFile || "Not uploaded" } });
}
export async function sendLeadEmail(d: { source: string; message: string; reply?: string }) {
  return notifyOwner({ subject: `Chat lead: ${d.message.slice(0, 60)}`, title: "Website assistant conversation", kind: d.source, fields: { Message: d.message, Reply: d.reply } });
}
