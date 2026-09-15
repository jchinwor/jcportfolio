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

      <!-- Portrait in a framed, slightly tilted card with an aurora stroke -->
      <div class="flex justify-center lg:col-span-5 lg:justify-end">
        <div class="relative w-64 sm:w-72 lg:w-80 xl:w-[22rem]">
          <div class="absolute -inset-10 rounded-full bg-accent/15 blur-3xl dark:bg-accent/10" aria-hidden="true"></div>
          <div
            class="gradient-stroke relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[20px] bg-card shadow-[0_6px_25px_rgba(0,0,0,0.25)]
                   transition-transform duration-500 ease-out hover:rotate-0"
          >
            <img
              src="@/assets/jenkinsv5.png"
              alt="Portrait of Jenkins Chinwor"
              fetchpriority="high"
              class="h-full w-full object-cover object-top"
            />
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
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
