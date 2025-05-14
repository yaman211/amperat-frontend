import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'shared',
  component: () => import('./layout.vue'),
  children: [
    {
      path: 'home',
      component: () => import('./home/index.vue'),
      meta: {
        title: 'الرئيسية',
      },
    },
    {
      path: 'clocks-list',
      component: () => import('./clocks-list/index.vue'),
      meta: {
        title: 'قائمة الساعات',
      },
    },
    {
      path: 'clock-details/token/:token',
      component: () => import('./clock-details/index.vue'),
      props: true,
      meta: {
        title: 'تفاصيل الساعة',
        notForLoggedInUsers: true,
      },
    },
    {
      path: 'clock-details/:id',
      component: () => import('./clock-details/index.vue'),
      props: true,
      meta: {
        title: 'تفاصيل الساعة',
      },
    },
    {
      path: 'clock-edit/:id',
      component: () => import('./clock-edit/index.vue'),
      props: true,
      meta: {
        title: 'تعديل ساعة',
      },
    },
    {
      path: 'scan-barcode',
      component: () => import('./scan-barcode/index.vue'),
      props: true,
      meta: {
        title: 'ضع الكاميرة على الكود',
      },
    },
    {
      path: 'clock-qr-scan',
      component: () => import('./clock-qr-scan/index.vue'),
      props: true,
      meta: {
        title: 'ضع الكاميرة على الكود',
        notForLoggedInUsers: true,
      },
    },
  ],
};

export default routes;
