import { makeAutoObservable, runInAction } from 'mobx';
import { StockDetail, StockSymbol } from '@stock-portfolio/shared';
import { quotesClient } from '../utils/apiClient';

export class StockStore {
  details: StockDetail | null = null;
  stock: StockSymbol | null = null;
  searchLoading = false;
  loading = false;
  error: string | null = null;
  searchError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStockDetail(symbol: string) {
    this.searchLoading = true;
    this.error = null;
    this.searchError = null;

    try {
      const res = await quotesClient.get(symbol);
      const raw = res.data[0];

      if (!raw) {
        runInAction(() => {
          this.searchError = `Stock not found for "${symbol}"`;
        });
        return;
      }

      runInAction(() => {
        this.details = raw;
        this.searchError = null;
      });
    } catch (e: any) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.searchLoading = false));
    }
  }
}
