<template>
  <div class="column justify-center items-center no-wrap" style="height: 95vh">
    <q-img
      :src="require('src/assets/logo.svg')"
      style="height: 100px; max-width: 100px"
      class="rounded-borders q-mx-auto"
    />
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
        <q-input
          filled
          v-model="firstName"
          label="الاسم"
          lazy-rules
          :rules="[(val) => (val && val.length >= 3) || 'ثلاثة أحرف على الأقل']"
        />
        <q-input
          filled
          v-model="lastName"
          label="الكنية"
          lazy-rules
          :rules="[(val) => (val && val.length >= 3) || 'ثلاثة أحرف على الأقل']"
        />
        <q-input
          filled
          v-model="phone"
          label="رقم الموبايل"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length === 10 && !isNaN(val)) ||
              'أدخل رقم موبايل صحيح',
          ]"
          type="number"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="كلمة المرور"
          lazy-rules
          :rules="[(val) => (val && val.length >= 8) || 'على الأقل 8 محارف']"
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
            label="إنشاء حساب جديد"
            type="submit"
            color="primary"
            class="full-width"
            :loading="signUpStore.loading"
          />
        </div>
      </q-form>
      <div class="text-subtitle1 q-mt-sm">
        لديك حساب ؟
        <q-btn flat text-color="primary" to="/auth/login"> تسجيل الدخول </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignUpStore } from './store';

const phone = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const isPwd = ref(true);
const signUpStore = useSignUpStore();
const router = useRouter();

const onSubmit = async () => {
  await signUpStore.signup({
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    password: password.value,
  });

  router.push('/');
  Notify.create({
    message: 'تم إنشاء الحساب مرحباً بك',
    type: 'positive',
  });
};
</script>

<style lang="scss" scoped></style>
