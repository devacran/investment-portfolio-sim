import { randomNumberBetween } from "./utils";

interface IStock {
  name: string;
  shares: number;
  buyingDate: Date;
  buyingPrice: number;
}

export class Stock {
  public name: string;
  public shares: number;
  public buyingDate: Date;
  public buyingPrice: number;
  constructor(stock: IStock) {
    this.name = stock.name;
    this.shares = stock.shares;
    this.buyingDate = stock.buyingDate;
    this.buyingPrice = stock.buyingPrice;
  }
  getActualPrice(): number {
    return (
      this.buyingPrice + (this.buyingPrice / 10) * randomNumberBetween(-10, 10)
    );
  }
}

export class InvestmentPortfolio {
  private stocks: Stock[] = [];
  profit: number = 0;
  addStock(stocks: Stock | Stock[]) {
    if (Array.isArray(stocks)) {
      this.stocks = this.stocks.concat(stocks);
    } else {
      this.stocks.push(stocks);
    }
  }
  getStocks(): IStock[] {
    return this.stocks;
  }
  getProfit(startDate: Date, endDate: Date): number {
    let starterValue = 0;
    let endValue = 0;
    if (startDate > endDate) {
      throw new Error("Start date must be earlier than end date");
    }
    for (const stock of this.stocks) {
      if (stock.buyingDate > startDate) {
        continue;
      }
      starterValue += stock.buyingPrice * stock.shares;
      endValue += stock.getActualPrice() * stock.shares;
    }
    return endValue - starterValue;
  }
}

// const myPortfolio = new InvestmentPortfolio();

// myPortfolio.addStock(
//   new Stock({
//     name: "BTC",
//     shares: 1200,
//     buyingDate: new Date(2020, 3, 3),
//     buyingPrice: 123,
//   })
// );
// myPortfolio.addStock(
//   new Stock({
//     name: "DMA",
//     shares: 183,
//     buyingDate: new Date(2010, 6, 3),
//     buyingPrice: 164564,
//   })
// );
// myPortfolio.addStock(
//   new Stock({
//     name: "RTE",
//     shares: 187,
//     buyingDate: new Date(2009, 5, 3),
//     buyingPrice: 56757,
//   })
// );
// myPortfolio.addStock(
//   new Stock({
//     name: "JGL",
//     shares: 25,
//     buyingDate: new Date(2021, 2, 1),
//     buyingPrice: 1288,
//   })
// );
