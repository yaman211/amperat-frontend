import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';

export const useHomeStore = defineStore(storesNames.SHARED.HOME, {
  state: () => ({}),
  getters: {},
  actions: {},
});
