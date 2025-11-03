<template>
  <section class="mt-20 lg:mt-0 w-full relative text-white flex justify-center">
    <header
      class="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-secondary opacity-30 dark:opacity-20 blur-[100px] left-10 top-0 hidden md:block"
    ></header>
    <ul
      ref="statsSection"
      class="relative z-1 p-6 mx-auto w-11/12 lg:mx-0 rounded-3xl border dark:bg-[#ffffff29] bg-primary shadow-lg md:divide-x grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 border-[#E2E8F0] divide-secondary"
    >
      <li v-for="data in numbers" :key="data.id" class="text-center">
        <h2
          class="font-semibold flex justify-center text-xl sm:text-2xl md:text-4xl w-full"
        >
          + <Countup v-if="hasIntersected" :endVal="data.number" />
        </h2>
        <p class="mt-2">{{ data.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const numbers = ref([
  { id: 1, number: 12, title: "Created Projects" },
  { id: 2, number: 30, title: "Projects" },
  { id: 3, number: 20, title: "Happy clients" },
  { id: 4, number: 4, title: "Years" },
]);

const statsSection = ref(null);
const hasIntersected = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hasIntersected.value = true;
        observer.disconnect(); //stop observing once it has intersected
      }
    },
    { threshold: 0.5 } //Trigger when 50% of the section is visible
  );

  if (statsSection.value) {
    observer.observe(statsSection.value);
  }
});
</script>

<style></style>
