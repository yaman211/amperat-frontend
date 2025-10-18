<template>
  <div class="flex justify-center items-center" style="height: 80vh">
    <div style="border: 2px solid white; width: 300px; height: 200px" class="q-mx-auto q-mt">
      <div class="scan"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { useScanBarcode, isValidClockCode } from 'src/utils/barcode';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScanBarcodeStore } from './store';

const { startScan } = useScanBarcode();
const scanBarcodeStore = useScanBarcodeStore();
scanBarcodeStore.$reset();
const router = useRouter();

onMounted(async () => {
  const res = await startScan();
  if (!isValidClockCode(res)) {
    Notify.create({
      message: 'الكود الممسوح غير صحيح',
      type: 'negative',
    });
    scanBarcodeStore.$reset();
    router.back();
  } else {
    scanBarcodeStore.setCode(res as string);
    const from = router.options.history.state.back;
    console.log({ from });
    if (from) {
      router.push({
        path: from.toString(),
        query: {
          'clock-search-id': scanBarcodeStore.id,
        },
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.scan {
  width: 100%;
  height: 5px;
  background: linear-gradient(white, transparent);
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
