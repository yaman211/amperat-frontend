<template>
  <div>
    <div class="text-h5 q-mb-lg text-primary">ابحث عن الساعة المطلوبة</div>
    <ClockSearch @input="setClock($event)" />
  </div>
</template>

<script lang="ts" setup>
import ClockSearch from 'src/components/clock-search.vue';
import { Clock } from 'src/models/clock.model';
import { useRouter } from 'vue-router';

const router = useRouter();

const setClock = (c: Clock) => {
  router.push(`/shared/clock-details/${c.id}`);
};
</script>

<style lang="scss" scoped></style>
