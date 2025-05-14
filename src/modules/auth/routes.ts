import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: 'auth',
  component: () => import('./layout.vue'),
  meta: {
    notForLoggedInUsers: true,
  },
  children: [
    {
      path: 'login',
      component: () => import('./login/index.vue'),
      meta: {
        notForLoggedInUsers: true,
        title: 'تسجيل دخول',
      },
    },
    {
      path: 'sign-up',
      component: () => import('./sign-up/index.vue'),
      meta: {
        notForLoggedInUsers: true,
        title: 'حساب جديد',
      },
    },
  ],
};

export default routes;
