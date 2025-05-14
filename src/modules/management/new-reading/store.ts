import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import { Reading } from 'src/models/reading.model';
import storesNames from 'src/stores/stores-names';

export const useNewReadingStore = defineStore(
  storesNames.MANAGEMENT.NEW_READING,
  {
    state: () => ({
      loading: false,
    }),
    getters: {},
    actions: {
      async createReading(clock: Clock, readingNumber: number) {
        this.loading = true;
        try {
          return await Reading.createReading(clock.id, { readingNumber });
        } finally {
          this.loading = false;
        }
      },
    },
  }
);
