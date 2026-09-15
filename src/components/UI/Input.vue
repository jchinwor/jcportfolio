<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-medium" :class="error ? 'text-red-500' : 'text-ink'">
      {{ label }}
    </label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :name="id"
      v-model="inputValue"
      :type="type === 'textarea' ? undefined : type"
      :rows="type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="w-full rounded-input border bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-faint
             transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/60 resize-y"
      :class="error ? 'border-red-500 focus:border-red-500' : 'border-edge-strong focus:border-accent'"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, default: "" },
  rows: { type: Number, default: 4 },
  modelValue: { type: String, default: "" },
  error: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
