<template>
  <div class="row items-center q-gutter-sm q-px-sm">
    <SectorSelect
      v-model="sectorId"
      with-all-option
      without-validation
      dense
      class="col-auto bg-white rounded-sm"
      style="min-width: 150px"
    />
    <DateSelect @input="setDate" class="col-auto" />
  </div>
</template>

<script lang="ts" setup>
import DateSelect from 'src/components/date-select.vue';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';

import { ref, watch } from 'vue';
import { useStatisticsStore } from '../store';

const date = ref({
  from: null,
  to: null,
});
const sectorId = ref<number | null>(null);

const setDate = (d: any) => {
  date.value = d;
};

const statisticsStore = useStatisticsStore();

const fetchData = () => {
  // If date is not selected, we don't fetch.
  // Assuming the original logic requires date.
  if (!date.value.from || !date.value.to) return;
  statisticsStore.getStatistics({
    from: date.value.from,
    to: date.value.to,
    sectorId: sectorId.value,
  });
};

watch(date, () => {
  fetchData();
});

watch(sectorId, () => {
  fetchData();
});
</script>
