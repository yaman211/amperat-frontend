<template>
  <q-page padding>
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
        <q-btn type="submit" color="primary" label="حفظ" />
        <q-btn flat label="إلغاء" @click="goBack" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Sector } from 'src/models/sector.model';

const router = useRouter();
const form = ref({ name: '', description: '' });

const onSubmit = async () => {
  await Sector.create(form.value);
  router.back();
};

const goBack = () => router.back();
</script>
