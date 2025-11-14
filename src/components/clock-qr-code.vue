<template>
  <div class="flex justify-between bg-white q-px-sm">
    <div class="flex column" style="flex: 1">
      <q-img
        class="q-mx-auto q-mt-md"
        :src="require('src/assets/logo-vertical-full.svg')"
        style="width: 80px"
      />
      <div class="flex items-center q-mt-md">
        <div class="text-subtitle1 text-weight-medium text-primary">الاسم:</div>
        <div class="q-pl-sm">{{ clock.ownerName }}</div>
      </div>
      <div class="flex items-center q-mt-sm">
        <div class="text-subtitle1 text-weight-medium text-primary">رقم الساعة:</div>
        <div class="q-pl-sm">{{ clock.id }}</div>
      </div>
      <div class="flex items-center q-mt-sm">
        <div class="text-subtitle1 text-weight-medium text-primary">مقدم الخدمة:</div>
        <div class="q-pl-sm">{{ clock.vendor?.name }}</div>
      </div>
    </div>
    <div class="flex column justify-center items-center">
      <img
        :id="clockId"
        style="width: 192px; background-repeat: no-repeat; background-size: contain"
        :src="imageData"
      />
      <!-- <div class="text-subtitle1">{{ 'AMP-' + clock.id }}</div> -->
    </div>
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
  generateQR(props.clock.publicId);
});
</script>

<style lang="scss" scoped></style>
