<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <q-img
      :src="require('src/assets/logo.svg')"
      style="height: 100px; max-width: 100px"
      class="rounded-borders q-mx-auto"
    />
    <div class="q-pa-md q-mx-auto q-mt-md" style="width: 300px">
      <q-card flat bordered class="rounded-lg q-pa-lg" @click="onQueryClicked">
        <div class="column justify-center items-center">
          <q-icon name="query_stats" size="100px" color="primary" class="q-mb-sm" />
          <div class="text-h6">الإستعلام عن الإستهلاك</div>
        </div>
      </q-card>
      <q-card flat bordered class="rounded-lg q-mt-lg q-pa-lg" @click="onLoginClicked">
        <div class="column justify-center items-center">
          <q-icon name="login" size="100px" color="primary" class="q-mb-sm" />
          <div class="text-h6">تسجيل الدخول</div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

if (!$q.platform.is.capacitor) {
  router.push('/auth/login');
}

const onQueryClicked = () => {
  router.push('/shared/clock-qr-scan');
};
const onLoginClicked = () => {
  router.push('/auth/login');
};
</script>

<style lang="scss" scoped></style>
