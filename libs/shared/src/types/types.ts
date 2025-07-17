export type StockSymbol = string;

export interface Stock {
  symbol: StockSymbol;
  name: string;
}

export type StockDetail = Stock & {
  price: number;
  change: number;
  changesPercentage: number;
};

export type Portfolio = {
  stocks: StockSymbol[];
  userName: string;
};

export enum PortfolioStocksActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}
