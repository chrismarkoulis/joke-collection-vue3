import { ref, watch } from "vue";
import type { Joke } from "@/models";

const STORAGE_KEY = "jokeCollection";

const jokes = ref<Joke[]>(loadJokes());

function loadJokes(): Joke[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveJokes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes.value));
}

function addJoke(joke: Joke) {
  if (!jokes.value.some((j) => j.id === joke.id)) {
    jokes.value.push(joke);
    saveJokes();
  }
}

function removeJoke(jokeId: number) {
  jokes.value = jokes.value.filter((j) => j.id !== jokeId);
  saveJokes();
}

watch(jokes, saveJokes, { deep: true });

export function useJokeCollection() {
  return { jokes, addJoke, removeJoke };
}
