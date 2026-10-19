import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  variant?: string;
  title?: string;
  intro?: string;
};

type Story = {
  label: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  challenge: string;
  approach: string[];
  result: string;
  lens: string;
};

const stories: Record<string, Story> = {
  workforce: {
    label: "WORKFORCE OPERATIONS",
    title: "From an open headcount to a managed deployment plan.",
    summary: "An illustrative case study showing how a growing operation could bring role demand, sourcing, onboarding and shift coverage into one coordinated workflow.",
    image: "/media/user/industrial-staffing.webp", alt: "Industrial staffing environment with equipment and production operations",
    challenge: "Multiple roles, locations and shift requirements can become difficult to track when updates are spread across calls and spreadsheets.",
    approach: ["Map demand by role, site, shift and joining date.", "Use a consistent shortlist and document checklist.", "Track onboarding, attendance gaps and follow-up owners in one operating view."],
    result: "A clearer operating picture, earlier visibility of gaps and more accountable hand-offs—without promising a fixed hiring speed or cost saving.", lens: "Recruitment · Deployment · Continuity"
  },
  technology: {
    label: "DIGITAL PRODUCT DELIVERY",
    title: "Turn a fragmented process into a usable business system.",
    summary: "An illustrative case study for a team managing requests, approvals and status updates across disconnected tools.",
    image: "/media/user/extra-1.png", alt: "Business software interface illustrating a structured workflow",
    challenge: "People repeat data entry, chase updates manually and struggle to see who owns the next action.",
    approach: ["Document the current journey and exception cases.", "Design a responsive interface around real user tasks.", "Connect validation, permissions, notifications and reporting before launch."],
    result: "A defined source of truth and a more traceable workflow. Actual performance improvements should be measured after deployment.", lens: "Discovery · UX · Engineering · Adoption"
  },
  ai: {
    label: "AI & WORKFLOW AUTOMATION",
    title: "Automate repetitive work without removing human accountability.",
    summary: "An illustrative scenario for high-volume document intake, classification and routing.",
    image: "/media/user/technology-ai.webp", alt: "Technology environment illustrating AI-enabled business workflows",
    challenge: "Repeated copying, classification and routing can consume time while inconsistent inputs create avoidable errors.",
    approach: ["Identify a narrow, measurable workflow first.", "Add validation, confidence thresholds and exception queues.", "Keep a human review path for sensitive or uncertain decisions."],
    result: "A controlled pilot with a clear audit trail and a baseline to evaluate whether automation is worth scaling.", lens: "Process mapping · Guardrails · Human review"
  },
  industry: {
    label: "INDUSTRY PRACTICE",
    title: "Design the operating model around the environment.",
    summary: "An illustrative industry case study showing how workforce, workflow and reporting needs can be assessed together.",
    image: "/media/user/manufacturing.webp", alt: "Manufacturing environment illustrating industry-specific operating requirements",
    challenge: "A generic service model can overlook shift patterns, site access, qualification requirements and local operating constraints.",
    approach: ["Map the site context and critical roles.", "Identify hand-offs, risk points and information gaps.", "Define owners, review cadence and practical operating measures."],
    result: "A more context-aware plan that can be validated with the organization before implementation.", lens: "Context · Capability · Delivery · Review"
  },
  careers: {
    label: "CAREER PATHWAY",
    title: "Connect learning to a demonstrable next step.",
    summary: "An illustrative candidate journey from skills assessment to a prepared application.",
    image: "/media/user/campus-hiring.webp", alt: "Campus and early-career preparation environment",
    challenge: "Candidates can struggle to translate coursework into evidence that is relevant to a specific role.",
    approach: ["Compare the target role with current skills.", "Build one practical project or work sample.", "Prepare a focused resume and role-specific interview examples."],
    result: "A clearer, more evidence-led application journey. No course, project or service guarantees employment.", lens: "Skills · Evidence · Application · Feedback"
  },
  campus: {
    label: "CAMPUS HIRING",
    title: "Make a campus drive easier to coordinate end to end.",
    summary: "An illustrative campus programme covering eligibility, registration, assessment and joining follow-up.",
    image: "/media/user/recruitment.webp", alt: "Recruitment workflow and candidate screening environment",
    challenge: "When college, candidate and employer updates live in separate channels, schedules and eligibility checks can drift.",
    approach: ["Agree eligibility and the drive calendar early.", "Use one registration and communication flow.", "Track assessment, interview, offer and joining milestones."],
    result: "A more transparent programme with fewer ambiguous hand-offs; actual throughput depends on participation and employer decisions.", lens: "Planning · Assessment · Communication"
  },
  learning: {
    label: "LEARNING & ASSESSMENT",
    title: "Make progress visible through practice and review.",
    summary: "An illustrative learning path that pairs concise lessons with applied assignments and feedback.",
    image: "/media/user/engineering-hiring.webp", alt: "Technical learning and engineering practice environment",
    challenge: "Completing lessons alone does not always demonstrate that a learner can apply or explain a skill.",
    approach: ["Define a skill outcome and assessment rubric.", "Use a practical task that resembles the real work.", "Review the submission and document next learning steps."],
    result: "A more explainable record of practice and feedback. Credential status must always be checked against a real issued record.", lens: "Learn · Practise · Review · Improve"
  },
  about: {
    label: "DELIVERY GOVERNANCE",
    title: "Keep scope, ownership and evidence visible.",
    summary: "An illustrative engagement pattern showing how a team can keep a complex requirement understandable from discovery through handover.",
    image: "/media/user/business-team.webp", alt: "Business planning environment illustrating collaborative delivery",
    challenge: "A project can lose momentum when success measures, decision owners and acceptance criteria remain implicit.",
    approach: ["Write down the problem, users and constraints.", "Agree scope, responsibilities and review points.", "Document decisions, handover and what remains out of scope."],
    result: "A clearer basis for decisions and future improvement—without relying on invented client names or unverified metrics.", lens: "Clarity · Ownership · Evidence"
  },
  projects: {
    label: "PROJECT WALKTHROUGH",
    title: "Show the system behind the interface.",
    summary: "An illustrative project story from problem framing to a testable prototype and documented handover.",
    image: "/media/user/extra-2.png", alt: "Digital product interface representing an illustrative software project",
    challenge: "A visually polished demo can still be hard to maintain if data flows, failure cases and user roles are not explained.",
    approach: ["Define the user journey and data model.", "Build the smallest end-to-end workflow.", "Test edge cases and document setup, limitations and next steps."],
    result: "A project that is easier to explain, review and extend. Demonstration work is not presented as a named client deployment.", lens: "Problem · Architecture · Build · Review"
  },
};

const variants: Record<string, keyof typeof stories> = {
  home: "workforce", services: "workforce", "workforce-solutions": "workforce", recruitment: "workforce", staffing: "workforce", security: "workforce", housekeeping: "workforce", "engineering-hiring": "workforce", "payroll-workforce-management": "workforce", "blue-collar-recruitment": "workforce", employers: "workforce", "manpower-agency-pune": "workforce",
  technology: "technology", solutions: "technology", work: "projects", "software-development": "technology", "business-analytics": "technology",
  ai: "ai", "ai-automation": "ai",
  industries: "industry", manufacturing: "industry", automotive: "industry", logistics: "industry", construction: "industry", healthcare: "industry", "engineering-it": "industry", education: "industry",
  careers: "careers", jobs: "careers", "campus-hiring": "campus", academy: "learning", projects: "projects", about: "about", "service-detail": "workforce", "industry-detail": "industry", resources: "learning",
};

const relatedCases: Record<string, Array<{title:string; label:string; summary:string; image:string; alt:string; challenge:string; approach:string; outcome:string}>> = {
  workforce: [
    {title:"Coordinate multi-site staffing",label:"WORKFORCE PLANNING",summary:"A practical model for roles, locations, shifts and joining dates.",image:"/media/user/industrial-staffing.webp",alt:"Industrial workforce in a production setting",challenge:"Demand is spread across several sites and shift patterns.",approach:"Create one role-and-location plan, with named owners for screening, onboarding and attendance follow-up.",outcome:"A clearer mobilisation plan and more visible staffing gaps."},
    {title:"Make recruitment hand-offs visible",label:"RECRUITMENT OPERATIONS",summary:"A traceable path from role brief to interview and joining.",image:"/media/user/recruitment.webp",alt:"Recruitment and candidate screening concept",challenge:"Candidate status can become unclear when updates are held in separate spreadsheets and chats.",approach:"Use agreed stages, consistent screening notes and a clear next-action owner for each candidate.",outcome:"A more consistent candidate pipeline that can be reviewed and improved."},
    {title:"Plan safer site coverage",label:"SITE OPERATIONS",summary:"Match site conditions with staffing, supervision and reporting.",image:"/media/user/security-services.webp",alt:"Security operations room monitoring a site",challenge:"Site requirements, access points and shift hand-offs may not be documented consistently.",approach:"Agree duty scope, escalation points, supervisor responsibilities and daily reporting before deployment.",outcome:"A more understandable operating plan, subject to site-specific validation."},
  ],
  technology: [
    {title:"Replace scattered requests with a workflow",label:"WEB APP DELIVERY",summary:"A single journey for requests, approvals, status and ownership.",image:"/media/user/extra-2.png",alt:"Illustrative business web application interface",challenge:"Teams repeat data entry and cannot easily tell who owns the next action.",approach:"Map the user journey, build responsive forms and status views, then add validation, permissions and audit-friendly updates.",outcome:"A more traceable workflow that can be tested against real user tasks."},
    {title:"Connect tools without losing control",label:"SYSTEM INTEGRATION",summary:"Bring connected systems into a defined operating process.",image:"/media/user/extra-1.png",alt:"Illustrative reporting dashboard interface",challenge:"Information is duplicated between systems and reporting is assembled manually.",approach:"Document source-of-truth rules, connect supported APIs and define failure handling and access boundaries.",outcome:"Clearer data ownership and more maintainable integration paths."},
    {title:"Make reporting decision-ready",label:"BUSINESS ANALYTICS",summary:"Translate operational data into reviewable management signals.",image:"/media/user/extra-2.png",alt:"Business technology environment",challenge:"Reports show activity but do not make exceptions or decisions easy to spot.",approach:"Agree KPIs, define data quality checks and design views around the decisions managers need to make.",outcome:"A more useful reporting layer with measures that can be validated after rollout."},
  ],
  ai: [
    {title:"Route documents with human review",label:"AI WORKFLOW",summary:"Classify incoming documents while preserving an exception path.",image:"/media/user/technology-ai.webp",alt:"AI technology and document workflow concept",challenge:"Manual classification and routing take time, while uncertain inputs can create errors.",approach:"Start with a narrow task, test confidence thresholds and send uncertain or sensitive cases to a human reviewer.",outcome:"A controlled pilot with an audit trail and a measurable baseline."},
    {title:"Reduce repetitive enquiry handling",label:"SERVICE AUTOMATION",summary:"Structure intake, routing and follow-up across enquiry channels.",image:"/media/ai.jpg",alt:"AI-assisted business workflow concept",challenge:"Repeated questions and inconsistent intake can delay the right response.",approach:"Define intent categories, approved responses, escalation rules and a human hand-off for exceptions.",outcome:"More consistent routing without representing AI as a replacement for accountable staff."},
    {title:"Assist recruitment operations responsibly",label:"RECRUITMENT SUPPORT",summary:"Support document checks and workflow administration, not opaque hiring decisions.",image:"/media/user/recruitment.webp",alt:"Recruitment workflow and candidate screening concept",challenge:"Recruitment teams spend time on repeated administration and document follow-up.",approach:"Automate reminders and completeness checks while leaving candidate evaluation and selection to authorised people.",outcome:"Reduced repetitive handling with clear limits and human decision ownership."},
  ],
  industry: [
    {title:"Adapt workforce planning to the site",label:"INDUSTRY OPERATIONS",summary:"Account for shift patterns, site access, skills and operating constraints.",image:"/media/user/manufacturing.webp",alt:"Industrial production and manufacturing facility",challenge:"A generic workforce plan can miss site-specific skills, timing and safety requirements.",approach:"Map the work environment, define role criteria and agree review and escalation points with the operating team.",outcome:"A context-aware plan that can be validated before implementation."},
    {title:"Coordinate warehouse peak demand",label:"LOGISTICS",summary:"Connect peak-season demand with role and shift readiness.",image:"/media/user/logistics.webp",alt:"Logistics and distribution facility",challenge:"Demand spikes can strain picking, packing and dispatch coverage.",approach:"Plan roles and mobilisation windows in advance and track open requirements and attendance gaps.",outcome:"A more visible peak-readiness process, with results measured against actual demand."},
    {title:"Support project-based mobilisation",label:"ENGINEERING & CONSTRUCTION",summary:"Link role demand to site readiness and project phases.",image:"/media/user/construction.webp",alt:"Construction and infrastructure site",challenge:"Project timelines and location constraints make workforce availability difficult to coordinate.",approach:"Align skill requirements, location, induction and mobilisation dates with project milestones.",outcome:"Clearer mobilisation ownership and a repeatable review process."},
  ],
  careers: [
    {title:"Turn skills into role evidence",label:"CAREER READINESS",summary:"Connect learning, project evidence and a targeted application.",image:"/media/user/campus-hiring.webp",alt:"Campus hiring and early career process graphic",challenge:"Course completion alone may not show how a candidate applies a skill.",approach:"Choose a target role, complete a practical work sample and prepare role-specific interview examples.",outcome:"A more evidence-led application journey; no course or service guarantees employment."},
    {title:"Coordinate a campus hiring drive",label:"CAMPUS PROGRAMME",summary:"Manage eligibility, registration, assessment and follow-up.",image:"/media/user/engineering-hiring.webp",alt:"Candidates in a professional assessment setting",challenge:"Students, institutions and employers may receive inconsistent schedule updates.",approach:"Use one drive calendar, eligibility checklist, communication path and milestone tracker.",outcome:"Clearer programme coordination, dependent on employer participation and selection decisions."},
    {title:"Build a portfolio that can be reviewed",label:"STUDENT PROJECTS",summary:"Present project goals, decisions, limitations and outcomes clearly.",image:"/media/user/extra-2.png",alt:"Illustrative digital product interface",challenge:"A project demo can look polished but still lack a clear explanation of the problem and implementation.",approach:"Document the use case, architecture, tests, screenshots and next steps alongside the working demo.",outcome:"A project that is easier for a reviewer to understand and assess."},
  ],
  learning: [
    {title:"Learn by building a real artefact",label:"APPLIED LEARNING",summary:"Pair concise lessons with a practical task and review rubric.",image:"/media/user/engineering-hiring.webp",alt:"Technical training and assessment environment",challenge:"Passive learning may not demonstrate that a skill can be applied independently.",approach:"Define an outcome, complete a practical task and use feedback to plan the next learning step.",outcome:"More visible practice and feedback, without implying a credential unless formally issued."},
    {title:"Prepare for a technical interview",label:"INTERVIEW PREPARATION",summary:"Turn fundamentals into structured explanations and examples.",image:"/media/user/campus-hiring.webp",alt:"Campus learning and career preparation graphic",challenge:"Candidates may know terms but struggle to explain their reasoning or project decisions.",approach:"Practise core concepts, draw system diagrams and rehearse examples from actual work samples.",outcome:"A clearer preparation plan, with readiness assessed through practice rather than promises."},
    {title:"Review progress against a rubric",label:"SKILL ASSESSMENT",summary:"Make strengths and gaps visible after each assignment.",image:"/media/user/engineering-hiring.webp",alt:"Professional learning and review setting",challenge:"Learners may not know which specific skills need more practice.",approach:"Use defined criteria, concrete feedback and a short follow-up task to verify improvement.",outcome:"A more actionable record of learning progress."},
  ],
  projects: [
    {title:"Build the smallest useful web app",label:"WEB APPLICATION",summary:"Start with a real user journey, then validate the end-to-end flow.",image:"/media/user/extra-2.png",alt:"Illustrative web application interface",challenge:"A demo can look complete while key states, validation and permissions remain undefined.",approach:"Map roles, data, empty states, errors and success states before expanding features.",outcome:"A testable first release with known limitations and a clear next iteration."},
    {title:"Design a maintainable API integration",label:"SOFTWARE ENGINEERING",summary:"Make data exchange, errors and ownership explicit.",image:"/media/user/extra-1.png",alt:"Illustrative business dashboard",challenge:"Unclear source-of-truth rules and error handling can make integrations fragile.",approach:"Define contracts, authentication, retries, logging and operational ownership before launch.",outcome:"A more reviewable integration design with documented failure paths."},
    {title:"Document the product for handover",label:"DELIVERY & SUPPORT",summary:"Make setup, testing and future changes understandable.",image:"/media/user/extra-2.png",alt:"Technology delivery environment",challenge:"A project becomes difficult to extend when decisions and setup steps are undocumented.",approach:"Record environment setup, test cases, architecture decisions, known issues and maintenance notes.",outcome:"A clearer handover for the next developer or operating team."},
  ],
};

export default function CaseStudySection({ variant = "home", title, intro }: Props) {
  const key = variants[variant] || (variant.startsWith("industry-") ? "industry" : variant === "service-ai-automation" ? "ai" : variant === "service-campus-hiring" ? "careers" : variant.startsWith("service-") ? (["service-technology", "service-business-analytics"].includes(variant) ? "technology" : "workforce") : "projects");
  const baseStory = stories[key];
  const normalisedVariant = variant.replace(/^(service|industry)-/, "");
  const imageOverrides: Record<string, { image: string; alt: string }> = {
    home: { image: "/media/user/industrial-staffing.webp", alt: "Industrial workforce in a production setting" },
    services: { image: "/media/user/engineering-team.webp", alt: "Industrial operations and engineering environment" },
    employers: { image: "/media/user/workforce-solutions.webp", alt: "Business operations environment illustrating workforce coordination" },
    careers: { image: "/media/user/campus-hiring.webp", alt: "Campus hiring and early career process graphic" },
    jobs: { image: "/media/user/recruitment.webp", alt: "Recruitment and candidate screening concept" },
    "campus-hiring": { image: "/media/user/campus-hiring.webp", alt: "Campus hiring and early career process graphic" },
    academy: { image: "/media/user/engineering-hiring.webp", alt: "Technical learning and applied practice environment" },
    technology: { image: "/media/user/extra-2.png", alt: "Illustrative business web application interface" },
    solutions: { image: "/media/user/extra-1.png", alt: "Illustrative business dashboard interface" },
    ai: { image: "/media/user/technology-ai.webp", alt: "AI technology and document workflow concept" },
    work: { image: "/media/user/extra-2.png", alt: "Illustrative digital product interface" },
    projects: { image: "/media/user/extra-2.png", alt: "Illustrative digital product interface" },
    about: { image: "/media/user/engineering-team.webp", alt: "Engineering professionals in an industrial environment" },
    industries: { image: "/media/user/manufacturing.webp", alt: "Manufacturing and industrial operations environment" },
    resources: { image: "/media/user/engineering-hiring.webp", alt: "Professional learning and leadership environment" },
    "manpower-agency-pune": { image: "/media/user/industrial-staffing.webp", alt: "Industrial workforce in a production setting" },
    recruitment: { image: "/media/user/recruitment.webp", alt: "Recruitment workflow and candidate screening environment" },
    staffing: { image: "/media/user/industrial-staffing.webp", alt: "Industrial staffing environment" },
    security: { image: "/media/user/security-services.webp", alt: "Security operations room monitoring a site" },
    housekeeping: { image: "/media/user/facility-housekeeping.webp", alt: "Facilities and housekeeping operations environment" },
    "engineering-hiring": { image: "/media/user/engineering-hiring.webp", alt: "Professional engineering hiring environment" },
    "payroll-workforce-management": { image: "/media/user/workforce-solutions.webp", alt: "Workforce operations and reporting environment" },
    "blue-collar-recruitment": { image: "/media/user/recruitment.webp", alt: "Frontline recruitment and candidate coordination environment" },
    "service-technology": { image: "/media/user/extra-2.png", alt: "Illustrative business web application interface" },
    "service-ai-automation": { image: "/media/user/technology-ai.webp", alt: "AI technology and workflow automation concept" },
    "service-business-analytics": { image: "/media/user/extra-1.png", alt: "Illustrative reporting dashboard interface" },
    "industry-manufacturing": { image: "/media/user/manufacturing.webp", alt: "Manufacturing operations environment" },
    "industry-warehouse": { image: "/media/user/logistics.webp", alt: "Warehouse and fulfilment operations" },
    "industry-hospitality": { image: "/media/user/facility-housekeeping.webp", alt: "Hospitality and facilities operations" },
    "industry-it-call-centers": { image: "/media/user/call-center.webp", alt: "Customer support and digital operations" },
    "industry-retail": { image: "/media/industry.jpg", alt: "Retail and customer operations environment" },
    "industry-agriculture": { image: "/media/hero.jpg", alt: "Agriculture and food operations environment" },
    "industry-automotive": { image: "/media/user/automotive.webp", alt: "Automotive production environment" },
    "industry-logistics": { image: "/media/user/logistics.webp", alt: "Logistics and distribution operations" },
    "industry-construction": { image: "/media/user/construction.webp", alt: "Construction and site operations environment" },
    "industry-healthcare": { image: "/media/user/healthcare.webp", alt: "Healthcare operations environment" },
    "industry-engineering-it": { image: "/media/user/technology-ai.webp", alt: "Engineering and technology operations environment" },
    "industry-education": { image: "/media/user/campus-hiring.webp", alt: "Education and campus environment" },
  };
  const override = imageOverrides[variant] || imageOverrides[normalisedVariant] || imageOverrides[key];
  const story = override ? { ...baseStory, ...override } : baseStory;
  const examples = relatedCases[key] || relatedCases.projects;
  const contactType = key === "careers" || key === "campus" || key === "learning" ? "career" : key === "technology" || key === "ai" || key === "projects" ? "technology" : "workforce";

  return (
    <section className="ut-case-study" aria-labelledby={`case-study-${key}`}>
      <div className="ut-case-study-heading content-shell">
        <div><span className="ut-case-study-eyebrow">ILLUSTRATIVE CASE STUDIES · {story.label}</span><h2>From a real operating problem to a clearer delivery plan.</h2></div>
        <p className="ut-case-study-note">These scenarios demonstrate approach and capability. They are not claims about named clients or verified project results.</p>
      </div>
      <div className="ut-case-study-feature-image">
        <Image src={story.image} alt={story.alt} fill sizes="100vw" quality={86} priority={false}/>
        <div className="ut-case-study-image-shade" />
        <div className="ut-case-study-image-caption"><span>FIELD NOTE / 01 · {story.label}</span><strong>{title || story.title}</strong><p>{intro || story.summary}</p></div>
      </div>
      <div className="content-shell ut-case-study-detail">
        <div className="ut-case-study-detail-intro"><span className="ut-case-study-index">THE CASE</span><h3>{title || story.title}</h3><p>{intro || story.summary}</p></div>
        <div className="ut-case-study-detail-grid">
          <article className="ut-case-study-block"><span>01 / CHALLENGE</span><h3>The challenge</h3><p>{story.challenge}</p></article>
          <article className="ut-case-study-block"><span>02 / APPROACH</span><h3>The approach</h3><ul>{story.approach.map((item) => <li key={item}><CheckCircle2 size={16} aria-hidden="true"/><span>{item}</span></li>)}</ul></article>
          <article className="ut-case-study-outcome"><span>03 / INTENDED VALUE</span><h3>What a useful outcome looks like</h3><p>{story.result}</p><small>{story.lens}</small></article>
        </div>
        <div className="ut-case-study-related-heading"><span className="ut-case-study-eyebrow">RELATED EXAMPLES</span><h3>Three practical ways to apply the capability.</h3></div>
        <div className="ut-case-study-related-grid">
          {examples.map((item, i) => <article className="ut-case-example" key={item.title}>
            <div className="ut-case-example-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw" quality={80}/><span>ILLUSTRATIVE / 0{i+1}</span></div>
            <div className="ut-case-example-copy"><span className="ut-case-example-label">{item.label}</span><h4>{item.title}</h4><p>{item.summary}</p><details><summary>Read the case approach <ArrowRight size={14}/></summary><div><strong>The challenge</strong><p>{item.challenge}</p><strong>The approach</strong><p>{item.approach}</p><strong>Intended value</strong><p>{item.outcome}</p></div></details></div>
          </article>)}
        </div>
        <div className="ut-case-study-bottom-cta"><div><span className="ut-case-study-eyebrow">APPLY THIS TO YOUR CONTEXT</span><h3>Discuss a similar requirement.</h3><p>Share your goals, constraints and timeline. The next step should start with the actual requirement.</p></div><Link href={`/contact?type=${contactType}`} className="ut-case-study-cta">Talk to the right team <ArrowRight size={16}/></Link></div>
      </div>
    </section>
  );
}
