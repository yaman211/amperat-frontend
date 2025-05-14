<template>
  <div class="column justify-center items-center q-gutter-y-md">
    <q-icon name="search_off" color="black" :size="size" />
    <div class="text-weight-bold text-h6">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: string;
    title?: string;
  }>(),
  {
    size: '10rem',
    title: 'لا يوجد بيانات حاليا',
  }
);
</script>

<style lang="scss" scoped></style>
