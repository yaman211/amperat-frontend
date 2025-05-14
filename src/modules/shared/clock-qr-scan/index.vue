<template>
  <div></div>
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

<style lang="scss" scoped></style>
