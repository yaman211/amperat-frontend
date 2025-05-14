<template>
  <div>
    <NoData
      v-if="!employeesStore.loading && !employeesStore.employees.length"
      class="column justify-center items-center q-gutter-y-md"
    >
      <q-btn
        label="دعوة عامل جديد"
        outline
        color="primary"
        class="text-subtitle1 text-weight-bold"
        to="/management/invite-user"
      />
    </NoData>

    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="column q-gutter-y-md q-px-md">
        <UserCard
          v-for="user in employeesStore.employees"
          :key="user.id"
          :user="user"
        />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts" setup>
import NoData from 'src/components/no-data.vue';
import { onUnmounted } from 'vue';
import UserCard from './components/user-card.vue';
import { useEmployeesStore } from './store';

const employeesStore = useEmployeesStore();
const onLoad = async (page: number, done: (d: boolean) => void) => {
  await employeesStore.fetchEmployees(page - 1);
  done(employeesStore.employees.length === employeesStore.count);
};

onUnmounted(() => {
  employeesStore.$reset();
});
</script>

<style lang="scss" scoped></style>
