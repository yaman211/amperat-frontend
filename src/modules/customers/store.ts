import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { Clock } from 'src/models/clock.model';
import storesNames from 'src/stores/stores-names';

export const useCustomersStore = defineStore(storesNames.CUSTOMERS.INDEX, {
  state: () =>
    ({
      loading: false,
      savedClocks: ((LocalStorage.getItem('savedClocks') as any[]) || []).map((c) => new Clock(c)),
    }) as { loading: boolean; savedClocks: Clock[] },
  getters: {},
  actions: {
    saveClock(clock: Clock) {
      this.savedClocks.push(clock);
      LocalStorage.setItem('savedClocks', this.savedClocks);
    },
    isSaved(clock: Clock) {
      return this.savedClocks.some((c) => c.id === clock.id);
    },
    removeSavedClock(clock: Clock) {
      const idx = this.savedClocks.findIndex((c) => c.id === clock.id);
      if (idx !== -1) {
        this.savedClocks.splice(idx, 1);
      }
      LocalStorage.setItem('savedClocks', this.savedClocks);
    },
    async refreshSavedClocks() {
      this.loading = true;
      try {
        const clocks = await Promise.all(
          this.savedClocks.map((c) => {
            return Clock.getClockByPublicId(c.publicId);
          }),
        );
        clocks.forEach((clock) => {
          const idx = this.savedClocks.findIndex((c) => c.id === clock.id);
          if (idx !== -1) {
            this.savedClocks[idx] = clock;
          }
        });
        LocalStorage.setItem('savedClocks', this.savedClocks);
      } finally {
        this.loading = false;
      }
    },
  },
});
