# UniqueToo — Workforce site (V40)

Workforce, recruitment, staffing, candidate registration (skilled, semi-skilled, non-skilled, freshers) and campus placement.
Technology, AI, Academy and Projects are for the separate Tech & Learning site (see the archive zip).

## Run
```bash
npm ci
cp .env.example .env.local   # fill values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Form emails
Every form (contact, employer requirement, college, campus, candidate registration, job apply, join-us, quote) emails **NOTIFY_EMAIL** (default nikhilkauriya04@gmail.com).
1. With `GMAIL_USER` + `GMAIL_APP_PASSWORD` set, mail is sent via Gmail SMTP.
2. Without them, the site falls back to FormSubmit (formsubmit.co). The first ever submission sends an activation email to the inbox: click the confirm link once, and later submissions arrive normally.
3. If MongoDB is configured, each submission is also stored (viewable in /admin).

## Content structure (98 pages)
- `lib/content/services.ts` (9), `industries.ts` (12), `roles.ts` (20), `cities.ts` (8)
- `data/candidate-guides.ts` (12 candidate guides), `data/blog-posts.ts` (insights)
- Design system: `app/workforce.css`; shared blocks: `components/wf/`
- Nav: `components/layout/Navbar.tsx`, footer: `components/layout/Footer.tsx`
- Brand assets: `public/logo.svg`, `logo-footer.svg`, `favicon.svg`, `favicon.ico`, `icon*.png`, `og-image.png`; hero video: `public/videos/`
- Old docs: `docs-old/`
