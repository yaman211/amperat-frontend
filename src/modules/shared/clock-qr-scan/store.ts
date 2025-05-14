import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';

export const useScanBarcodeStore = defineStore(
  storesNames.SHARED.SCAN_BARCODE,
  {
    state: () =>
      ({
        code: '',
        id: null,
      } as {
        code: string;
        id: number | null;
      }),
    getters: {
      hasCode(state) {
        return !!state.code;
      },
    },
    actions: {
      setCode(code: string) {
        const id = +code.split('-')[1];
        this.code = code;
        this.id = id;
      },
    },
  }
);
