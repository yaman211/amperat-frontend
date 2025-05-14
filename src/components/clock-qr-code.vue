<template>
  <div class="flex column justify-center items-center">
    <div class="q-mx-auto text-center text-weight-bold">
      {{ clock.ownerName }}
    </div>
    <img
      :id="clockId"
      style="width: 192px; background-repeat: no-repeat; background-size: contain"
      :src="imageData"
    />
  </div>
</template>

<script lang="ts" setup>
import QRCode from 'qrcode';
import { Clock } from 'src/models/clock.model';
import { computed, onMounted, ref } from 'vue';
const props = withDefaults(
  defineProps<{
    clock: Clock;
    width?: number;
    height?: number;
  }>(),
  {
    width: 150,
    height: 150,
  },
);

const imageData = ref('');

const clockId = computed(() => {
  return `${props.clock.id}`;
});

const generateQR = async (text: string) => {
  try {
    imageData.value = await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  generateQR(props.clock.token);
});
</script>

<style lang="scss" scoped></style>
