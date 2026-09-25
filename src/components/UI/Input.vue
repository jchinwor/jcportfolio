<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-medium" :class="error ? 'text-red-500' : 'text-ink'">
      {{ label }}
    </label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      :name="id"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
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
// v-model on <component :is> compiles to a component binding (modelValue/onUpdate:modelValue),
// which a native input/textarea never emits, so bind value and input explicitly.
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, default: "" },
  rows: { type: Number, default: 4 },
  modelValue: { type: String, default: "" },
  error: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);
</script>
