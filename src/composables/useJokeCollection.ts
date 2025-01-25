import { ref, watch, computed } from "vue";
import type { Joke, RatedJoke, JokeRating } from "@/models";
import { JOKE_COLLECTION_KEY } from "@/constants";

const jokes = ref<RatedJoke[]>(loadJokes());

function loadJokes(): RatedJoke[] {
  const saved = localStorage.getItem(JOKE_COLLECTION_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveJokes() {
  localStorage.setItem(JOKE_COLLECTION_KEY, JSON.stringify(jokes.value));
}

function addJoke(joke: Joke) {
  if (!jokes.value.some((j) => j.id === joke.id)) {
    jokes.value.push({ ...joke, rating: 1 });
    saveJokes();
  }
}

function removeJoke(jokeId: number) {
  jokes.value = jokes.value.filter((j) => j.id !== jokeId);
  saveJokes();
}

function rateJoke(jokeId: number, rating: JokeRating) {
  const joke = jokes.value.find((j) => j.id === jokeId);
  if (joke) {
    joke.rating = Math.min(Math.max(1, rating ?? 1), 5);
    saveJokes();
  }
}

const totalJokes = computed(() => jokes.value.length);

const averageRating = computed(() => {
  const ratedJokes = jokes.value.filter((j) => j.rating ?? 0 > 0);
  if (ratedJokes.length === 0) return 0;
  const sum = ratedJokes.reduce((acc, j) => acc + (j.rating ?? 0), 0);
  return parseFloat((sum / ratedJokes.length).toFixed(1));
});

watch(jokes, saveJokes, { deep: true });

export function useJokeCollection() {
  return { jokes, addJoke, removeJoke, rateJoke, totalJokes, averageRating };
}
