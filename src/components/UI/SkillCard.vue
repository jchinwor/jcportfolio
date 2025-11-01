<template>
  <li
    :class="[
      'mx-4 mb-7 rounded-xl bg-gradient-to-t transition-all duration-700 ease-out transform',
      skill.bgGradient,
      visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    ]"
    role="listitem"
    aria-label="Skill card"
  >
    <div class="bg-primary rounded-xl mt-1 p-10 md:p-6 text-center">
      <h3 class="text-white text-3xl font-bold flex justify-center items-center">
        <Countup v-if="visible" :endVal="skill.percentage" :startVal="0" :duration="2" />%
      </h3>
      <p class="text-base font-medium mt-2" :style="{ color: skill.textColor }">
        {{ skill.title }}
      </p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  skill: Object,
  visible: Boolean,
});
</script>
