<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="col">
        <h2>القطاعات</h2>
      </div>
      <q-btn color="primary" label="إضافة قطاع" @click="goToCreate" />
    </div>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-4" v-for="sector in sectors" :key="sector.id">
          <q-card
            clickable
            @click="goToBoxes(sector.id)"
            class="q-mx-sm q-pa-sm"
            style="border-radius: 18px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07)"
          >
            <q-card-section class="row items-center">
              <q-avatar size="48px" color="primary" text-color="white" class="q-mr-md">
                <q-icon name="business" size="28px" />
              </q-avatar>
              <div>
                <div class="text-h6 q-mb-xs">{{ sector.name }}</div>
                <div class="text-caption text-grey-7">{{ sector.description }}</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="q-pt-none">
              <q-btn
                round
                dense
                flat
                icon="edit"
                color="primary"
                @click.stop="goToUpdate(sector.id)"
                :aria-label="`تعديل ${sector.name}`"
              />
              <q-btn
                round
                dense
                flat
                icon="delete"
                color="negative"
                @click.stop="deleteSector(sector.id)"
                :aria-label="`حذف ${sector.name}`"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Sector } from 'src/models/sector.model';
import { useQuasar } from 'quasar';

const router = useRouter();
const sectors = ref<Sector[]>([]);

const fetchSectors = async () => {
  const res = await Sector.getAll();
  sectors.value = res;
};

const goToBoxes = (sectorId: number) => {
  router.push({ name: 'boxes', params: { sectorId } });
};

const goToCreate = () => {
  router.push({ name: 'sector-create' });
};

const goToUpdate = (sectorId: number) => {
  router.push({ name: 'sector-update', params: { id: sectorId } });
};
const $q = useQuasar();

const deleteSector = async (sectorId: number) => {
  $q.dialog({
    title: 'حذف قطاع',
    message: `هل أنت متأكد من إزالة القطاع؟`,
    ok: {
      color: 'negative',
    },
    cancel: {},
  }).onOk(async function () {
    await Sector.delete(sectorId);
    fetchSectors();
  });
};

onMounted(fetchSectors);
</script>

<style scoped>
.q-card {
  cursor: pointer;
}
</style>
