<template>
  <div class="column justify-center items-center" style="height: 90vh">
    <q-card class="q-pa-md rounded-md q-mx-auto" style="width: 350px">
      <div class="text-h6 q-mb-sm text-wight-medium">معلومات العامل</div>
      <div class="text-weight-medium text-caption text-grey-7">
        سيتم إرسال دعوة إلى صاحب الرقم المدخل ليعمل بالوظيفة المحددة
      </div>

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

        <q-select
          v-model="role"
          :options="roleOptions"
          lazy-rules
          map-options
          emit-value
          :rules="[(val) => !!val || 'الحقل مطلوب']"
          outlined
          rounded
          filled
        />

        <div>
          <q-btn
            label="إرسال الدعوة"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
            rounded
          />
        </div>
      </q-form>
      <div class="text-weight-bold q-mt-md text-negative text-center">
        ملاحظة: يجب أن يكون صاحب الرقم لديه حساب مؤكد على التطبيق
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { UserRoles } from 'src/models/user.model';
import { Invite } from 'src/models/invite.model';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const phone = ref('');
const role = ref<UserRoles.EMPLOYEE | UserRoles.ACCOUNTANT>(UserRoles.EMPLOYEE);
const i18n = useI18n();

const roleOptions = [
  {
    label: i18n.t('userRoles.employee'),
    value: UserRoles.EMPLOYEE,
  },
  {
    label: i18n.t('userRoles.accountant'),
    value: UserRoles.ACCOUNTANT,
  },
];
const loading = ref(false);
const router = useRouter();
const onSubmit = async () => {
  try {
    loading.value = true;
    await Invite.inviteUser({
      phone: phone.value,
      role: role.value,
    });
    Notify.create({
      type: 'positive',
      message: 'تم إرسال الدعوة بنجاح',
    });
    router.push('/');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
