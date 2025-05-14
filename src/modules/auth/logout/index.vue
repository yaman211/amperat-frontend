<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <div class="text-h5 text-weight-bold text-primary q-pb-md">
      جارِ تسجيل الخروج
    </div>
    <div>
      <q-spinner-hourglass color="primary" size="3em" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store';

const authStore = useAuthStore();
authStore.logout();
const router = useRouter();
setTimeout(() => {
  router.push('/');
  Notify.create({
    message: 'تم تسجيل الخروج',
    type: 'positive',
  });
}, 2000);
</script>

<style lang="scss" scoped></style>
