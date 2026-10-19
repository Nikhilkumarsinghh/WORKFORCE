"use client";
import Reveal from "./Reveal";
const marks=["WORKFORCE","ENGINEERING","OPERATIONS","TECHNOLOGY","AI & AUTOMATION","BUSINESS SOLUTIONS"];
export default function LogoWall(){return <section className="logo-wall"><Reveal><div className="logo-wall-head"><span className="eyebrow">CAPABILITIES AT A GLANCE</span><p>One operating partner across people, technology and business execution.</p></div><div className="logo-wall-grid">{marks.map((m,i)=><div className="logo-mark" key={m}><span className="logo-mark-box">U2</span><strong>{m}</strong><small>{String(i+1).padStart(2,"0")}</small></div>)}</div></Reveal></section>}
