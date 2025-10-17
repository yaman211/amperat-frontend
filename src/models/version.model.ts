import { api } from 'src/boot/axios';

export class Version {
  id!: number;
  active!: boolean;
  platform!: 'android' | 'ios';
  versionNumber!: string;
  forceUpdate!: boolean;
  updateUrl!: string;
  releaseNotes!: string;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
  }

  static async check({ platform, currentVersion }: any): Promise<{
    updateAvailable: boolean;
    latestVersion: string;
    versionInfo: Version | null;
  }> {
    const res = await api.get('/versions/check', { params: { platform, currentVersion } });
    return res.data;
  }
}
