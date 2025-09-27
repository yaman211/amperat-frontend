import { defineStore } from 'pinia';
import { Clock, ClockStatus } from 'src/models/clock.model';
import storesNames from 'src/stores/stores-names';

export const useClockEditStore = defineStore(storesNames.SHARED.CLOCK_EDIT, {
  state: () =>
    ({
      clock: undefined,
      loading: false,
      editLoading: false,
    }) as {
      clock: Clock | undefined;
      loading: boolean;
      editLoading: boolean;
    },
  getters: {},
  actions: {
    async fetchClockData(id: number) {
      this.loading = true;
      try {
        const clock = await Clock.getClock(id);
        this.clock = clock;
      } finally {
        this.loading = false;
      }
    },
    async editClockData(newData: {
      ownerName?: string;
      status?: ClockStatus;
      userPhone?: string | null;
      boxId?: number | null;
    }) {
      this.editLoading = true;
      try {
        await this.clock?.editClock(newData);
      } finally {
        this.editLoading = false;
      }
    },
  },
});
