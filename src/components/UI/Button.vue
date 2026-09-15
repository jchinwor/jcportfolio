<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href || undefined"
    :type="href ? undefined : type"
    :disabled="href ? undefined : disabled"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
    class="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium
           transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas
           disabled:opacity-60 disabled:cursor-not-allowed"
    :class="[sizeClass, variantClass]"
  >
    <slot>{{ label }}</slot>
    <Icon v-if="icon" :icon="icon" class="text-[1.05em]" aria-hidden="true" />
  </component>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  variant: { type: String, default: "primary" }, // primary | ghost
  size: { type: String, default: "md" },        // md | sm
  type: { type: String, default: "button" },
  href: { type: String, default: "" },
  icon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  onClick: { type: Function, default: null },
});

const sizeClass = props.size === "sm" ? "h-10 px-5 text-sm" : "h-12 px-7 text-[15px]";

const variantClass =
  props.variant === "ghost"
    ? "border border-edge-strong text-ink bg-transparent hover:border-ink hover:bg-band"
    : "bg-btn text-on-btn hover:opacity-90";

const handleClick = (e) => {
  if (props.disabled) {
    e.preventDefault();
    return;
  }
  if (props.onClick) props.onClick(e);
};
</script>
