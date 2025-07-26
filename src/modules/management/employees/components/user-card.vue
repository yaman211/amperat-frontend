<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="column q-gutter-y-sm">
      <div class="text-weight-bold">
        الاسم: <span class="text-primary">{{ user.fullName }}</span>
      </div>
      <div class="text-weight-bold">
        رقم الموبايل: <span class="text-primary">{{ user.phone }}</span>
      </div>
      <div class="text-weight-bold">
        العمل:
        <span class="text-primary">{{ $t(`userRoles.${user.role}`) }}</span>
      </div>
      <div class="flex justify-between">
        <q-btn
          label="تعديل الوظيفة"
          outline
          color="primary"
          class="q-mx-sm text-weight-bold"
          @click="openEditRoleDialog()"
        />
        <q-btn
          label="حذف العامل"
          outline
          color="negative"
          class="q-mx-sm text-weight-bold"
          @click="removeUser()"
          :loading="removeLoading"
        />
      </div>
    </div>
    <q-dialog v-model="isOpen">
      <q-card style="width: 100%">
        <q-card-section class="row items-center">
          <span class="text-h6 text-primary">تعديل وظيفة عامل </span>
        </q-card-section>
        <q-select
          hint="اختر الوظيفة الجديدة"
          v-model="role"
          :options="roleOptions"
          outlined
          rounded
          filled
          lazy-rules
          map-options
          emit-value
          :rules="[(val) => !!val || 'الحقل مطلوب']"
        />
        <q-card-actions align="right">
          <q-btn outline label="إلغاء" color="grey" v-close-popup />
          <q-btn outline label="حفظ" color="primary" @click="editRole()" :loading="roleLoading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import User, { UserRoles } from 'src/models/user.model';
import { ref } from 'vue';
import { useEmployeesStore } from '../store';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  user: User;
}>();

const removeLoading = ref(false);
const roleLoading = ref(false);
const isOpen = ref(false);
const role = ref<UserRoles>(props.user.role);
const employeesStore = useEmployeesStore();
const $q = useQuasar();

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

function openEditRoleDialog() {
  role.value = props.user.role;
  isOpen.value = true;
}
async function editRole() {
  roleLoading.value = true;
  try {
    await employeesStore.updateEmployeeRole(
      props.user,
      role.value as UserRoles.EMPLOYEE | UserRoles.ACCOUNTANT,
    );
    isOpen.value = false;
  } finally {
    roleLoading.value = false;
  }
}

function removeUser() {
  $q.dialog({
    title: 'حذف عامل',
    message: `هل أنت متأكد من إزالة ${props.user.fullName} من العاملين ؟`,
    ok: {
      color: 'negative',
    },
    cancel: {},
  }).onOk(function () {
    removeLoading.value = true;
    employeesStore.removeEmployee(props.user).finally(() => {
      removeLoading.value = false;
    });
  });
}
</script>

<style lang="scss" scoped></style>
