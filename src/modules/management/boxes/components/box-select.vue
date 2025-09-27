<template>
  <q-select
    v-model="inputValue"
    :options="options"
    option-label="boxNumber"
    option-value="id"
    label="العلبة"
    :rules="[(val) => !!val || 'مطلوب']"
    filled
    emit-value
    map-options
    :disabled="!sectorId"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits, computed } from 'vue';
import { Box } from 'src/models/box.model';

const props = defineProps<{
  modelValue?: number | undefined;
  sectorId?: number | undefined;
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
  (val) => {
    options.value = [];
    if (val) {
      fetchBoxes();
    }
    emit('update:modelValue', undefined);
  },
);
</script>
