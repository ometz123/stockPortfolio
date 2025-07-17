import React, { ReactNode, createContext } from 'react';
import { PortfolioStore } from './PortfolioStore';
import { StockStore } from './StockStore';

export class RootStore {
  portfolioStore: PortfolioStore;
  stockStore: StockStore;

  constructor() {
    this.portfolioStore = new PortfolioStore();
    this.stockStore = new StockStore();
  }
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStores = () => React.useContext(StoreContext);
