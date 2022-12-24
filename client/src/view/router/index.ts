import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { PageRoute } from 'shared/constants';

import ProjectsPage from 'view/pages/ProjectsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: PageRoute.PROJECTS,
    component: ProjectsPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
