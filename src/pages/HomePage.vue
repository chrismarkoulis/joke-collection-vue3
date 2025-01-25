<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold">Joke Discovery</h1>
    <p class="text-gray-500 mt-2">Get random jokes and enjoy!</p>

    <div class="mt-4 flex justify-center space-x-4">
      <Button color="primary" @click="loadJoke('random')">Get Random Joke</Button>
      <Button color="neutral" @click="loadJoke('programming')">Get Programming Joke</Button>
    </div>

    <Spinner v-if="loading" />
    <div v-else-if="error" class="mt-6 text-red-500">{{ error }}</div>
    <JokeCard v-else-if="joke" :joke="joke" class="mt-6" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { type Joke } from "@/models";
import { fetchRandomJoke, fetchProgrammingJoke } from "@/api/jokeService";
import { JokeCard, Spinner, Button } from "@/components";
import { CURRENT_JOKE_KEY } from "@/constants";

const joke = ref<Joke | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  const currentJoke = localStorage.getItem(CURRENT_JOKE_KEY);
  if (currentJoke) {
    joke.value = JSON.parse(currentJoke);
  }
});

async function loadJoke(type: "random" | "programming") {
  loading.value = true;
  error.value = null;

  try {
    joke.value = type === "random" ? await fetchRandomJoke() : await fetchProgrammingJoke();
    localStorage.setItem(CURRENT_JOKE_KEY, JSON.stringify(joke.value));
    if (!joke.value) throw new Error("No joke found");
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}
</script>
