export type Guide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: { h: string; p?: string; list?: string[] }[];
  faq: [string, string][];
  cta: { label: string; track: "skilled" | "non-skilled" | "fresher" };
};

export const GUIDES: Guide[] = [
  {
    slug: "10th-pass-jobs",
    title: "Jobs for 10th Pass Candidates in India",
    h1: "Jobs for 10th pass candidates",
    description: "Entry-level job options for 10th pass candidates in India: production helper, warehouse, security, housekeeping, delivery and retail. Documents needed and how to register.",
    intro: "A 10th pass certificate is enough for many entry-level roles in manufacturing, warehousing, security, facility management, retail and logistics. These roles usually teach the work on the job, so reliability, punctuality and willingness to learn matter more than formal qualifications.",
    sections: [
      { h: "Common roles for 10th pass candidates", list: ["Production or machine helper in factories", "Warehouse associate: loading, picking, packing, dispatch", "Security guard (training and licensing rules apply)", "Housekeeping and facility staff", "Delivery executive or loader (a valid licence is needed for driving roles)", "Retail floor assistant and store helper"] },
      { h: "Documents to keep ready", list: ["Aadhaar card and a working mobile number", "10th mark sheet or certificate", "Passport-size photographs", "Bank account details for salary", "Any experience letters or ID from earlier work"] },
      { h: "How to improve your chances", p: "Mention the city you can work in, the shifts you can do and whether you can relocate. Employers shortlist faster when availability is clear. Basic skills such as reading instructions, simple counting and safety awareness help in almost every frontline role." },
      { h: "A note on safety", p: "Never pay money to anyone for a job and never share OTPs or bank PINs. A genuine employer or agency does not ask you to pay to be considered." },
    ],
    faq: [["Can I get a job with only 10th pass?", "Yes. Many production, warehouse, security, housekeeping and retail roles accept 10th pass candidates. Requirements differ by employer and location."], ["Is experience required?", "Many entry-level roles accept freshers and train on the job. Experience improves your options and can improve pay."]],
    cta: { label: "Register as a 10th pass candidate", track: "non-skilled" },
  },
  {
    slug: "12th-pass-jobs",
    title: "Jobs for 12th Pass Candidates in India",
    h1: "Jobs for 12th pass candidates",
    description: "Job options for 12th pass candidates in India: customer support, data entry, retail, logistics coordination, production and trainee roles. Skills to build and how to register.",
    intro: "With a 12th pass certificate you can apply for a wider range of roles than at 10th pass, including customer support, back-office work, retail, logistics coordination and trainee positions in production. Communication skills and basic computer use open the most doors.",
    sections: [
      { h: "Common roles for 12th pass candidates", list: ["Customer support and BPO voice or chat roles (communication skills are tested)", "Data entry and back-office assistant", "Retail sales associate and billing", "Logistics and warehouse coordinator trainee", "Production operator trainee", "Field sales and service executive"] },
      { h: "Skills worth building", list: ["Typing speed and basic MS Office or Google Workspace", "Clear spoken English or Hindi for support roles", "Basic maths for billing and inventory", "Punctuality and a professional phone manner"] },
      { h: "Documents to keep ready", list: ["Aadhaar card and mobile number", "10th and 12th mark sheets", "Updated resume if you have one (optional for many roles)", "Photographs and bank details"] },
    ],
    faq: [["Which jobs suit 12th pass candidates?", "Support, back-office, retail, logistics and trainee roles are common. Your communication and computer skills decide how far you can go."], ["Can I study while working?", "Some employers offer flexible shifts, but this varies. Mention your availability when you register."]],
    cta: { label: "Register as a 12th pass candidate", track: "non-skilled" },
  },
  {
    slug: "iti-diploma-jobs",
    title: "ITI and Diploma Jobs in India",
    h1: "ITI and diploma jobs",
    description: "Job options for ITI and diploma holders in India: fitter, electrician, welder, CNC operator, maintenance technician and trainee engineer roles. Documents and registration.",
    intro: "ITI and diploma holders are in steady demand in manufacturing, automotive, construction and maintenance. Employers look for hands-on trade skills, safety awareness and the ability to read drawings or instructions. Trainee and apprentice routes are common for those just starting out.",
    sections: [
      { h: "Common trades and roles", list: ["Fitter, turner, machinist and welder", "Electrician and electrical maintenance technician", "CNC or VMC operator and setter", "Quality inspector and testing assistant", "Diploma engineer trainee in mechanical, electrical, civil or electronics", "Plant maintenance and utilities technician"] },
      { h: "What employers check", list: ["Trade certificate and mark sheets", "Hands-on skill, sometimes through a practical test", "Experience on specific machines or tools", "Willingness to work in shifts and at the plant location"] },
      { h: "Tips for a stronger profile", p: "List the machines, tools and processes you have used, for example lathe, milling, MIG welding or PLC basics. Specific skills make shortlisting easier than a generic trade name. Fresher ITI and diploma candidates should say they are open to apprentice or trainee roles." },
    ],
    faq: [["Do ITI freshers get jobs?", "Yes, many employers hire ITI freshers as trainees or apprentices and train them on the shop floor."], ["Is a diploma better than ITI?", "They lead to different roles. Diploma holders often move into technician or supervisor tracks, while ITI holders are strong in hands-on trades. Both are in demand."]],
    cta: { label: "Register as an ITI or diploma candidate", track: "skilled" },
  },
  {
    slug: "fresher-jobs",
    title: "Fresher Jobs for Graduates and Engineers in India",
    h1: "Fresher jobs for graduates and engineers",
    description: "How freshers can find their first job in India: trainee roles, campus drives, resume tips and interview preparation for graduates, diploma holders and engineers.",
    intro: "Your first job is mostly about proving you can learn and deliver. Employers hiring freshers look at academics, communication, projects or internships, and attitude. Campus drives and trainee programs are the most common entry points.",
    sections: [
      { h: "Where freshers usually start", list: ["Graduate or engineer trainee in manufacturing and engineering firms", "Customer support and BPO roles", "Sales and business development trainee", "Technical support and testing roles", "Diploma and ITI apprentice programs"] },
      { h: "Build a resume that gets noticed", list: ["One page, clear contact details and city preference", "Education with year and percentage or CGPA", "Projects, internships and tools you actually used", "Skills grouped honestly: you will be tested on them"] },
      { h: "Prepare for the interview", p: "Revise your core subjects, be ready to explain your projects step by step and practice a short introduction. Be punctual, dress neatly and keep your documents organised. Our blog has interview preparation guides for engineering freshers." },
    ],
    faq: [["Can freshers register without a resume?", "Yes. You can register with your details and add a resume later."], ["Do you run campus drives?", "Yes. See our campus placement page. Students can register from their college or on their own."]],
    cta: { label: "Register as a fresher", track: "fresher" },
  },
  {
    slug: "security-housekeeping-jobs",
    title: "Security Guard and Housekeeping Jobs in India",
    h1: "Security and housekeeping jobs",
    description: "What to know about security guard, supervisor, housekeeping and facility staff jobs in India: roles, documents, shifts and how to avoid scams.",
    intro: "Security and facility roles are available across offices, factories, malls, hospitals and residential complexes. They are accessible to candidates with limited formal education, and many employers provide training. Reliability, discipline and good conduct are the main requirements.",
    sections: [
      { h: "Common roles", list: ["Security guard and gate officer", "Security supervisor and control-room operator", "Housekeeping attendant and supervisor", "Pantry and facility helper", "Mechanical, electrical and plumbing (MEP) helper"] },
      { h: "What to expect", list: ["Shift work, including nights and weekends", "Uniform and site-specific rules", "Identity and address verification; some roles need police verification and licensing under state rules", "On-site training before deployment"] },
      { h: "Documents", p: "Keep Aadhaar, address proof, photographs, bank details and any previous work letters ready. For security roles, ask the employer exactly which licence or verification is needed and who arranges it." },
      { h: "Staying safe", p: "A real employer does not ask for money to give you a posting. If anyone does, stop and report it." },
    ],
    faq: [["Is experience required for security guard jobs?", "Many employers hire fresh candidates and provide training. Experience and a clean record help."], ["Are these jobs permanent?", "Terms vary: some are on contract through an agency, others are permanent with the employer. Ask for the terms in writing before you join."]],
    cta: { label: "Register for security or housekeeping roles", track: "non-skilled" },
  },
  {
    slug: "avoid-job-scams",
    title: "How to Avoid Job Scams in India",
    h1: "How to avoid job scams",
    description: "Warning signs of fake job offers in India and what to do: never pay for a job, verify the employer, protect your documents and report fraud.",
    intro: "Fake job offers target people who urgently need work. They can cost you money and expose your personal data. A few simple checks can protect you.",
    sections: [
      { h: "Red flags", list: ["You are asked to pay a registration, training, uniform or security fee to get a job", "The offer comes by WhatsApp or SMS from someone you never applied to", "The salary promised is far higher than the role normally pays", "The recruiter refuses to share the company name, address or official email", "You are asked for OTPs, bank PINs or card details"] },
      { h: "What to do before you trust an offer", list: ["Check the company's official website and the email domain used", "Ask for the offer in writing with company name, role, location and pay", "Visit the office or work site where possible", "Never share OTPs, PINs or passwords with anyone"] },
      { h: "If you suspect a scam", p: "Stop paying, keep screenshots and receipts, and report it to the cyber crime helpline 1930 or the portal cybercrime.gov.in. If someone used UniqueToo's name to ask for money, email contact@uniquetoo.in with the details." },
    ],
    faq: [["Should I ever pay for a job?", "No. Be very cautious of any request for money in exchange for a job offer or interview."], ["How do I report fraud?", "Call 1930 or use cybercrime.gov.in, and inform the company that was impersonated."]],
    cta: { label: "Register safely with UniqueToo", track: "non-skilled" },
  },

  {
    slug: "interview-tips-for-factory-jobs",
    title: "Interview Tips for Factory and Plant Jobs",
    h1: "Interview tips for factory and plant jobs",
    description: "Simple, practical interview preparation for factory, warehouse and plant jobs in India: what to carry, what to say, what employers check and common mistakes.",
    intro: "Plant and warehouse interviews are usually short and practical. Employers want to know whether you will come on time, follow instructions and work safely. A little preparation makes a big difference.",
    sections: [
      { h: "Before the interview", list: ["Confirm the address, time and contact person the day before", "Reach 15–20 minutes early", "Carry originals and one set of photocopies of your documents", "Wear clean, simple clothes and closed shoes"] },
      { h: "What interviewers usually ask", list: ["Your experience and the machines or work you have done", "Whether you can work in shifts and at the plant location", "Your education and trade certificates", "How you handle safety and instructions"] },
      { h: "How to answer well", p: "Be honest and specific. If you have operated a machine, say which one and for how long. If you are a fresher, say you are willing to learn and can join quickly. Do not exaggerate; many employers test skills on the spot." },
      { h: "Common mistakes", list: ["Arriving late or without documents", "Claiming skills you do not have", "Not asking about shift timings, pay structure and location before accepting", "Paying anyone to get an interview or job"] },
    ],
    faq: [["Will there be a practical test?", "For skilled trades such as welding, CNC or electrical work, a practical test is common."], ["Should I ask about salary?", "Yes, politely ask about the pay structure, shifts and joining date, and get the offer in writing."]],
    cta: { label: "Register and get matched", track: "non-skilled" },
  },
  {
    slug: "documents-required-for-jobs",
    title: "Documents Required for Factory, Warehouse and Frontline Jobs",
    h1: "Documents required for factory and frontline jobs",
    description: "A checklist of documents commonly needed to join a job in India: Aadhaar, education certificates, bank details, photographs and verification papers.",
    intro: "Joining formalities are smoother when your documents are ready. Requirements vary by employer, but most ask for the same core set.",
    sections: [
      { h: "Core documents", list: ["Aadhaar card (and a mobile number linked if possible)", "PAN card where available", "Passport-size photographs", "Bank account details or passbook/cancelled cheque", "Education mark sheets and trade certificates"] },
      { h: "Often requested", list: ["Address proof if different from Aadhaar", "Previous employer relieving or experience letter", "Driving licence for driver roles", "UAN and previous PF details if you have worked before", "Medical fitness if the employer requires it"] },
      { h: "Keep them organised", p: "Keep originals safe, carry photocopies and keep clear phone photos of each document. Never hand over originals permanently, and never pay anyone to prepare or hold your documents for a job." },
    ],
    faq: [["Can I join without a bank account?", "Most employers pay through bank transfer, so open an account before joining."], ["What if I lost a certificate?", "Apply for a duplicate from the issuing institute; mention it to the employer."]],
    cta: { label: "Register your profile", track: "non-skilled" },
  },
  {
    slug: "pf-esi-basics-for-workers",
    title: "PF and ESI Basics for Workers",
    h1: "PF and ESI basics for workers",
    description: "A plain-language introduction to Provident Fund (PF) and ESI for workers in India: what they are, why they matter and how to check your account. Verify details on official portals.",
    intro: "Provident Fund (PF) and Employees' State Insurance (ESI) are social-security benefits for eligible workers. Knowing the basics helps you check that your employer is handling them properly. Rules and limits change, so confirm current details on the official portals.",
    sections: [
      { h: "Provident Fund (PF)", p: "PF is a retirement savings scheme run by the EPFO. Contributions are made from your wages and by the employer into your account, which is identified by a Universal Account Number (UAN). Keep the same UAN across jobs so your savings stay together." },
      { h: "ESI", p: "ESI provides medical and cash benefits to eligible employees through the ESIC. Eligibility depends on wage limits and the establishment, so check the current rules with your employer or on the ESIC portal." },
      { h: "What you should check", list: ["You have a UAN and can log in to the EPFO member portal", "Contributions appear in your passbook every month", "Your ESI card or IP number is issued if you are eligible", "Your pay slip shows deductions clearly"] },
      { h: "Official sources", p: "Use epfindia.gov.in and esic.gov.in for current rules, and raise queries with your employer or the grievance portals if something looks wrong." },
    ],
    faq: [["What is a UAN?", "A 12-digit Universal Account Number that stays with you across employers."], ["Who do I ask if contributions are missing?", "Start with your employer or agency, then use the EPFO or ESIC grievance channels."]],
    cta: { label: "Register for jobs", track: "non-skilled" },
  },
  {
    slug: "iti-trades-career-paths",
    title: "ITI Trades and Career Paths in India",
    h1: "ITI trades and career paths",
    description: "A guide to popular ITI trades in India — fitter, electrician, welder, machinist, turner, COPA and more — with the jobs and growth paths each can lead to.",
    intro: "ITI trades are a direct route to skilled work. Choosing a trade that matches local industry demand makes the first job easier to find.",
    sections: [
      { h: "Popular trades and where they lead", list: ["Fitter: assembly, maintenance and tool-room roles", "Electrician: plant electrical, wiring and maintenance", "Welder: fabrication, shipyard and construction work", "Machinist / Turner: CNC, VMC and conventional machining", "Mechanic (Motor Vehicle, Diesel): service centres and fleet maintenance", "COPA / Computer: data entry and office support"] },
      { h: "Growing after ITI", list: ["Start as a trainee or apprentice and learn the plant", "Add skills: CNC programming, PLC basics, inspection", "Consider a diploma through lateral entry options", "Move from operator to setter to supervisor"] },
      { h: "Tips", p: "Keep your trade certificate and marks safe, learn the instruments of your trade, and practise reading drawings. Employers value hands-on skill and discipline." },
    ],
    faq: [["Which ITI trade has the most jobs?", "Fitter, electrician, welder and machinist are consistently in demand in manufacturing regions."], ["Can ITI holders do a diploma?", "Lateral entry routes exist in many states; check with the relevant technical education board."]],
    cta: { label: "Register as an ITI candidate", track: "skilled" },
  },
  {
    slug: "how-campus-placement-works",
    title: "How Campus Placement Works for Students",
    h1: "How campus placement works for students",
    description: "A student's guide to campus placement in India: eligibility, rounds, preparation, documents and what to do if you are not selected.",
    intro: "Campus placement brings employers to your institute so you can interview without searching on your own. Knowing the typical process helps you prepare.",
    sections: [
      { h: "Typical process", list: ["Employer shares eligibility: stream, percentage, backlogs", "Students register with the placement cell", "Pre-placement talk or screening", "Written or online test, technical and HR interviews", "Offer letters and joining formalities"] },
      { h: "How to prepare", list: ["Revise core subjects and basic aptitude", "Prepare a clear one-page resume", "Practise a short self-introduction", "Learn about the company and the role"] },
      { h: "If you are not selected", p: "Not every drive leads to an offer. Keep registering for other drives and openings, improve the gaps the interviewers pointed out and stay open to trainee roles." },
      { h: "A note on safety", p: "Students should never pay a fee for placement. Report any such demand to your placement cell and to contact@uniquetoo.in if UniqueToo is named." },
    ],
    faq: [["Do backlogs matter?", "Some employers restrict eligibility on active backlogs; check each drive's criteria."], ["Can I register if my college has no placement cell?", "Yes. Register your profile with us and we will consider you for openings and drives."]],
    cta: { label: "Student registration", track: "fresher" },
  },
  {
    slug: "resume-tips-for-freshers",
    title: "Resume Tips for Freshers and Entry-Level Candidates",
    h1: "Resume tips for freshers and entry-level candidates",
    description: "Write a clear one-page resume as a fresher or entry-level candidate in India: structure, what to include, what to avoid and a simple checklist.",
    intro: "A resume does not need to be fancy. For entry-level roles it needs to be clear, honest and easy to read in thirty seconds.",
    sections: [
      { h: "Simple structure", list: ["Name, mobile number, email and city at the top", "Objective in one line (the role you want)", "Education with year and marks", "Skills, tools or machines you know", "Projects, internships or work experience", "Languages and one or two personal details"] },
      { h: "Do", list: ["Keep it to one page", "Use a plain font and clear headings", "Use a professional email address", "Save as PDF and name the file with your name"] },
      { h: "Avoid", list: ["Fake experience or skills", "Long paragraphs", "Photos and graphics unless asked", "Spelling mistakes"] },
      { h: "No resume yet?", p: "You can still register with us using only your mobile number, education and skills. A resume is optional." },
    ],
    faq: [["Do I need a photo?", "Not unless the employer asks."], ["How long should a fresher resume be?", "One page."]],
    cta: { label: "Register your profile", track: "fresher" },
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
