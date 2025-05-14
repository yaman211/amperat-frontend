<template>
  <div class="flex column justify-center items-center">
    <div class="q-mx-auto text-center text-weight-bold">
      {{ clock.ownerName }}
    </div>
    <img
      :id="barcodeValue"
      style="
        width: 192px;
        background-repeat: no-repeat;
        background-size: contain;
      "
    />
  </div>
</template>

<script lang="ts" setup>
import jsbarcode from 'jsbarcode';
import { Clock } from 'src/models/clock.model';
import { computed, onMounted } from 'vue';
const props = withDefaults(
  defineProps<{
    clock: Clock;
    width?: number;
    height?: number;
  }>(),
  {
    width: 192,
    height: 50,
  }
);

const barcodeValue = computed(() => {
  return `AMP-${props.clock.id}`;
});

onMounted(() => {
  jsbarcode('#' + barcodeValue.value, barcodeValue.value, {
    height: props.height,
    format: 'CODE128',
    font: 'cairo',
  });
});
</script>

<style lang="scss" scoped></style>
