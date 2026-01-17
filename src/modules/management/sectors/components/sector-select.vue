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

const props = defineProps<{
  modelValue?: number | undefined | null;
  withoutValidation?: boolean;
  withAllOption?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
const options = ref<any[]>([]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: number | null) => emit('update:modelValue', val),
});

const fetchSectors = async () => {
  const res = await Sector.getAll();
  options.value = res;
  if (props.withAllOption) {
    options.value.unshift({ id: null, name: 'الكل' });
  }
};

onMounted(fetchSectors);
</script>
