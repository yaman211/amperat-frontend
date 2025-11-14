import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'customers',
  component: () => import('./layout.vue'),
  meta: {},
  children: [
    {
      path: 'saved-clocks',
      component: () => import('./saved-clocks/index.vue'),
      meta: {
        title: 'الساعات المحفوظة',
        notForLoggedInUsers: true,
      },
    },
    {
      path: 'clock-details/public/:publicId',
      component: () => import('./public-clock-details/index.vue'),
      props: true,
      meta: {
        title: 'تفاصيل الساعة',
        notForLoggedInUsers: true,
      },
    },
    {
      path: 'clock-readings/public/:publicId',
      component: () => import('./public-clock-readings/index.vue'),
      props: true,
      meta: {
        title: 'جميع التأشيرات',
        notForLoggedInUsers: true,
      },
    },
    {
      path: 'clock-invoices/public/:publicId',
      component: () => import('./public-clock-invoices/index.vue'),
      props: true,
      meta: {
        title: 'جميع الفواتير',
        notForLoggedInUsers: true,
      },
    },
  ],
};

export default routes;
