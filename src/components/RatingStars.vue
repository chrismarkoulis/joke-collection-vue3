<template>
  <div class="flex justify-center space-x-1">
    <span
      v-for="star in MAX_RATING"
      :key="star"
      class="cursor-pointer text-2xl"
      :class="star <= (modelValue ?? 1) ? 'text-yellow-500' : 'text-gray-400'"
      @click="setRating(star)"
    >
      ★
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { type JokeRating } from "@/models";
import { MAX_RATING } from "@/constants";

const props = defineProps<{ modelValue: JokeRating }>();
const emit = defineEmits(["update:modelValue"]);

function setRating(value: JokeRating) {
  emit("update:modelValue", value);
}
</script>
