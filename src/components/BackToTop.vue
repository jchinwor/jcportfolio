<template>
  <button
    @click="scrollToTop"
    v-if="isVisible"
    class="fixed bottom-4 right-4 bg-gradient-to-r bg-primary dark:bg-secondary text-white dark:text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-opacity duration-300 hover:bg-gray-500"
  >
    <Icon icon="line-md:arrow-up" class="font-bold" />
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);
const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
