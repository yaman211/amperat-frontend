import { api } from 'src/boot/axios';
import { CLOCKS_BY_BOX, CLOCKS_BY_BOX_BY_ID } from 'src/modules/management/endpoints';
import {
  CLOCKS,
  CLOCKS_SEARCH,
  CLOCK_BY_ID,
  CLOCK_BY_ID_LAST_READING,
  CLOCK_BY_TOKEN,
  MY_CLOCKS,
} from 'src/modules/shared/endpoints';
import { Pagination } from './pagination.model';
import { Reading } from './reading.model';
import User from './user.model';
import { Vendor } from './vendor.model';

export enum ClockStatus {
  ACTIVE = 'active',
  OFF = 'off',
}

export class Clock {
  id: number;
  vendorId: number;
  userId: number;
  status: ClockStatus;
  ownerName: string;
  consuming: number;
  // boxNumber?: number;
  box?: {
    id: number;
    boxNumber: number;
    sectorId: number;
  };
  vendor: Vendor;
  user: User;
  token: string;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
    if (obj.vendor) this.vendor = new Vendor(obj.vendor);
    if (obj.user) this.user = new User(obj.user);
  }

  static async getMyClocks(params = {}) {
    const res = await api.get(MY_CLOCKS, {
      params: params,
    });
    const data = new Pagination(Clock, res.data);
    return data;
  }

  static async getClock(id: number) {
    const res = await api.get(CLOCK_BY_ID(id));
    return new Clock(res.data);
  }
  static async getClockByToken(token: string, params: any = {}) {
    const res = await api.get(CLOCK_BY_TOKEN(token), { params });
    return new Clock(res.data);
  }

  static async search(params: { ownerName?: string }): Promise<Clock[]> {
    const res = await api.get(CLOCKS_SEARCH, { params });
    return res.data.map((c: any) => new Clock(c));
  }

  static async getBoxClocks(boxNumber: number): Promise<Clock[]> {
    const res = await api.get(CLOCKS_BY_BOX_BY_ID(boxNumber));
    return res.data.map((c: any) => new Clock(c));
  }

  static async createClock(data: {
    ownerName: string;
    userId?: number;
    currentReading: number;
    consuming?: number;
  }) {
    const res = await api.post(CLOCKS, data);
    return new Clock(res.data);
  }

  async editClock(data: {
    ownerName?: string;
    status?: ClockStatus;
    userPhone?: string | null;
    boxNumber?: number | null;
  }) {
    await api.put(CLOCK_BY_ID(this.id), data);
    Object.assign(this, data);
  }

  async getLastReading() {
    const res = await api.get(CLOCK_BY_ID_LAST_READING(this.id));
    return new Reading(res.data);
  }
}
