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
          <div class="text-caption text-center">امسح رمز QR الخاص بك للاستعلام عن البيانات</div>
        </div>
      </q-card>
      <q-card flat bordered class="rounded-lg q-mt-lg q-pa-lg" @click="onSavedClocksClicked">
        <div class="column justify-center items-center">
          <div
            class="q-pa-md rounded-lg justify-center items-center q-mb-sm"
            style="background-color: #0094ce20"
          >
            <q-icon name="book" size="25px" color="primary" />
          </div>
          <div class="text-h6">الساعات المحفوظة</div>
          <div class="text-caption text-center">استعراض بيانات الساعات المحفوظة لديك</div>
        </div>
      </q-card>

      <div v-if="isAdminApp" class="row justify-center">
        <q-btn
          label="دخول الموظفين"
          icon="login"
          class="q-mx-auto q-mt-lg"
          @click="onLoginClicked"
          flat
          color="grey-8"
        />
      </div>
      <template v-else>
        <div class="text-subtitle1 q-mx-auto text-center q-mt-lg">يمكنك التواصل معنا عبر</div>
        <div class="row justify-center q-mt-md items-center q-gutter-x-md">
          <q-icon name="facebook" size="46px" color="blue" @click="onFbClicked()" />
          <q-img
            :src="require('src/assets/icons/whatsapp.svg')"
            width="42px"
            color="green"
            @click="onWhatsAppClicked()"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const isAdminApp = process.env.ADMIN_APP;

if (!$q.platform.is.capacitor) {
  router.push('/auth/login');
}

const onQueryClicked = () => {
  router.push('/shared/clock-qr-scan');
};
const onSavedClocksClicked = () => {
  router.push('/customers/saved-clocks');
};
const onLoginClicked = () => {
  router.push('/auth/login');
};

const onFbClicked = () => {
  window.open('https://www.facebook.com/amperat', '_blank');
};
function onWhatsAppClicked() {
  window.open('https://wa.me/963945152171');
}
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
