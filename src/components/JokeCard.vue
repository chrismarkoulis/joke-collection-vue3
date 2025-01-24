<template>
  <div class="p-4 bg-white shadow-md border border-gray-300 rounded-md text-center">
    <p class="text-lg font-semibold text-gray-800">{{ joke.setup }}</p>
    <button
      v-if="!revealed"
      class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      @click="revealed = true"
    >
      Reveal Punchline
    </button>
    <p v-if="revealed" class="mt-2 text-gray-600 text-lg font-medium">{{ joke.punchline }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import type { Joke } from "@/models";

defineProps<{ joke: Joke }>();
const revealed = ref(false);
</script>
