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
        <q-btn type="submit" color="primary" label="تحديث" />
        <q-btn flat label="إلغاء" @click="goBack" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Sector } from 'src/models/sector.model';

const router = useRouter();
const route = useRoute();
const form = ref({ name: '', description: '' });

const fetchSector = async () => {
  const id = Number(route.params.id);
  const res = await Sector.getById(id);
  const sector = res;
  if (sector) {
    form.value.name = sector.name;
    form.value.description = sector.description;
  }
};

const onSubmit = async () => {
  const id = Number(route.params.id);
  await Sector.update(id, form.value);
  router.back();
};

const goBack = () => router.back();

onMounted(fetchSector);
</script>
