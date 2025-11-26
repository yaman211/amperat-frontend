<template>
  <div class="q-mr-sm">
    <DateSelect @input="setDate" class="q-mr-lg" />
  </div>
</template>

<script lang="ts" setup>
import DateSelect from 'src/components/date-select.vue';

import { ref, watch } from 'vue';
import { useStatisticsStore } from '../store';

const date = ref({
  from: null,
  to: null,
});

const setDate = (d: any) => {
  date.value = d;
};

const statisticsStore = useStatisticsStore();

const fetchData = () => {
  if (!date.value.from || !date.value.to) return;
  statisticsStore.getStatistics({
    from: date.value.from,
    to: date.value.to,
  });
};

watch(date, () => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>
