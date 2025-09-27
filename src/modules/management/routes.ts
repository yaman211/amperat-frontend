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
    {
      path: 'sectors',
      component: () => import('./sectors/pages/list.vue'),
      meta: {
        title: 'القطاعات',
      },
    },
    {
      name: 'sector-create',
      path: 'sectors/create',
      component: () => import('./sectors/pages/create.vue'),
      meta: {
        title: 'إضافة قطاع',
      },
    },
    {
      name: 'sector-update',
      path: 'sectors/:id',
      component: () => import('./sectors/pages/update.vue'),
      props: true,
      meta: {
        title: 'تعديل قطاع',
      },
    },
    {
      path: 'boxes/:sectorId',
      name: 'boxes',
      props: true,
      component: () => import('./boxes/pages/list.vue'),
      meta: { title: 'العلب' },
    },
    {
      path: 'boxes/create',
      name: 'box-create',
      component: () => import('./boxes/pages/create.vue'),
      meta: { title: 'إضافة علبة' },
    },
    {
      path: 'boxes/:sectorId/:id/update',
      name: 'box-update',
      component: () => import('./boxes/pages/update.vue'),
      meta: { title: 'تعديل علبة' },
      props: true,
    },
    {
      path: 'clocks-list',
      name: 'clocks-list',
      component: () => import('./clocks-list/index.vue'),
      meta: { title: 'قائمة العدادات' },
      props: true,
    },
  ],
};

export default routes;
