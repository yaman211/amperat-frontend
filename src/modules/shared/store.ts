import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';

export const useCounterStore = defineStore(storesNames.SHARED.INDEX, {
  state: () => ({}),
  getters: {},
  actions: {},
});
