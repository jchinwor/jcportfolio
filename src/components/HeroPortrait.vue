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
