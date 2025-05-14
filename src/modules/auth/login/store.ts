import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';
import { api } from 'src/boot/axios';
import { LOGIN } from '../endpoints';
import { useAuthStore } from '../store';

export const useLoginStore = defineStore(storesNames.AUTH.LOGIN, {
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async login(data: { phone: string; password: string }) {
      this.loading = true;
      try {
        const res = await api.post(LOGIN, data);
        const authStore = useAuthStore();
        authStore.setCredentials(res.data);
      } finally {
        this.loading = false;
      }
    },
  },
});
