<template>
  <div :class="align === 'center' ? 'text-center mx-auto' : 'text-left'" class="max-w-2xl" data-aos="fade-up">
    <h2 class="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.05] text-3xl md:text-4xl lg:text-5xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-[60ch]" :class="align === 'center' ? 'mx-auto' : ''">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  align: { type: String, default: "left" }, // left | center
});
</script>
