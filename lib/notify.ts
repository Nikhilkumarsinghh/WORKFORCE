import nodemailer from "nodemailer";

/** Every form on the site ends here: one email to the owner's inbox. */
export const NOTIFY_TO = process.env.NOTIFY_EMAIL || "nikhilkauriya04@gmail.com";
const USER = process.env.GMAIL_USER || "";
const PASS = process.env.GMAIL_APP_PASSWORD || "";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://uniquetoo.in";

const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type Notice = { subject: string; title: string; kind: string; fields: Record<string, string | undefined>; replyTo?: string; phone?: string };

function html(n: Notice) {
  const rows = Object.entries(n.fields).filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:9px 14px 9px 0;border-bottom:1px solid #eef2f4;color:#5b6b78;font-size:12px;width:130px;vertical-align:top">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #eef2f4;color:#0b1b2b;font-size:14px;white-space:pre-wrap">${esc(v)}</td></tr>`).join("");
  const wa = n.phone ? `https://wa.me/91${n.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent("Hi, thank you for contacting UniqueToo.")}` : "";
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #dbe6ea;border-radius:14px;overflow:hidden"><div style="background:#07111f;padding:22px 26px"><div style="color:#79b7c7;font-size:11px;letter-spacing:.14em;text-transform:uppercase">${esc(n.kind)}</div><h2 style="color:#fff;margin:6px 0 0;font-size:20px">${esc(n.title)}</h2></div><div style="padding:22px 26px"><table style="width:100%;border-collapse:collapse">${rows}</table>${wa ? `<p style="margin:22px 0 0"><a href="${wa}" style="background:#176b87;color:#fff;padding:11px 20px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:700">Reply on WhatsApp</a></p>` : ""}<p style="color:#8a98a4;font-size:12px;margin:22px 0 0">Sent from ${esc(SITE)} · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p></div></div>`;
}

async function viaSmtp(n: Notice) {
  if (!USER || !PASS || PASS === "your_app_password_here") return false;
  try {
    const t = nodemailer.createTransport({ service: "gmail", auth: { user: USER, pass: PASS } });
    await t.sendMail({ from: `"UniqueToo Website" <${USER}>`, to: NOTIFY_TO, replyTo: n.replyTo || undefined, subject: n.subject.replace(/[\r\n]/g, " ").slice(0, 180), html: html(n) });
    return true;
  } catch (e) { console.error("SMTP notify failed", e); return false; }
}

/** No-password fallback: FormSubmit relays the form to the owner's inbox (first use needs a one-time activation click). */
async function viaFormSubmit(n: Notice) {
  try {
    const body: Record<string, string> = { _subject: n.subject.slice(0, 180), _template: "table", _captcha: "false", Type: n.kind, ...Object.fromEntries(Object.entries(n.fields).filter(([, v]) => v).map(([k, v]) => [k, String(v)])) };
    if (n.replyTo) body._replyto = n.replyTo;
    const r = await fetch(`${process.env.FORMSUBMIT_ENDPOINT || "https://formsubmit.co/ajax"}/${encodeURIComponent(NOTIFY_TO)}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Origin: SITE, Referer: SITE + "/" }, body: JSON.stringify(body), signal: AbortSignal.timeout(12000) });
    if (!r.ok) return false;
    const d = await r.json().catch(() => ({}));
    return d.success === true || d.success === "true";
  } catch (e) { console.error("FormSubmit notify failed", e); return false; }
}

export async function notifyOwner(n: Notice): Promise<boolean> {
  if (await viaSmtp(n)) return true;
  return viaFormSubmit(n);
}
