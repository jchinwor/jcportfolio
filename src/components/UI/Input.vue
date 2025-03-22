<template>
  <div class="relative z-10">
    <label
      :for="id"
      class="block mb-2 text-sm dark:text-white font-medium"
      :class="{ 'text-red-500': error }"
    >
      {{ label }}
    </label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      v-model="inputValue"
      :rows="type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      class="shadow-sm text-sm dark:text-white rounded-lg block w-full p-2.5 focus:ring-2 border"
      :class="{
        'focus:ring-primary-500 focus:border-primary-500 border-gray-300': !error,
        'border-red-500 focus:ring-red-500 focus:border-red-500': error
      }"
      @input="updateValue($event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, default: "" },
  rows: { type: Number, default: 4 }, // Used only on textarea
  modelValue: { type: String, default: "" }, // Allows v-model support
  error: { type: String, default: "" }, // Error message prop
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
