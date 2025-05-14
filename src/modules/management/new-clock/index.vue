<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
        <q-input
          filled
          v-model="ownerName"
          label="اسم المالك"
          lazy-rules
          :rules="[(val) => !!val || 'أدخل اسم مالك صحيح']"
        />
        <q-input
          filled
          v-model="currentReading"
          label="التأشيرة الحالية"
          lazy-rules
          type="number"
          :rules="[(val) => !isNaN(val) || 'أدخل رقم تأشيرة صحيح']"
        />
        <q-input
          filled
          v-model="consuming"
          label="الإستهلاك الحالي"
          lazy-rules
          type="number"
          :rules="[(val) => !isNaN(val) || 'أدخل استهلاك صحيح']"
        >
          <template v-slot:append>
            <q-badge class="text-caption" color="grey-8">كيلو واط</q-badge>
          </template>
        </q-input>
        <q-input
          filled
          v-model="boxNumber"
          label="رقم العلبة"
          lazy-rules
          :rules="[
            (val) => !val || (val > 0 && !isNaN(val)) || 'أدخل رقم علبة صحيح',
          ]"
          type="number"
        />

        <div>
          <q-btn
            label="إنشاء الساعة"
            type="submit"
            color="primary"
            class="full-width"
            :loading="newClockStore.loading"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNewClockStore } from './store';

const ownerName = ref('');
const currentReading = ref(0);
const consuming = ref(0);
const boxNumber = ref(null);
const newClockStore = useNewClockStore();
const router = useRouter();

const onSubmit = async () => {
  const clock = await newClockStore.createClock({
    ownerName: ownerName.value,
    currentReading: +currentReading.value,
    consuming: +consuming.value,
    boxNumber: boxNumber.value ? +boxNumber.value : null,
  });
  router.push(`/shared/clock-details/${clock.id}`);
  Notify.create({
    message: 'تم إنشاء الساعة بنجاح',
    type: 'positive',
  });
};

onUnmounted(() => {
  newClockStore.$reset();
});
</script>

<style lang="scss" scoped></style>
