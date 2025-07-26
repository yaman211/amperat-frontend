<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="text-h5 q-mb-md text-weight-medium">إحصائيات عامة</div>
    <Loader v-if="statisticsStore.loading" style="height: 90px" />
    <template v-else>
      <div class="flex q-gutter-sm">
        <div class="text-weight-bold">عدد الساعات:</div>
        <div>{{ statisticsStore.clockCount === null ? '--' : statisticsStore.clockCount }}</div>
      </div>
      <div class="flex q-gutter-sm">
        <div class="text-weight-bold">عدد الموظفين:</div>
        <div>{{ 'قريباً' }}</div>
      </div>
      <div class="flex q-gutter-sm">
        <div class="text-weight-bold">عدد المحاسبين :</div>
        <div>{{ 'قريباً' }}</div>
      </div>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { useStatisticsStore } from '../../store';

const statisticsStore = useStatisticsStore();
</script>

<style lang="scss" scoped></style>
