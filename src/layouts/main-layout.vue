<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0px">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-img
          :src="require('src/assets/logo-white.svg')"
          style="height: 40px; max-width: 40px"
          class="rounded-borders q-ml-sm cursor-pointer"
          @click="router.push('/')"
        />

        <q-toolbar-title>
          أمبيرات {{ pageName ? `- ${pageName}` : '' }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="column q-py-lg">
        <q-img
          :src="require('src/assets/logo.svg')"
          style="height: 100px; max-width: 100px"
          class="rounded-borders q-mx-auto"
        />
        <div class="text-weight-bold text-h6 text-center text-primary q-mt-md">
          أمبيرات
        </div>
        <div
          class="text-weight-medium text-subtitle1 text-center text-grey-8 q-mt-sm q-px-md"
        >
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
          <q-btn
            label="تواصل مع إدارة التطبيق"
            outline
            color="primary"
            @click="contactUs"
          />
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

    <q-page-container class="q-px-md q-mt-md">
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

const leftDrawerOpen = ref(false);
const authStore = useAuthStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function refresh() {
  window.location.reload();
}
function contactUs() {
  window.open('tel:0982322946"');
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
