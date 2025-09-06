<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <div
      class="q-pa-lg rounded-xl justify-center items-center q-mb-sm float-animation"
      style="background-color: #0094cede"
    >
      <q-img
        :src="require('src/assets/logo-white.svg')"
        style="width: 90px"
        class="rounded-borders q-mx-auto"
      />
    </div>
    <div class="q-pa-md q-mx-auto q-mt-md" style="width: 90%">
      <q-card
        flat
        bordered
        class="rounded-lg q-pa-md bg-primary text-white"
        @click="onQueryClicked"
      >
        <div class="column justify-center items-center">
          <div
            class="q-pa-md rounded-lg justify-center items-center q-mb-sm"
            style="background-color: #fff3"
          >
            <q-icon name="query_stats" size="25px" color="white" />
          </div>
          <div class="text-h6 text-center">الإستعلام عن الإستهلاك</div>
          <div class="text-caption text-center">عرض تفاصيل استهلاك الكهرباء والفواتير</div>
        </div>
      </q-card>
      <q-card flat bordered class="rounded-lg q-mt-lg q-pa-lg" @click="onLoginClicked">
        <div class="column justify-center items-center">
          <div
            class="q-pa-md rounded-lg justify-center items-center q-mb-sm"
            style="background-color: #0094ce20"
          >
            <q-icon name="login" size="25px" color="primary" />
          </div>
          <div class="text-h6">تسجيل الدخول</div>
          <div class="text-caption text-center">تسجيل الدخول لموظفين الشركات</div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

// const $q = useQuasar();
const router = useRouter();

// if (!$q.platform.is.capacitor) {
//   router.push('/auth/login');
// }

const onQueryClicked = () => {
  router.push('/shared/clock-qr-scan');
};
const onLoginClicked = () => {
  router.push('/auth/login');
};
</script>

<style lang="scss" scoped>
/* Floating animation */
.float-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
