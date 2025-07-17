import { makeAutoObservable, runInAction } from 'mobx';
import { apiClient } from '../utils/apiClient';
import {
  Portfolio,
  PortfolioStocksActions,
  StockSymbol,
} from '@stock-portfolio/shared';

const EXAMPLE_USER_NAME = 'john_doe';

export class PortfolioStore {
  stocks: StockSymbol[] = [];
  userName: string | undefined;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPortfolio() {
    this.loading = true;
    this.error = null;
    try {
      const res = await apiClient.get<Portfolio>(
        `/portfolio/${EXAMPLE_USER_NAME}`
      );
      runInAction(() => {
        this.stocks = res.data.stocks;
        this.userName = res.data.userName;
      });
    } catch (e: any) {
      runInAction(() => (this.error = e.message));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async updateStockPortfolio(stock: string, action: PortfolioStocksActions) {
    try {
      const res = await apiClient.patch<StockSymbol[]>(
        `/portfolio/stocks/${this.userName}`,
        { stock, action }
      );
      runInAction(() => (this.stocks = res.data));
    } catch (e: any) {
      console.error(e);
    }
  }
}
