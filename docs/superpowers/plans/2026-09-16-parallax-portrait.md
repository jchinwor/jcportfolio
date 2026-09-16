> Implementation note (2026-09-16): Task 3 shipped with a single masked portrait layer, chip parallax 0.8 / 0.6 / 1.0, and a transform-driven sheen in front of the portrait; see the note at the top of the spec.

# Parallax Portrait Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the hero portrait into a layered 3D stack that tilts toward the cursor, drifts when idle, and shows a moving sheen, per `docs/superpowers/specs/2026-09-16-parallax-portrait-design.md`, after removing the abandoned 3D logo badge.

**Architecture:** The portrait markup moves from `HeroSection.vue` into a new `HeroPortrait.vue`. A perspective container holds a `preserve-3d` stack whose layers sit at fixed `translateZ` depths. A small script writes two unitless CSS variables (`--tx`, `--ty`, degrees) each frame; all rotation, parallax, and sheen movement is CSS reading those variables. No WebGL, no new dependencies.

**Tech Stack:** Vue 3, Vite 6, Tailwind 4. Playwright (global install, verification only).

## Global Constraints

- Max cursor tilt `12` degrees on both axes; idle drift `4` degrees on a `9000` ms loop; easing `current += (target - current) * 0.08` per frame.
- Layer depths: glow `-80px`, ring `-40px`, disc `0`, head `+50px`, chips `+90px` / `+70px` / `+110px` with parallax factors `1.6` / `1.2` / `2.0` (Vue, Figma, Tailwind).
- Convention: the edge nearest the cursor comes toward the viewer. `target = { tx: -ny * 12, ty: -nx * 12 }`.
- `(pointer: coarse)`: no pointer listeners, drift only. `(prefers-reduced-motion: reduce)`: no loop, variables stay `0`, depths kept.
- Frame loop only while the root is intersecting and `document.visibilityState === 'visible'`.
- Portrait images, tokens, copy, CTAs, role cycler, aurora beam, and layout unchanged. No horizontal scroll at 400px.
- The `three` dependency, `LogoBadge3D.vue`, `src/three/`, `dev/`, and `docs/3d/` are removed.

## File Structure

| Path | Responsibility |
|---|---|
| `src/components/HeroPortrait.vue` | Portrait stack: layers, depths, sheen, tilt/drift script, gating. |
| `src/components/HeroSection.vue` | Hero copy and layout; mounts `HeroPortrait`. |
| `docs/superpowers/specs/2026-09-16-3d-logo-badge-design.md`, `docs/superpowers/plans/2026-09-16-3d-logo-badge.md` | Gain a one-line superseded note. |

---

### Task 1: Remove the abandoned 3D logo badge

**Files:**
- Delete: `src/components/UI/LogoBadge3D.vue`, `src/three/createJcLogoModel.js`, `src/three/logoModel.smoke.mjs`, `dev/preview.html`, `dev/preview.js`, everything under `docs/3d/`
- Modify: `package.json`, `package-lock.json` (npm uninstall), `docs/superpowers/specs/2026-09-16-3d-logo-badge-design.md:1`, `docs/superpowers/plans/2026-09-16-3d-logo-badge.md:1`

**Interfaces:**
- Produces: a tree with no reference to `three` or the removed files. Task 2 starts from `HeroSection.vue` exactly as committed at `dc35e30`.

- [ ] **Step 1: Confirm nothing imports the files being removed**

```bash
cd /c/Users/Administrator/Desktop/jenkins && grep -rn "LogoBadge3D\|createJcLogoModel\|from 'three'\|from \"three\"" src index.html
```
Expected: matches only inside `src/components/UI/LogoBadge3D.vue`, `src/three/createJcLogoModel.js`, and `src/three/logoModel.smoke.mjs`. If `HeroSection.vue` matches, stop and report; it must not.

- [ ] **Step 2: Remove files and the dependency**

```bash
git rm -q -r src/components/UI/LogoBadge3D.vue src/three dev docs/3d
npm uninstall three
git status --short
```
Expected: the deletions staged, `package.json` no longer lists `three`, `package-lock.json` modified.

- [ ] **Step 3: Mark the old spec and plan as superseded**

Insert as the very first line of `docs/superpowers/specs/2026-09-16-3d-logo-badge-design.md`:
```markdown
> Superseded on 2026-09-16 by `2026-09-16-parallax-portrait-design.md`. The badge shipped to a branch, was reviewed in the browser, and was rejected. Kept for the record.

```
Insert as the very first line of `docs/superpowers/plans/2026-09-16-3d-logo-badge.md`:
```markdown
> Superseded on 2026-09-16 by `2026-09-16-parallax-portrait.md`. Tasks 1-4 were executed and then reverted; see git history on `feat/3d-logo-badge`.

```

- [ ] **Step 4: Verify the build**

```bash
npm run build
```
Expected: success; the chunk list contains no `LogoBadge3D` or `three` chunk.

- [ ] **Step 5: Commit**

```bash
git add -A package.json package-lock.json docs/superpowers
git commit -m "Remove the 3D logo badge and its three.js pipeline

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Extract `HeroPortrait.vue` with no visual change

**Files:**
- Create: `src/components/HeroPortrait.vue`
- Modify: `src/components/HeroSection.vue` (portrait block lines 76-113; scoped styles `.portrait-img`, `.portrait-head`, `.chip`, `chip-float` keyframes and their reduced-motion rule)

**Interfaces:**
- Produces: `<HeroPortrait />`, no props, renders the grid column previously inline. Task 3 adds depth and motion inside this file only.

- [ ] **Step 1: Create the component with the markup moved verbatim**

`src/components/HeroPortrait.vue`:
```vue
<template>
  <!-- Portrait rising out of an aurora orb. The cutout's rounded bottom edge sits inside the disc,
       the head breaks above the rim, and a few tool chips float around it. -->
  <div class="flex justify-center pt-10 lg:col-span-5 lg:justify-end lg:pt-0">
    <div class="portrait relative w-64 sm:w-72 lg:w-80 xl:w-[22rem]">
      <!-- Glow -->
      <div class="absolute -inset-12 rounded-full bg-accent/20 blur-3xl dark:bg-accent/15" aria-hidden="true"></div>

      <!-- Outer hairline ring -->
      <div class="absolute -inset-5 rounded-full border border-edge sm:-inset-7" aria-hidden="true"></div>

      <!-- Disc: dark card with an aurora stroke, violet pooling at the base -->
      <div class="gradient-stroke relative aspect-square overflow-hidden rounded-full bg-card">
        <div
          class="absolute inset-0 rounded-full"
          style="background: radial-gradient(circle at 50% 115%, color-mix(in oklab, var(--accent-2) 85%, transparent), color-mix(in oklab, var(--accent) 35%, transparent) 42%, transparent 68%)"
          aria-hidden="true"
        ></div>
        <!-- Body: clipped to the disc -->
        <img
          src="@/assets/jenkinsv5.png"
          alt="Portrait of Jenkins Chinwor"
          fetchpriority="high"
          class="portrait-img absolute inset-x-0 bottom-0 w-full"
        />
      </div>

      <!-- Head: the same image, unclipped, showing only its upper part so it rises above the rim -->
      <img
        src="@/assets/jenkinsv5.png"
        alt=""
        aria-hidden="true"
        class="portrait-img portrait-head pointer-events-none absolute inset-x-0 bottom-0 w-full"
      />

      <!-- Floating tool chips -->
      <div class="chip absolute -left-3 top-6 sm:-left-6" style="--delay: 0s">
        <img src="/logos/vuejs.png" alt="Vue.js" class="h-6 w-6 object-contain" />
      </div>
      <div class="chip absolute -right-2 top-1/3 sm:-right-5" style="--delay: -2s">
        <img src="/logos/figma.png" alt="Figma" class="h-6 w-6 object-contain" />
      </div>
      <div class="chip absolute -bottom-1 left-8 sm:left-6" style="--delay: -4s">
        <img src="/logos/tailwindcss.png" alt="Tailwind CSS" class="h-6 w-6 object-contain" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The cutout is 415x430 with a circular bottom edge. Scaled slightly wider than the disc and
   nudged down, its arc sits just inside the rim while the head clears the top. */
.portrait-img {
  width: 104%;
  left: -2%;
  bottom: -1%;
  max-width: none;
}
/* Only the upper part of the duplicate is painted, so it never reaches the disc's clipped edge. */
.portrait-head {
  clip-path: inset(0 0 52% 0);
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: var(--card);
  border: 1px solid var(--edge-strong);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  animation: chip-float 6s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
@keyframes chip-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@media (prefers-reduced-motion: reduce) {
  .chip { animation: none; }
}
</style>
```

- [ ] **Step 2: Replace the block in `HeroSection.vue`**

Delete the whole portrait column (from the `<!-- Portrait rising out of an aurora orb...` comment through the closing `</div>` of `flex justify-center ... lg:pt-0`) and put in its place:
```html
      <HeroPortrait />
```
In `<script setup>`, after `import Button from "./UI/Button.vue";` add:
```js
import HeroPortrait from "./HeroPortrait.vue";
```
In the scoped `<style>`, delete the `.portrait-img`, `.portrait-head`, `.chip`, `@keyframes chip-float`, and the `@media (prefers-reduced-motion: reduce) { .chip ... }` rules. Keep `@keyframes blink` and `.animate-blink`.

- [ ] **Step 3: Verify no visual change**

```bash
npm run build && npm run dev
```
With the global Playwright (`%APPDATA%\npm\node_modules\playwright`), screenshot `http://localhost:5173/` at 1280x800 before (stash the change: `git stash`, screenshot, `git stash pop`) and after; the two hero screenshots must be pixel-identical apart from the role cycler text and the chip float phase. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroPortrait.vue src/components/HeroSection.vue
git commit -m "Extract the hero portrait into HeroPortrait.vue

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Depth, tilt, drift, and sheen

**Files:**
- Modify: `src/components/HeroPortrait.vue` (template classes, new `<script setup>`, scoped styles)

**Interfaces:**
- Consumes: the markup from Task 2.
- Produces: the finished portrait. Two CSS variables on the stack, `--tx` and `--ty`, unitless degrees.

- [ ] **Step 1: Add the layers and depth classes to the template**

Replace the template with:
```vue
<template>
  <!-- Portrait rising out of an aurora orb. Every layer sits at its own depth in a perspective
       stack; the script tilts the stack toward the cursor and drifts it when idle. -->
  <div ref="root" class="stage flex justify-center pt-10 lg:col-span-5 lg:justify-end lg:pt-0">
    <div ref="stack" class="stack portrait relative w-64 sm:w-72 lg:w-80 xl:w-[22rem]">
      <!-- Glow -->
      <div class="layer glow absolute -inset-12 rounded-full bg-accent/20 blur-3xl dark:bg-accent/15" aria-hidden="true"></div>

      <!-- Outer hairline ring -->
      <div class="layer ring absolute -inset-5 rounded-full border border-edge sm:-inset-7" aria-hidden="true"></div>

      <!-- Disc: dark card with an aurora stroke, violet pooling at the base -->
      <div class="layer disc gradient-stroke relative aspect-square overflow-hidden rounded-full bg-card">
        <div
          class="absolute inset-0 rounded-full"
          style="background: radial-gradient(circle at 50% 115%, color-mix(in oklab, var(--accent-2) 85%, transparent), color-mix(in oklab, var(--accent) 35%, transparent) 42%, transparent 68%)"
          aria-hidden="true"
        ></div>
        <!-- Body: clipped to the disc -->
        <img
          src="@/assets/jenkinsv5.png"
          alt="Portrait of Jenkins Chinwor"
          fetchpriority="high"
          class="portrait-img absolute inset-x-0 bottom-0 w-full"
        />
        <!-- Sheen: slides opposite to the tilt -->
        <div class="sheen absolute inset-0 rounded-full" aria-hidden="true"></div>
      </div>

      <!-- Head: the same image, unclipped, showing only its upper part so it rises above the rim -->
      <img
        src="@/assets/jenkinsv5.png"
        alt=""
        aria-hidden="true"
        class="layer head portrait-img portrait-head pointer-events-none absolute inset-x-0 bottom-0 w-full"
      />

      <!-- Floating tool chips: the orbit wrapper carries depth and parallax, the chip keeps its float -->
      <div class="orbit absolute -left-3 top-6 sm:-left-6" style="--z: 90px; --p: 1.6">
        <div class="chip" style="--delay: 0s">
          <img src="/logos/vuejs.png" alt="Vue.js" class="h-6 w-6 object-contain" />
        </div>
      </div>
      <div class="orbit absolute -right-2 top-1/3 sm:-right-5" style="--z: 70px; --p: 1.2">
        <div class="chip" style="--delay: -2s">
          <img src="/logos/figma.png" alt="Figma" class="h-6 w-6 object-contain" />
        </div>
      </div>
      <div class="orbit absolute -bottom-1 left-8 sm:left-6" style="--z: 110px; --p: 2">
        <div class="chip" style="--delay: -4s">
          <img src="/logos/tailwindcss.png" alt="Tailwind CSS" class="h-6 w-6 object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Add the script**

Insert after the template:
```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const MAX_TILT = 12;      // degrees, cursor
const DRIFT = 4;          // degrees, idle
const DRIFT_PERIOD = 9000; // ms per loop
const EASE = 0.08;

const root = ref(null);
const stack = ref(null);

let hero = null;
let observer = null;
let frame = 0;
let hovering = false;
let visible = false;
let pageVisible = true;
let target = { tx: 0, ty: 0 };
let current = { tx: 0, ty: 0 };

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  pageVisible = document.visibilityState === "visible";
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  observer.observe(root.value);
  document.addEventListener("visibilitychange", onVisibility);

  if (!window.matchMedia("(pointer: coarse)").matches) {
    hero = root.value.closest("section");
    hero?.addEventListener("pointermove", onPointerMove);
    hero?.addEventListener("pointerleave", onPointerLeave);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  document.removeEventListener("visibilitychange", onVisibility);
  hero?.removeEventListener("pointermove", onPointerMove);
  hero?.removeEventListener("pointerleave", onPointerLeave);
});

function onVisibility() {
  pageVisible = document.visibilityState === "visible";
  schedule();
}

function schedule() {
  cancelAnimationFrame(frame);
  if (visible && pageVisible) frame = requestAnimationFrame(tick);
}

function tick(now) {
  if (!hovering) {
    const t = (now / DRIFT_PERIOD) * Math.PI * 2;
    target = { tx: Math.sin(t) * DRIFT, ty: Math.cos(t * 0.7) * DRIFT };
  }
  current.tx += (target.tx - current.tx) * EASE;
  current.ty += (target.ty - current.ty) * EASE;
  stack.value.style.setProperty("--tx", current.tx.toFixed(3));
  stack.value.style.setProperty("--ty", current.ty.toFixed(3));
  frame = requestAnimationFrame(tick);
}

function onPointerMove(e) {
  const r = hero.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
  hovering = true;
  // The edge nearest the cursor comes toward the viewer.
  target = { tx: -ny * MAX_TILT, ty: -nx * MAX_TILT };
}

function onPointerLeave() {
  hovering = false;
}
</script>
```

- [ ] **Step 3: Add the depth and sheen styles**

Replace the scoped style block with:
```vue
<style scoped>
.stage {
  perspective: 1200px;
}
.stack {
  --tx: 0;
  --ty: 0;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--tx) * 1deg)) rotateY(calc(var(--ty) * 1deg));
  will-change: transform;
}
.layer {
  transform: translateZ(var(--z, 0px));
}
.glow { --z: -80px; }
.ring { --z: -40px; }
.disc { --z: 0px; }
.head { --z: 50px; }

/* Chips: depth plus a parallax translate that grows with --p, so they swing further than the disc. */
.orbit {
  transform: translateZ(var(--z)) translate(calc(var(--ty) * var(--p) * 1px), calc(var(--tx) * var(--p) * -1px));
}

/* Sheen: a soft diagonal highlight that slides against the tilt. */
.sheen {
  pointer-events: none;
  background: linear-gradient(115deg, transparent 38%, rgba(255, 255, 255, 0.22) 50%, transparent 62%);
  background-size: 220% 220%;
  background-position: calc(50% - var(--ty) * 3%) calc(50% + var(--tx) * 3%);
  opacity: 0.7;
  mix-blend-mode: soft-light;
}
:root:not(.dark) .sheen,
.sheen:where(:root:not(.dark) *) {
  opacity: 0.4;
}

/* The cutout is 415x430 with a circular bottom edge. Scaled slightly wider than the disc and
   nudged down, its arc sits just inside the rim while the head clears the top. */
.portrait-img {
  width: 104%;
  left: -2%;
  bottom: -1%;
  max-width: none;
}
/* Only the upper part of the duplicate is painted, so it never reaches the disc's clipped edge. */
.portrait-head {
  clip-path: inset(0 0 52% 0);
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: var(--card);
  border: 1px solid var(--edge-strong);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  animation: chip-float 6s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
@keyframes chip-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@media (prefers-reduced-motion: reduce) {
  .chip { animation: none; }
}
</style>
```
Note on the light-mode sheen selector: scoped styles get a data attribute, so a plain `:root:not(.dark) .sheen` may not compile as intended. Use `:global(html:not(.dark)) .sheen { opacity: 0.4; }` if the first form has no effect; keep whichever one works and delete the other.

- [ ] **Step 4: Verify in the browser**

```bash
npm run build && npm run dev
```
Drive `http://localhost:5173/` with the global Playwright from the scratchpad:
1. 1280x800 dark: hover the hero at its top-left corner, wait 600 ms, screenshot the hero; then bottom-right, wait 600 ms, screenshot. Read `getComputedStyle(stack).getPropertyValue('--tx')` and `--ty` at each pose; expected about `+12/+12` at top-left and `-12/-12` at bottom-right (sign per the convention). The head should visibly overlap the rim differently in the two shots and the chips should move more than the disc.
2. Move the pointer outside the hero, wait 2 s, read the variables twice 500 ms apart; they must differ (drift) and stay within ±4.
3. Same page in light mode (`document.documentElement.classList.remove('dark')`), one screenshot at rest; sheen must be subtle, not a white smear.
4. 400x800 dark: screenshot; `document.documentElement.scrollWidth === window.innerWidth`.
5. `page.emulateMedia({ reducedMotion: 'reduce' })`, reload, wait 1 s: the variables read `0` and stay `0`.
6. Emulate a coarse pointer (`hasTouch: true` context, or override `matchMedia` via `addInitScript`): drift runs, hovering does not change the target beyond ±4.
Save screenshots to the scratchpad and list them. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroPortrait.vue
git commit -m "Add depth, cursor tilt, idle drift, and sheen to the hero portrait

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```
