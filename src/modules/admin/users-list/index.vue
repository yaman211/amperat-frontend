<template>
  <div>
    <NoData
      v-if="!usersStore.loading && !usersStore.users.length"
      class="column justify-center items-center q-gutter-y-md"
    >
    </NoData>

    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="row q-col-gutter-md">
        <div v-for="user in usersStore.users" :key="user.id" class="col-12 col-sm-6 col-md-4">
          <UserCard :user="user" />
        </div>
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
import { useUsersStore } from './store';

const usersStore = useUsersStore();
const onLoad = async (page: number, done: (d: boolean) => void) => {
  await usersStore.fetchUsers(page - 1);
  done(usersStore.users.length === usersStore.count);
};

onUnmounted(() => {
  usersStore.$reset();
});
</script>

<style lang="scss" scoped></style>
