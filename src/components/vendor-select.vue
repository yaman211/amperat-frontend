<template>
  <q-select
    outlined
    rounded
    filled
    :options="options"
    @filter="filterFn"
    label="اسم المولدة"
    emit-value
    use-input
    input-debounce="700"
    option-label="name"
    option-value="id"
    map-options
    v-model="selectedVendor"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> لم يتم العثور على نتائج </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { Vendor } from 'src/models/vendor.model';
import { ref, watch } from 'vue';

const options = ref<Vendor[]>([]);
const selectedVendor = ref<Vendor | null>(null);

const emit = defineEmits(['input']);

async function filterFn(vendorName: string, update: any, abort: any) {
  //   if (!vendorName || vendorName.length < 2) {
  //     abort();
  //     return;
  //   }
  options.value = [];
  const opt = await Vendor.search({ name: vendorName });
  update(() => {
    options.value = opt;
  });
}

const selectVendor = (vendor: Vendor | null) => {
  emit('input', vendor);
};

watch(selectedVendor, (val: Vendor | null) => {
  selectVendor(val);
});
</script>

<style lang="scss" scoped></style>
