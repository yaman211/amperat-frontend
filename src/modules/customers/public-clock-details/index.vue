<template>
  <q-page>
    <Loader v-if="clockDetailsStore.loading" />

    <div class="q-pa-sm" v-else-if="clockDetailsStore.clock">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-4" v-for="(item, idx) in cardsItems" :key="idx">
          <q-card class="flex items-center rounded-lg q-pa-md">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon :name="item.icon" size="25px" :color="item.color" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">{{ item.label }}</div>
              <div
                class="font-weight-medium text-subtitle1"
                :class="
                  item.color === 'primary' ? 'text-primary' : item.color === 'red' ? 'text-red' : ''
                "
              >
                {{ item.value }}
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <div class="flex justify-center q-mt-md">
        <ClockStatusBadge :clock="clockDetailsStore.clock" class="q-px-md text-subtitle1" />
      </div>

      <q-separator class="q-my-md" />

      <q-card class="q-pa-md rounded-md">
        <div class="flex justify-between q-mb-md">
          <div class="text-h6 font-weight-bold">آخر تأشيرة</div>
          <q-btn
            label="عرض الكل"
            color="primary"
            outline
            flat
            icon="arrow_outward"
            class="rounded-md"
            @click="
              $router.push(`/customers/clock-readings/public/${clockDetailsStore.clock.publicId}`)
            "
          />
        </div>

        <div class="row q-col-gutter-md">
          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon name="electric_bolt" size="20px" color="primary" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">الاستهلاك</div>
              <div class="font-weight-medium text-subtitle1">
                {{ clockDetailsStore.lastReading?.consuming }} كيلو
              </div>
            </div>
          </div>

          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon name="pin" size="20px" color="black" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">التأشيرة</div>
              <div class="font-weight-medium text-subtitle1">
                {{ clockDetailsStore.lastReading?.readingNumber }}
              </div>
            </div>
          </div>

          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon name="schedule" size="20px" color="black" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">التاريخ</div>
              <div class="font-weight-medium text-subtitle1">
                {{ dateFormatter(clockDetailsStore.lastReading?.createdAt as Date) }}
              </div>
            </div>
          </div>
        </div>
      </q-card>

      <q-card class="q-pa-md rounded-md q-mt-md">
        <div class="flex justify-between q-mb-md">
          <div class="text-h6 font-weight-bold">آخر فاتورة</div>
          <q-btn
            label="عرض الكل"
            color="primary"
            outline
            flat
            icon="arrow_outward"
            class="rounded-md"
            @click="
              $router.push(`/customers/clock-invoices/public/${clockDetailsStore.clock.publicId}`)
            "
          />
        </div>

        <div class="row q-col-gutter-md">
          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #22c55e1a"
            >
              <q-icon name="attach_money" size="20px" color="green-7" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">المبلغ الكلي</div>
              <div class="font-weight- text-subtitle1 text-green-7">
                {{
                  clockDetailsStore.lastInvoice?.totalPrice || clockDetailsStore.lastInvoice?.price
                }}
                ل.س
              </div>
              <div
                v-if="clockDetailsStore.lastInvoice?.applicationFees"
                class="text-caption text-grey-6"
              >
                (متضمنة رسوم: {{ clockDetailsStore.lastInvoice?.applicationFees }} ل.س)
              </div>
            </div>
          </div>

          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon name="money" size="20px" color="black" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">عدد الكيلو واط المدفوع</div>
              <div class="font-weight-medium text-subtitle1">
                {{ clockDetailsStore.lastInvoice?.consuming }} كيلو
              </div>
            </div>
          </div>

          <div class="flex items-center col-12 col-sm-6 col-md-4">
            <div
              class="q-pa-md rounded-lg justify-center items-center"
              style="background-color: #0094ce20"
            >
              <q-icon name="schedule" size="20px" color="black" />
            </div>
            <div class="q-pl-md">
              <div class="text-grey-6">التاريخ</div>
              <div class="font-weight-medium text-subtitle1">
                {{ dateFormatter(clockDetailsStore.lastInvoice?.createdAt as Date) }}
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useClockDetailsStore } from '../../shared/clock-details/store';
import { dateFormatter } from 'src/utils/date';
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';
import { useCustomersStore } from 'src/modules/customers/store';
import { formatConsuming } from 'src/utils';
import ClockStatusBadge from 'src/components/clock-status-badge.vue';

const props = defineProps<{
  publicId?: string;
}>();

const clockDetailsStore = useClockDetailsStore();
const route = useRoute();
const customersStore = useCustomersStore();

if (props.publicId) {
  clockDetailsStore.fetchClockDataByPublicId(props.publicId).then(() => {
    if (route.query.withSave && clockDetailsStore.clock) {
      if (customersStore.isSaved(clockDetailsStore.clock)) {
        Notify.create({
          message: 'الساعة محفوطة بالفعل',
          type: 'warning',
        });
        return;
      }
      customersStore.saveClock(clockDetailsStore.clock);
      Notify.create({
        message: 'تم حفظ الساعة بنجاح',
        type: 'positive',
      });
    }
  });
}

const cardsItems = computed(() => {
  const clock = clockDetailsStore.clock;
  if (!clock) return [];
  return [
    {
      label: 'رقم الساعة',
      value: clock.id,
      icon: 'electric_bolt',
      color: 'primary',
    },
    {
      label: 'اسم المالك',
      value: clock.ownerName,
      icon: 'person',
      color: 'black',
    },
    {
      label: 'رقم الموبايل',
      value: clock.ownerPhone || '--',
      icon: 'call',
      color: 'black',
    },
    {
      label: 'الاستهلاك الحالي',
      value: formatConsuming(clock.consuming),
      icon: 'speed',
      color: clock.consuming <= 0 ? 'primary' : 'red',
    },
    {
      label: 'مقدم الخدمة',
      value: clock.vendor?.name || '--',
      icon: 'apartment',
      color: 'black',
    },
    {
      label: 'رقم العلبة',
      value: clock.box?.boxNumber || '--',
      icon: 'view_in_ar',
      color: 'black',
    },
  ];
});

onUnmounted(() => {
  clockDetailsStore.$reset();
});

onMounted(async () => {
  if (props.publicId) {
    clockDetailsStore.fetchClockReadingsByPublicId(props.publicId, 0, true);
    clockDetailsStore.fetchClockInvoicesByPublicId(props.publicId, 0, true);
  }
});
</script>

<style lang="scss" scoped></style>
