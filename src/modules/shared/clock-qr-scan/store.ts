import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';

export const useScanQrCodeStore = defineStore(storesNames.SHARED.SCAN_QR_CODE, {
  state: () =>
    ({
      code: '',
    }) as {
      code: string;
    },
  getters: {
    hasCode(state) {
      return !!state.code;
    },
  },
  actions: {
    setCode(code: string) {
      this.code = code;
    },
  },
});
