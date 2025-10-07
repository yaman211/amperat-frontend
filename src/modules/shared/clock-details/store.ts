import { defineStore } from 'pinia';
import { Clock } from 'src/models/clock.model';
import { Invoice } from 'src/models/invoice.model';
import { Reading } from 'src/models/reading.model';
import storesNames from 'src/stores/stores-names';
import { PER_PAGE } from 'src/utils/constants';

export const useClockDetailsStore = defineStore(storesNames.SHARED.CLOCK_DETAILS, {
  state: () =>
    ({
      clock: undefined,
      loading: false,

      readingsLoading: false,
      readings: [],
      readingsCount: 0,

      invoicesLoading: false,
      invoices: [],
      invoicesCount: 0,

      lastReading: null,
      lastInvoice: null,
    }) as {
      clock: Clock | undefined;
      loading: boolean;
      readingsLoading: boolean;
      readings: Reading[];
      readingsCount: number;
      invoicesLoading: boolean;
      invoices: Invoice[];
      invoicesCount: number;
      lastReading: Reading | null;
      lastInvoice: Invoice | null;
    },
  getters: {},
  actions: {
    async fetchClockData(id: number) {
      this.loading = true;
      try {
        const clock = await Clock.getClock(id);
        this.clock = clock;
      } finally {
        this.loading = false;
      }
    },
    async fetchClockDataByToken(token: string) {
      this.loading = true;
      try {
        const fcmToken = localStorage.getItem('fcmToken');
        const params = {
          fcmToken,
        };
        const clock = await Clock.getClockByToken(token, params);
        this.clock = clock;
      } finally {
        this.loading = false;
      }
    },
    async fetchClockReadings(id: number, page: number, justLast = false) {
      this.invoices = [];
      this.readingsLoading = true;
      try {
        const data = await Reading.getClockReadings(id, {
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        if (!justLast) {
          this.readingsCount = data.count;
          this.readings.push(...data.rows);
        }
        if (page === 0) {
          this.lastReading = data.rows[0] || null;
        }
      } finally {
        this.readingsLoading = false;
      }
    },
    async fetchClockReadingsByToken(token: string, page: number, justLast = false) {
      this.invoices = [];
      this.readingsLoading = true;
      try {
        const data = await Reading.getClockReadingsByToken(token, {
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        if (!justLast) {
          this.readingsCount = data.count;
          this.readings.push(...data.rows);
        }
        if (page === 0) {
          this.lastReading = data.rows[0] || null;
        }
      } finally {
        this.readingsLoading = false;
      }
    },
    async fetchClockInvoices(id: number, page: number, justLast = false) {
      this.readings = [];
      this.invoicesLoading = true;
      try {
        const data = await Invoice.getClockInvoices(id, {
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        if (!justLast) {
          this.invoicesCount = data.count;
          this.invoices.push(...data.rows);
        }
        if (page === 0) {
          this.lastInvoice = data.rows[0] || null;
        }
      } finally {
        this.invoicesLoading = false;
      }
    },
    async fetchClockInvoicesByToken(token: string, page: number, justLast = false) {
      this.readings = [];
      this.invoicesLoading = true;
      try {
        const data = await Invoice.getClockInvoicesByToken(token, {
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        if (!justLast) {
          this.invoicesCount = data.count;
          this.invoices.push(...data.rows);
        }
        if (page === 0) {
          this.lastInvoice = data.rows[0] || null;
        }
      } finally {
        this.invoicesLoading = false;
      }
    },
  },
});
