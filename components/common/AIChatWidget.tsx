"use client";

import Link from "next/link";
import { Bot, ChevronRight, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
const GREETING: Msg = { role: "assistant", content: "Hi, I’m the UniqueToo assistant. I can help with hiring requirements, job registration and campus placement. What do you need?" };
const QUICK = [
  ["Hire workforce", "I need workforce hiring support"],
  ["I need a job", "I am looking for a job"],
  ["Campus placement", "Our college wants campus placement"],
] as const;

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const saved = sessionStorage.getItem("ut-ai-messages"); if (saved) setMessages(JSON.parse(saved)); } catch {}
  }, []);
  useEffect(() => { try { sessionStorage.setItem("ut-ai-messages", JSON.stringify(messages)); } catch {} }, [messages]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, open]);

  async function send(value = input) {
    const text = value.trim(); if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }]; setMessages(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "Please tell me a little more about your requirement." }]);
    } catch { setMessages((m) => [...m, { role: "assistant", content: "I’m having trouble connecting right now. You can send the requirement through our Contact page and the team can follow up." }]); }
    finally { setLoading(false); }
  }

  return <>
    <button className="ai-fab" onClick={() => setOpen(v => !v)} aria-label="Open UniqueToo assistant">{open ? <X size={22}/> : <MessageCircle size={23}/>}</button>
    {open && <aside className="ai-panel" aria-label="UniqueToo AI assistant">
      <header className="ai-head"><div className="ai-brand"><span><Bot size={18}/></span><div><strong>UniqueToo Assistant</strong><small>Hiring &amp; jobs help</small></div></div><button onClick={() => setOpen(false)} aria-label="Close AI"><X size={18}/></button></header>
      <div className="ai-quick">{QUICK.map(([label, prompt]) => <button key={label} onClick={() => send(prompt)}>{label}<ChevronRight size={12}/></button>)}</div>
      <div className="ai-messages" ref={scrollRef}>{messages.map((m,i)=><div key={i} className={`ai-message ${m.role}`}>{m.content}</div>)}{loading && <div className="ai-typing"><i/><i/><i/> Thinking</div>}</div>
      <div className="ai-links"><Link href="/candidates" onClick={() => setOpen(false)}>Find a job</Link><Link href="/contact" onClick={() => setOpen(false)}>Talk to team</Link></div>
      <div className="ai-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key === "Enter") send()}} placeholder="Ask about hiring or jobs…"/><button onClick={()=>send()} disabled={loading} aria-label="Send"><Send size={16}/></button></div>
    </aside>}
  </>;
}
