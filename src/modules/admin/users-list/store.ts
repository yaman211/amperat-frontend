import { defineStore } from 'pinia';
import User from 'src/models/user.model';
import storesNames from 'src/stores/stores-names';
import { PER_PAGE } from 'src/utils/constants';

export const useUsersStore = defineStore(storesNames.ADMIN.USERS, {
  state: () =>
    ({
      loading: false,
      users: [],
      count: 0,
    }) as {
      loading: boolean;
      users: User[];
      count: number;
    },
  getters: {},
  actions: {
    async fetchUsers(page: number) {
      this.loading = true;
      try {
        const data = await User.getUsersList({
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        this.count = data.count;
        this.users.push(...data.rows);
      } finally {
        this.loading = false;
      }
    },

    async updateUserData(user: User, data: any) {
      await user.update(data);
    },
  },
});
