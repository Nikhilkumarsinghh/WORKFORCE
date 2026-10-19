# UniqueToo AdSense readiness checklist

Google decides site approval after reviewing the live website and publisher account. Code and design changes cannot guarantee approval.

## Before requesting review

- Publish useful, original writing that answers real questions; do not rely on a design template, image-heavy pages or copied articles.
- Keep navigation and page destinations clear, functional and consistent.
- Make sure About, Contact, Privacy Policy, Cookie Policy and Terms pages are accurate and easy to find.
- Remove placeholder claims, fake testimonials, invented client logos and unverified metrics.
- Publish only employer-confirmed vacancies. The Jobs page must not present demo vacancies as live openings.
- Label portfolio demonstrations as examples, not paid client work.
- Check mobile layout, page speed, accessibility, broken links and the live sitemap.
- Do not place ads on login, account, admin, application, contact or other pages where advertising is not appropriate.
- Never encourage clicks or disguise ads as navigation or download links.

## Technical configuration

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT` to the actual publisher ID from the AdSense account, in the form `ca-pub-1234567890123456`.
2. Deploy and verify the publisher meta tag is present in the live HTML.
3. Verify `https://uniquetoo.in/ads.txt` returns `google.com, pub-REAL_ID, DIRECT, f08c47fec0942fa0` after the real publisher ID is configured.
4. Verify `https://uniquetoo.in/robots.txt` and `https://uniquetoo.in/sitemap.xml` are accessible.
5. Confirm the live site is owned/verified in Search Console and AdSense.
6. Review consent and privacy requirements for the audience and advertising setup. Ad scripts should only load where intended and where consent requirements are met.
7. Submit the site for review in the AdSense account and address any specific issue shown there.

## Notes

- The editorial/resource area is the intended place to evaluate ad placements; do not add ads to forms, login/account or job-application workflows.
- No fixed number of pages, guaranteed approval date or guaranteed revenue can be promised.
- Configure a real publisher ID; do not publish a placeholder `ca-pub` value.

## Environment variables used by the site

- `NEXT_PUBLIC_ADSENSE_CLIENT` — actual AdSense publisher ID.
- `NEXT_PUBLIC_SITE_URL=https://uniquetoo.in`.
- `MONGODB_URI` and `MONGODB_DB` for persistent production form/application storage.
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `NOTIFY_EMAIL` for email notifications.
- `IP_HASH_SALT`, `JWT_SECRET`, and OAuth credentials where those features are enabled.
