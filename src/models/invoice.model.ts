import { api } from 'src/boot/axios';
import {
  CLOCK_INVOICE_BY_ID,
  INVOICE_BY_ID,
  REVERT_LAST_INVOICE,
} from 'src/modules/management/endpoints';
import { Pagination } from './pagination.model';
import { CLOCK_BY_ID_INVOICES, CLOCK_BY_TOKEN_INVOICES } from 'src/modules/shared/endpoints';
import { isDate } from 'src/utils/date';
import { Clock } from './clock.model';

export class Invoice {
  id!: number;
  clockId!: number;
  createdByUserId!: number;
  vendorId!: number;
  consuming!: number;
  price!: number;
  lastReadingNumber!: number;
  paidUntilReadingNumber!: number;
  paidUntilReadingNumberBeforeTheInvoice!: number;
  clock?: Clock;
  createdAt!: Date;

  constructor(obj: any) {
    Object.entries(obj).forEach(([key, val]) => {
      if (isDate(val)) this[key] = new Date(val as string);
      else this[key] = val;
    });
  }

  static async createInvoice(clockId: number, data: { consuming: number; price: number }) {
    const res = await api.post(CLOCK_INVOICE_BY_ID(clockId), data);
    return new Invoice(res.data);
  }

  static async getClockInvoices(clockId: number, params = {}) {
    const res = await api.get(CLOCK_BY_ID_INVOICES(clockId), {
      params,
    });
    return new Pagination(Invoice, res.data);
  }

  static async getClockInvoicesByToken(token: string, params = {}) {
    const res = await api.get(CLOCK_BY_TOKEN_INVOICES(token), {
      params,
    });
    return new Pagination(Invoice, res.data);
  }

  static getInvoiceById(id: number): Promise<Invoice> {
    return api.get(INVOICE_BY_ID(id)).then(({ data }) => new Invoice(data));
  }

  static revertLastInvoice(clockId: number): Promise<Invoice> {
    return api.post(REVERT_LAST_INVOICE(clockId));
  }
}
