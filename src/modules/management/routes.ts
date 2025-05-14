import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'management',
  component: () => import('./layout.vue'),
  children: [
    {
      path: 'new-clock',
      component: () => import('./new-clock/index.vue'),
      meta: {
        title: 'ساعة جديدة',
      },
    },
    {
      path: 'new-reading',
      component: () => import('./new-reading/index.vue'),
      meta: {
        title: 'تأشيرة جديدة',
      },
    },
    {
      path: 'pay-invoice',
      component: () => import('./pay-invoice/index.vue'),
      meta: {
        title: 'دفع فاتورة',
      },
    },
    {
      path: 'employees',
      component: () => import('./employees/index.vue'),
      meta: {
        title: 'العُمال',
      },
    },
    {
      path: 'invite-user',
      component: () => import('./invite-user/index.vue'),
      meta: {
        title: 'دعوة عامل',
      },
    },
    {
      path: 'browse-clock',
      component: () => import('./browse-clock/index.vue'),
      meta: {
        title: 'استعراض ساعة',
      },
    },
    {
      path: 'edit-vendor',
      component: () => import('./edit-vendor/index.vue'),
      meta: {
        title: 'تعديل المولدة',
      },
    },
    {
      path: 'print-barcode',
      component: () => import('./print-barcode/index.vue'),
      meta: {
        title: 'طباعة كود',
      },
    },
  ],
};

export default routes;
