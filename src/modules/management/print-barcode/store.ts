import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import storesNames from 'src/stores/stores-names';

export const useBarcodeStore = defineStore(storesNames.MANAGEMENT.BARCODE, {
  state: () =>
    ({
      clocks: [],
      loading: false,
    } as { clocks: Clock[]; loading: boolean }),
  getters: {},
  actions: {
    async fetchClocksByBox(boxNumber: number) {
      this.loading = true;
      try {
        const clocks = await Clock.getBoxClocks(boxNumber);
        this.clocks = clocks;
      } finally {
        this.loading = false;
      }
    },
    async fetchClock(id: number) {
      this.clocks = [];
      this.loading = true;
      try {
        const clock = await Clock.getClock(id);
        this.clocks.push(clock);
      } finally {
        this.loading = false;
      }
    },
  },
});
