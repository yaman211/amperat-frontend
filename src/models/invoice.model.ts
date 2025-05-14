import { api } from 'src/boot/axios';
import { CLOCK_INVOICE_BY_ID } from 'src/modules/management/endpoints';
import { Pagination } from './pagination.model';
import { CLOCK_BY_ID_INVOICES } from 'src/modules/shared/endpoints';
import { isDate } from 'src/utils/date';

export class Invoice {
  id: number;
  clockId: number;
  createdByUserId: number;
  vendorId: number;
  consuming: number;
  price: number;
  createdAt: Date;

  constructor(obj: any) {
    Object.entries(obj).forEach(([key, val]) => {
      if (isDate(val)) this[key] = new Date(val as string);
      else this[key] = val;
    });
  }

  static async createInvoice(
    clockId: number,
    data: { consuming: number; price: number }
  ) {
    const res = await api.post(CLOCK_INVOICE_BY_ID(clockId), data);
    return new Invoice(res.data);
  }

  static async getClockInvoices(clockId: number, params = {}) {
    const res = await api.get(CLOCK_BY_ID_INVOICES(clockId), {
      params,
    });
    return new Pagination(Invoice, res.data);
  }
}
