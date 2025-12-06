<template>
  <q-select
    outlined
    filled
    :options="options"
    label="الموظف"
    emit-value
    :option-label="(user) => user.firstName + ' ' + user.lastName"
    option-value="id"
    map-options
    v-model="selectedEmployee"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> لم يتم العثور على نتائج </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import User, { UserRoles } from 'src/models/user.model';
import { useAuthStore } from 'src/modules/auth/store';
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    roles: UserRoles[];
  }>(),
  {
    roles: () => [UserRoles.MANAGER, UserRoles.ACCOUNTANT, UserRoles.EMPLOYEE],
  },
);

const options = ref<User[]>([]);
const selectedEmployee = ref<User | null>(null);

const emit = defineEmits(['input']);
const authStore = useAuthStore();

async function getEmployees() {
  const opt = await User.getMyUsers({ limit: 100 });
  options.value = [authStore.user!, ...opt.rows].filter((user) => props.roles.includes(user?.role));
}
getEmployees();

const selectEmployee = (employee: User | null) => {
  emit('input', employee);
};

watch(selectedEmployee, (val: User | null) => {
  selectEmployee(val);
});
</script>

<style lang="scss" scoped></style>
