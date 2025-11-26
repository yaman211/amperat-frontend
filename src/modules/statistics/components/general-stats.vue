<template>
  <q-card class="q-pa-md rounded-lg statistics-card">
    <div class="text-h6 q-mb-md flex items-center">
      <q-icon name="bar_chart" class="q-mr-sm text-primary" size="32px" />
      إحصائيات عامة
    </div>
    <q-separator />
    <Loader v-if="statisticsStore.loading" style="height: 250px" />
    <template v-else>
      <div class="row q-gutter-y-xl q-pt-md">
        <div class="flex items-center col-6">
          <div
            class="q-pa-md rounded-lg justify-center items-center"
            style="background-color: #0094ce20"
          >
            <q-icon name="electric_bolt" size="20px" color="primary" />
          </div>
          <div class="q-pl-md">
            <div class="text-grey-6">عدد الساعات</div>
            <div class="font-weight-medium text-subtitle1">
              {{
                statisticsStore.clocksCounts === null
                  ? '--'
                  : commaFormatter(statisticsStore.clocksCounts as number)
              }}
            </div>
          </div>
        </div>
        <div class="flex items-center col-6">
          <div
            class="q-pa-md rounded-lg justify-center items-center"
            style="background-color: #0094ce20"
          >
            <q-icon name="groups" size="20px" color="primary" />
          </div>
          <div class="q-pl-md">
            <div class="text-grey-6">عدد المستخدمين</div>
            <div class="font-weight-medium text-subtitle1">
              {{ commaFormatter(statisticsStore.generalCounts.usersCount) }}
            </div>
          </div>
        </div>
        <div class="flex items-center col-6">
          <div
            class="q-pa-md rounded-lg justify-center items-center"
            style="background-color: #0094ce20"
          >
            <q-icon name="domain" size="20px" color="primary" />
          </div>
          <div class="q-pl-md">
            <div class="text-grey-6">عدد القطاعات</div>
            <div class="font-weight-medium text-subtitle1">
              {{ commaFormatter(statisticsStore.generalCounts.sectorsCount) }}
            </div>
          </div>
        </div>
        <div class="flex items-center col-6">
          <div
            class="q-pa-md rounded-lg justify-center items-center"
            style="background-color: #0094ce20"
          >
            <q-icon name="view_in_ar" size="20px" color="primary" />
          </div>
          <div class="q-pl-md">
            <div class="text-grey-6">عدد العلب</div>
            <div class="font-weight-medium text-subtitle1">
              {{ commaFormatter(statisticsStore.generalCounts.boxesCount) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { useStatisticsStore } from '../store';
import { commaFormatter } from 'src/utils';

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
</style>
