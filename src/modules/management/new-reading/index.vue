<template>
  <div>
    <q-stepper v-model="step" vertical color="primary" class="rounded-md" animated flat bordered>
      <q-step :name="1" title="إختيار الساعة" icon="settings" :done="step > 1">
        <ClockSearch v-if="!clock" @input="setClock($event)" />
        <div v-else>
          <ClockCard :clock="clock" hideDetailsBtn flat bordered />
          <q-btn
            label="إعادة اختيار"
            color="negative"
            @click="clock = undefined"
            class="q-mt-sm full-width"
          />
        </div>
        <q-stepper-navigation>
          <q-btn
            @click="toStep2()"
            color="primary"
            label="متابعة"
            :disable="!clock"
            :loading="toStep2Loading"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="إضافة التأشيرة" icon="create_new_folder" :done="step > 2">
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <div class="text-subtitle1 text-weight-medium">
            آخر تأشيرة للساعة {{ lastReading?.readingNumber }}
          </div>
          <q-input
            v-model="readingNumber"
            type="number"
            label="رقم التأشيرة الجديد"
            lazyRules
            :rules="[
              (val) =>
                (!!+val && !isNaN(val) && isValidReadingNumber(val)) || 'أدخل رقم تأشيرة صحيح',
            ]"
            autofocus
            outlined
            rounded
            filled
          />

          <div>
            <q-btn type="submit" color="primary" label="إضافة" :loading="newReadingStore.loading" />
            <q-btn outline @click="step = 1" color="primary" label="عودة" class="q-ml-sm" />
          </div>
        </q-form>
      </q-step>
    </q-stepper>
  </div>
</template>

<script lang="ts" setup>
import ClockSearch from 'src/components/clock-search.vue';
import ClockCard from 'src/modules/shared/clocks-list/components/clock-card.vue';
import { Clock } from 'src/models/clock.model';
import { onMounted, ref } from 'vue';
import { useScanBarcodeStore } from 'src/modules/shared/scan-barcode/store';
import { useRoute, useRouter } from 'vue-router';
import { Notify, useQuasar } from 'quasar';
import { useNewReadingStore } from './store';
import { Reading } from 'src/models/reading.model';

const step = ref(1);
const readingNumber = ref('');
const toStep2Loading = ref(false);
const clock = ref<Clock | undefined>(undefined);
const lastReading = ref<Reading | undefined>(undefined);
const scanBarcodeStore = useScanBarcodeStore();
scanBarcodeStore.$reset();
const route = useRoute();
const router = useRouter();
const newReadingStore = useNewReadingStore();

onMounted(async () => {
  if (route.query.clockId) {
    const c = await Clock.getClock(+route.query.clockId);
    setClock(c);
  }
});

const setClock = (c: Clock) => {
  readingNumber.value = '';
  clock.value = c;
  router.replace({
    ...route,
    query: {},
  });
};

const toStep2 = async () => {
  toStep2Loading.value = true;
  try {
    const lr = await clock.value?.getLastReading();
    lastReading.value = lr;
    step.value = 2;
  } finally {
    toStep2Loading.value = false;
  }
};

const isValidReadingNumber = (readingNumber: number) => {
  if (!lastReading.value) return false;
  const d = readingNumber - lastReading.value.readingNumber;
  return d >= 0;
};

const $q = useQuasar();
const onSubmit = () => {
  const consuming = +readingNumber.value - (lastReading.value?.readingNumber as number);
  $q.dialog({
    title: 'إضافة تأشيرة',
    message: `هل انت متأكد من إضافة ${consuming} كيلو  للمشترك ${clock.value?.ownerName} ؟`,
    ok: {
      color: 'primary',
    },
  }).onOk(async () => {
    await newReadingStore.createReading(clock.value as Clock, +readingNumber.value);
    Notify.create({
      message: 'تم اضافة التأشيرة',
      type: 'positive',
    });
    router.push('/');
  });
};
</script>

<style lang="scss" scoped></style>
