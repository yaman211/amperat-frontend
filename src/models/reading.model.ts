import { api } from 'src/boot/axios';
import { CLOCK_BY_ID_READINGS, CLOCK_BY_Token_READINGS } from 'src/modules/shared/endpoints';
import { isDate } from 'src/utils/date';
import { Pagination } from './pagination.model';

export class Reading {
  id: number;
  clockId: number;
  createdByUserId: number;
  consuming: number;
  readingNumber: number;
  createdAt: Date;

  constructor(obj: any) {
    Object.entries(obj).forEach(([key, val]) => {
      if (isDate(val)) this[key] = new Date(val as string);
      else this[key] = val;
    });
  }

  static async getClockReadings(clockId: number, params = {}) {
    const res = await api.get(CLOCK_BY_ID_READINGS(clockId), {
      params,
    });
    return new Pagination(Reading, res.data);
  }
  static async getClockReadingsByToken(token: string, params = {}) {
    const res = await api.get(CLOCK_BY_Token_READINGS(token), {
      params,
    });
    return new Pagination(Reading, res.data);
  }
  static async createReading(clockId: number, data: { readingNumber: number }) {
    const res = await api.post(CLOCK_BY_ID_READINGS(clockId), data);
    return new Reading(res.data);
  }
}
