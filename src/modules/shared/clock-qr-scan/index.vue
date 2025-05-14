<template>
  <div class="flex justify-center items-center" style="height: 80vh">
    <div style="border: 2px solid cyan; width: 300px; height: 300px" class="q-mx-auto q-mt">
      <div class="scan"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useScanBarcode } from 'src/utils/barcode';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScanQrCodeStore } from './store';

const { startScan } = useScanBarcode();
const scanQrCodeStore = useScanQrCodeStore();
scanQrCodeStore.$reset();
const router = useRouter();

onMounted(async () => {
  // console.log('test');
  const res = await startScan();
  console.log({ res });
  scanQrCodeStore.setCode(res as string);

  router.replace({
    path: `/shared/clock-details/token/${res}`,
  });
});
</script>

<style lang="scss" scoped>
.scan {
  width: 100%;
  height: 50px;
  background: linear-gradient(cyan, transparent);
  animation: scanning 1.5s linear alternate infinite;
}

@keyframes scanning {
  0% {
    transform: translatey(0px);
  }
  100% {
    transform: translatey(270px);
  }
}
</style>
