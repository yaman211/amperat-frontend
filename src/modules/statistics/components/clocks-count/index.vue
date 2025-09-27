<template>
  <q-card class="q-pa-md rounded-lg statistics-card">
    <div class="text-h5 q-mb-md text-weight-bold flex items-center">
      <q-icon name="bar_chart" class="q-mr-sm text-primary" size="32px" />
      إحصائيات عامة
    </div>
    <Loader v-if="statisticsStore.loading" style="height: 90px" />
    <template v-else>
      <div class="stat-row flex items-center q-gutter-sm q-mb-md">
        <q-icon name="schedule" class="stat-icon text-blue" size="28px" />
        <div class="stat-label text-weight-bold text-subtitle1">عدد الساعات:</div>
        <div class="stat-value text-h6">
          {{ statisticsStore.clockCount === null ? '--' : statisticsStore.clockCount }}
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
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { useStatisticsStore } from '../../store';

const statisticsStore = useStatisticsStore();
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
