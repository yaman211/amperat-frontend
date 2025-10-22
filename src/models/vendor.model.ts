import { api } from 'src/boot/axios';
import { VENDOR_BY_ID, VENDOR_SEARCH } from 'src/modules/management/endpoints';

export enum VendorStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export class Vendor {
  id!: number;
  name!: string;
  phone!: string;
  address!: string;
  kwPrice!: number;
  status!: VendorStatus;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
  }

  async update(data: { name: string; address: string; phone: string; kwPrice: number }) {
    await api.put(VENDOR_BY_ID(this.id), data);
    Object.assign(this, data);
  }

  static async search(params: { name?: string }): Promise<Vendor[]> {
    const res = await api.get(VENDOR_SEARCH, { params });
    return res.data.map((c: any) => new Vendor(c));
  }
}
