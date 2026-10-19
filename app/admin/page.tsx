"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Database, LockKeyhole, ShieldCheck, RefreshCw, Mail, BriefcaseBusiness } from "lucide-react";

type AdminLead = { leadId: string; kind: string; name: string; email: string; phone: string; company?: string; subject?: string; message: string; source?: string; createdAt: string };
type AdminApplication = { applicationId: string; name: string; email: string; phone: string; jobTitle: string; jobId?: string; experience: string; education?: string; location: string; message?: string; createdAt: string };
type AdminJob = { id: string; title: string; company: string; category: string; location: string; salary: string; type: string; exp: string; urgent: boolean; qual: string; desc: string; verified: boolean; published: boolean; createdAt: string };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<{ configured: boolean; leads: number; applications: number } | null>(null);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [jobsError, setJobsError] = useState("");
  const [jobsNotice, setJobsNotice] = useState("");
  const [jobSaving, setJobSaving] = useState(false);
  const [jobVerified, setJobVerified] = useState(false);
  const [jobForm, setJobForm] = useState({ title: "", company: "", category: "Engineering", location: "", salary: "", type: "Full-Time", exp: "", qual: "", desc: "", urgent: false, expiresAt: "" });
  const [inboxError, setInboxError] = useState("");
  const [inboxLoading, setInboxLoading] = useState(false);

  useEffect(() => { fetch("/api/admin/session").then(r => r.ok ? r.json() : Promise.reject()).then(() => setAuthenticated(true)).catch(() => setAuthenticated(false)).finally(() => setChecking(false)); }, []);
  useEffect(() => { if (!authenticated) return; void loadAdminData(); }, [authenticated]);

  async function loadAdminData() {
    setInboxLoading(true); setInboxError("");
    try {
      const [statsRes, leadsRes, appsRes, jobsRes] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
        fetch("/api/admin/applications", { cache: "no-store" }),
        fetch("/api/admin/jobs", { cache: "no-store" }),
      ]);
      const [statsData, leadsData, appsData, jobsData] = await Promise.all([statsRes.json(), leadsRes.json(), appsRes.json(), jobsRes.json()]);
      if (statsRes.ok) setStats(statsData); else setStats(null);
      if (!leadsRes.ok || !appsRes.ok) throw new Error(leadsData.error || appsData.error || "Could not load the inbox. Check MongoDB configuration.");
      setLeads(Array.isArray(leadsData.leads) ? leadsData.leads : []);
      setApplications(Array.isArray(appsData.applications) ? appsData.applications : []);
      if (jobsRes.ok) { setJobs(Array.isArray(jobsData.jobs) ? jobsData.jobs : []); setJobsError(""); }
      else { setJobs([]); setJobsError(jobsData.error || "Configure MongoDB to manage live vacancies."); }
    } catch (error) {
      setInboxError(error instanceof Error ? error.message : "Could not load the admin inbox.");
    } finally { setInboxLoading(false); }
  }

  async function createJob(e: React.FormEvent) {
    e.preventDefault(); setJobSaving(true); setJobsError(""); setJobsNotice("");
    try {
      const response = await fetch("/api/admin/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...jobForm, verified: jobVerified, published: jobVerified }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not save the job.");
      setJobsNotice(jobVerified ? "Verified job published." : "Draft saved. Verify the employer and vacancy before publishing.");
      setJobForm({ title: "", company: "", category: "Engineering", location: "", salary: "", type: "Full-Time", exp: "", qual: "", desc: "", urgent: false, expiresAt: "" }); setJobVerified(false);
      await loadAdminData();
    } catch (error) { setJobsError(error instanceof Error ? error.message : "Could not save the job."); }
    finally { setJobSaving(false); }
  }

  async function updateJob(job: AdminJob, action: "verify-publish" | "unpublish" | "delete") {
    if (action === "verify-publish" && !window.confirm(`Confirm that the employer, vacancy, location and compensation for “${job.title}” have been verified before publishing?`)) return;
    if (action === "delete" && !window.confirm(`Delete “${job.title}”? This cannot be undone.`)) return;
    setJobsError(""); setJobsNotice("");
    try {
      const response = action === "delete"
        ? await fetch("/api/admin/jobs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: job.id }) })
        : await fetch("/api/admin/jobs", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: job.id, action }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not update the job.");
      setJobsNotice(action === "delete" ? "Job deleted." : action === "unpublish" ? "Job unpublished." : "Job verified and published.");
      await loadAdminData();
    } catch (error) { setJobsError(error instanceof Error ? error.message : "Could not update the job."); }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await r.json(); if (!r.ok) { setError(data.error || "Unable to sign in."); return; }
    setAuthenticated(true); setPassword("");
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setStats(null); setLeads([]); setApplications([]); setJobs([]); }

  if (checking) return <main className="admin-shell"><div className="admin-loading">Checking secure session…</div></main>;
  if (!authenticated) return <main className="admin-shell"><div className="admin-login"><div className="admin-lock"><LockKeyhole size={22}/></div><p className="premium-kicker">UNIQUE TOO / SECURE CONSOLE</p><h1>Operations access.</h1><p>Administrative data is protected by a server-side session. No password is embedded in the browser.</p><form onSubmit={login}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username" /></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" /></label>{error && <div className="admin-error">{error}</div>}<button className="premium-button primary">Sign in <ArrowRight size={15}/></button></form><small>Production setup requires ADMIN_EMAIL, ADMIN_PASSWORD_HASH and JWT_SECRET.</small></div></main>;

  return <main className="admin-shell"><div className="admin-dashboard"><div className="admin-head"><div><p className="premium-kicker">UNIQUE TOO / OPERATIONS</p><h1>Secure operations console.</h1><p>Lead and application data is stored in MongoDB when <code>MONGODB_URI</code> is configured; local JSON is used only as a development fallback.</p></div><button className="admin-logout" onClick={logout}>Sign out</button></div><div className="admin-cards"><article><Database size={20}/><strong>{stats?.leads ?? 0}</strong><span>Saved enquiries</span></article><article><ShieldCheck size={20}/><strong>{stats?.applications ?? 0}</strong><span>Saved applications</span></article><article><LockKeyhole size={20}/><strong>{stats?.configured ? "MongoDB" : "Local"}</strong><span>Persistence mode</span></article></div><div className="admin-dashboard-actions"><div className="admin-links"><Link href="/jobs">Review public jobs <ArrowRight size={15}/></Link><Link href="/contact">Open contact experience <ArrowRight size={15}/></Link><Link href="/privacy-policy">Review privacy policy <ArrowRight size={15}/></Link><Link href="/sitemap.xml">Open sitemap <ArrowRight size={15}/></Link></div><button className="admin-refresh" onClick={loadAdminData} disabled={inboxLoading}><RefreshCw size={14}/>{inboxLoading ? "Refreshing…" : "Refresh inbox"}</button></div>{inboxError && <div className="admin-inbox-error" role="alert">{inboxError}<p>Production forms require <code>MONGODB_URI</code> and <code>MONGODB_DB</code>. Configure them in your hosting dashboard, redeploy, and refresh this inbox.</p></div>}<section className="admin-inbox"><div className="admin-inbox-head"><div><span>FORM SUBMISSIONS</span><h2>Recent enquiries</h2></div><small>Latest 50 records · admin-only</small></div>{leads.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Received</th><th>Contact</th><th>Type / subject</th><th>Requirement</th></tr></thead><tbody>{leads.map(item=><tr key={item.leadId}><td><strong>{item.leadId}</strong><small>{new Date(item.createdAt).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</small></td><td><strong>{item.name}</strong><a href={`mailto:${item.email}`}>{item.email}</a><a href={`tel:${item.phone}`}>{item.phone}</a>{item.company&&<small>{item.company}</small>}</td><td><strong>{item.kind}</strong><small>{item.subject || item.source || "Website enquiry"}</small></td><td className="admin-message-cell">{item.message}</td></tr>)}</tbody></table></div> : <div className="admin-inbox-empty"><Mail size={19}/><strong>No enquiries loaded</strong><span>New contact and quote requests appear here after they are saved to MongoDB.</span></div>}</section><section className="admin-inbox"><div className="admin-inbox-head"><div><span>CANDIDATE SUBMISSIONS</span><h2>Recent applications</h2></div><small>Latest 50 records · admin-only</small></div>{applications.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Received</th><th>Candidate</th><th>Role</th><th>Profile</th></tr></thead><tbody>{applications.map(item=><tr key={item.applicationId}><td><strong>{item.applicationId}</strong><small>{new Date(item.createdAt).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</small></td><td><strong>{item.name}</strong><a href={`mailto:${item.email}`}>{item.email}</a><a href={`tel:${item.phone}`}>{item.phone}</a></td><td><strong>{item.jobTitle}</strong><small>Job ID: {item.jobId || "—"}</small></td><td><span>{item.location} · {item.experience}</span><small>{item.education || "Education not provided"}</small>{item.message&&<p>{item.message}</p>}</td></tr>)}</tbody></table></div> : <div className="admin-inbox-empty"><BriefcaseBusiness size={19}/><strong>No applications loaded</strong><span>Job applications saved to MongoDB appear here.</span></div>}</section><section className="admin-inbox"><div className="admin-inbox-head"><div><span>VERIFIED VACANCY FEED</span><h2>Manage job listings</h2></div><small>Only verified and published jobs appear publicly.</small></div><form className="admin-job-form" onSubmit={createJob}><div className="admin-job-form-grid"><label>Role title<input required maxLength={180} value={jobForm.title} onChange={e=>setJobForm({...jobForm,title:e.target.value})} placeholder="e.g. Electrical Engineer"/></label><label>Employer / company<input required maxLength={180} value={jobForm.company} onChange={e=>setJobForm({...jobForm,company:e.target.value})} placeholder="Verified employer name"/></label><label>Category<select value={jobForm.category} onChange={e=>setJobForm({...jobForm,category:e.target.value})}>{["IT & Software","Engineering","Manufacturing","Logistics","Security","Housekeeping","BPO & Management"].map(c=><option key={c}>{c}</option>)}</select></label><label>Location<input required value={jobForm.location} onChange={e=>setJobForm({...jobForm,location:e.target.value})} placeholder="City / work mode"/></label><label>Salary range<input required value={jobForm.salary} onChange={e=>setJobForm({...jobForm,salary:e.target.value})} placeholder="Use confirmed range or Not disclosed"/></label><label>Employment type<select value={jobForm.type} onChange={e=>setJobForm({...jobForm,type:e.target.value})}>{["Full-Time","Part-Time","Contract","Internship","Apprenticeship"].map(c=><option key={c}>{c}</option>)}</select></label><label>Experience<input required value={jobForm.exp} onChange={e=>setJobForm({...jobForm,exp:e.target.value})} placeholder="e.g. Fresher / 2–4 years"/></label><label>Qualification<input required value={jobForm.qual} onChange={e=>setJobForm({...jobForm,qual:e.target.value})} placeholder="Required qualification"/></label><label>Expiry date (optional)<input type="date" value={jobForm.expiresAt} onChange={e=>setJobForm({...jobForm,expiresAt:e.target.value})}/></label><label className="admin-job-check"><input type="checkbox" checked={jobForm.urgent} onChange={e=>setJobForm({...jobForm,urgent:e.target.checked})}/> Mark as urgent</label></div><label className="admin-job-description">Role description<textarea required minLength={20} maxLength={3000} rows={4} value={jobForm.desc} onChange={e=>setJobForm({...jobForm,desc:e.target.value})} placeholder="Responsibilities, eligibility, shift and application details"/></label><label className="admin-job-verify"><input type="checkbox" checked={jobVerified} onChange={e=>setJobVerified(e.target.checked)}/> I confirm that the employer, vacancy, location, eligibility and compensation details have been checked. {jobVerified ? "This will publish the listing." : "Without this confirmation, the listing is saved as a draft."}</label><button className="admin-job-submit" disabled={jobSaving}>{jobSaving?"Saving…":jobVerified?"Save & publish verified job":"Save draft"}</button></form>{jobsNotice&&<p className="admin-jobs-notice" role="status">{jobsNotice}</p>}{jobsError&&<p className="admin-inbox-error" role="alert">{jobsError}</p>}{jobs.length>0&&<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Role</th><th>Location / category</th><th>Status</th><th>Action</th></tr></thead><tbody>{jobs.map(job=><tr key={job.id}><td><strong>{job.title}</strong><small>{job.company} · {job.salary}</small></td><td><strong>{job.location}</strong><small>{job.category} · {job.type} · {job.exp}</small></td><td><strong>{job.published&&job.verified?"Published and verified":"Draft / unpublished"}</strong><small>{job.urgent?"Urgent role":"Standard priority"}</small></td><td className="admin-job-actions">{job.published?<button onClick={()=>updateJob(job,"unpublish")}>Unpublish</button>:<button onClick={()=>updateJob(job,"verify-publish")}>Verify & publish</button>}<button className="danger" onClick={()=>updateJob(job,"delete")}>Delete</button></td></tr>)}</tbody></table></div>}</section></div></main>;
}
