import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import { Invoice } from 'src/models/invoice.model';
import storesNames from 'src/stores/stores-names';

export const usePayInvoiceStore = defineStore(
  storesNames.MANAGEMENT.PAY_INVOICE,
  {
    state: () => ({
      loading: false,
    }),
    getters: {},
    actions: {
      async createInvoice(clock: Clock, consuming: number, price: number) {
        this.loading = true;
        try {
          return await Invoice.createInvoice(clock.id, { consuming, price });
        } finally {
          this.loading = false;
        }
      },
    },
  }
);
