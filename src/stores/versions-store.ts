import { defineStore } from 'pinia';
import { Version } from 'src/models/version.model';
import storesNames from 'src/stores/stores-names';

export const useVersionsStore = defineStore(storesNames.VERSIONS, {
  state: () =>
    ({
      isChecked: false,
      checkingForUpdates: true,
      forceUpdate: false,
      latestVersion: '',
      updateAvailable: false,
      versionInfo: null,
      hasError: false,
    }) as {
      isChecked: boolean;
      checkingForUpdates: boolean;
      forceUpdate: boolean;
      latestVersion: string;
      updateAvailable: boolean;
      versionInfo: Version | null;
      hasError: boolean;
    },
  getters: {
    mustUpdate(state): boolean {
      return state.updateAvailable && state.forceUpdate;
    },
  },
  actions: {
    async checkVersion() {
      if (this.isChecked) {
        return;
      }
      this.checkingForUpdates = true;
      this.hasError = false;
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        const currentVersion = process.env.VERSION || '1.0.0';
        const adminApp = process.env.ADMIN_APP;
        const res = await Version.check({
          platform: 'android',
          currentVersion,
          adminApp,
        });
        this.forceUpdate = res.versionInfo?.forceUpdate || false;
        this.latestVersion = res.latestVersion || '';
        this.updateAvailable = res.updateAvailable || false;
        this.versionInfo = res.versionInfo || null;
        this.isChecked = true;
        this.checkingForUpdates = false;
      } catch (error) {
        this.hasError = true;
      }
    },
  },
});
