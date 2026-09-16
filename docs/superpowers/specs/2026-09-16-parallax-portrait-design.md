> Implementation note (2026-09-16): the portrait ships as one image layer at +50px, scale-compensated and masked to the disc silhouette, instead of the separate clipped head layer described below (the two-layer version showed a seam under tilt). Chip parallax factors shipped at 0.8 / 0.6 / 1.0 instead of 1.6 / 1.2 / 2.0. The sheen sits in front of the portrait at +60px and moves via transform. The portrait column gets 24px of right padding between 1024px and 1279px (`lg:pr-6 xl:pr-0`) so the magnified Figma chip stays inside the hero's clipped edge where the container is fluid; at 1280px and up the layout is unchanged.

# Layered depth parallax for the hero portrait

Date: 2026-09-16
Supersedes: `2026-09-16-3d-logo-badge-design.md` (the 3D JC logo badge was built, reviewed in the
browser, and rejected: at badge size it read as a clipped afterthought at the viewport edge).

## Goal

Give the hero portrait a real sense of depth without touching its look. The existing layers
(glow, hairline ring, aurora disc with the clipped body, the unclipped head, three floating tool
chips) become a 3D stack in a perspective container. The stack tilts toward the cursor, drifts
slowly when idle, and a soft sheen slides across the disc as it turns. Pure CSS transforms driven
by two CSS variables; no WebGL, no new dependencies.

## Decisions

- Approach: layered 2.5D parallax. img2threejs and image-to-3D were rejected for a photo of a
  person (stylized output, no likeness guarantee).
- Motion level: lively. Cursor tilt up to 12 degrees on both axes, eased. Idle drift of about
  4 degrees on a 9-second loop when the cursor is not over the hero. Chips get extra parallax so
  they swing further than the disc. A highlight sheen on the disc moves opposite to the tilt.
- Touch devices (`pointer: coarse`): drift only, no tilt. Reduced motion: no drift, no tilt; the
  layers keep their depth so the stack still reads as 3D when static.
- The animation frame runs only while the portrait is on screen and the tab is visible.
- Cleanup: the badge component, model factory, smoke check, dev preview page, archived pipeline
  output under `docs/3d/`, and the `three` dependency are removed. The superseded spec and plan
  stay in `docs/superpowers/` with a one-line note at the top.

## Component: `src/components/HeroPortrait.vue`

The portrait block currently inline in `HeroSection.vue` moves here verbatim, then gains depth.
No props. The root element keeps the grid-column classes the hero relies on
(`flex justify-center pt-10 lg:col-span-5 lg:justify-end lg:pt-0`) and adds `perspective`.

Layer order, back to front, with `translateZ` depth:

| Layer | Depth | Notes |
|---|---|---|
| glow | -80px | existing blurred accent disc |
| ring | -40px | existing hairline ring |
| disc | 0 | existing card disc with aurora gradient, clipped body image, and a new sheen overlay inside it |
| head | +50px | existing unclipped duplicate, clip-path unchanged |
| chip Vue | +90px, parallax factor 1.6 | existing chip, float animation kept |
| chip Figma | +70px, parallax factor 1.2 | |
| chip Tailwind | +110px, parallax factor 2.0 | |

The stack element has `transform-style: preserve-3d` and
`transform: rotateX(calc(var(--tx) * 1deg)) rotateY(calc(var(--ty) * 1deg))`. Each chip is
wrapped in an orbit element that carries `translateZ` and a parallax translate of
`calc(var(--ty) * var(--p) * 1px), calc(var(--tx) * var(--p) * -1px)`; the inner chip keeps the
existing `chip-float` animation so the two transforms never fight. The sheen is a diagonal
white gradient at low opacity whose `background-position` shifts by `var(--ty)` and `var(--tx)`.

`--tx` and `--ty` are unitless numbers in degrees, set on the stack by the component. Convention:
the edge nearest the cursor comes toward the viewer (cursor at the top lifts the top edge).

## Motion logic

- Pointer: `pointermove` on the closest `section` ancestor maps the pointer to `[-1, 1]` on both
  axes; target = `{ tx: -ny * 12, ty: -nx * 12 }`. `pointerleave` clears the hover flag.
- Idle: when not hovering, target = `{ tx: sin(t) * 4, ty: cos(0.7 t) * 4 }` with
  `t = now / 9000 * 2π`.
- Each frame: `current += (target - current) * 0.08`, then write both variables.
- Gating: `IntersectionObserver` on the root and `visibilitychange`; the loop runs only when
  both say visible. Pointer listeners are skipped under `(pointer: coarse)`. Under
  `(prefers-reduced-motion: reduce)` nothing runs and the variables stay at 0.
- Unmount: cancel the frame, disconnect the observer, remove listeners.

## Hero integration

`HeroSection.vue` replaces the inline portrait block with `<HeroPortrait />` (static import, it
is small) and drops the portrait-specific scoped styles that moved with it. Copy, CTAs, role
cycler, aurora beam, and layout are unchanged.

## Verification

No test suite exists. Done means:

- `npm run build` succeeds with no `three` chunk and no reference to the removed files.
- Playwright screenshots of the hero at 1280x800 and 400x800 in dark and light: no horizontal
  scroll at 400px, head and chips not clipped, portrait looks identical to before at rest apart
  from the idle drift.
- Two tilted screenshots (pointer at top-left and bottom-right of the hero) show the head proud
  of the rim and the chips displaced further than the disc.
- Reduced-motion emulation: the variables stay at 0 and no frame loop runs.
