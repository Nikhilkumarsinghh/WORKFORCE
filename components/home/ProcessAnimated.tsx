"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Layers3, Search, Sparkles } from "lucide-react";

const steps = [
  {
    no: "01",
    label: "UNDERSTAND",
    title: "Map the requirement.",
    body: "Understand the business objective, operating environment, people, systems, constraints and success measures before anything is built or deployed.",
    output: "Clear requirement brief",
    icon: Search,
    nodes: ["Objective", "Environment", "People", "Success"],
  },
  {
    no: "02",
    label: "DEFINE",
    title: "Design the right model.",
    body: "Translate the context into the right delivery model, ownership, scope, workflow, controls and plan — without unnecessary complexity.",
    output: "Delivery blueprint",
    icon: Layers3,
    nodes: ["Scope", "Owners", "Workflow", "Controls"],
  },
  {
    no: "03",
    label: "EXECUTE",
    title: "Move into accountable delivery.",
    body: "Recruit, build, integrate or deploy through visible stages with accountable owners, practical milestones and feedback from the operating environment.",
    output: "Working capability",
    icon: ArrowRight,
    nodes: ["Source", "Build", "Integrate", "Deploy"],
  },
  {
    no: "04",
    label: "IMPROVE",
    title: "Measure and scale what works.",
    body: "Review adoption, performance, exceptions and friction. Improve the model, then scale the parts that consistently create value.",
    output: "Measured improvement",
    icon: Sparkles,
    nodes: ["Measure", "Review", "Improve", "Scale"],
  },
] as const;

export default function ProcessAnimated() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView || paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % steps.length), 4700);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduceMotion]);

  const current = steps[active];
  const Icon = current.icon;

  return (
    <div ref={rootRef} className="utx-process" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="utx-process-rail" role="tablist" aria-label="Delivery stages">
        {steps.map((step, index) => (
          <button
            key={step.no}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`utx-process-tab ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
          >
            <span className="utx-process-tab-no">{step.no}</span>
            <span><small>{step.label}</small><strong>{step.title}</strong></span>
            {index < steps.length - 1 && <i aria-hidden="true" />}
          </button>
        ))}
      </div>

      <motion.div className="utx-process-detail" key={current.no} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, ease: [.22,1,.36,1] }}>
        <div className="utx-process-detail-head"><span>{current.no} / {current.label}</span><small>{paused ? "PAUSED — SELECT A STAGE" : reduceMotion ? "STATIC MODE" : "AUTO-PROGRESSING"}</small></div>
        <div className="utx-process-content">
          <div className="utx-process-copy">
            <div className="utx-process-icon"><Icon size={22} /></div>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            <div className="utx-process-output"><Check size={15} /><span><small>OUTPUT</small><strong>{current.output}</strong></span></div>
          </div>
          <div className="utx-process-visual" aria-hidden="true">
            <div className="utx-process-visual-core"><span>{current.no}</span><strong>U2</strong><small>DELIVERY</small></div>
            {current.nodes.map((node, index) => <motion.div key={node} className={`utx-process-node p${index+1}`} initial={reduceMotion ? false : { opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .08 + index*.05, duration: .32 }}>{node}</motion.div>)}
            <div className="utx-process-connector c1"/><div className="utx-process-connector c2"/><div className="utx-process-connector c3"/><div className="utx-process-connector c4"/>
          </div>
        </div>
        <div className="utx-process-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
      </motion.div>
    </div>
  );
}
