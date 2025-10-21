<template>
  <div class="column justify-center items-center no-wrap" style="min-height: calc(100vh - 70px)">
    <q-avatar size="68px" color="primary" text-color="white" class="q-mb-xs q-mx-auto">
      <q-icon name="person" size="28px" />
    </q-avatar>
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md" v-if="user">
        <q-input
          v-model="user.firstName"
          label="الاسم"
          lazy-rules
          :rules="[(val) => (val && val.length >= 3) || 'ثلاثة أحرف على الأقل']"
          outlined
          rounded
          filled
        />
        <q-input
          v-model="user.lastName"
          label="الكنية"
          lazy-rules
          :rules="[(val) => (val && val.length >= 3) || 'ثلاثة أحرف على الأقل']"
          outlined
          rounded
          filled
        />
        <q-input
          v-model="user.phone"
          label="رقم الموبايل"
          lazy-rules
          :rules="[(val) => (val && val.length === 10 && !isNaN(val)) || 'أدخل رقم موبايل صحيح']"
          type="number"
          outlined
          rounded
          filled
        />

        <q-toggle v-model="user.isVerified" label="تأكيد الحساب" />

        <div>
          <q-btn
            label="تعديل"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
            rounded
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../users-list/store';
import User from 'src/models/user.model';

const props = defineProps<{ id: string }>();

const user = ref<User | undefined>(undefined);

const phone = ref('');
const firstName = ref('');
const lastName = ref('');
const isVerified = ref(false);
const loading = ref(true);
const router = useRouter();
const usersStore = useUsersStore();

User.getUserById(+props.id).then((data) => {
  loading.value = false;
  user.value = data;
});

const onSubmit = async () => {
  loading.value = true;
  try {
    await usersStore.updateUserData(user.value as User, {
      firstName: user.value?.firstName,
      lastName: user.value?.lastName,
      phone: user.value?.phone,
      isVerified: user.value?.isVerified,
    });
  } finally {
    loading.value = false;
  }

  router.back();
  Notify.create({
    message: 'تم التعديل بنجاح',
    type: 'positive',
  });
};
</script>

<style lang="scss" scoped></style>
