import { api } from 'src/boot/axios';
import { VENDOR_BY_ID } from 'src/modules/management/endpoints';

export enum VendorStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export class Vendor {
  id: number;
  name: string;
  address: string;
  kwPrice: number;
  status: VendorStatus;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
  }

  async update(data: { name: string; address: string; kwPrice: number }) {
    await api.put(VENDOR_BY_ID(this.id), data);
    Object.assign(this, data);
  }
}
