# O FIVE — Portfolio

Personal portfolio of a Nashville-based Full-Stack Engineer. Built with Next.js 15, GSAP, and Framer Motion. Deployed on Vercel.

---

## Contact

**Email** — [soultechethiopia@gmail.com](mailto:soultechethiopia@gmail.com)  
**Location** — Nashville, TN  
**Available** — 2026  

---

## Live Site

[05](https://solomonbk.com/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Font | Orbitron, Bebas Neue, DM Sans, JetBrains Mono |
| Deployment | Vercel |

---

## Features

- Cinematic hero with SVG fog/smoke distortion effect driven by GSAP
- Horizontal pinned scroll for projects section
- 3D card tilt with spotlight effect
- Game-style letter animations (slot machine counter, rotateX flip)
- Scroll-driven word highlight in the manifesto
- Video preview on project card hover
- Custom magnetic cursor
- Animated preloader
- Lenis smooth scroll with GSAP ticker sync
- Full black and white monochrome theme — hero video is the only color element
- Mobile-responsive with fullscreen overlay navigation

---

## Project Structure

```
ofive/
├── app/
│   ├── globals.css       — Tailwind v4, design tokens, animations
│   ├── layout.js         — Root layout, fonts, metadata
│   ├── page.js           — Page assembly
│   └── template.js       — Framer Motion page transitions
├── components/
│   ├── CustomCursor.js   — Two-part magnetic cursor
│   ├── FlipLetter.js     — Reusable game-style letter spin
│   ├── Footer.js         — Terminal data streams, email CTA
│   ├── GlowHeadline.js   — SVG fog filter headline component
│   ├── MagneticBtn.js    — GSAP magnetic pull button
│   ├── Navbar.js         — Fixed nav, blur background
│   ├── Preloader.js      — GSAP counter + wipe exit
│   └── SmoothScroll.js   — Lenis + GSAP ticker sync
├── sections/
│   ├── Hero.js           — Video background, fog headlines, CTAs
│   ├── About.js          — Word highlight manifesto, stats, pillars
│   ├── Projects.js       — Horizontal scroll, video hover, tilt cards
│   └── Skills.js         — 3D tilt cards, proficiency bars, badge cloud
└── public/
    ├── feature-1.png     — Project images
    ├── hero-ofive.mp4    — Hero background video
    └── videos/           — Project preview videos
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/ofive.git
cd ofive

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## Featured Projects

| Project | Stack | Link |
|---|---|---|
| APPLE | React, Three.js, GSAP | [Live](https://apple-website-omega-mocha.vercel.app) |
| MACHINETRACK | React, Node.js, MySQL, Socket.io | In Development |
| SOUL KITCHEN | Next.js 15, Framer Motion, Tailwind | [Live](https://soul-kitchen-amber.vercel.app) |
| SOULFLIX | Next.js, Firebase, TMDb API | [Live](https://soulflix-movie-app.vercel.app) |
| ABE GARAGE | Full Stack | [Live](https://abegaragemainapp-psi.vercel.app) |

---

## License

MIT © 2026 O FIVE