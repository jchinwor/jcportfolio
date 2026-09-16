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
:root:not(.dark) .sheen {
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
