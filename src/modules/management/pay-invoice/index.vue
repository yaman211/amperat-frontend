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
          <q-btn @click="toStep2()" color="primary" label="متابعة" :disable="!clock" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="اضافة الفاتورة" icon="create_new_folder" :done="step > 2">
        <ClockCard v-if="clock" :clock="clock" hideDetailsBtn flat bordered />

        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <q-input
            v-model="consuming"
            type="number"
            label="الاستهلاك بالكيلو"
            lazyRules
            :rules="[(val) => (+val >= 0 && !isNaN(val)) || 'أدخل استهلاك صحيح']"
            autofocus
            suffix="كيلو"
            outlined
            rounded
            filled
          />
          <q-input
            v-model="price"
            type="number"
            label="المبلغ المدفوع"
            lazyRules
            :rules="[(val) => (+val >= 0 && !isNaN(val)) || 'أدخل سعر صحيح']"
            suffix="ليرة سورية"
            outlined
            rounded
            filled
          />

          <div>
            <q-btn type="submit" color="primary" label="إضافة" :loading="payInvoiceStore.loading" />
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
import { ref, watch } from 'vue';
import { useScanBarcodeStore } from 'src/modules/shared/scan-barcode/store';
import { useRoute, useRouter } from 'vue-router';
import { Notify, useQuasar } from 'quasar';
import { usePayInvoiceStore } from './store';
import { useAuthStore } from 'src/modules/auth/store';

const step = ref(1);
const consuming = ref(0);
const price = ref(0);
const clock = ref<Clock | undefined>(undefined);
const scanBarcodeStore = useScanBarcodeStore();
scanBarcodeStore.$reset();
const route = useRoute();
const router = useRouter();
const payInvoiceStore = usePayInvoiceStore();
const authStore = useAuthStore();

const setClock = (c: Clock) => {
  clock.value = c;
  router.replace({
    ...route,
    query: {},
  });
};

const toStep2 = async () => {
  if (clock.value) {
    consuming.value = clock.value?.consuming < 0 ? 0 : clock.value?.consuming;
  }
  step.value = 2;
};

const $q = useQuasar();
const onSubmit = () => {
  $q.dialog({
    title: 'إضافة فاتورة',
    message: `هل انت متأكد من اضافة فاتورة استهلاك ${consuming.value} كيلو بقيمة ${price.value} ليرة سورية ؟`,
    ok: {
      color: 'primary',
    },
  }).onOk(async () => {
    await payInvoiceStore.createInvoice(clock.value as Clock, +consuming.value, +price.value);
    Notify.create({
      message: 'تم اضافة الفاتورة',
      type: 'positive',
    });
    router.push('/');
  });
};

watch(consuming, () => {
  const kwPrice = authStore.user?.vendor?.kwPrice;
  price.value = consuming.value * (kwPrice || 0);
});
</script>

<style lang="scss" scoped></style>
