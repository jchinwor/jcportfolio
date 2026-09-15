<template>
  <section aria-label="Highlights" class="border-y border-edge bg-band/60">
    <ul
      ref="statsSection"
      class="mx-auto grid max-w-[1200px] grid-cols-2 divide-y divide-edge md:grid-cols-4 md:divide-x md:divide-y-0"
    >
      <li
        v-for="data in numbers"
        :key="data.id"
        class="flex flex-col gap-1 px-4 py-7 sm:px-6 md:py-8"
        :class="{ 'border-r border-edge md:border-r-0': data.id % 2 === 1 }"
      >
        <p class="font-display text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">
          <span v-if="hasIntersected"><Countup :endVal="data.number" :duration="2" /></span>
          <span v-else>0</span>+
        </p>
        <p class="text-sm text-muted">{{ data.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const numbers = [
  { id: 1, number: 4, title: "Years of experience" },
  { id: 2, number: 30, title: "Projects completed" },
  { id: 3, number: 20, title: "Happy clients" },
  { id: 4, number: 15, title: "Technologies" },
];

const statsSection = ref(null);
const hasIntersected = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hasIntersected.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  if (statsSection.value) observer.observe(statsSection.value);
});

onUnmounted(() => observer?.disconnect());
</script>
