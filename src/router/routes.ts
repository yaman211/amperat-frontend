import { RouteRecordRaw } from 'vue-router';
import SharedModuleRoutes from '../modules/shared/routes';
import AuthModuleRoutes from '../modules/auth/routes';
import ManagementModuleRoutes from '../modules/management/routes';
import StatisticsModuleRoutes from '../modules/statistics/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      { path: '', redirect: '/shared/home' },
      {
        path: 'auth/logout',
        component: () => import('src/modules/auth/logout/index.vue'),
        meta: {
          title: 'تسجيل الخروج',
        },
      },
      SharedModuleRoutes,
      AuthModuleRoutes,
      ManagementModuleRoutes,
      StatisticsModuleRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-not-found.vue'),
  },
];

export default routes;
