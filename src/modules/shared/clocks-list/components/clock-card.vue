<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="column q-gutter-y-sm">
      <div class="text-weight-bold">
        رقم الساعة: <span class="text-primary">{{ clock.id }}</span>
      </div>
      <div class="text-weight-bold">
        اسم المالك: <span class="text-primary">{{ clock.ownerName }}</span>
      </div>
      <div class="text-weight-bold">
        مقدم الخدمة:
        <span class="text-primary">{{ clock.vendor.name }}</span>
      </div>
      <div class="text-weight-bold">
        رقم العلبة:
        <span class="text-primary">{{ clock.boxNumber || '--' }}</span>
      </div>
      <div class="text-weight-bold">
        {{ clock.consuming < 0 ? 'الرصيد' : 'الإستهلاك' }} الحالي:
        <span class="text-primary">{{
          clock.consuming < 0
            ? `${-clock.consuming} كيلو مقدماً`
            : `${clock.consuming} كيلو`
        }}</span>
      </div>
      <div class="text-weight-bold">
        الحالة:
        <span
          :class="
            clock.status === ClockStatus.ACTIVE
              ? 'text-primary'
              : 'text-negative'
          "
          >{{ $t(`clockStatus.${clock.status}`) }}</span
        >
      </div>
    </div>
    <div class="full-width flex justify-center q-mt-md" v-if="showBarcode">
      <clock-barcode :clock="clock" />
    </div>
    <div class="full-width q-mt-md" v-if="!hideDetailsBtn">
      <q-btn
        icon="info"
        label="تفاصيل الساعة"
        color="primary"
        class="q-mx-sm text-weight-bold full-width"
        @click="openDetails()"
      />
    </div>
    <div
      class="full-width q-mt-md"
      v-if="showEditBtn && $q.platform.is.desktop && canEdit"
    >
      <q-btn
        label="طباعة الكود"
        icon="print"
        color="primary"
        class="q-mx-sm text-weight-bold full-width"
        :to="{
          path: '/management/print-barcode',
          query: { clockId: clock.id },
        }"
      />
    </div>
    <div class="full-width q-mt-md" v-if="showEditBtn && canEdit">
      <q-btn
        icon="edit"
        label="تعديل الساعة"
        color="primary"
        class="q-mx-sm text-weight-bold full-width"
        @click="openEdit()"
      />
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { Clock } from 'src/models/clock.model';
import { useRouter } from 'vue-router';
import { ClockStatus } from 'src/models/clock.model';
import ClockBarcode from 'src/components/clock-barcode.vue';
import { useAuthStore } from 'src/modules/auth/store';
import { computed } from 'vue';

const props = defineProps<{
  clock: Clock;
  hideDetailsBtn?: boolean;
  showEditBtn?: boolean;
  showBarcode?: boolean;
}>();

const router = useRouter();
const authStore = useAuthStore();

function openDetails() {
  router.push(`/shared/clock-details/${props.clock.id}`);
}
function openEdit() {
  router.push(`/shared/clock-edit/${props.clock.id}`);
}

const canEdit = computed(() => {
  return (
    authStore.user && (authStore.user.isManager || authStore.user.isAccountant)
  );
});
</script>

<style lang="scss" scoped></style>
