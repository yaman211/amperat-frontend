<template>
  <div>
    <q-select
      label="التاريخ"
      :model-value="selectedOption"
      @update:model-value="onSelectOption"
      :options="periodOptions"
      option-label="label"
      option-value="id"
      map-options
      dense
      filled
      class="bg-white rounded-sm"
    ></q-select>
    <q-dialog v-model="isDialogOpen" persistent>
      <div>
        <q-date v-model="proxyDate" range>
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="إلغاء" color="primary" flat @click="close" v-close-popup />
            <q-btn label="تأكيد" color="primary" flat @click="save" v-close-popup />
          </div>
        </q-date>
      </div>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import moment from 'moment';

type PeriodOption = {
  id: number;
  label: string;
  from?: () => any;
  to?: () => any;
};

const periodOptions: PeriodOption[] = [
  {
    id: 0,
    label: 'الشهر الحالي',
    from: () => moment().startOf('month').format('YYYY-MM-DD'),
    to: () => moment().endOf('month').format('YYYY-MM-DD'),
  },
  {
    id: 1,
    label: 'السنة الحالية',
    from: () => moment().startOf('year').format('YYYY-MM-DD'),
    to: () => moment().endOf('year').format('YYYY-MM-DD'),
  },
  {
    id: 2,
    label: 'تاريخ مخصص',
  },
];

const selectedOption = ref(0);
const lastSelectedOption = ref(0);
const selectedDate = ref({
  from: periodOptions[0]?.from?.(),
  to: periodOptions[0]?.to?.(),
});

const emit = defineEmits(['input']);

const proxyDate = ref({ from: '', to: '' });

const isDialogOpen = ref(false);

const openDatePickerDialog = () => {
  isDialogOpen.value = true;
};

const customDate = computed(() => {
  if (selectedOption.value === 2 && !isDialogOpen.value) {
    return selectedDate.value.from + ' - ' + selectedDate.value.to;
  }
  return '';
});

const onSelectOption = (opt: PeriodOption) => {
  if (selectedOption.value !== 2) {
    lastSelectedOption.value = selectedOption.value;
  }
  selectedOption.value = opt.id;
  if (opt.id === 2) {
    openDatePickerDialog();
  } else {
    selectedDate.value = {
      from: periodOptions[opt.id]?.from?.(),
      to: periodOptions[opt.id]?.to?.(),
    };
    emit('input', selectedDate.value);
  }
};

const close = () => {
  onSelectOption(periodOptions[lastSelectedOption.value - 1] as PeriodOption);
};
const save = () => {
  const format = (d: string) => d?.replace(/\//g, '-') || '';

  if (typeof proxyDate.value === 'string') {
    const date = format(proxyDate.value);
    selectedDate.value = { from: date, to: date };
  } else {
    selectedDate.value = {
      from: format(proxyDate.value.from),
      to: format(proxyDate.value.to),
    };
  }
  emit('input', selectedDate.value);
};

onMounted(() => {
  emit('input', selectedDate.value);
});
</script>

<style lang="scss" scoped></style>
