<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="text-h5 q-mb-md text-weight-medium">عدد التأشيرات التي تم ادخالها</div>
    <Loader v-if="statisticsStore.loading" style="height: 300px" />
    <template v-else-if="!statisticsStore.readingsCount.labels.length">
      <NoData />
    </template>
    <template v-else>
      <div style="height: 300px; width: 100%">
        <Bar :data="statisticsStore.readingsCount" />
      </div>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.defaults.plugins.legend.display = false;

import { useStatisticsStore } from '../../store';
import Loader from 'src/components/loader.vue';
import NoData from 'src/components/no-data.vue';

const statisticsStore = useStatisticsStore();
</script>

<style lang="scss" scoped></style>
