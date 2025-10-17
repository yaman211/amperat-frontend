<template>
  <q-page padding>
    <q-form @submit.prevent="onSubmit">
      <q-input
        v-model="form.boxNumber"
        label="رقم العلبة"
        :rules="[(val) => !!val || 'مطلوب']"
        filled
        type="number"
        class="q-mb-md"
      />
      <sector-select v-model="form.sectorId" class="q-mb-md" />
      <div class="row q-gutter-sm">
        <q-btn type="submit" color="primary" label="حفظ" :loading="loading" />
        <q-btn flat label="إلغاء" @click="goBack" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Box } from 'src/models/box.model';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';

const router = useRouter();
const route = useRoute();
const form = ref<{ boxNumber: number | undefined; sectorId?: number | undefined }>({
  boxNumber: undefined,
  sectorId: route.query.sectorId ? Number(route.query.sectorId) : undefined,
});
const loading = ref(false);

const onSubmit = async () => {
  if (!form.value.sectorId) return;
  loading.value = true;
  try {
    await Box.create(form.value as { boxNumber: number; sectorId: number });
    router.back();
  } finally {
    loading.value = false;
  }
};

const goBack = () => router.back();
</script>
