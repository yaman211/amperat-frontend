<template>
  <div
    v-if="versionsStore.checkingForUpdates || versionsStore.mustUpdate"
    class="row items-center justify-center"
    style="height: 100vh; position: relative; z-index: 999999; background-color: white; width: 100%"
  >
    <div v-if="versionsStore.checkingForUpdates" class="column items-center">
      <q-img
        :src="require('src/assets/logo-vertical-full.svg')"
        style="width: 250px"
        class="rounded-borders"
      />
      <q-spinner color="primary" size="50px" class="q-mt-xl" />
      <div class="text-h6 text-grey-8 q-mt-md" v-if="!versionsStore.hasError">
        جاري التحقق من التحديثات...
      </div>
      <div class="q-mt-md" v-else>
        حصل خطأ أثناء التحقق من التحديثات.
        <q-btn
          label="إعادة المحاولة"
          color="primary"
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
