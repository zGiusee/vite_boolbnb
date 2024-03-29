import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import ApartmentSearch from "./pages/ApartmentsSearch.vue";
import ApartmentDetail from "./pages/ApartmentDetail.vue";
import AppNotFound from "./pages/AppNotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/:patchMatch(.*)*",
      name: "not-found",
      component: AppNotFound,
    },
    {
      path: "/apartments/:query",
      name: "search",
      component: ApartmentSearch,
    },
    {
      path: "/apartment/:slug",
      name: "apartment_detail",
      component: ApartmentDetail,
    },
  ],
});

export default router;
