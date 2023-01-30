import { RouteRecordRaw, createRouter, createWebHistory, Router, RouteLocationNormalized } from 'vue-router';
import { PageRoute, PageTitle, DOCUMENT_TITLE_DIVIDER, PageHeading } from 'shared/constants';

import HomePage from 'view/pages/HomePage.vue';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    pageTitle: PageTitle;
    pageHeading: PageHeading;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: PageRoute.HOME,
    component: HomePage,
    meta: {
      pageTitle: PageTitle.HOME,
      pageHeading: PageHeading.HOME,
    },
  },
];

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
  updateDocumentTitle(to);
});

function updateDocumentTitle({ meta: { pageTitle } }: RouteLocationNormalized): void {
  document.title = [PageTitle.BASE, pageTitle].join(DOCUMENT_TITLE_DIVIDER);
}
