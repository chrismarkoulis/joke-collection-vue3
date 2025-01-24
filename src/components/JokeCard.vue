<template>
  <div class="space-x-4 p-4 bg-white shadow-md border border-gray-300 rounded-md text-center">
    <p class="text-lg font-semibold text-gray-800">{{ joke.setup }}</p>
    <button
      v-if="!revealed"
      class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      @click="revealed = true"
    >
      Reveal Punchline
    </button>
    <p v-if="revealed" class="mt-2 text-gray-600 text-lg font-medium">{{ joke.punchline }}</p>

    <button
      v-if="!isSaved"
      class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      @click="saveJoke"
    >
      Save to Collection
    </button>
    <button
      v-else
      class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      @click="deleteJoke"
    >
      Remove from Collection
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Joke } from "@/models";
import { useJokeCollection } from "@/composables/useJokeCollection";

const props = defineProps<{ joke: Joke }>();

const { jokes, addJoke, removeJoke } = useJokeCollection();
const revealed = ref(false);

const isSaved = computed(() => jokes.value.some((j) => j.id === props.joke.id));

function saveJoke() {
  addJoke(props.joke);
}

function deleteJoke() {
  removeJoke(props.joke.id);
}
</script>
