<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  color?: "primary" | "success" | "danger" | "neutral" | string;
  size?: "small" | "medium" | "large" | string;
  disabled?: boolean;
}>();

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const base =
    "rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const colorClasses: Record<string, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
    neutral: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400",
  };

  const sizeClasses: Record<string, string> = {
    small: "text-sm px-3 py-1",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-3",
  };

  return [base, colorClasses[props.color || "primary"], sizeClasses[props.size || "medium"]].join(
    " ",
  );
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit("click", event);
}
</script>
