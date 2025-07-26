import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import storesNames from 'src/stores/stores-names';
import * as ep from './endpoints';

export const useStatisticsStore = defineStore(storesNames.STATISTICS.INDEX, {
  state: () => ({
    loading: false,
    clockCount: null,
    invoicesCountAmount: null,
  }),
  getters: {
    invoices() {
      if (!this.invoicesCountAmount) {
        return {
          labels: [],
          datasets: [],
        };
      }
      const labels: any = [];
      const data: any = [];
      (this.invoicesCountAmount as any).data.forEach((item: any) => {
        labels.push(item.period);
        data.push(item.totalAmount);
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: '#42817799',
            borderColor: '#428177',
            borderRadius: 20,
            borderWidth: 5,
            label: 'invoices',
            data,
          },
        ],
      };
    },
  },
  actions: {
    async getClocksCount({ vendorId, from, to }: any) {
      try {
        const res = await api.get(ep.CLOCKS_COUNT, { params: { vendorId } });
        this.clockCount = res.data.count;
      } catch (err) {
        console.error(err);
      }
    },
    async getInvoicesAmount({ vendorId, from, to }: any) {
      try {
        const res = await api.get(ep.INVOICES_COUNT_AMOUNT, { params: { vendorId, from, to } });
        console.log({ res });
        this.invoicesCountAmount = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getReadingsCount({ vendorId, from, to }: any) {},
    async getReadingsAmount({ vendorId, from, to }: any) {},
    async getStatistics({ vendorId, from, to }: any) {
      this.loading = true;
      try {
        await Promise.all([
          this.getClocksCount({ vendorId, from, to }),
          this.getInvoicesAmount({ vendorId, from, to }),
          this.getReadingsCount({ vendorId, from, to }),
          this.getReadingsAmount({ vendorId, from, to }),
        ]);
      } finally {
        this.loading = false;
      }
    },
  },
});
