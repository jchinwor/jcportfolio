> Superseded on 2026-09-16 by `2026-09-16-parallax-portrait.md`. Tasks 1-4 were executed and then reverted; see git history on `feat/3d-logo-badge`.

# 3D JC Logo Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the JC logo mark as a code-only Three.js model with the img2threejs skill and render it as a small spinning, cursor-tilting badge over the hero orb rim, per `docs/superpowers/specs/2026-09-16-3d-logo-badge-design.md`.

**Architecture:** The img2threejs pipeline turns `src/assets/jclogoblack.png` into a spec JSON and a generated factory, archived under `docs/3d/jc-logo/`. A thin adapter `src/three/createJcLogoModel.js` exposes one stable function returning a `THREE.Group` with meshes named `letters` and `chevron`. A Vue component `LogoBadge3D.vue` owns the canvas, lights, animation loop, theme watching, visibility gating, and the PNG fallback. `HeroSection.vue` mounts it lazily over the orb rim.

**Tech Stack:** Vue 3, Vite 6, Tailwind 4, Three.js (`three` npm package, plain, no wrapper), img2threejs skill (Python 3.12, standard library only).

## Global Constraints

- Letterforms use the `--ink` CSS token (light `#0a0a0c`, dark `#f4f4f6`); chevron fixed `#e08a00` in both themes.
- Badge size 5.5rem square by default; positioned over the orb rim top-right; existing chips, portrait, copy, and layout untouched.
- Idle spin `0.4 rad/s` about Y. Cursor tilt within `±0.25 rad` on X and Z, eased with `lerp(current, target, 0.08)` per frame. No tilt when `(pointer: coarse)`. No spin and no tilt when `(prefers-reduced-motion: reduce)`; static pose `rotation.y = 0.5`.
- Render loop only while the canvas is intersecting and `document.visibilityState === 'visible'`. Pixel ratio capped at 2. Everything disposed on unmount.
- No WebGL: render `jclogo.png` (dark) or `jclogoblack.png` (light) `<img alt="JC logo">` instead.
- `three` must load as its own lazy chunk; target under 200 KB gzipped.
- `npm run build` must pass; no horizontal scroll at 400px width.

## File Structure

| Path | Responsibility |
|---|---|
| `docs/3d/jc-logo/assessment.json`, `spec.json`, `createJcLogoModel.ts`, `renders/` | Pipeline artifacts, kept verbatim for the fidelity record. |
| `dev/preview.html`, `dev/preview.js` | Dev-only Vite page that renders the model large for review screenshots. Not part of the production build. |
| `src/three/createJcLogoModel.js` | Stable factory: `createJcLogoModel({ ink, chevron }) → THREE.Group`. Wraps the generated factory, or the hand-authored extrusion if the generator's output is rejected in review. |
| `src/three/logoModel.smoke.mjs` | Node smoke check that the factory returns the expected named meshes. |
| `src/components/UI/LogoBadge3D.vue` | Canvas, renderer, lights, animation, theme sync, visibility gating, fallback. |
| `src/components/HeroSection.vue` | Mounts the badge over the orb rim. |

---

### Task 1: Tooling

**Files:**
- Modify: `package.json` (dependency added by npm)
- Create: `~/.claude/skills/img2threejs/` (clone, outside the repo)

**Interfaces:**
- Produces: `python` on PATH (3.12), the skill checkout, and `import * as THREE from 'three'` resolvable.

- [ ] **Step 1: Install Python 3.12**

Run (PowerShell):
```powershell
winget install --id Python.Python.3.12 -e --accept-package-agreements --accept-source-agreements
```
Then open a fresh shell and run:
```powershell
py -3.12 --version
```
Expected: `Python 3.12.x`. If `python` still opens the Microsoft Store, use `py -3.12` for every Python command in Task 2, or disable the Store alias under Settings > Apps > Advanced app settings > App execution aliases.

- [ ] **Step 2: Clone the skill**

```bash
git clone https://github.com/img2threejs/img2threejs.git ~/.claude/skills/img2threejs
ls ~/.claude/skills/img2threejs/forge
```
Expected: directories `stage1_intake`, `stage2_spec`, `stage3_build`, `stage4_review` are listed. The `/img2threejs` slash command becomes available in the next Claude Code session; Task 2 also gives the direct script path so nothing blocks on a restart.

- [ ] **Step 3: Add Three.js**

```bash
cd /c/Users/Administrator/Desktop/jenkins && npm install three
node -e "import('three').then(t => console.log(t.REVISION))"
```
Expected: a revision number such as `180` is printed.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add three.js dependency for the hero logo badge"
```

---

### Task 2: Generate the model with img2threejs

**Files:**
- Create: `docs/3d/jc-logo/assessment.json`, `docs/3d/jc-logo/spec.json`, `docs/3d/jc-logo/createJcLogoModel.ts`, `docs/3d/jc-logo/renders/*.png`
- Create: `dev/preview.html`, `dev/preview.js`

**Interfaces:**
- Consumes: `src/assets/jclogoblack.png` (417x209, black letterforms, orange chevron, transparent background).
- Produces: the generated TypeScript factory `createJcLogoModel(spec, options?) → THREE.Group` and its spec, both archived. Task 3 adapts them.

- [ ] **Step 1: Preferred path, the skill itself**

In Claude Code, with the skill installed:
```
/img2threejs Rebuild src/assets/jclogoblack.png as a Three.js model named JcLogo. Keep the proportions and colours: near-black letterforms, orange chevron. Two components, letters and chevron, the chevron slightly proud of the letter face. Write outputs to docs/3d/jc-logo/.
```
Follow the skill's review loop until it reports the pass locked. If the slash command is not yet available, use Step 2.

- [ ] **Step 2: Direct script path (same result, no slash command)**

Run from the repo root, using `py -3.12` if `python` is not on PATH:
```bash
SK=~/.claude/skills/img2threejs/forge
mkdir -p docs/3d/jc-logo/renders
python $SK/stage1_intake/probe_image.py src/assets/jclogoblack.png
python $SK/stage2_spec/new_pre_spec_assessment.py "JcLogo" --image src/assets/jclogoblack.png --out docs/3d/jc-logo/assessment.json
python $SK/stage2_spec/new_sculpt_spec.py "JcLogo" --image src/assets/jclogoblack.png --assessment docs/3d/jc-logo/assessment.json --out docs/3d/jc-logo/spec.json
python $SK/stage2_spec/validate_sculpt_spec.py docs/3d/jc-logo/spec.json --strict-quality
python $SK/stage3_build/generate_threejs_factory.py docs/3d/jc-logo/spec.json --out docs/3d/jc-logo/createJcLogoModel.ts
```
Expected: validation prints no blocking errors and the `.ts` factory exists. If `--strict-quality` blocks, open `spec.json`, fill the component tree so it lists exactly two top-level components (`letters`, `chevron`) with materials `ink` and `orange`, re-run validate, then generate.

- [ ] **Step 3: Create the dev preview page**

`dev/preview.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JC logo model preview</title>
    <style>
      body { margin: 0; display: grid; grid-template-columns: 1fr 1fr; height: 100vh; background: #ffffff; }
      body.dark { background: #0a0a0c; }
      img { width: 100%; height: 100%; object-fit: contain; }
      canvas { width: 100%; height: 100%; display: block; }
      button { position: fixed; top: 8px; left: 8px; }
    </style>
  </head>
  <body>
    <button id="toggle">Toggle theme</button>
    <img id="ref" src="/src/assets/jclogoblack.png" alt="reference" />
    <canvas id="c"></canvas>
    <script type="module" src="/dev/preview.js"></script>
  </body>
</html>
```

`dev/preview.js`:
```js
import * as THREE from 'three';
import { createJcLogoModel } from '../src/three/createJcLogoModel.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
camera.position.set(0, 0, 6);

scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(-3, 4, 5);
scene.add(key);

const colours = { light: { ink: '#0a0a0c' }, dark: { ink: '#f4f4f6' } };
let dark = false;
let model = createJcLogoModel({ ink: colours.light.ink, chevron: '#e08a00' });
scene.add(model);

document.getElementById('toggle').addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  document.getElementById('ref').src = dark ? '/src/assets/jclogo.png' : '/src/assets/jclogoblack.png';
  model.getObjectByName('letters').material.color.set(dark ? colours.dark.ink : colours.light.ink);
});

function resize() {
  const { clientWidth: w, clientHeight: h } = canvas;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Front view for the comparison sheet; press R to orbit.
let orbit = false;
window.addEventListener('keydown', (e) => { if (e.key === 'r') orbit = !orbit; });
renderer.setAnimationLoop((t) => {
  model.rotation.y = orbit ? t * 0.0005 : 0;
  renderer.render(scene, camera);
});
```
This page depends on `src/three/createJcLogoModel.js` from Task 3, so it renders only once Task 3 Step 3 is in place. Vite serves it at `http://localhost:5173/dev/preview.html` and excludes it from `npm run build` because only `index.html` is an entry.

- [ ] **Step 4: Commit the artifacts and preview page**

```bash
git add docs/3d/jc-logo dev
git commit -m "Generate JC logo Three.js model with img2threejs and add dev preview page"
```

---

### Task 3: Stable factory `createJcLogoModel`

**Files:**
- Create: `src/three/createJcLogoModel.js`
- Create: `src/three/logoModel.smoke.mjs`

**Interfaces:**
- Consumes: `docs/3d/jc-logo/createJcLogoModel.ts` and `spec.json` from Task 2.
- Produces: `export function createJcLogoModel({ ink, chevron }) → THREE.Group`. The group is centred at the origin, about 2 units wide, and contains exactly two `THREE.Mesh` children named `letters` and `chevron`, each with its own `MeshStandardMaterial`. Task 4 relies on the names and on `material.color`.

- [ ] **Step 1: Write the smoke check (fails until the file exists)**

`src/three/logoModel.smoke.mjs`:
```js
import * as THREE from 'three';
import { createJcLogoModel } from './createJcLogoModel.js';

const group = createJcLogoModel({ ink: '#f4f4f6', chevron: '#e08a00' });
const letters = group.getObjectByName('letters');
const chevron = group.getObjectByName('chevron');

function assert(cond, msg) { if (!cond) { console.error('FAIL:', msg); process.exit(1); } }

assert(group instanceof THREE.Group, 'returns a Group');
assert(letters && letters.isMesh, 'has a mesh named letters');
assert(chevron && chevron.isMesh, 'has a mesh named chevron');
assert(letters.material !== chevron.material, 'letters and chevron have separate materials');
assert(letters.material.color.getHexString() === 'f4f4f6', 'letters take the ink colour');
assert(chevron.material.color.getHexString() === 'e08a00', 'chevron takes the chevron colour');

const box = new THREE.Box3().setFromObject(group);
const size = box.getSize(new THREE.Vector3());
const centre = box.getCenter(new THREE.Vector3());
assert(size.x > 1.8 && size.x < 2.2, `width about 2 units (got ${size.x.toFixed(2)})`);
assert(Math.abs(centre.x) < 0.05 && Math.abs(centre.y) < 0.05, 'centred at origin');

const lb = new THREE.Box3().setFromObject(letters);
const cb = new THREE.Box3().setFromObject(chevron);
assert(cb.max.z > lb.max.z, 'chevron sits proud of the letter face');

console.log('PASS: createJcLogoModel smoke check');
```

- [ ] **Step 2: Run it to confirm it fails**

```bash
node src/three/logoModel.smoke.mjs
```
Expected: `Cannot find module ... createJcLogoModel.js`.

- [ ] **Step 3: Write the factory**

Option A, wrap the generated factory. Copy `docs/3d/jc-logo/createJcLogoModel.ts` to `src/three/generated/createJcLogoModel.js`, strip TypeScript type annotations, and import the spec as JSON. Then `src/three/createJcLogoModel.js`:
```js
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import spec from '../../docs/3d/jc-logo/spec.json';
import { createJcLogoModel as createGenerated } from './generated/createJcLogoModel.js';

const INK = '#0a0a0c';
const CHEVRON = '#e08a00';

/**
 * Stable entry point over the img2threejs output. Returns a Group centred at the origin,
 * about 2 units wide, with two meshes named "letters" and "chevron".
 */
export function createJcLogoModel({ ink = INK, chevron = CHEVRON } = {}) {
  const raw = createGenerated(spec);

  // Merge every mesh into two named parts so the badge can recolour them.
  const letterGeoms = [];
  const chevronGeoms = [];
  raw.updateMatrixWorld(true);
  raw.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry.clone().applyMatrix4(o.matrixWorld);
    (/chevron|arrow|orange/i.test(o.name) ? chevronGeoms : letterGeoms).push(g);
  });

  const group = new THREE.Group();
  group.add(namedMesh('letters', letterGeoms, ink));
  group.add(namedMesh('chevron', chevronGeoms, chevron));
  normalise(group);
  return group;
}

function namedMesh(name, geoms, colour) {
  // Generated meshes may carry different attribute sets; drop uv2/tangents so merge succeeds.
  geoms.forEach((g) => { g.deleteAttribute('uv2'); g.deleteAttribute('tangent'); });
  const geometry = geoms.length === 1 ? geoms[0] : mergeGeometries(geoms, false);
  if (!geometry) throw new Error(`createJcLogoModel: could not merge geometries for "${name}"`);
  const material = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.45, metalness: 0.1 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  return mesh;
}

function normalise(group) {
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  group.children.forEach((m) => m.geometry.translate(-centre.x, -centre.y, -centre.z));
  group.scale.setScalar(2 / size.x);
}
```
Option B, hand-authored extrusion. Use this when the review in Task 2 rejects the generated letterforms, or when the generated factory needs runtime pieces (custom shaders, textures) that push the chunk past budget. It is a complete implementation on its own; the shapes are traced from the 417x209 source in pixel space with Y flipped, then centred and scaled to 2 units wide.
```js
import * as THREE from 'three';

const INK = '#0a0a0c';
const CHEVRON = '#e08a00';
const W = 417;
const H = 209;

// Pixel-space outlines traced from src/assets/jclogoblack.png. y is flipped (three.js Y up).
const y = (v) => H - v;

function jShape() {
  // A bracket-shaped J: top bar, right stem, bottom bar. The chevron sits in the gap.
  const s = new THREE.Shape();
  s.moveTo(70, y(8));
  s.lineTo(160, y(8));
  s.lineTo(160, y(201));
  s.lineTo(70, y(201));
  s.lineTo(70, y(137));
  s.lineTo(125, y(137));
  s.lineTo(125, y(72));
  s.lineTo(70, y(72));
  s.closePath();
  return s;
}

function cShape() {
  // Bold C, open on the right, rounded on the left. Stroke 64px to match the J bars.
  const cx = 270;
  const cy = y(104.5);
  const s = new THREE.Shape();
  s.moveTo(345, y(8));
  s.lineTo(cx, y(8));
  s.absarc(cx, cy, 96.5, Math.PI / 2, (3 * Math.PI) / 2, false);
  s.lineTo(345, y(201));
  s.lineTo(345, y(137));
  s.lineTo(cx, y(137));
  s.absarc(cx, cy, 32.5, -Math.PI / 2, Math.PI / 2, true);
  s.lineTo(345, y(72));
  s.closePath();
  return s;
}

function chevronShape() {
  // Down-pointing band in the J's gap.
  const s = new THREE.Shape();
  s.moveTo(66, y(91));
  s.lineTo(96, y(113));
  s.lineTo(126, y(91));
  s.lineTo(126, y(105));
  s.lineTo(96, y(135));
  s.lineTo(66, y(105));
  s.closePath();
  return s;
}

function extrude(shapes, depth) {
  const g = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 3,
    bevelSegments: 3,
    curveSegments: 24,
  });
  g.translate(-W / 2, -H / 2, -depth / 2);
  return g;
}

/**
 * Returns a Group centred at the origin, about 2 units wide, with two meshes named
 * "letters" and "chevron". The chevron is extruded deeper so it sits proud of the letters.
 */
export function createJcLogoModel({ ink = INK, chevron = CHEVRON } = {}) {
  const group = new THREE.Group();

  const letters = new THREE.Mesh(
    extrude([jShape(), cShape()], 40),
    new THREE.MeshStandardMaterial({ color: ink, roughness: 0.45, metalness: 0.1 }),
  );
  letters.name = 'letters';

  const chev = new THREE.Mesh(
    extrude([chevronShape()], 48),
    new THREE.MeshStandardMaterial({ color: chevron, roughness: 0.35, metalness: 0.15 }),
  );
  chev.name = 'chevron';

  group.add(letters, chev);
  group.scale.setScalar(2 / W);
  return group;
}
```

- [ ] **Step 4: Run the smoke check**

```bash
node src/three/logoModel.smoke.mjs
```
Expected: `PASS: createJcLogoModel smoke check`. If the width or centring assertion fails under Option A, check that `normalise` ran after both meshes were added.

- [ ] **Step 5: Review fidelity in the preview page**

```bash
npm run dev
```
Open `http://localhost:5173/dev/preview.html`. Compare the render with the reference on the left in both themes (Toggle theme button). Acceptance: the notch between J and C, the letter counters, and the chevron's position in the J gap match the reference at a glance. Save a screenshot of each theme to `docs/3d/jc-logo/renders/final-light.png` and `final-dark.png`. If Option A fails this check after one round of spec edits, switch to Option B.

- [ ] **Step 6: Commit**

```bash
git add src/three docs/3d/jc-logo/renders
git commit -m "Add stable createJcLogoModel factory with node smoke check"
```

---

### Task 4: `LogoBadge3D.vue`

**Files:**
- Create: `src/components/UI/LogoBadge3D.vue`

**Interfaces:**
- Consumes: `createJcLogoModel({ ink, chevron })` from Task 3; meshes named `letters` and `chevron`.
- Produces: a self-contained component with no props, sized by its parent via CSS (`width`/`height` on the root element; defaults to 5.5rem). Task 5 places it.

- [ ] **Step 1: Write the component**

```vue
<template>
  <div ref="root" class="badge3d" aria-hidden="true">
    <canvas v-if="!fallback" ref="canvas" class="badge3d-canvas"></canvas>
    <img v-else :src="fallbackSrc" alt="JC logo" class="badge3d-img" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { createJcLogoModel } from '@/three/createJcLogoModel.js';
import logoLight from '@/assets/jclogoblack.png';
import logoDark from '@/assets/jclogo.png';

const CHEVRON = '#e08a00';
const SPIN = 0.4;          // rad/s
const TILT = 0.25;         // rad, max lean on X and Z
const EASE = 0.08;         // lerp factor per frame
const STATIC_POSE_Y = 0.5; // rad, reduced-motion pose

const root = ref(null);
const canvas = ref(null);
const fallback = ref(false);
const fallbackSrc = ref(logoLight);

let renderer, scene, camera, model, letters;
let frame = 0;
let last = 0;
let visible = false;
let pageVisible = true;
let reducedMotion = false;
let target = { x: 0, z: 0 };
let observer, mutation, resizeObs, hero;
const dark = () => document.documentElement.classList.contains('dark');
const inkColour = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0c';

onMounted(() => {
  fallbackSrc.value = dark() ? logoDark : logoLight;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
  } catch {
    fallback.value = true;
    watchThemeForFallback();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6);
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(-3, 4, 5);
  scene.add(key);

  model = createJcLogoModel({ ink: inkColour(), chevron: CHEVRON });
  letters = model.getObjectByName('letters');
  scene.add(model);

  resize();
  resizeObs = new ResizeObserver(resize);
  resizeObs.observe(root.value);

  mutation = new MutationObserver(() => {
    letters.material.color.set(inkColour());
    renderOnce();
  });
  mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  if (reducedMotion) {
    model.rotation.y = STATIC_POSE_Y;
    renderOnce();
    return;
  }

  observer = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    schedule();
  });
  observer.observe(canvas.value);
  document.addEventListener('visibilitychange', onVisibility);

  if (!window.matchMedia('(pointer: coarse)').matches) {
    hero = root.value.closest('section');
    hero?.addEventListener('pointermove', onPointerMove);
    hero?.addEventListener('pointerleave', onPointerLeave);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  mutation?.disconnect();
  resizeObs?.disconnect();
  document.removeEventListener('visibilitychange', onVisibility);
  hero?.removeEventListener('pointermove', onPointerMove);
  hero?.removeEventListener('pointerleave', onPointerLeave);
  model?.traverse((o) => {
    if (o.isMesh) {
      o.geometry.dispose();
      o.material.dispose();
    }
  });
  renderer?.dispose();
});

function resize() {
  if (!renderer || !root.value) return;
  const w = root.value.clientWidth || 88;
  const h = root.value.clientHeight || 88;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderOnce();
}

function renderOnce() {
  if (renderer) renderer.render(scene, camera);
}

function onVisibility() {
  pageVisible = document.visibilityState === 'visible';
  schedule();
}

function schedule() {
  cancelAnimationFrame(frame);
  if (visible && pageVisible) {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
}

function tick(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  model.rotation.y += SPIN * dt;
  model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, target.x, EASE);
  model.rotation.z = THREE.MathUtils.lerp(model.rotation.z, target.z, EASE);
  renderer.render(scene, camera);
  frame = requestAnimationFrame(tick);
}

function onPointerMove(e) {
  const r = hero.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1;  // -1 .. 1
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
  target = { x: ny * TILT, z: -nx * TILT };
}

function onPointerLeave() {
  target = { x: 0, z: 0 };
}

function watchThemeForFallback() {
  mutation = new MutationObserver(() => {
    fallbackSrc.value = dark() ? logoDark : logoLight;
  });
  mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
</script>

<style scoped>
.badge3d {
  width: 5.5rem;
  height: 5.5rem;
}
.badge3d-canvas,
.badge3d-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
```

- [ ] **Step 2: Mount it temporarily in the preview page to check behaviour**

Add to `dev/preview.html` body, before the script tag: `<div id="vue"></div>`, and append to `dev/preview.js`:
```js
import { createApp } from 'vue';
import LogoBadge3D from '../src/components/UI/LogoBadge3D.vue';
createApp({ components: { LogoBadge3D }, template: '<section style="padding:2rem"><LogoBadge3D /></section>' })
  .mount('#vue');
```
Run `npm run dev`, open the preview page. Check: the badge spins; moving the pointer within its section leans it; leaving resets; Toggle theme is not wired to the `.dark` class here, so run `document.documentElement.classList.toggle('dark')` in the console and confirm the letters recolour; in DevTools Rendering panel set `prefers-reduced-motion: reduce`, reload, confirm it is static at a three-quarter pose; disable WebGL (chrome://flags or `--disable-gpu` launch) and confirm the PNG appears.

Remove the temporary Vue mount from `dev/preview.js` and `dev/preview.html` afterwards.

- [ ] **Step 3: Commit**

```bash
git add src/components/UI/LogoBadge3D.vue
git commit -m "Add LogoBadge3D component rendering the JC logo model"
```

---

### Task 5: Mount the badge in the hero

**Files:**
- Modify: `src/components/HeroSection.vue` (template around the `.portrait` wrapper, lines 76-113; script imports, lines 118-121)

**Interfaces:**
- Consumes: `LogoBadge3D.vue` from Task 4.
- Produces: the hero with the badge over the orb rim, top-right.

- [ ] **Step 1: Lazy import**

In the `<script setup>` block, after `import Button from "./UI/Button.vue";` add:
```js
import { defineAsyncComponent } from "vue";
const LogoBadge3D = defineAsyncComponent(() => import("./UI/LogoBadge3D.vue"));
```
Merge the `defineAsyncComponent` import into the existing `import { ref, onMounted, onUnmounted } from "vue";` line rather than importing from `vue` twice.

- [ ] **Step 2: Place it**

Inside `<div class="portrait relative ...">`, directly after the three `.chip` elements, add:
```html
<!-- 3D JC mark hovering over the rim, top-right -->
<div class="badge absolute -right-6 -top-4 sm:-right-10 sm:-top-6" style="--delay: -3s">
  <LogoBadge3D />
</div>
```
Add to the scoped styles, after the `.chip` rules:
```css
.badge {
  width: 4.5rem;
  height: 4.5rem;
  animation: chip-float 7s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
.badge :deep(.badge3d) {
  width: 100%;
  height: 100%;
}
@media (min-width: 640px) {
  .badge { width: 5.5rem; height: 5.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .badge { animation: none; }
}
```

- [ ] **Step 3: Verify in the browser**

```bash
npm run dev
```
Open `http://localhost:5173/`. Check in dark and light: the badge sits over the orb rim top-right without covering the head; the Figma chip on the right is still visible (move the badge to `-top-8` if they collide); theme toggle recolours the letters live; at 400px width there is no horizontal scroll (the badge's negative offsets must stay inside the section's `overflow-hidden`); the role cycler, CTAs, and chips work as before.

- [ ] **Step 4: Verify the build and the chunk**

```bash
npm run build
```
Expected: success, and the output lists a separate chunk containing `three` (name like `LogoBadge3D-*.js`) whose gzip size is under 200 kB. If `three` is inlined into the main chunk, confirm the import in Step 1 is dynamic.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "Mount the 3D JC logo badge over the hero orb rim"
```

---

### Task 6: Final verification and wrap-up

**Files:**
- Modify: `docs/3d/jc-logo/README.md` (create)

- [ ] **Step 1: Record the pipeline outcome**

`docs/3d/jc-logo/README.md`:
```markdown
# JC logo model

Source: `src/assets/jclogoblack.png` (417x209).
Pipeline: img2threejs, see `spec.json` (review history inside) and `createJcLogoModel.ts`.
Runtime factory: `src/three/createJcLogoModel.js` (Option A: wraps the generated factory / Option B: hand-authored extrusion; state which).
Renders: `renders/final-light.png`, `renders/final-dark.png` next to the reference.
Preview page: `npm run dev` then `/dev/preview.html`.
Smoke check: `node src/three/logoModel.smoke.mjs`.
```
Replace the "Option A / Option B" line with the one that shipped.

- [ ] **Step 2: Run everything once more**

```bash
node src/three/logoModel.smoke.mjs && npm run build
```
Expected: `PASS: createJcLogoModel smoke check`, then a successful build with the lazy chunk listed.

- [ ] **Step 3: Commit**

```bash
git add docs/3d/jc-logo/README.md
git commit -m "Document the JC logo model pipeline and verification"
```
