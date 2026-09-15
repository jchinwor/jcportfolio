<template>
  <section class="relative overflow-hidden">
    <!-- The signature: a single narrow aurora beam, never a full background -->
    <div class="aurora-beam" aria-hidden="true"></div>

    <div
      class="relative mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-[1200px] grid-cols-1 items-center gap-12
             px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16"
    >
      <!-- Copy -->
      <div class="lg:col-span-7">
        <!-- Availability: the one small label the hero gets. The dot carries real state. -->
        <div class="inline-flex items-center gap-2 rounded-full border border-edge bg-card/70 px-3.5 py-1.5 backdrop-blur">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span class="text-xs font-medium text-muted">Available for new projects</span>
        </div>

        <h1 class="mt-7 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl xl:text-[84px]">
          Hi, I'm Jenkins.
        </h1>

        <!-- Role cycler -->
        <p class="mt-5 flex min-h-[2rem] items-center font-display text-xl font-medium text-muted sm:text-2xl" aria-live="polite">
          <span class="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">{{ currentRole }}</span>
          <span class="ml-1 inline-block h-6 w-0.5 animate-blink rounded-full bg-accent" aria-hidden="true"></span>
        </p>

        <p class="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
          I turn complex challenges into elegant, user-centered web applications with clean code and thoughtful design.
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <Button label="View Works" icon="tabler:arrow-down" :onClick="scrollToProjects" />
          <Button label="Contact Me" variant="ghost" href="#contact" />
        </div>

        <div class="mt-9 flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jenkins-chinwor/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
          >
            <Icon icon="tabler:brand-linkedin" class="text-xl" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/jchinwor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="press inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
          >
            <Icon icon="tabler:brand-github" class="text-xl" aria-hidden="true" />
          </a>
        </div>
      </div>

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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Button from "./UI/Button.vue";

const roles = [
  "Software Engineer",
  "UI/UX Designer",
  "Full Stack Developer",
  "Mobile / Web Developer",
];

const currentRole = ref(roles[0]);
let roleIndex = 0;
let interval;

onMounted(() => {
  interval = setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    currentRole.value = roles[roleIndex];
  }, 2800);
});

onUnmounted(() => clearInterval(interval));

const scrollToProjects = () => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
};
</script>

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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
