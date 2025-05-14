<template>
  <div>
    <NoData
      v-if="!clocksListStore.loading && !clocksListStore.clocks.length"
      class="column justify-center items-center q-gutter-y-md"
    >
    </NoData>

    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="column q-gutter-y-md q-px-md">
        <ClockCard
          v-for="clock in clocksListStore.clocks"
          :key="clock.id"
          :clock="clock"
        />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts" setup>
import NoData from 'src/components/no-data.vue';
import { onUnmounted } from 'vue';
import ClockCard from './components/clock-card.vue';
import { useClocksListStore } from './store';

const clocksListStore = useClocksListStore();
const onLoad = async (page: number, done: (d: boolean) => void) => {
  await clocksListStore.fetchClocks();
  done(true);
};

onUnmounted(() => {
  clocksListStore.$reset();
});
</script>

<style lang="scss" scoped></style>
