<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <!-- <div class="text-h6 q-my-md">تعديل بيانات المولدة:</div> -->

    <q-card class="q-pa-md rounded-md q-mx-auto" style="width: 350px">
      <div class="text-h6 q-mb-sm text-wight-medium">بيانات المولدة</div>

      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="name"
          label="اسم المولدة"
          lazy-rules
          :rules="[(val) => !!val || 'أدخل اسم صحيح']"
          outlined
          rounded
          filled
        />

        <q-input
          v-model="phone"
          label="رقم الموبايل"
          lazy-rules
          :rules="[
            (val) => !val || (val && val.length === 10 && !isNaN(val)) || 'أدخل رقم موبايل صحيح',
          ]"
          type="number"
          outlined
          rounded
          filled
        />

        <q-input
          v-model="address"
          label="العنوان"
          lazy-rules
          :rules="[(val) => !!val || 'أدخل عنوان صحيح']"
          outlined
          rounded
          filled
        />
        <q-input
          v-model="kwPrice"
          label="سعر الكيلو"
          lazy-rules
          type="number"
          :rules="[(val) => !isNaN(val) || 'أدخل سعر صحيح']"
          outlined
          rounded
          filled
        />

        <div>
          <q-btn
            label="تعديل البيانات"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
            rounded
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { useAuthStore } from 'src/modules/auth/store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const address = ref('');
const phone = ref('');
const kwPrice = ref(0);
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (authStore.user && authStore.user.vendor) {
    name.value = authStore.user.vendor.name;
    address.value = authStore.user.vendor.address;
    phone.value = authStore.user.vendor.phone;
    kwPrice.value = authStore.user.vendor.kwPrice;
  }
});

const onSubmit = async () => {
  loading.value = true;
  try {
    if (authStore.user && authStore.user.vendor) {
      await authStore.user.vendor.update({
        name: name.value,
        address: address.value,
        phone: phone.value,
        kwPrice: +kwPrice.value,
      });
      await authStore.refreshUser();
    }
    router.push('/');
    Notify.create({
      message: 'تم التعديل بنجاح',
      type: 'positive',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
