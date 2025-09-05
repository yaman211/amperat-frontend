<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0px; background-color: #f7f7f7">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-img
          :src="require('src/assets/logo-white.svg')"
          style="width: 40px"
          class="rounded-borders q-ml-sm cursor-pointer"
          @click="router.push('/')"
        />

        <q-toolbar-title> أمبيرات {{ pageName ? `- ${pageName}` : '' }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="column q-py-lg">
        <q-img
          :src="require('src/assets/logo-vertical-full.svg')"
          style="width: 150px"
          class="rounded-borders q-mx-auto"
        />
        <!-- <div class="text-weight-bold text-h6 text-center text-primary q-mt-md">أمبيرات</div> -->
        <div class="text-weight-medium text-subtitle1 text-center text-grey-8 q-mt-sm q-px-md">
          طريقك لإدارة إشتراكاتك في خدمات المولدات
        </div>
        <div class="q-mt-lg column items-center q-gutter-y-md">
          <q-btn
            v-if="authStore.isLoggedIn"
            label="الصفحة الرئيسية"
            outline
            color="primary"
            @click="
              $router.push('/');
              leftDrawerOpen = false;
            "
          />
          <q-btn label="تواصل مع إدارة التطبيق" outline color="primary" @click="contactUs" />
          <q-btn
            v-if="authStore.isLoggedIn"
            label="تسجيل الخروج"
            to="/auth/logout"
            outline
            color="primary"
          />
        </div>
      </div>
    </q-drawer>

    <!-- <q-img
      :src="require('src/assets/pattern.png')"
      class="absolute"
      style="height: 100%; opacity: 0.08"
    /> -->
    <q-page-container
      class="q-px-md q-mt-md"
      :class="leftDrawerOpen && !$q.platform.is.capacitor ? 'q-ml-md' : ''"
      style="min-height: calc(100vh - 17px)"
    >
      <q-pull-to-refresh @refresh="refresh">
        <router-view />
      </q-pull-to-refresh>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/modules/auth/store';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFcm } from 'src/utils/firebase-notifications';
import { useQuasar } from 'quasar';

const { init } = useFcm();
init();

const leftDrawerOpen = ref(false);
const authStore = useAuthStore();
const $q = useQuasar();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function refresh() {
  window.location.reload();
}
function contactUs() {
  window.open('tel:0945152171');
}

const route = useRoute();
const router = useRouter();

if (authStore.isLoggedIn) {
  authStore.user?.refreshMe().catch((err) => {
    if (err.response) {
      router.push('/auth/logout');
    }
  });
}
const pageName = computed(() => {
  if (route.meta && route.meta.title) return route.meta.title;
  return '';
});
</script>
