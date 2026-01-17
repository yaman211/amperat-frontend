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
    generalCounts: {
      usersCount: 0,
      sectorsCount: 0,
      boxesCount: 0,
    },
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
            backgroundColor: '#26a69999',
            borderColor: '#26a69a',
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
    invoicesCount() {
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
        data.push(item.count);
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: '#26a69999',
            borderColor: '#26a69a',
            borderRadius: 20,
            borderWidth: 5,
            label: 'عدد الفواتير',
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
    totals() {
      if (!this.invoicesCountAmount || !this.consumingAmount) {
        return {
          invoices: {
            count: 0,
            amount: 0,
          },
          readings: {
            count: 0,
            amount: 0,
          },
        };
      }
      const invoicesCount: number = (this.invoicesCountAmount as any).data.reduce(
        (acc: number, cur: any) => {
          console.log({ cur, acc });
          return acc + cur.count;
        },
        0,
      );
      const readingsCount: number = (this.consumingAmount as any).data.reduce(
        (acc: number, cur: any) => acc + cur.count,
        0,
      );
      const invoicesAmount: number = (this.invoicesCountAmount as any).data.reduce(
        (acc: number, cur: any) => acc + cur.totalAmount,
        0,
      );
      const readingsAmount: number = (this.consumingAmount as any).data.reduce(
        (acc: number, cur: any) => acc + cur.totalAmount,
        0,
      );
      return {
        invoices: {
          count: invoicesCount,
          amount: invoicesAmount,
        },
        readings: {
          count: readingsCount,
          amount: readingsAmount,
        },
      };
    },
  },
  actions: {
    async getClocksCount({ vendorId, from, to, sectorId }: any) {
      try {
        const res = await api.get(ep.CLOCKS_COUNT, { params: { vendorId, sectorId } });
        this.clockCounts = res.data;
        console.log({ res: res.data });
      } catch (err) {
        console.error(err);
      }
    },
    async getInvoicesAmount({ vendorId, from, to, sectorId }: any) {
      try {
        const res = await api.get(ep.INVOICES_COUNT_AMOUNT, {
          params: { vendorId, from, to, sectorId },
        });
        console.log({ res });
        this.invoicesCountAmount = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getReadingsCount({ vendorId, from, to, sectorId }: any) {},
    async getReadingsConsuming({ vendorId, from, to, sectorId }: any) {
      try {
        const res = await api.get(ep.READINGS_CONSUMING, {
          params: { vendorId, from, to, sectorId },
        });
        console.log({ res });
        this.consumingAmount = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getGeneralCount({ vendorId, sectorId }: any) {
      try {
        const res = await api.get(ep.GENERAL_COUNTS, { params: { vendorId, sectorId } });
        this.generalCounts = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getStatistics({ vendorId, from, to, sectorId }: any) {
      this.loading = true;
      try {
        await Promise.all([
          this.getClocksCount({ vendorId, from, to, sectorId }),
          this.getInvoicesAmount({ vendorId, from, to, sectorId }),
          this.getReadingsCount({ vendorId, from, to, sectorId }),
          this.getReadingsConsuming({ vendorId, from, to, sectorId }),
          this.getGeneralCount({ vendorId, sectorId }),
        ]);
      } finally {
        this.loading = false;
      }
    },
  },
});
