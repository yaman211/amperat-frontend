<template>
  <q-page>
    <div class="column justify-center items-center" style="min-height: calc(100vh - 70px)">
      <q-card class="q-pa-md rounded-lg q-mx-auto" style="width: 320px">
        <div class="text-h6 q-mb-md text-wight-medium">معلومات القطاع</div>
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="form.name"
            label="اسم القطاع"
            :rules="[(val) => !!val || 'مطلوب']"
            filled
            class="q-mb-md"
          />
          <q-input v-model="form.description" label="الوصف" filled class="q-mb-md" />
          <div class="row q-gutter-sm">
            <q-btn type="submit" color="primary" label="حفظ" :loading="loading" />
            <q-btn flat label="إلغاء" @click="goBack" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Sector } from 'src/models/sector.model';

const router = useRouter();
const form = ref({ name: '', description: '' });
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  try {
    await Sector.create(form.value);
    router.back();
  } finally {
    loading.value = false;
  }
};

const goBack = () => router.back();
</script>
