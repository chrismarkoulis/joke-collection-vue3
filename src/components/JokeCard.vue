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

    <RatingStars v-model="rating" class="mt-4" />

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
import { ref, computed, watch } from "vue";
import type { Joke, JokeRating } from "@/models";
import { useJokeCollection } from "@/composables/useJokeCollection";
import RatingStars from "./RatingStars.vue";

const props = defineProps<{ joke: Joke }>();
const { jokes, addJoke, removeJoke, rateJoke } = useJokeCollection();
const revealed = ref(false);

const isSaved = computed(() => jokes.value.some((j) => j.id === props.joke.id));
const rating = ref<JokeRating>(jokes.value.find((j) => j.id === props.joke.id)?.rating || 0);

watch(rating, (newRating) => {
  if (isSaved.value) rateJoke(props.joke.id, newRating);
});

function saveJoke() {
  addJoke(props.joke);
}

function deleteJoke() {
  removeJoke(props.joke.id);
}
</script>
