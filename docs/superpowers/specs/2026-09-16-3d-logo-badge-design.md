> Superseded on 2026-09-16 by `2026-09-16-parallax-portrait-design.md`. The badge shipped to a branch, was reviewed in the browser, and was rejected. Kept for the record.

# 3D JC logo badge for the hero

Date: 2026-09-16
Tool: https://github.com/img2threejs/img2threejs (Claude Code skill, Python 3.10+ scripts, Three.js output)

## Goal

Add a real 3D element to the hero without disturbing the Huly-inspired layout from the
2026-09-15 revamp. The JC logo mark is rebuilt from `src/assets/jclogoblack.png` as a
code-only Three.js model using the img2threejs skill, then rendered as a small badge
hovering over the rim of the portrait orb. Everything else in the hero stays as it is.

## Decisions

- Subject: the JC logo mark (two letterforms plus the orange chevron). Not the portrait,
  not the tool logos.
- Placement: a small badge over the orb rim, top-right, next to the existing floating
  chips. The chips and the portrait are untouched.
- Motion: slow idle rotation about the vertical axis, plus a cursor tilt of a few degrees
  when the pointer moves over the hero section. Tilt is disabled on touch devices. Under
  `prefers-reduced-motion: reduce` there is no spin and no tilt; the logo sits in a fixed
  three-quarter pose.
- Tooling: run the real img2threejs pipeline (Approach A). Hand-written geometry is only
  a fallback if the generator's letterforms are rough after review.
- Theme: letterforms use the site's `--ink` token, so they are near-black in light mode
  and near-white in dark mode. The chevron stays brand orange (`#e08a00`, sampled from the
  source image) in both themes. Materials update live when the `dark` class toggles on
  `<html>`.

## Tooling setup

1. Install Python 3.12 via `winget install Python.Python.3.12` (the skill's scripts need
   Python 3.10+, standard library only).
2. `git clone https://github.com/img2threejs/img2threejs.git ~/.claude/skills/img2threejs`.
3. `npm install three`. No React Three Fiber, no TresJS; plain Three.js in a Vue component.

## Model generation

Run the skill against `src/assets/jclogoblack.png`:

```
/img2threejs Rebuild this logo as a Three.js model, keep the proportions and colours.
```

Artifacts are kept in `docs/3d/jc-logo/`:

- `spec.json`: the ObjectSculptSpec (component tree, materials, review history).
- `renders/`: the stage-by-stage comparison images the pipeline produces.
- `createJcLogoModel.ts`: the generated factory, kept verbatim for reference.

The factory is converted to plain JavaScript at `src/three/createJcLogoModel.js`. It
exports `createJcLogoModel({ ink, chevron })` and returns a `THREE.Group` centred at the
origin with a bounding box of about 2 units wide. The letterforms and the chevron are
separate meshes named `letters` and `chevron` so materials can be swapped without
rebuilding geometry. The chevron sits slightly proud of the letter face.

Fidelity target: the model read at badge size (5 to 6rem) is unmistakably the JC mark.
Letter counters, the notch between J and C, and the chevron's position relative to the J
must match the source. Sub-pixel details are out of scope.

## Badge component: `src/components/UI/LogoBadge3D.vue`

Owns one transparent WebGL canvas. No props. Responsibilities:

- Create a `WebGLRenderer` with `alpha: true`, `antialias: true`, pixel ratio capped at 2,
  sized to its container (default 5.5rem square, responsive via CSS).
- A `PerspectiveCamera` and two lights (one soft ambient, one directional key from
  upper-left) so the extrusion reads as depth.
- Build the model with `createJcLogoModel`, passing colours read from
  `getComputedStyle(document.documentElement)` for `--ink` and the fixed chevron colour.
- Watch the `class` attribute on `<html>` with a `MutationObserver`; on change, re-read
  `--ink` and update the `letters` material colour.
- Animation loop:
  - Idle: `rotation.y += 0.4 rad/s * dt`.
  - Tilt: listen to `pointermove` on the closest `section` ancestor (the hero). Map the
    pointer position within the section to target `rotation.x` and `rotation.z` in the
    range ±0.25 rad, eased with `lerp(current, target, 0.08)` per frame. Reset targets to
    zero on `pointerleave`.
  - Skipped entirely when `matchMedia('(prefers-reduced-motion: reduce)')` matches;
    the group is posed at `rotation.y = 0.5` and rendered once.
  - Tilt listeners are not attached when `matchMedia('(pointer: coarse)')` matches.
- The loop runs only while an `IntersectionObserver` reports the canvas visible and
  `document.visibilityState === 'visible'`.
- On unmount: cancel the frame, remove listeners, disconnect observers, dispose geometries,
  materials and the renderer.
- Fallback: if creating the renderer throws (no WebGL), render `<img>` with the existing
  `jclogo.png` (dark mode) or `jclogoblack.png` (light mode) at the same size instead of the
  canvas. The `alt` is "JC logo".

## Hero integration: `src/components/HeroSection.vue`

- Import `LogoBadge3D` with `defineAsyncComponent` so `three` lands in its own chunk and
  never blocks the hero's first paint.
- Render it inside the `.portrait` wrapper as an absolutely positioned element at the
  top-right of the orb, overlapping the rim (approximately `-top-4 -right-8` on desktop,
  tucked in on small screens). It shares the chips' float animation via the existing
  `chip-float` keyframes with its own delay, and follows the same reduced-motion rule.
- No other layout, copy, or component changes.

## Performance budget

- `three` core, tree-shaken, arrives as a lazy chunk. Target under 200 KB gzipped for the
  chunk including the model.
- No render while off screen or in a background tab.
- Pixel ratio capped at 2.

## Verification

No test suite exists. Done means:

- `npm run build` succeeds and reports a separate chunk for the badge.
- In `npm run dev`: the badge renders over the orb rim in dark and light mode; toggling the
  theme updates the letter colour without a reload; the hero at 400px width has no
  horizontal scroll; with reduced motion emulated in DevTools the logo is static; with
  WebGL disabled in DevTools the PNG fallback appears; the chips, role cycler, and CTAs
  still work.
- The render comparisons in `docs/3d/jc-logo/renders/` show the final model next to the
  source image.
