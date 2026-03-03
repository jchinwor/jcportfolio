<template>
  <section class="relative flex items-center justify-center min-h-screen overflow-hidden">
    <!-- Subtle background accents -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 dark:bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div
      class="relative z-10 grid lg:grid-cols-2 grid-cols-1 items-center w-full max-w-7xl mx-auto px-6 lg:px-12 gap-12 py-20"
      data-aos="fade-up"
    >
      <!-- Text Content -->
      <div class="text-center lg:text-left">

        <!-- Availability badge -->
        <div class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span class="text-xs font-medium text-gray-600 dark:text-gray-300 tracking-wide">Available for new projects</span>
        </div>

        <!-- Name -->
        <h1 class="mb-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
          Hi, I'm
          <span class="text-secondary"> Jenkins</span>
        </h1>

        <!-- Role cycling -->
        <h2 class="mb-5 text-lg md:text-2xl font-semibold text-gray-500 dark:text-gray-400 min-h-[2rem] flex items-center justify-center lg:justify-start gap-1">
          <span>{{ currentRole }}</span>
          <span class="animate-blink inline-block w-0.5 h-6 bg-secondary ml-0.5 rounded-full"></span>
        </h2>

        <p class="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
          I transform complex challenges into elegant, user-centered solutions — specializing in modern web applications with clean code and thoughtful design.
        </p>

        <!-- CTAs -->
        <div class="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Button :onClick="handleClick" label="View Works" class="cursor-pointer" />
          <a
            href="#contact"
            class="font-semibold text-base w-[160px] h-[54px] rounded-full flex justify-center items-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:border-secondary hover:text-secondary dark:hover:text-secondary bg-white dark:bg-transparent transition-all duration-200"
          >
            Contact Me
          </a>
        </div>

        <!-- Social links -->
        <div class="mt-8 flex gap-5 justify-center lg:justify-start">
          <a
            href="https://www.linkedin.com/in/jenkins-chinwor/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors duration-200 hover:scale-110 transform"
            aria-label="LinkedIn"
          >
            <Icon icon="fa-brands:linkedin" class="text-xl" />
          </a>
          <a
            href="https://github.com/jchinwor"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-colors duration-200 hover:scale-110 transform"
            aria-label="GitHub"
          >
            <Icon icon="fa-brands:github" class="text-xl" />
          </a>
        </div>
      </div>

      <!-- Profile Image — minimal, no rainbow ring -->
      <div class="flex justify-center lg:justify-end items-center">
        <div class="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <!-- Soft glow -->
          <div class="absolute inset-0 rounded-full bg-secondary/10 dark:bg-secondary/15 blur-2xl scale-110 pointer-events-none"></div>
          <!-- Outer ring -->
          <div class="absolute inset-[-6px] rounded-full border border-secondary/25 dark:border-secondary/30"></div>
          <!-- Image -->
          <div class="relative w-full h-full rounded-full overflow-hidden border-2 border-secondary/20 shadow-xl shadow-black/10">
            <img
              src="@/assets/jenkinsv5.png"
              alt="Jenkins Chinwor"
              loading="lazy"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#services"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 hover:text-secondary transition-colors duration-200 animate-bounce"
      aria-label="Scroll down"
    >
      <span class="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
      <Icon icon="lucide:chevron-down" class="text-base" />
    </a>
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

const handleClick = () => {
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
