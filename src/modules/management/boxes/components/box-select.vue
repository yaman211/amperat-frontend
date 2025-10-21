<template>
  <q-select
    v-model="inputValue"
    :options="options"
    option-label="boxNumber"
    option-value="id"
    label="العلبة"
    :rules="withoutValidation ? undefined : [(val) => !!val || 'مطلوب']"
    filled
    emit-value
    map-options
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { Box } from 'src/models/box.model';

const props = defineProps<{
  modelValue?: number | undefined;
  sectorId?: number | undefined;
  withoutValidation?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
const options = ref<Box[]>([]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: number) => emit('update:modelValue', val),
});

const fetchBoxes = async () => {
  if (!props.sectorId) return;
  const res = await Box.getSectorBoxes(props.sectorId);
  options.value = res;
};

onMounted(fetchBoxes);

watch(
  () => props.sectorId,
  (val, oldVal) => {
    options.value = [];
    if (val) {
      fetchBoxes();
    }
    if (oldVal) {
      emit('update:modelValue', undefined);
    }
  },
);
</script>
