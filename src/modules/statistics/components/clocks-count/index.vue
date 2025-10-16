<template>
  <q-card class="q-pa-md rounded-lg statistics-card">
    <div class="text-h5 q-mb-md flex items-center">
      <q-icon name="bar_chart" class="q-mr-sm text-primary" size="32px" />
      إحصائيات عامة
    </div>
    <Loader v-if="statisticsStore.loading" style="height: 90px" />
    <template v-else>
      <div class="row justify-between">
        <div>
          <div class="stat-row flex items-center q-gutter-sm q-mb-md">
            <q-icon name="schedule" class="stat-icon text-blue" size="28px" />
            <div class="stat-label text-weight-bold text-subtitle1">عدد الساعات:</div>
            <div class="stat-value text-h6">
              {{ statisticsStore.clocksCounts === null ? '--' : statisticsStore.clocksCounts }}
            </div>
          </div>

          <div class="stat-row flex items-center q-gutter-sm q-mb-md">
            <q-icon name="groups" class="stat-icon text-green" size="28px" />
            <div class="stat-label text-weight-bold text-subtitle1">عدد الموظفين:</div>
            <div class="stat-value text-h6">قريباً</div>
          </div>
          <div class="stat-row flex items-center q-gutter-sm">
            <q-icon name="account_balance" class="stat-icon text-orange" size="28px" />
            <div class="stat-label text-weight-bold text-subtitle1">عدد المحاسبين :</div>
            <div class="stat-value text-h6">قريباً</div>
          </div>
        </div>
        <div>
          <!-- Pie Chart Section -->
          <div class="q-mb-md q-mx-auto" style="height: 270px; width: 100%">
            <Pie v-if="pieData" :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { useStatisticsStore } from '../../store';

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const statisticsStore = useStatisticsStore();

import { computed } from 'vue';

const pieData = computed(() => {
  const { lessThanZero, equalZero, greaterThanZero } = statisticsStore.clockConsumptionGrouping;
  if (lessThanZero === 0 && equalZero === 0 && greaterThanZero === 0) return null;
  return {
    labels: [
      `تم الدفع لقدام (${lessThanZero})`,
      `لا يوجد استهلاك (${equalZero})`,
      `عليها كسر (${greaterThanZero})`,
    ],
    datasets: [
      {
        data: [lessThanZero, equalZero, greaterThanZero],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
        borderWidth: 1,
      },
    ],
  };
});

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: { family: 'Tajawal, sans-serif' },
      },
    },
    title: {
      display: true,
      text: 'توزيع الساعات حسب الاستهلاك',
      font: { size: 16, family: 'Tajawal, sans-serif' },
    },
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
