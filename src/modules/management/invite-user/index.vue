<template>
  <div class="column justify-center items-center" style="height: 90vh">
    <div class="q-pa-md q-mx-auto" style="width: 300px">
      <div class="text-weight-medium">
        سيتم إرسال دعوة إلى صاحب الرقم المدخل ليعمل بالوظيفة المحددة
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
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

        <q-select
          v-model="role"
          :options="roleOptions"
          filled
          lazy-rules
          map-options
          emit-value
          :rules="[(val) => !!val || 'الحقل مطلوب']"
        />

        <div>
          <q-btn
            label="إرسال الدعوة"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
          />
        </div>
      </q-form>
      <div class="text-weight-bold q-mt-md text-negative text-center">
        ملاحظة: يجب أن يكون صاحب الرقم لديه حساب على التطبيق
      </div>
    </div>
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
