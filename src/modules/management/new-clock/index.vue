<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="ownerName"
          label="اسم المالك"
          lazy-rules
          :rules="[(val) => !!val || 'أدخل اسم مالك صحيح']"
          outlined
          rounded
          filled
        />
        <q-input
          v-model="currentReading"
          label="التأشيرة الحالية"
          lazy-rules
          type="number"
          :rules="[(val) => !isNaN(val) || 'أدخل رقم تأشيرة صحيح']"
          outlined
          rounded
          filled
        />
        <q-input
          v-model="consuming"
          label="الإستهلاك الحالي"
          lazy-rules
          type="number"
          :rules="[(val) => !isNaN(val) || 'أدخل استهلاك صحيح']"
          outlined
          rounded
          filled
        >
          <template v-slot:append>
            <q-badge class="text-caption" color="grey-8">كيلو واط</q-badge>
          </template>
        </q-input>

        <SectorSelect v-model="sector" outlined rounded filled />
        <BoxSelect v-model="box" :sectorId="sector" outlined rounded filled />
        <!-- <q-input
          v-model="boxNumber"
          label="رقم العلبة"
          lazy-rules
          :rules="[(val) => !val || (val > 0 && !isNaN(val)) || 'أدخل رقم علبة صحيح']"
          type="number"
          outlined
          rounded
          filled
        /> -->

        <div>
          <q-btn
            label="إنشاء الساعة"
            type="submit"
            color="primary"
            class="full-width"
            :loading="newClockStore.loading"
            rounded
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewClockStore } from './store';
import BoxSelect from '../boxes/components/box-select.vue';
import SectorSelect from '../sectors/components/sector-select.vue';

const ownerName = ref('');
const currentReading = ref(0);
const consuming = ref(0);
const sector = ref(undefined);
const box = ref(undefined);
const newClockStore = useNewClockStore();
const router = useRouter();

const onSubmit = async () => {
  const clock = await newClockStore.createClock({
    ownerName: ownerName.value,
    currentReading: +currentReading.value,
    consuming: +consuming.value,
    boxId: box.value,
    // boxNumber: boxNumber.value ? +boxNumber.value : null,
  });
  router.push(`/shared/clock-details/${clock.id}`);
  Notify.create({
    message: 'تم إنشاء الساعة بنجاح',
    type: 'positive',
  });
};

onUnmounted(() => {
  newClockStore.$reset();
});
</script>

<style lang="scss" scoped></style>
