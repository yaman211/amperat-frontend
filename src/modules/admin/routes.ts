import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'admin',
  component: () => import('./layout.vue'),
  meta: {},
  children: [
    {
      path: 'users-list',
      component: () => import('./users-list/index.vue'),
      meta: {
        title: 'المستخدمين',
      },
    },
    {
      path: 'users/update/:id',
      props: true,
      component: () => import('./user-update/index.vue'),
      meta: {
        title: 'تعديل مستخدم',
      },
    },
  ],
};

export default routes;
