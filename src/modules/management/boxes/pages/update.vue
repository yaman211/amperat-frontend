<template>
  <q-page>
    <div class="column justify-center items-center" style="min-height: calc(100vh - 70px)">
      <q-card class="q-pa-md rounded-lg q-mx-auto" style="width: 320px">
        <div class="text-h6 q-mb-md text-wight-medium">معلومات العلبة</div>
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="form.boxNumber"
            label="رقم الصندوق"
            :rules="[(val) => !!val || 'مطلوب']"
            filled
            class="q-mb-md"
          />
          <sector-select v-model="form.sectorId" class="q-mb-md" />
          <div class="row q-gutter-sm">
            <q-btn type="submit" color="primary" label="تحديث" :loading="loading" />
            <q-btn flat label="إلغاء" @click="goBack" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Box } from 'src/models/box.model';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';

const router = useRouter();
const route = useRoute();
const form = ref<{ boxNumber: number; sectorId: number }>({ boxNumber: 0, sectorId: 0 });
const loading = ref(false);

const fetchBox = async () => {
  const id = Number(route.params.id);
  const sectorId = Number(route.params.sectorId);
  const box = await Box.getById(sectorId, id);
  if (box) {
    form.value.boxNumber = box.boxNumber;
    form.value.sectorId = box.sectorId;
  }
};

const onSubmit = async () => {
  const id = Number(route.params.id);
  if (!form.value.sectorId) return;
  loading.value = true;
  try {
    await Box.update(id, form.value);
    router.back();
  } finally {
    loading.value = false;
  }
};

const goBack = () => router.back();

onMounted(fetchBox);
</script>
