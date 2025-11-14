<template>
  <div
    v-if="versionsStore.checkingForUpdates || versionsStore.mustUpdate"
    class="row items-center justify-center"
    style="height: 100vh; position: absolute; z-index: 999999; background-color: white; width: 100%"
  >
    <div v-if="versionsStore.checkingForUpdates" class="column items-center">
      <q-img
        :src="require('src/assets/logo-vertical-full.svg')"
        style="width: 250px"
        class="rounded-borders"
      />
      <q-spinner color="primary" size="50px" class="q-mt-xl" v-if="!versionsStore.hasError" />
      <div class="text-h6 text-grey-8 q-mt-md" v-if="!versionsStore.hasError">
        جاري التحقق من التحديثات...
      </div>
      <div class="column items-center" v-else>
        <div class="text-h6 text-red-6 q-mt-xl">حصل خطأ أثناء التحقق من التحديثات.</div>
        <div class="text-h6 text-red-6 q-mt-sm">تأكد من اتصالك بالانترنت</div>
        <q-btn
          label="إعادة المحاولة"
          color="secondary"
          class="q-mt-lg"
          icon="refresh"
          @click="versionsStore.checkVersion()"
        />
      </div>
    </div>
    <div v-else-if="versionsStore.mustUpdate" class="column items-center">
      <q-img
        :src="require('src/assets/logo-vertical-full.svg')"
        style="width: 250px"
        class="rounded-borders"
      />
      <div class="text-h6 text-grey-8 q-mt-xl">التطبيق يحتاج الى تحديث !</div>

      <q-btn
        label="تحديث الآن"
        color="primary"
        class="q-mt-lg"
        icon="download"
        @click="openDownloadLink"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVersionsStore } from '../stores/versions-store';

const versionsStore = useVersionsStore();
versionsStore.checkVersion();

const openDownloadLink = () => {
  window.open(versionsStore.versionInfo?.updateUrl as string, '_blank');
};
</script>
