<template>
  <q-card class="q-pa-md rounded-lg">
    <div class="column q-gutter-y-sm">
      <q-avatar size="48px" color="primary" text-color="white" class="q-mb-xs q-mx-auto">
        <q-icon name="person" size="28px" />
      </q-avatar>
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
      <div class="text-weight-bold">
        تأكيد الحساب:
        <span class="text-primary">{{ user.isVerified ? 'مؤكد' : 'غير مؤكد' }}</span>
      </div>
      <div class="flex justify-between q-pt-sm">
        <q-btn
          label="تعديل"
          outline
          color="primary"
          class="q-mx-sm text-weight-bold full-width"
          @click="$router.push(`/admin/users/update/${user.id}`)"
        />
        <!-- <q-btn
          label="حذف العامل"
          outline
          color="negative"
          class="q-mx-sm text-weight-bold"
          @click="removeUser()"
          :loading="removeLoading"
        /> -->
      </div>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import User from 'src/models/user.model';

const props = defineProps<{
  user: User;
}>();
</script>

<style lang="scss" scoped></style>
