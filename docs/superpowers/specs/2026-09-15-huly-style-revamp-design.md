# Portfolio revamp: Huly-inspired aurora design

Date: 2026-09-15
Reference: https://styles.refero.design/style/d018e81d-6bb6-4445-86d7-39fd6be7e74d (Huly design system)

## Goal

Redesign jchinwor.com (Vue 3 + Vite + Tailwind 4) to match the Huly style in structure and mood while staying unique to Jenkins' brand. Keep all existing content, project data, email service, chat widget, SEO meta and theme persistence.

## Decisions

- Palette: cyan-to-violet aurora. Cyan stays the brand accent, tuned to `#22d3ee` for contrast. Violet `#7c5cff` is used only inside the aurora gradient. No third accent.
- Theme: dark-first. Existing light/dark toggle stays and light mode must still look intentional.
- Fonts: Sora (display, 28px+) and Inter (everything else) from Google Fonts. Montserrat removed.
- Shapes: pill buttons and tags (9999px), cards 12px, panels 28px, inputs 4px. Minimal shadows; glow via gradient strokes.
- Icons: monochrome grey, white on hover. Never multicolor.
- Layout: max-width 1200px, 96px section gap on desktop, 4px base unit.

## Tokens (style.css)

Dark: canvas `#0a0a0c`, card `#111214`, band `#1a1b1f`, edge `rgba(255,255,255,0.08)`, text `#f4f4f6`, muted `#95979e`.
Light: canvas `#ffffff`, card `#ffffff`, band `#f4f4f6`, edge `rgba(0,0,0,0.08)`, text `#0a0a0c`, muted `#5d5f66`.
Accent `#22d3ee`, accent-2 `#7c5cff`.

Expose as Tailwind `@theme` colors so classes like `bg-canvas`, `text-muted`, `border-edge`, `text-accent` work.

## Sections (order unchanged)

1. Navbar: floating centred pill with the four links, logo left, theme toggle right. Mobile drawer kept, restyled.
2. Hero: narrow vertical aurora beam (cyan to violet, blurred) behind content. Availability pill, Sora headline, role cycler, existing intro copy, new line "Based in Ghana, working worldwide.", two pill CTAs (View Works, Contact Me), social icons. Photo in a tilted framed card with gradient stroke on the right.
3. Stats strip: four counters in one hairline row directly under the hero. CountUp on intersect kept.
4. Services: kicker "What I do", title, existing subtitle. Four 12px cards on a band panel, numbered 01-04, icon in rounded square, existing copy.
5. Technologies: kicker "Toolbox", title. Swiper marquee kept, inside a hairline rail with fade edges. Logos greyscale until hover.
6. Projects: kicker "Selected work", title, pill filters. Coverflow swiper replaced with a responsive grid (1/2/3 cols) of ProjectCard. Card: framed screenshot, title, description, tags, live link or "Private".
7. Contact: kicker "Get in touch", title. One 28px panel: left column with heading, existing blurb, socials; right column with existing form (4px inputs). Validation and SendEmail untouched.
8. Footer: same three columns and copyright, hairline top border, new tokens.
9. BackToTop and LoadingSpinner restyled to tokens.

## Component changes

- `style.css`: fonts, tokens, dark variant, small utilities (aurora, kicker).
- `UI/Button.vue`: pill primary button (white on dark, black on light) with optional `variant="ghost"`. Rotating gradient removed.
- `UI/SectionHeader.vue`: kicker + Sora title, left-aligned by default, `align="center"` option. Stroke text and blurred blobs removed.
- `UI/Input.vue`: 4px radius, token borders, focus ring in accent.
- `UI/ProjectCard.vue`: framed screenshot card.
- `About.vue` and `UI/SkillCard.vue`: unused; delete.
- `Counter.vue` renamed in spirit to a stats strip but file name kept.
- Remove `swiper/css/effect-coverflow` and navigation imports from Projects.

## Testing

No test suite exists. Verification: `npm run build` succeeds; `npm run dev` renders every section in dark and light mode at desktop and 400px width without horizontal scroll; project filters, counter animation, contact validation, theme toggle and mobile drawer all still work.
