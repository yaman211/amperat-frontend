<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h3">العلب</div>
      </div>
      <q-btn color="primary" label="إضافة علبة" icon="add" @click="goToCreate" />
    </div>
    <q-card-section>
      <template v-if="loading">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-4" v-for="i in 9" :key="i">
            <q-card
              class="q-mx-sm q-pa-sm"
              style="border-radius: 18px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07)"
            >
              <q-card-section class="column items-center">
                <q-skeleton type="QAvatar" size="48px" />
                <div>
                  <div>
                    <q-skeleton type="text" width="100px" />
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right" class="q-pt-md">
                <q-skeleton type="QBtn" size="30px" class="q-mx-sm" />
                <q-skeleton type="QBtn" size="30px" class="q-mx-sm" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </template>
      <div class="row q-col-gutter-md">
        <div v-for="box in boxes" :key="box.id" class="col-12 col-sm-6 col-md-4">
          <q-card
            clickable
            @click="goToBox(box)"
            class="q-mx-sm q-pa-sm"
            style="border-radius: 18px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07)"
          >
            <q-card-section class="column items-center">
              <q-avatar size="48px" color="primary" text-color="white" class="q-mb-xs">
                <q-icon name="inventory_2" size="28px" />
              </q-avatar>
              <div class="text-h6 q-mb-xs">{{ box.boxNumber }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat icon="edit" color="primary" @click.stop="goToUpdate(box.id)" />
              <q-btn flat icon="delete" color="negative" @click.stop="deleteBox(box.id)" />
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
import { Box } from 'src/models/box.model';
import { useQuasar } from 'quasar';

const props = defineProps<{
  sectorId: number;
}>();

const $q = useQuasar();

const router = useRouter();
const boxes = ref<Box[]>([]);
const loading = ref(false);

const fetchBoxes = async () => {
  loading.value = true;
  try {
    const res = await Box.getSectorBoxes(props.sectorId);
    boxes.value = res;
  } finally {
    loading.value = false;
  }
};

const goToBox = (box: Box) => {
  router.push({
    path: '/management/clocks-list',
    query: {
      sectorId: box.sectorId,
      boxId: box.id,
    },
  });
};

const goToCreate = () => {
  router.push({ name: 'box-create', query: { sectorId: props.sectorId } });
};

const goToUpdate = (boxId: number) => {
  router.push({ name: 'box-update', params: { id: boxId } });
};

const deleteBox = async (boxId: number) => {
  $q.dialog({
    title: 'حذف العلبة',
    message: `هل أنت متأكد من إزالة العلبة؟`,
    ok: {
      color: 'negative',
    },
    cancel: {},
  }).onOk(async function () {
    await Box.delete(boxId);
    fetchBoxes();
  });
};

onMounted(fetchBoxes);
</script>

<style scoped>
.q-card {
  cursor: pointer;
}
</style>
