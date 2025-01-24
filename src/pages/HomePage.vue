<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold">Joke Discovery</h1>
    <p class="text-gray-500 mt-2">Get random jokes and enjoy!</p>

    <div class="mt-4 flex justify-center space-x-4">
      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        @click="loadJoke('random')"
      >
        Get Random Joke
      </button>
      <button
        class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        @click="loadJoke('programming')"
      >
        Get Programming Joke
      </button>
    </div>

    <Spinner v-if="loading" />
    <div v-else-if="error" class="mt-6 text-red-500">{{ error }}</div>
    <JokeCard v-else-if="joke" :joke="joke" class="mt-6" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { type Joke } from "@/models";
import { fetchRandomJoke, fetchProgrammingJoke } from "@/api/jokeService";
import { JokeCard, Spinner } from "@/components";

const joke = ref<Joke | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

async function loadJoke(type: "random" | "programming") {
  loading.value = true;
  error.value = null;

  try {
    joke.value = type === "random" ? await fetchRandomJoke() : await fetchProgrammingJoke();
    if (!joke.value) throw new Error("No joke found");
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}
</script>
