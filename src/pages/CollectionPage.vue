<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold">Your Joke Collection</h1>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search jokes..."
      class="mt-4 p-2 border border-gray-300 rounded"
    />

    <div class="mt-4 flex justify-center space-x-4">
      <select v-model="sortBy" class="p-2 border rounded">
        <option value="rating">Sort by Rating</option>
        <option value="alpha">Sort Alphabetically</option>
      </select>
      <select v-model="filterRating" class="p-2 border rounded">
        <option value="all">All Jokes</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
      </select>
    </div>

    <p class="mt-4 text-gray-500">Total Jokes: {{ totalJokes }}</p>
    <p class="text-gray-500">Average Rating: {{ averageRating }}</p>

    <div v-if="filteredJokes.length === 0" class="mt-6 text-gray-500">No jokes found.</div>
    <div v-else class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <JokeCard v-for="joke in filteredJokes" :key="joke.id" :joke="joke" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useJokeCollection } from "@/composables/useJokeCollection";
import JokeCard from "@/components/JokeCard.vue";

const { jokes, totalJokes, averageRating } = useJokeCollection();
const searchQuery = ref("");
const sortBy = ref("rating");
const filterRating = ref("all");

const filteredJokes = computed(() => {
  return jokes.value
    .filter((j) => j.setup.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .filter((j) => (filterRating.value === "all" ? true : j.rating === Number(filterRating.value)))
    .sort((a, b) => {
      if (sortBy.value === "alpha") {
        return a.setup.localeCompare(b.setup);
      } else {
        return (b.rating || 0) - (a.rating || 0);
      }
    });
});
</script>
