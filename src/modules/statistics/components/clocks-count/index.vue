<template>
  <q-card class="q-pa-md rounded-lg statistics-card">
    <div class="text-h6 flex items-center">
      <q-icon name="speed" class="q-mr-sm text-primary" size="32px" />
      عدد الساعات حسب الاستهلاك
    </div>
    <div class="text-grey-6 text-caption q-mb-md">هذا الجزء غير تابع لفلتر التاريخ</div>

    <q-separator />
    <Loader v-if="statisticsStore.loading" style="height: 250px" />
    <template v-else>
      <div class="flex justify-between items-center q-pt-md">
        <div class="column q-gutter-y-lg">
          <div
            class="flex items-center q-gutter-x-sm"
            v-for="item in labelsWithCount"
            :key="item.label"
          >
            <div
              style="border-radius: 100%; width: 8px; height: 8px"
              :style="{ backgroundColor: item.color }"
            ></div>
            <div class="text-grey-6">{{ item.label }}:</div>
            <div class="font-weight-medium text-subtitle1">{{ item.count }}</div>
          </div>
        </div>
        <!-- Pie Chart Section -->
        <div class="" style="height: 220px">
          <Doughnut v-if="pieData" :data="pieData" :options="options" />
        </div>
      </div>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { useStatisticsStore } from '../../store';

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
ChartJS.defaults.font.family = 'alexandria, sans-serif';

const statisticsStore = useStatisticsStore();

import { computed } from 'vue';
import { commaFormatter } from 'src/utils';

const labelsWithCount = computed(() => {
  const { lessThanZero, equalZero, greaterThanZero } = statisticsStore.clockConsumptionGrouping;
  return [
    {
      label: 'تم الدفع مسبقاً',
      count: commaFormatter(lessThanZero),
      color: '#42A5F5',
    },
    {
      label: 'لا يوجد استهلاك',
      count: commaFormatter(equalZero),
      color: '#66BB6A',
    },
    {
      label: 'عليها كسر',
      count: commaFormatter(greaterThanZero),
      color: '#FFA726',
    },
  ];
});

const pieData = computed(() => {
  const { lessThanZero, equalZero, greaterThanZero } = statisticsStore.clockConsumptionGrouping;
  if (lessThanZero === 0 && equalZero === 0 && greaterThanZero === 0) return null;
  return {
    labels: [`تم الدفع مسبقاً`, `لا يوجد استهلاك`, `عليها كسر`],
    datasets: [
      {
        data: [lessThanZero, equalZero, greaterThanZero],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    // title: {
    //   display: false,
    //   text: 'توزيع الساعات حسب الاستهلاك',
    //   font: { size: 16, family: 'Tajawal, sans-serif' },
    // },
  },
};
</script>

<style lang="scss" scoped>
.statistics-card {
  min-height: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.stat-row {
  align-items: center;
}
.stat-icon {
  min-width: 28px;
}
.stat-label {
  min-width: 120px;
}
.stat-value {
  font-family: 'Tajawal', sans-serif;
  letter-spacing: 1px;
}
</style>
