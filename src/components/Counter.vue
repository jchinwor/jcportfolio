<template>
  <section class="mt-20 lg:mt-0 w-full relative flex justify-center">
    <ul
      ref="statsSection"
      class="relative z-1 p-6 mx-auto w-11/12 lg:mx-0 rounded-3xl border
             dark:bg-[#ffffff14] bg-gray-900
             shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12
             border-gray-200 dark:border-gray-700
             md:divide-x divide-secondary"
    >
      <li v-for="data in numbers" :key="data.id" class="text-center">
        <h2 class="font-semibold flex justify-center text-xl sm:text-2xl md:text-4xl w-full text-white">
          +<Countup v-if="hasIntersected" :endVal="data.number" />
        </h2>
        <p class="mt-2 text-gray-300 text-sm">{{ data.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const numbers = ref([
  { id: 1, number: 4, title: "Years Experience" },
  { id: 2, number: 30, title: "Projects Completed" },
  { id: 3, number: 20, title: "Happy Clients" },
  { id: 4, number: 15, title: "Technologies" },
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
