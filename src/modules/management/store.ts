import { defineStore } from 'pinia';
import storesNames from 'src/stores/stores-names';

export const useManagementStore = defineStore(storesNames.MANAGEMENT.INDEX, {
  state: () => ({}),
  getters: {},
  actions: {},
});
