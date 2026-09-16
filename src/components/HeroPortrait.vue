<template>
  <!-- Portrait rising out of an aurora orb. Every layer sits at its own depth in a perspective
       stack; the script tilts the stack toward the cursor and drifts it when idle. -->
  <div ref="root" class="flex justify-center pt-10 lg:col-span-5 lg:justify-end lg:pt-0">
    <div class="stage">
      <div ref="stack" class="stack relative w-64 sm:w-72 lg:w-80 xl:w-[22rem]">
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
        </div>

        <!-- Portrait: one cutout with a rounded bottom edge, standing in front of the disc -->
        <img
          src="@/assets/jenkinsv5.png"
          alt="Portrait of Jenkins Chinwor"
          fetchpriority="high"
          class="figure portrait-img pointer-events-none absolute inset-x-0 bottom-0 w-full"
        />

        <!-- Sheen: a soft highlight in front of the portrait that slides against the tilt -->
        <div class="layer sheen pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true"></div>

        <!-- Floating tool chips: the orbit wrapper carries depth and parallax, the chip keeps its float -->
        <div class="orbit absolute -left-3 top-6 sm:-left-6" style="--z: 90px; --p: 0.8">
          <div class="chip" style="--delay: 0s">
            <img src="/logos/vuejs.png" alt="Vue.js" class="h-6 w-6 object-contain" />
          </div>
        </div>
        <div class="orbit absolute -right-2 top-1/3 sm:-right-5" style="--z: 70px; --p: 0.6">
          <div class="chip" style="--delay: -2s">
            <img src="/logos/figma.png" alt="Figma" class="h-6 w-6 object-contain" />
          </div>
        </div>
        <div class="orbit absolute -bottom-1 left-8 sm:left-6" style="--z: 110px; --p: 1">
          <div class="chip" style="--delay: -4s">
            <img src="/logos/tailwindcss.png" alt="Tailwind CSS" class="h-6 w-6 object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
let reduceQuery = null;
let frame = 0;
let coarse = false;
let running = false;
let hovering = false;
let visible = false;
let pageVisible = true;
let target = { tx: 0, ty: 0 };
let current = { tx: 0, ty: 0 };

onMounted(() => {
  coarse = window.matchMedia("(pointer: coarse)").matches;
  reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceQuery.addEventListener("change", onReduceChange);
  if (!reduceQuery.matches) start();
});

onBeforeUnmount(() => {
  stop();
  reduceQuery?.removeEventListener("change", onReduceChange);
});

// Reduced motion can flip while the page is open, so the whole rig starts and stops live.
function onReduceChange(event) {
  if (event.matches) stop();
  else start();
}

function start() {
  if (running || !root.value) return;
  running = true;
  pageVisible = document.visibilityState === "visible";
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  observer.observe(root.value);
  document.addEventListener("visibilitychange", onVisibility);

  if (!coarse) {
    hero = root.value.closest("section") ?? root.value.parentElement;
    hero?.addEventListener("pointermove", onPointerMove);
    hero?.addEventListener("pointerleave", onPointerLeave);
  }
}

function stop() {
  running = false;
  cancelAnimationFrame(frame);
  frame = 0;
  observer?.disconnect();
  observer = null;
  document.removeEventListener("visibilitychange", onVisibility);
  hero?.removeEventListener("pointermove", onPointerMove);
  hero?.removeEventListener("pointerleave", onPointerLeave);
  hero = null;
  hovering = false;
  visible = false;
  target = { tx: 0, ty: 0 };
  current = { tx: 0, ty: 0 };
  stack.value?.style.setProperty("--tx", "0");
  stack.value?.style.setProperty("--ty", "0");
}

function onVisibility() {
  pageVisible = document.visibilityState === "visible";
  schedule();
}

function schedule() {
  cancelAnimationFrame(frame);
  if (running && visible && pageVisible) {
    frame = requestAnimationFrame(tick);
  } else {
    frame = 0;
    hovering = false;
  }
}

function tick(now) {
  if (!hovering) {
    const t = (now / DRIFT_PERIOD) * Math.PI * 2;
    target = { tx: Math.sin(t) * DRIFT, ty: Math.cos(t * 0.7) * DRIFT };
  }
  current.tx += (target.tx - current.tx) * EASE;
  current.ty += (target.ty - current.ty) * EASE;
  stack.value?.style.setProperty("--tx", current.tx.toFixed(3));
  stack.value?.style.setProperty("--ty", current.ty.toFixed(3));
  frame = requestAnimationFrame(tick);
}

function onPointerMove(e) {
  const r = hero.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
  hovering = true;
  // The edge nearest the cursor comes toward the viewer. rotateX(+a) tips the bottom edge forward,
  // so a cursor below centre (ny > 0) needs a positive tx.
  target = { tx: ny * MAX_TILT, ty: -nx * MAX_TILT };
}

function onPointerLeave() {
  hovering = false;
}
</script>

<style scoped>
.stage {
  perspective: 1200px;
}
.stack {
  --tx: 0;
  --ty: 0;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--tx) * 1deg)) rotateY(calc(var(--ty) * 1deg));
}
@media not (prefers-reduced-motion: reduce) {
  .stack {
    will-change: transform;
  }
}
.layer {
  transform: translateZ(var(--z, 0px));
}
.glow { --z: -80px; }
.ring { --z: -40px; }
.disc { --z: 0px; }
/* The portrait stands 50px in front of the disc. Perspective magnifies it by 1200/1150,
   so it is scaled back around the stack's centre (50% across, 52.7% down in its own box,
   given the 104% width, -2% left, -1% bottom offsets and the 415x430 image) to line up at rest. */
.figure {
  --z: 50px;
  transform: translateZ(var(--z)) scale(0.9583);
  transform-origin: 50% 52.7%;
  /* Clip to the disc's silhouette (circle) plus everything above its centre line, so the head
     still rises above the rim while the shoulders stay inside it. Percentages are the disc
     circle expressed in this image's own box. */
  mask-image:
    radial-gradient(ellipse 48.08% 46.4% at 50% 52.7%, #000 99.5%, transparent 100%),
    linear-gradient(#000 0 0);
  mask-size: 100% 100%, 100% 52.7%;
  mask-repeat: no-repeat;
  mask-composite: add;
  -webkit-mask-image:
    radial-gradient(ellipse 48.08% 46.4% at 50% 52.7%, #000 99.5%, transparent 100%),
    linear-gradient(#000 0 0);
  -webkit-mask-size: 100% 100%, 100% 52.7%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-composite: source-over;
}

/* Chips: depth plus a parallax translate that grows with --p, so they swing further than the disc. */
.orbit {
  transform: translateZ(var(--z)) translate(calc(var(--ty) * var(--p) * 1px), calc(var(--tx) * var(--p) * -1px));
}

/* Sheen: a soft diagonal highlight sitting in front of the portrait, moved by transform only. */
.sheen {
  --z: 60px;
  opacity: 0.55;
}
.sheen::before {
  content: "";
  position: absolute;
  inset: -50%;
  background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.16) 50%, transparent 60%);
  transform: translate(calc(var(--ty) * -1.2%), calc(var(--tx) * 1.2%));
  will-change: transform;
}
:root:not(.dark) .sheen {
  opacity: 0.35;
}

/* The 415x430 cutout, a little wider than the disc and nudged down so it fills the orb; the mask
   on .figure trims the shoulders back to the disc silhouette while the head clears the rim. */
.portrait-img {
  width: 104%;
  left: -2%;
  bottom: -1%;
  max-width: none;
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
