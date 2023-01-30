import 'vue-router';

import { RouteRecordRaw, createRouter, createWebHistory, Router } from 'vue-router';
import { PageName, PagePath, PageTitle } from 'shared/constants';

import HomePage from 'view/pages/HomePage.vue';
import ProjectPage from 'view/pages/ProjectPage.vue';

declare module 'vue-router' {
  interface RouteMeta {
    pageTitle: string;
    pageHeading: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: PagePath.HOME,
    component: HomePage,
    meta: {
      pageTitle: PageTitle.HOME,
      pageHeading: PageTitle.HOME,
    },
  },
  {
    path: PagePath.PROJECT,
    component: ProjectPage,
    name: PageName.PROJECT,
    props: true,
  }
];

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});
