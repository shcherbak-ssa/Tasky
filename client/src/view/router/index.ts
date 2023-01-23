import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { PageRoute } from 'shared/constants';

import OverviewPage from 'view/pages/OverviewPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: PageRoute.OVERVIEW,
    component: OverviewPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
