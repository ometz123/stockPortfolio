import { makeAutoObservable, runInAction } from 'mobx';
import { apiClient, quotesClient } from '../utils/apiClient';
import {
  Portfolio,
  PortfolioStocksActions,
  StockSymbol,
} from '@stock-portfolio/shared';
import { AxiosError } from 'axios';

const EXAMPLE_USER_NAME = import.meta.env.VITE_EXAMPLE_USER_NAME || 'John Doe';

export class PortfolioStore {
  stocks: StockSymbol[] = [];
  userName: string | undefined;
  loading = false;
  error: string | null = null;
  stockError: string | null = null;

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
    this.stockError = null;

    try {
      const stockExists = (await quotesClient.get(stock)).data[0];
      if (!stockExists) {
        runInAction(() => (this.stockError = `Stock ${stock} does not exist.`));
        return;
      }

      const res = await apiClient.patch<StockSymbol[]>(
        `/portfolio/stocks/${this.userName}`,
        { stock, action }
      );
      runInAction(() => (this.stocks = res.data));
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(e);
        runInAction(() => (this.stockError = e.response?.data.message));
      }
    }
  }
}
