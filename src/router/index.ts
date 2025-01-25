import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CollectionPage from "../pages/CollectionPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/collection", name: "Collection", component: CollectionPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
