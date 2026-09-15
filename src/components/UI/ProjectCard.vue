<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-card border border-edge bg-card
           transition-[border-color,transform] duration-300 hover:border-edge-strong hover:-translate-y-0.5"
  >
    <!-- Framed screenshot: the reference treats product UI as both evidence and decoration -->
    <figure class="relative m-3 mb-0 overflow-hidden rounded-[8px] border border-edge bg-band aspect-[16/10]">
      <img
        :src="image"
        :alt="`Screenshot of ${title}`"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </figure>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-semibold text-ink tracking-[-0.01em]">{{ title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{{ description }}</p>

      <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
        <li
          v-for="tag in tags"
          :key="tag"
          class="rounded-full border border-edge bg-band px-2.5 py-1 text-[11px] font-medium text-muted"
        >
          {{ tag }}
        </li>
      </ul>

      <div class="mt-auto pt-5">
        <a
          v-if="isPublic"
          :href="liveLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors duration-200"
        >
          View live
          <Icon icon="tabler:arrow-up-right" class="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
        <span v-else class="inline-flex items-center gap-1.5 text-sm text-faint">
          <Icon icon="tabler:lock" class="text-base" aria-hidden="true" />
          Private project
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  liveLink: { type: String, default: null },
  codeLink: { type: String, default: null },
});

const isPublic = computed(() => !!props.liveLink && props.liveLink !== "javascript:void(0)");
</script>
