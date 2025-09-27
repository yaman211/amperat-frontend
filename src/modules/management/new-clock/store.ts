import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import storesNames from 'src/stores/stores-names';

export const useNewClockStore = defineStore(storesNames.MANAGEMENT.NEW_CLOCK, {
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async createClock(data: {
      ownerName: string;
      userId?: number;
      currentReading: number;
      consuming?: number;
      // boxNumber?: number | null;
      boxId?: number | undefined;
    }) {
      try {
        this.loading = true;
        const clock = await Clock.createClock(data);
        return clock;
      } finally {
        this.loading = false;
      }
    },
  },
});
