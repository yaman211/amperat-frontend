import { RouteRecordRaw } from 'vue-router';
import StatisticsDateFilter from './components/date-filter.vue';

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
    {
      path: 'manager-dashboard',
      component: () => import('./manager-dashboard/index.vue'),
      meta: {
        title: 'الإحصائيات',
        dynamicHeaderComponent: StatisticsDateFilter,
      },
    },
  ],
};

export default routes;
