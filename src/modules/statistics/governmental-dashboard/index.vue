<template>
  <div class="q-px-sm">
    <q-card class="q-pa-md rounded-lg">
      <div class="column q-gutter-sm">
        <!-- <div class="text-subtitle1 text-weight-bold">الفلاتر:</div> -->
        <VendorSelect v-model="selectedVendor" />
        <DateSelect @input="setDate" />
      </div>
    </q-card>
    <div class="column q-gutter-sm q-mt-md">
      <Loader v-if="statisticsStore.loading" />
      <div class="row q-gutter-y-md">
        <div class="col-md-6 col-12 q-px-sm">
          <ClocksCount />
        </div>
        <div class="col-md-6 col-12 q-px-sm">
          <InvoicesChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateSelect from 'src/components/date-select.vue';
import VendorSelect from 'src/components/vendor-select.vue';
import ClocksCount from '../components/clocks-count/index.vue';
import InvoicesChart from '../components/invoices-chart/index.vue';

import { ref, watch } from 'vue';
import { useStatisticsStore } from '../store';
import { Vendor } from 'src/models/vendor.model';
import Loader from 'src/components/loader.vue';

const selectedVendor = ref<Vendor | null>(null);
const date = ref({
  from: null,
  to: null,
});

const setDate = (d: any) => {
  date.value = d;
};

const statisticsStore = useStatisticsStore();

const fetchData = () => {
  if (!selectedVendor.value) return;
  if (!date.value.from || !date.value.to) return;
  statisticsStore.getStatistics({
    vendorId: selectedVendor.value,
    from: date.value.from,
    to: date.value.to,
  });
};

watch(selectedVendor, () => {
  fetchData();
});
watch(date, () => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>
