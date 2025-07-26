import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'statistics',
  component: () => import('./layout.vue'),
  children: [
    {
      path: 'governmental-dashboard',
      component: () => import('./governmental-dashboard/index.vue'),
      meta: {
        title: 'الإحصائيات',
      },
    },
  ],
};

export default routes;
