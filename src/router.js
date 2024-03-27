import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import ApartmentSearch from "./pages/ApartmentsSearch.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/apartments/:query",
      name: "search",
      component: ApartmentSearch,
    },
  ],
});

export default router;
