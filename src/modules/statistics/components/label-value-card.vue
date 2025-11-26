<template>
  <q-card class="q-px-md q-py-lg rounded-lg">
    <div class="text-subtitle1 flex column items-center justify-center" style="font-weight: 500">
      <div
        class="q-pa-md rounded-sm justify-center items-center"
        :style="
          variant === 'primary'
            ? 'background-color: #0094ce20'
            : 'background-color: rgba(38, 166, 153, 0.15)'
        "
      >
        <!-- <q-icon name="electric_bolt" size="20px" color="primary" /> -->
        <q-icon
          v-if="icon"
          :name="icon"
          :class="variant === 'primary' ? 'text-primary' : 'text-secondary'"
          size="24px"
        />
      </div>
      <div class="q-mt-md text-center">
        <div class="text-grey-6">
          {{ label }}
        </div>
        <q-skeleton v-if="loading" type="text" />
        <div class="text-subtitle1" v-else>{{ value }}</div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
defineProps<{
  icon?: string;
  variant?: 'primary' | 'secondary';
  label?: string;
  value?: string | number;
  loading?: boolean;
}>();
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
