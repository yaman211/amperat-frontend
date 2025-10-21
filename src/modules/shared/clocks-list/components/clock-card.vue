<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="column q-gutter-y-sm">
      <div class="text-weight-bold flex items-center">
        <q-icon name="tag" class="q-mr-sm" />
        رقم الساعة:
        <span class="q-ml-sm text-primary">{{ clock.id }}</span>
      </div>
      <div class="text-weight-bold flex items-center">
        <q-icon name="person" class="q-mr-sm" />
        اسم المالك:
        <span class="q-ml-sm text-primary">{{ clock.ownerName }}</span>
      </div>
      <div class="text-weight-bold flex items-center">
        <q-icon name="business" class="q-mr-sm" />
        مقدم الخدمة:
        <span class="q-ml-sm text-primary">{{ clock.vendor.name }}</span>
      </div>
      <div class="text-weight-bold flex items-center">
        <q-icon name="inventory" class="q-mr-sm" />
        رقم العلبة:
        <span class="q-ml-sm text-primary">{{ clock.box?.boxNumber || '--' }}</span>
      </div>
      <div class="text-weight-bold flex items-center" v-if="lastReading?.readingNumber">
        <q-icon name="confirmation_number" class="q-mr-sm" />
        آخر تأشيرة:
        <span class="q-ml-sm text-primary">{{ lastReading?.readingNumber || '--' }}</span>
      </div>
      <div class="text-weight-bold flex items-center" v-if="clock?.paidUntilReadingNumber">
        <q-icon name="confirmation_number" class="q-mr-sm" />
        التأشيرة المدفوع لها:
        <span class="q-ml-sm text-primary">{{ clock?.paidUntilReadingNumber || '--' }}</span>
      </div>
      <div class="text-weight-bold flex items-center">
        <q-icon :name="clock.consuming < 0 ? 'account_balance_wallet' : 'bolt'" class="q-mr-sm" />
        {{ clock.consuming < 0 ? 'الرصيد' : 'الإستهلاك' }} الحالي:
        <span class="q-ml-sm text-primary">{{
          clock.consuming < 0
            ? `${-clock.consuming} كيلو لقدام`
            : clock.consuming == 0
              ? 'لا يوجد'
              : `${clock.consuming} كيلو كسر`
        }}</span>
      </div>
      <div class="text-weight-bold flex items-center">
        <q-icon name="info" class="q-mr-sm" />
        الحالة:
        <span
          class="q-ml-sm"
          :class="clock.status === ClockStatus.ACTIVE ? 'text-primary' : 'text-negative'"
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
    <div class="full-width q-mt-md" v-if="showEditBtn && $q.platform.is.desktop && canEdit"></div>
    <div class="row q-col-gutter-md q-mt-md" v-if="showEditBtn && canEdit">
      <div class="col-12 col-md-4 q-px-sm">
        <q-btn
          label="طباعة الكود"
          icon="print"
          color="primary"
          class="text-weight-bold full-width"
          :to="{
            path: '/management/print-barcode',
            query: { clockId: clock.id },
          }"
        />
      </div>
      <div class="col-12 col-md-4 q-px-sm">
        <q-btn
          icon="receipt_long"
          label="إضافة فاتورة جديدة"
          color="secondary"
          class="text-weight-bold full-width"
          @click="$router.push(`/management/pay-invoice?clockId=${clock.id}`)"
        />
      </div>
      <div class="col-12 col-md-4 q-px-sm">
        <q-btn
          icon="edit"
          label="تعديل الساعة"
          color="primary"
          class="text-weight-bold full-width"
          @click="openEdit()"
        />
      </div>
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
import { Invoice } from 'src/models/invoice.model';
import { Reading } from 'src/models/reading.model';

const props = defineProps<{
  clock: Clock;
  lastInvoice?: Invoice;
  lastReading?: Reading;
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
  return authStore.user && (authStore.user.isManager || authStore.user.isAccountant);
});
</script>

<style lang="scss" scoped></style>
