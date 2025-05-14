<template>
  <div>
    <Loader v-if="clockDetailsStore.loading" />
    <div v-else-if="clockDetailsStore.clock != undefined">
      <ClockCard
        :clock="clockDetailsStore.clock"
        hideDetailsBtn
        showEditBtn
        showBarcode
      />
      <q-tabs
        v-model="tab"
        class="bg-grey-2 q-my-md rounded-md"
        dense
        align="justify"
      >
        <q-tab
          class="text-primary"
          name="readings"
          icon="analytics"
          label="التأشيرات"
        />
        <q-tab
          class="text-primary"
          name="invoices"
          icon="paid"
          label="الفواتير"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="readings">
          <!-- <div class="text-h5 q-my-md">القراءات:</div> -->
          <q-infinite-scroll @load="onLoadReadings" :offset="100">
            <div class="column q-gutter-y-md q-px-md q-mb-sm">
              <q-card
                v-for="reading in clockDetailsStore.readings"
                :key="reading.id"
                class="q-pa-md rounded-lg"
              >
                <div class="flex justify-between">
                  <div class="text-weight-bold">
                    الإستهلاك:
                    <span class="text-primary">{{
                      reading.consuming + 'كيلو'
                    }}</span>
                  </div>
                  <div class="text-weight-bold">
                    التاريخ:
                    <span class="text-primary">{{
                      dateFormatter(reading.createdAt)
                    }}</span>
                  </div>
                </div>
                <div class="text-weight-bold text-center q-mt-sm">
                  رقم التأشيرة:
                  <span class="text-primary">{{ reading.readingNumber }}</span>
                </div>
              </q-card>
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-tab-panel>
        <q-tab-panel name="invoices">
          <!-- <div class="text-h5 q-my-md">الفواتير:</div> -->
          <q-infinite-scroll @load="onLoadInvoices" :offset="100">
            <div class="column q-gutter-y-md q-px-md q-mb-sm">
              <q-card
                v-for="invoice in clockDetailsStore.invoices"
                :key="invoice.id"
                class="q-pa-md rounded-lg"
              >
                <div class="flex justify-between">
                  <div class="text-weight-bold">
                    الإستهلاك:
                    <span class="text-primary">{{
                      invoice.consuming + 'كيلو'
                    }}</span>
                  </div>
                  <div class="text-weight-bold">
                    التاريخ:
                    <span class="text-primary">{{
                      dateFormatter(invoice.createdAt)
                    }}</span>
                  </div>
                </div>
                <div class="flex justify-center">
                  <div class="text-weight-bold">
                    المبلغ المدفوع:
                    <span class="text-primary">{{
                      invoice.price + 'ل.س'
                    }}</span>
                  </div>
                </div>
              </q-card>
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import ClockCard from '../clocks-list/components/clock-card.vue';
import { onUnmounted, ref } from 'vue';
import { useClockDetailsStore } from './store';
import { dateFormatter } from 'src/utils/date';
const props = defineProps<{
  id: string;
}>();

const clockDetailsStore = useClockDetailsStore();
const tab = ref<'readings' | 'invoices'>('readings');

clockDetailsStore.fetchClockData(+props.id);
const onLoadReadings = async (page: number, done: (d: boolean) => void) => {
  await clockDetailsStore.fetchClockReadings(+props.id, page - 1);
  done(clockDetailsStore.readings.length === clockDetailsStore.readingsCount);
};
const onLoadInvoices = async (page: number, done: (d: boolean) => void) => {
  await clockDetailsStore.fetchClockInvoices(+props.id, page - 1);
  done(clockDetailsStore.invoices.length === clockDetailsStore.invoicesCount);
};
onUnmounted(() => {
  clockDetailsStore.$reset();
});
</script>

<style lang="scss" scoped></style>
