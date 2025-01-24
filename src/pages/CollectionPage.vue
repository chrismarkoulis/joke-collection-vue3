<template>
  <div class="p-6 text-center">
    <h1 class="text-3xl font-bold">Your Joke Collection</h1>
    <p class="text-gray-500 mt-2">Manage your saved jokes below.</p>

    <div v-if="jokes.length === 0" class="mt-6 text-gray-500">No jokes saved yet.</div>
    <div v-else class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJokeCollection } from "@/composables/useJokeCollection";
import JokeCard from "@/components/JokeCard.vue";

const { jokes } = useJokeCollection();
</script>
