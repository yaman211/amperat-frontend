<template>
  <q-select
    v-model="inputValue"
    :options="options"
    option-label="name"
    option-value="id"
    label="القطاع"
    :rules="withoutValidation ? undefined : [(val) => !!val || 'مطلوب']"
    filled
    emit-value
    map-options
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Sector } from 'src/models/sector.model';

const props = defineProps<{ modelValue?: number | undefined; withoutValidation?: boolean }>();
const emit = defineEmits(['update:modelValue']);
const options = ref<Sector[]>([]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: number) => emit('update:modelValue', val),
});

const fetchSectors = async () => {
  const res = await Sector.getAll();
  options.value = res;
};

onMounted(fetchSectors);
</script>
