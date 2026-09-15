# Huly-Style Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio to the cyan-to-violet aurora design in `docs/superpowers/specs/2026-09-15-huly-style-revamp-design.md` without changing content or behaviour.

**Architecture:** Design tokens live in `src/style.css` as Tailwind 4 `@theme` colors plus a `dark` custom variant. Every component is restyled to those tokens. Projects moves from a Swiper coverflow to a CSS grid. No new dependencies.

**Tech Stack:** Vue 3, Vite 6, Tailwind 4, Swiper (marquee only), vue-countup-v3, AOS, Iconify.

## Global Constraints

- Accent `#22d3ee`; violet `#7c5cff` only inside the aurora gradient; no third accent.
- Fonts: Sora display 28px+, Inter everywhere else. Montserrat removed.
- Radii: pill 9999px controls/tags, 12px cards, 28px panels, 4px inputs.
- Dark-first; light mode via existing `.dark` class toggle must remain intentional.
- Content, project data, email service, Smartsupp, SEO meta unchanged.
- No horizontal scroll at 400px width.

---

### Task 1: Tokens and fonts
**Files:** Modify `src/style.css`, `index.html` (title unchanged; add font preconnect only).
- [ ] Replace Montserrat import with Sora + Inter. Define `@theme` colors: canvas, card, band, edge, ink, muted, accent, accent-2. Set `font-sans` Inter, `font-display` Sora.
- [ ] Keep `@custom-variant dark`. Add `.aurora-beam`, `.kicker`, `.hairline` utilities.
- [ ] Verify: `npm run build` passes. Commit.

### Task 2: UI primitives
**Files:** Modify `src/components/UI/Button.vue`, `UI/SectionHeader.vue`, `UI/Input.vue`, `UI/ProjectCard.vue`. Delete `About.vue`, `UI/SkillCard.vue`.
- [ ] Button: pill, `variant` prop (`primary` | `ghost`), `type` prop, `disabled` support, `href` optional renders `<a>`.
- [ ] SectionHeader: `kicker`, `title`, `subtitle`, `align` props; Sora title.
- [ ] Input: 4px radius, token borders, accent focus ring, error state.
- [ ] ProjectCard: framed screenshot, 12px card, tags as pills, live link or Private.
- [ ] Verify build. Commit.

### Task 3: Navbar, Hero, Stats
**Files:** Modify `Navbar.vue`, `HeroSection.vue`, `Counter.vue`.
- [ ] Navbar: floating pill nav; keep scroll spy, drawer, theme toggle.
- [ ] Hero: aurora beam, Sora headline, role cycler, "Based in Ghana, working worldwide.", CTAs via Button, framed tilted photo card.
- [ ] Counter: hairline strip of four stats, CountUp on intersect kept.
- [ ] Verify build. Commit.

### Task 4: Services, Skills, Projects
**Files:** Modify `Services.vue`, `Skills.vue`, `Projects.vue`.
- [ ] Services: band panel, numbered 12px cards, SectionHeader with kicker "What I do".
- [ ] Skills: marquee inside hairline rail with mask fade; greyscale logos until hover.
- [ ] Projects: remove coverflow; grid 1/2/3 cols; pill filters; empty state kept.
- [ ] Verify build. Commit.

### Task 5: Contact, Footer, BackToTop, Spinner, App shell
**Files:** Modify `Contact.vue`, `Footer.vue`, `BackToTop.vue`, `LoadingSpinner.vue`, `App.vue`.
- [ ] Contact: 28px split panel, existing form logic untouched.
- [ ] Footer, BackToTop, Spinner, App: tokens.
- [ ] Verify: build, dev server renders all sections both themes, 400px no horizontal scroll, filters/counter/validation/toggle/drawer work. Commit.
