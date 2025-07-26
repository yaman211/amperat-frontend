import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import storesNames from 'src/stores/stores-names';
import { SIGN_UP } from '../endpoints';
// import { useAuthStore } from '../store';

export const useSignUpStore = defineStore(storesNames.AUTH.SIGN_UP, {
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async signup(data: { firstName: string; lastName: string; phone: string; password: string }) {
      this.loading = true;
      try {
        await api.post(SIGN_UP, data);
        // const authStore = useAuthStore();
        // authStore.setCredentials(res.data);
      } finally {
        this.loading = false;
      }
    },
  },
});
