<template>
  <div>
    <div class="q-mx-lg">
      <div>
        <div class="row q-gutter-sm">
          <sector-select
            v-model="sectorId"
            :clearable="true"
            outlined
            filled
            dense
            without-validation
            style="flex: 1"
          />
          <box-select
            v-model="boxId"
            class="col-12 col-md-2"
            :clearable="true"
            :sector-id="sectorId"
            outlined
            filled
            dense
            without-validation
            style="flex: 1"
          />
          <q-btn
            outline
            icon="search"
            @click.stop.prevent="getBoxClocks"
            color="primary"
            :loading="barcodeStore.loading"
            :disable="!boxId"
          />
        </div>
      </div>
      <q-separator class="q-mt-md" />
      <!-- <q-input label="رقم العلبة" v-model="boxNumber" outlined rounded filled type="number">
        <template v-slot:prepend>
          <q-btn
            outline
            icon="search"
            @click.stop.prevent="getBoxClocks"
            color="primary"
            :loading="barcodeStore.loading"
          />
        </template>
      </q-input> -->
      <q-input
        label="رقم الساعة"
        v-model="clockId"
        class="q-mt-md"
        outlined
        rounded
        filled
        type="number"
      >
        <template v-slot:prepend>
          <q-btn
            outline
            icon="search"
            @click.stop.prevent="getClock"
            color="primary"
            :loading="barcodeStore.loading"
          />
        </template>
      </q-input>

      <q-btn
        v-if="barcodeStore.clocks.length"
        label="طباعة"
        color="primary"
        class="q-mt-md full-width"
        rounded
        @click="print"
      />
      <q-tabs v-model="tab" class="text-white q-mt-md bg-primary">
        <q-tab name="barcode" label="باركود الساعات" />
        <q-tab name="qrcode" label="باركودات الزبائن" />
      </q-tabs>
    </div>
    <NoData v-if="!barcodeStore.loading && !barcodeStore.clocks.length" />
    <div v-if="barcodeStore.loading" class="flex justify-center q-mt-lg">
      <q-spinner-hourglass color="primary" size="5rem" />
    </div>
    <div v-else ref="content" class="q-mt-lg">
      <div class="row">
        <div class="col-4 cell" v-for="clock in barcodeStore.clocks" :key="clock.id">
          <ClockBarcode v-if="tab === 'barcode'" :clock="clock" />
          <ClockQrCode v-if="tab === 'qrcode'" :clock="clock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClockBarcode from 'src/components/clock-barcode.vue';
import ClockQrCode from 'src/components/clock-qr-code.vue';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';
import BoxSelect from 'src/modules/management/boxes/components/box-select.vue';
import NoData from 'src/components/no-data.vue';

import { ref, onUnmounted, onMounted } from 'vue';
import { useBarcodeStore } from './store';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const boxNumber = ref<number | undefined>(undefined);
const clockId = ref<number | undefined>(undefined);
const sectorId = ref<number | undefined>(undefined);
const boxId = ref<number | undefined>(undefined);
const content = ref<HTMLElement | null>(null);
const tab = ref<'barcode' | 'qrcode'>('barcode');
const barcodeStore = useBarcodeStore();
const route = useRoute();

const getBoxClocks = () => {
  if (!boxId.value) return;
  clockId.value = undefined;
  barcodeStore.fetchClocksByBox(boxId.value);
};
const getClock = () => {
  if (!clockId.value) return;
  boxNumber.value = undefined;
  barcodeStore.fetchClock(clockId.value);
};
const $q = useQuasar();

const print = () => {
  if (content.value) {
    const cloned = content.value.cloneNode(true);
    document.body.appendChild(cloned);
    // @ts-ignore
    cloned.classList.add('printable');
    window.print();
    document.body.removeChild(cloned);
  }
};

onMounted(() => {
  if (route.query.clockId) {
    clockId.value = +route.query.clockId;
    getClock();
  }
});

onUnmounted(() => {
  barcodeStore.$reset();
});
</script>

<style lang="scss" scoped>
.cell {
  outline: 1px solid black;
  padding: 5px;
}
</style>

<style>
@media print {
  body *:not(.printable, .printable *) {
    display: none;
  }
  .cell {
    break-inside: avoid;
  }
}
@page {
  margin: 0;
}
</style>
