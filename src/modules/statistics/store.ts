import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import storesNames from 'src/stores/stores-names';
import * as ep from './endpoints';

export const useStatisticsStore = defineStore(storesNames.STATISTICS.INDEX, {
  state: () => ({
    loading: false,
    clockCounts: null as null | {
      lessThanZero: number;
      equalZero: number;
      greaterThanZero: number;
    },
    invoicesCountAmount: null,
    consumingAmount: null,
  }),
  getters: {
    clockConsumptionGrouping(): {
      lessThanZero: number;
      equalZero: number;
      greaterThanZero: number;
    } {
      if (!this.clockCounts) {
        return { lessThanZero: 0, equalZero: 0, greaterThanZero: 0 };
      }

      return this.clockCounts as {
        lessThanZero: number;
        equalZero: number;
        greaterThanZero: number;
      };
    },
    clocksCounts(): number | undefined {
      return (
        (this.clockCounts?.greaterThanZero ?? 0) +
        (this.clockCounts?.equalZero ?? 0) +
        (this.clockCounts?.lessThanZero ?? 0)
      );
    },
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
            backgroundColor: '#0094ce99',
            borderColor: '#0094ce',
            borderRadius: 20,
            borderWidth: 5,
            label: 'قيمة الفواتير',
            data,
          },
        ],
      };
    },
    consuming() {
      if (!this.consumingAmount) {
        return {
          labels: [],
          datasets: [],
        };
      }
      const labels: any = [];
      const data: any = [];
      (this.consumingAmount as any).data.forEach((item: any) => {
        labels.push(item.period);
        data.push(item.totalAmount);
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: '#0094ce99',
            borderColor: '#0094ce',
            borderRadius: 20,
            borderWidth: 5,
            label: 'عدد الكيلو واط',
            data,
          },
        ],
      };
    },
    readingsCount() {
      if (!this.consumingAmount) {
        return {
          labels: [],
          datasets: [],
        };
      }
      const labels: any = [];
      const data: any = [];
      (this.consumingAmount as any).data.forEach((item: any) => {
        labels.push(item.period);
        data.push(item.count);
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: '#0094ce99',
            borderColor: '#0094ce',
            borderRadius: 20,
            borderWidth: 5,
            label: 'عدد التأشيرات',
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
        this.clockCounts = res.data;
        console.log({ res: res.data });
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
    async getReadingsConsuming({ vendorId, from, to }: any) {
      try {
        const res = await api.get(ep.READINGS_CONSUMING, { params: { vendorId, from, to } });
        console.log({ res });
        this.consumingAmount = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getStatistics({ vendorId, from, to }: any) {
      this.loading = true;
      try {
        await Promise.all([
          this.getClocksCount({ vendorId, from, to }),
          this.getInvoicesAmount({ vendorId, from, to }),
          this.getReadingsCount({ vendorId, from, to }),
          this.getReadingsConsuming({ vendorId, from, to }),
        ]);
      } finally {
        this.loading = false;
      }
    },
  },
});
