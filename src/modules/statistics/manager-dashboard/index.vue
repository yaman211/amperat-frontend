<template>
  <div class="q-px-sm q-pb-md">
    <q-card class="q-pa-md rounded-lg" v-if="!$q.platform.is.desktop">
      <div class="column q-gutter-sm">
        <DateSelect @input="setDate" />
      </div>
      <div class="column q-gutter-sm q-mt-sm">
        <SectorSelect
          v-model="sectorId"
          with-all-option
          without-validation
          dense
          @input="setDate"
        />
      </div>
    </q-card>
    <div class="column q-gutter-sm q-mt-md">
      <!-- <Loader v-if="statisticsStore.loading" /> -->
      <div class="row q-gutter-y-md">
        <div class="col-md-4 col-12 q-px-sm">
          <GeneralStats />
        </div>
        <div class="col-md-4 col-12 q-px-sm">
          <ClocksCount />
        </div>
        <div class="col-md-4 col-12 row justify-between">
          <div class="col-6 q-px-sm">
            <LabelValueCard
              icon="paid"
              label="مجموع قيم الفواتير"
              :value="`${commaFormatter(totals.invoices.amount)} ل.س`"
              variant="secondary"
              :loading="statisticsStore.loading"
            />
          </div>
          <div class="col-6 q-px-sm">
            <LabelValueCard
              icon="request_page"
              label="عدد الفواتير"
              :value="commaFormatter(totals.invoices.count)"
              variant="secondary"
              :loading="statisticsStore.loading"
            />
          </div>
          <div class="col-6 q-mt-md q-px-sm">
            <LabelValueCard
              icon="query_stats"
              label="مجموع الكيلو واط"
              :value="`${commaFormatter(totals.readings.amount)} كيلو واط`"
              variant="primary"
              :loading="statisticsStore.loading"
            />
          </div>
          <div class="col-6 q-mt-md q-px-sm">
            <LabelValueCard
              icon="sticky_note_2"
              label="عدد التأشيرات"
              :value="`${commaFormatter(totals.readings.count)}`"
              variant="primary"
              :loading="statisticsStore.loading"
            />
          </div>
        </div>
        <div class="col-md-6 col-12 q-px-sm">
          <InvoicesAmountChart />
        </div>
        <div class="col-md-6 col-12 q-px-sm">
          <InvoicesCountChart />
        </div>
        <div class="col-md-6 col-12 q-px-sm">
          <ReadingsAmountChart />
        </div>
        <div class="col-md-6 col-12 q-px-sm">
          <ReadingsCountChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateSelect from 'src/components/date-select.vue';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';
import GeneralStats from '../components/general-stats.vue';
import ClocksCount from '../components/clocks-count/index.vue';
import InvoicesAmountChart from '../components/invoices-amount-chart/index.vue';
import InvoicesCountChart from '../components/invoices-count-chart/index.vue';
import ReadingsAmountChart from '../components/readings-amount-chart/index.vue';
import ReadingsCountChart from '../components/readings-count-chart/index.vue';
import LabelValueCard from '../components/label-value-card.vue';

import { computed, ref, watch } from 'vue';
import { useStatisticsStore } from '../store';
import { useQuasar } from 'quasar';
import { commaFormatter } from 'src/utils';

// const selectedVendor = ref<Vendor | null>(null);
const date = ref({
  from: null,
  to: null,
});
const sectorId = ref<number | null>(null);

const $q = useQuasar();

const setDate = (d: any) => {
  date.value = d;
};

const statisticsStore = useStatisticsStore();

const fetchData = () => {
  // if (!selectedVendor.value) return;
  if (!date.value.from || !date.value.to) return;
  statisticsStore.getStatistics({
    from: date.value.from,
    to: date.value.to,
    sectorId: sectorId.value,
  });
};

const totals = computed(() => {
  return statisticsStore.totals;
});

watch(sectorId, () => {
  fetchData();
});

watch(date, () => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>
