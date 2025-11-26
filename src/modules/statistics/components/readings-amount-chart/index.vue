<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="text-h6 q-mb-md text-weight-medium">
      <q-icon name="query_stats" class="q-mr-sm text-primary" size="32px" />
      كمية الكيلو واط المستهلكة
    </div>
    <q-separator class="q-mb-md" />
    <Loader v-if="statisticsStore.loading" style="height: 300px" />
    <template v-else-if="!statisticsStore.consuming.labels.length">
      <NoData />
    </template>
    <template v-else>
      <div style="height: 300px; width: 100%">
        <Line :data="statisticsStore.consuming" />
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
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.font.family = 'alexandria, sans-serif';

import { useStatisticsStore } from '../../store';
import Loader from 'src/components/loader.vue';
import NoData from 'src/components/no-data.vue';

const statisticsStore = useStatisticsStore();
</script>

<style lang="scss" scoped></style>
