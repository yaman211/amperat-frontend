import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import storesNames from 'src/stores/stores-names';

export const useClocksListStore = defineStore(storesNames.SHARED.CLOCKS_LIST, {
  state: () =>
    ({
      loading: false,
      clocks: [],
      count: 0,
    } as {
      loading: boolean;
      clocks: Clock[];
      count: number;
    }),
  getters: {},
  actions: {
    async fetchClocks() {
      this.loading = true;
      try {
        const data = await Clock.getMyClocks();
        this.count = data.count;
        this.clocks = data.rows;
      } finally {
        this.loading = false;
      }
    },
  },
});
