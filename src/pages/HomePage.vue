<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold">Joke Discovery</h1>
    <p class="text-gray-500 mt-2">Get random jokes and enjoy!</p>

    <Spinner v-if="loading && jokes.length === 0" />
    <div v-else-if="error" class="mt-6 text-red-500">{{ error }}</div>

    <div class="mt-6 space-y-6">
      <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
    </div>

    <div ref="loadMoreTrigger" class="h-10"></div>
    <Spinner v-if="loading && jokes.length > 0" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { type Joke } from "@/models";
import { fetchMultipleJokes } from "@/api/jokeService";
import { JokeCard, Spinner } from "@/components";

const jokes = ref<Joke[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

async function loadJokes() {
  if (loading.value) return;
  loading.value = true;
  error.value = null;

  try {
    const newJokes = await fetchMultipleJokes(5);

    jokes.value.push(...newJokes);
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadJokes();
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadJokes();
      }
    },
    { threshold: 1.0 },
  );
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value);
});

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>
