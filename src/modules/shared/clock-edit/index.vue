<template>
  <div>
    <Loader v-if="clockEditStore.loading" />
    <div v-else-if="clockEditStore.clock != undefined">
      <ClockCard :clock="clockEditStore.clock" hideDetailsBtn />
      <div class="text-h5 q-my-md">تعديل بيانات الساعة:</div>
      <div class="q-pa-md q-mx-auto" style="width: 300px">
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <q-input
            v-model="ownerName"
            label="اسم المالك الجديد"
            lazy-rules
            :rules="[(val) => !!val || 'أدخل اسم مالك صحيح']"
            outlined
            rounded
            filled
          />
          <q-input
            v-model="ownerPhone"
            label="رقم موبايل حساب المالك"
            lazy-rules
            :rules="[
              (val) => !val || (val && val.length === 10 && !isNaN(val)) || 'أدخل رقم موبايل صحيح',
            ]"
            type="number"
            outlined
            rounded
            filled
          />

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
          <q-toggle
            checked-icon="check"
            unchecked-icon="clear"
            v-model="status"
            label="الحالة"
            :false-value="ClockStatus.OFF"
            :true-value="ClockStatus.ACTIVE"
          />

          <div>
            <q-btn
              label="تعديل الساعة"
              type="submit"
              color="primary"
              class="full-width"
              :loading="clockEditStore.editLoading"
              rounded
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import ClockCard from '../clocks-list/components/clock-card.vue';
import { onUnmounted, ref } from 'vue';
import { useClockEditStore } from './store';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { ClockStatus } from 'src/models/clock.model';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';
import BoxSelect from 'src/modules/management/boxes/components/box-select.vue';
const props = defineProps<{
  id: string;
}>();

const ownerName = ref('');
const ownerPhone = ref('');
const sector = ref<number | undefined>(undefined);
const box = ref<number | undefined>(undefined);
const status = ref(ClockStatus.ACTIVE);
const router = useRouter();
const clockEditStore = useClockEditStore();
clockEditStore.fetchClockData(+props.id).then((_) => {
  if (clockEditStore.clock) {
    status.value = clockEditStore.clock.status;
    ownerName.value = clockEditStore.clock.ownerName;
    sector.value = clockEditStore.clock.box?.sectorId || undefined;
    box.value = clockEditStore.clock.box?.id || undefined;
    if (clockEditStore.clock.user) {
      ownerPhone.value = clockEditStore.clock.user.phone;
    }
  }
});

const onSubmit = async () => {
  await clockEditStore.editClockData({
    ownerName: ownerName.value,
    status: status.value,
    userPhone: ownerPhone.value || null,
    boxId: box.value ? +box.value : null,
  });
  router.push(`/shared/clock-details/${clockEditStore.clock?.id}`);
  Notify.create({
    message: 'تم تعديل الساعة بنجاح',
    type: 'positive',
  });
};

onUnmounted(() => {
  clockEditStore.$reset();
});
</script>

<style lang="scss" scoped></style>
