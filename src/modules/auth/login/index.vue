<template>
  <div class="column justify-center items-center" style="height: 95vh">
    <q-img
      :src="require('src/assets/logo.svg')"
      style="height: 100px; max-width: 100px"
      class="rounded-borders q-mx-auto"
    />
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
        <q-input
          v-model="phone"
          label="رقم الموبايل"
          lazy-rules
          :rules="[(val) => (val && val.length === 10 && !isNaN(val)) || 'أدخل رقم موبايل صحيح']"
          type="number"
          outlined
          rounded
          filled
        />

        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="كلمة المرور"
          lazy-rules
          :rules="[(val) => (val && val.length >= 8) || 'على الأقل 8 محارف']"
          outlined
          rounded
          filled
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn
            label="تسجيل دخول"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loginStore.loading"
            rounded
          />
        </div>
      </q-form>
      <div class="text-subtitle1 q-mt-sm">
        ليس لديك حساب ؟
        <q-btn flat text-color="primary" to="/auth/sign-up"> إنشاء حساب جديد </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from './store';

const phone = ref('');
const password = ref('');
const isPwd = ref(true);

const router = useRouter();
const loginStore = useLoginStore();

const onSubmit = async () => {
  try {
    await loginStore.login({
      phone: phone.value,
      password: password.value,
    });

    router.push('/');
    Notify.create({
      message: 'مرحباً بك',
      type: 'positive',
    });
  } catch (err) {
    console.error(err);
  }
};

onUnmounted(() => {
  loginStore.$reset();
});
</script>

<style lang="scss" scoped></style>
