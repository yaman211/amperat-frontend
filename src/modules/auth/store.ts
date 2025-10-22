import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import User from 'src/models/user.model';
import storesNames from 'src/stores/stores-names';

export const useAuthStore = defineStore(storesNames.AUTH.INDEX, {
  state: () =>
    ({
      token: LocalStorage.getItem('token') || undefined,
      user: LocalStorage.has('user') ? new User(LocalStorage.getItem('user')) : undefined,
    }) as {
      token: string | undefined;
      user: User | undefined;
    },
  getters: {
    isLoggedIn(state) {
      return state.token !== undefined && state.user !== undefined;
    },
  },
  actions: {
    setCredentials(data: { user: User; token: string }) {
      const user = new User(data.user);
      this.user = user;
      this.token = data.token;
      console.log({ user });
      LocalStorage.set('user', user);
      LocalStorage.set('token', data.token);
    },
    async refreshUser() {
      if (this.user) {
        const data = await this.user.refreshMe();
        this.setCredentials(data);
      }
    },
    logout() {
      LocalStorage.remove('user');
      LocalStorage.remove('token');
      this.user = undefined;
      this.token = undefined;
    },
  },
});
