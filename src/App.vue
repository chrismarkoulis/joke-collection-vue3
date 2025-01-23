<template>
  <div>
    <header class="p-4 bg-blue-500 text-white">
      <nav class="flex justify-between items-center">
        <h1 class="text-lg font-bold">Joke Collection App</h1>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="hover:underline">Home</router-link>
          </li>
          <li>
            <router-link to="/collection" class="hover:underline">Collection</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>
