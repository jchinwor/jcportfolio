<template>
  <transition name="pop">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      aria-label="Back to top"
      class="press fixed bottom-5 right-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-card/80 text-ink shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur transition-colors duration-200 hover:border-edge-strong"
    >
      <Icon icon="tabler:arrow-up" class="text-xl" aria-hidden="true" />
    </button>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);
let observer;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  // Show once the hero has scrolled out of view. Sections load async, so wait for it.
  const attach = () => {
    const hero = document.querySelector("main > section:first-of-type");
    if (!hero) return false;
    observer = new IntersectionObserver(
      ([entry]) => { isVisible.value = !entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(hero);
    return true;
  };
  if (!attach()) {
    const retry = setInterval(() => { if (attach()) clearInterval(retry); }, 300);
    setTimeout(() => clearInterval(retry), 10000);
  }
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.pop-enter-from,
.pop-leave-to { opacity: 0; transform: translateY(8px) scale(0.95); }
</style>
