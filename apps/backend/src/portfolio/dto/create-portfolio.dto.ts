export class CreatePortfolioDto {
  userName: string;
  stocks: string[];

  constructor(userName: string, stocks: string[] = []) {
    this.userName = userName;
    this.stocks = stocks;
  }
}
