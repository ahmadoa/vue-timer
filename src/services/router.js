import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import OtherPage from "@/views/OtherPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/other-page", component: OtherPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
