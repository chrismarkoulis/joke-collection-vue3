<template>
  <div class="flex justify-center">
    <div
      class="mt-4 w-md p-4 space-x-4 bg-white shadow-md border border-gray-300 rounded-md text-center"
    >
      <p class="text-lg font-semibold text-gray-800">{{ joke.setup }}</p>

      <Button v-if="!revealed" color="primary" class="mt-3" @click="revealed = true">
        Reveal Punchline
      </Button>

      <transition
        enter-active-class="transition-opacity duration-700 ease-in-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <p v-if="revealed" class="mt-2 text-gray-600 text-lg font-medium">
          {{ joke.punchline }}
        </p>
      </transition>

      <RatingStars v-if="isSaved" v-model="rating" class="mt-4" />

      <Button v-if="!isSaved" color="success" class="mt-4" @click="saveJoke">
        Save to Collection
      </Button>

      <Button v-else color="danger" class="mt-4" @click="deleteJoke">
        Remove from Collection
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { Joke, JokeRating } from "@/models";
import { useJokeCollection } from "@/composables/useJokeCollection";
import RatingStars from "./RatingStars.vue";
import Button from "./Button.vue";

const props = defineProps<{ joke: Joke }>();
const { jokes, addJoke, removeJoke, rateJoke } = useJokeCollection();
const revealed = ref(false);

const isSaved = computed(() => jokes.value.some((j) => j.id === props.joke.id));
const rating = ref<JokeRating>(jokes.value.find((j) => j.id === props.joke.id)?.rating || 1);

watch(rating, (newRating) => {
  if (isSaved.value) rateJoke(props.joke.id, newRating);
});

function saveJoke() {
  addJoke(props.joke);
  rating.value = 1;
}

function deleteJoke() {
  removeJoke(props.joke.id);
}
</script>
