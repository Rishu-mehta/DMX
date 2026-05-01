# DMX Tech Services — Initial Build Prompt


---

## Project Brief

Build the complete **DMX Tech Services** portfolio website with headless CMS.

**Client:** DMX Tech Services  
**Domain:** `dmxtechservices.com`  
**Repo:** `dmx_web/` (Next.js 15 already initialised)

---

## What DMX Tech Services Offers

### IT Services
1. Mobile Application Development (iOS, Android, Cross-platform)
2. Web Application Development (React, Next.js, full-stack)
3. AI Tools & Services (custom AI integrations, automation)
4. Cybersecurity (audits, penetration testing, security consulting)

### IT Training Programs
1. Full-Stack AI & Cloud Engineering (3 months)
2. AI/ML Training (2 months)
3. DevOps & AWS Cloud Engineering (3 months)
4. Cybersecurity & Ethical Hacking (2 months)
5. Microsoft Azure Cloud & Security (2 months)
6. Linux & System Administration for Cloud (1.5 months)

---

## Pages to Build

| Page | Route | Priority |
|------|-------|----------|
| Homepage | `/` | P0 |
| Services | `/services` | P0 |
| Service Detail | `/services/[slug]` | P1 |
| Training | `/training` | P0 |
| Course Detail | `/training/[slug]` | P1 |
| About | `/about` | P1 |
| Contact | `/contact` | P0 |

---

## CMS Requirements (Sanity v3)
- Services management (title, description, icon, features list)
- Training courses management (title, duration, level, curriculum, price)
- Blog posts with rich text editor
- Team member profiles
- Testimonials
- Site-wide settings (logo, contact info, social links)
- Sanity Studio accessible at `/studio`

---

## Design Direction
- **Theme:** Dark and light mode , premium, tech-forward
- **Primary colour:** Electric violet `#6c63ff`
- **Accent:** Cyan `#00d4ff`
- **Background:** Near-black `#0a0a0f`
- **Typography:** Syne (headings) + DM Sans (body) + JetBrains Mono (code labels)
- **Animations:** Smooth scroll reveals, subtle hover glows, gradient mesh backgrounds
- **Feel:** Like a top-tier tech agency — confident, modern, trustworthy

---

## Technical Requirements
- Next.js 15 App Router + TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui
- Framer Motion for animations
- Sanity v3 for all CMS content
- Contact form with email delivery via Resend
- ISR (Incremental Static Regeneration) with Sanity webhooks
- Full SEO: metadata API, JSON-LD structured data, sitemap.xml, robots.txt
- Lighthouse scores: Performance ≥90, Accessibility ≥95, SEO ≥95
- Mobile-first responsive (375px → 1440px)

---

## Packages to Install
```bash
npm install @sanity/client next-sanity sanity framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install resend
npm install -D @playwright/test vitest @testing-library/react @testing-library/jest-dom
npm install -D @axe-core/playwright @lhci/cli
```

---

## Environment Variables Needed
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=info@dmxtechservices.com
NEXT_PUBLIC_SITE_URL=https://dmxtechservices.com
```

---

## Execution Order for Orchestrator
1. **Backend Dev** — Set up Sanity project, all schemas, client, queries, and API routes
2. **Frontend Dev** (parallel with Backend) — Set up layout, global styles, Navbar, Footer
3. **Frontend Dev** — Build Homepage (Hero, Services preview, Training preview, Testimonials, CTA)
4. **Frontend Dev** — Build Services page + dynamic [slug] page
5. **Frontend Dev** — Build Training page + dynamic [slug] page
6. **Frontend Dev** — Build About, Blog index, Blog [slug], Contact pages
7. **SEO Specialist** — Add metadata, JSON-LD, sitemap, robots to all pages
8. **Tester** — Run TypeScript check, unit tests, E2E tests, a11y audit, Lighthouse

---

**Start now. Show me the task breakdown before writing any code.**