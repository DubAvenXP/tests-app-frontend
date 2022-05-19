import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'tests' } },
      {
        path: 'tests',
        name: 'tests',
        component: () => import('pages/TestsPage.vue'),
      },
      {
        path: 'tests/:url',
        name: 'tests-url',
        component: () => import('pages/TestsQuestionsPage.vue'),
      },
      {
        path: 'tests/resolve/:url',
        name: 'tests-resolve-url',
        component: () => import('pages/TestsResolvePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
