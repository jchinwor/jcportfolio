<template>
  <article
    class="max-w-sm overflow-hidden shadow-lg rounded-xl border border-secondary dark:bg-[#ffffff29] bg-[#1a1a2e] hover:shadow-secondary/20 hover:shadow-xl transition-shadow duration-300"
  >
    <!-- Image Section -->
    <figure class="overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
      />
    </figure>

    <!-- Content Section -->
    <section class="px-5 py-4">
      <h3 class="font-bold text-base text-white mb-2">{{ title }}</h3>
      <p class="text-gray-400 text-sm leading-relaxed">{{ description }}</p>
    </section>

    <!-- Tag Section -->
    <div class="px-5 pb-3">
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="(tag, index) in tags"
          :key="index"
          class="inline-block bg-[#121212] text-gray-300 rounded-full px-3 py-1 text-xs font-semibold"
        >
          #{{ tag }}
        </li>
      </ul>
    </div>

    <!-- Action Section -->
    <div class="px-5 pb-5 pt-2 border-t border-gray-700 flex items-center gap-4">
      <a
        v-if="liveLink && liveLink !== 'javascript:void(0)'"
        :href="liveLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm hover:opacity-80 transition-opacity duration-200"
      >
        <Icon icon="lucide:external-link" class="text-sm" />
        Live Demo
      </a>
      <span v-else class="text-gray-500 text-sm italic">Private</span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: "Project Title",
  },
  description: {
    type: String,
    required: true,
    default: "Brief description of project",
  },
  image: {
    type: String,
    required: true,
    default: "/",
  },
  tags: {
    type: Array,
    required: false,
    default: () => ["Vue.js", "Tailwind CSS"],
  },
  liveLink: {
    type: String,
    required: false,
    default: null,
  },
  codeLink: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style></style>
