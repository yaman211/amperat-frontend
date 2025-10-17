<template>
  <div>
    <div class="text-subtitle1">إختر إحدى الطرق التالية:</div>
    <div class="column q-gutter-y-lg q-mb-lg q-mt-xs">
      <q-select
        outlined
        rounded
        filled
        :options="options"
        @filter="filterFn"
        label="ادخل اسم المالك"
        emit-value
        use-input
        input-debounce="700"
        option-label="ownerName"
        option-value="id"
        v-model="ownerClock"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> لم يتم العثور على نتائج </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-separator />
      <q-input
        outlined
        rounded
        filled
        label="ادخل رقم الساعة"
        v-model="clockId"
        clearable
        suffix="-AMP"
        type="number"
      >
        <template v-if="clockId" v-slot:prepend>
          <q-btn
            outline
            icon="search"
            @click.stop.prevent="searchById"
            color="primary"
            :disable="!clockId"
            :loading="searchLoading"
          />
        </template>
      </q-input>
      <q-separator />
      <q-btn
        v-if="$q.platform.is.capacitor"
        outline
        label="امسح الرمز"
        color="primary"
        to="/shared/scan-barcode"
        :loading="scanLoading"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Clock } from 'src/models/clock.model';
import { useAuthStore } from 'src/modules/auth/store';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const scanLoading = ref(false);
const options = ref<Clock[]>([]);
const ownerClock = ref<string>('');
const clockId = ref<string>('');
const emit = defineEmits(['input']);
const searchLoading = ref(false);

async function filterFn(ownerName: string, update: any, abort: any) {
  if (!ownerName || ownerName.length < 2) {
    abort();
    return;
  }
  options.value = [];
  const opt = await Clock.search({ ownerName });
  update(() => {
    options.value = opt;
  });
}

const searchById = async () => {
  searchLoading.value = true;
  try {
    const clock = await Clock.getClock(+clockId.value);
    selectClock(clock);
  } finally {
    searchLoading.value = false;
  }
};

onMounted(async () => {
  if (route.query['clock-search-id']) {
    try {
      scanLoading.value = true;
      const id = +route.query['clock-search-id'];
      const clock = await Clock.getClock(id);
      selectClock(clock);
    } finally {
      scanLoading.value = false;
    }
  }
});

const selectClock = (clock: Clock) => {
  console.log({ clock });
  emit('input', clock);
};
const authStore = useAuthStore();
watch(ownerClock, (val) => {
  if (val) {
    const clock = options.value.find((c) => c.id === +val);
    if (clock) {
      const res = new Clock(clock);
      if (authStore.user?.vendor) res.vendor = authStore.user?.vendor;
      selectClock(res);
    }
  }
});
</script>

<style lang="scss" scoped></style>
