import { mockStockPrices, randomNumberBetween } from "./utils";
export type SuportedTicks = "AAPL" | "MSFT" | "GOOG" | "FB";
interface IStock {
  name: SuportedTicks;
  shares: number;
  buyingDate: Date;
  buyingPrice: number;
}

export class Stock {
  public name: SuportedTicks;
  public shares: number;
  public buyingDate: Date;
  public buyingPrice: number;
  constructor(stock: IStock) {
    this.name = stock.name;
    this.shares = stock.shares;
    this.buyingDate = stock.buyingDate;
    this.buyingPrice = stock.buyingPrice;
  }
  getPrice(date: Date): number {
    const price = mockStockPrices[this.name][date.toLocaleDateString()];
    if (price === undefined) {
      throw new Error("No price for this date");
    }
    return price;
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
    let buyingValue = 0;
    let startingValue = 0;
    let endValue = 0;
    if (startDate > endDate) {
      throw new Error("Start date must be earlier than end date");
    }
    for (const stock of this.stocks) {
      if (stock.buyingDate > endDate) {
        continue;
      }
      buyingValue += stock.buyingPrice * stock.shares; //40,000
      startingValue += stock.getPrice(startDate) * stock.shares; //48,000
      endValue += stock.getPrice(endDate) * stock.shares; //48,000
    }
    const startingProfit = startingValue - buyingValue; //8,000
    const profitValue = endValue - startingProfit; //8,000
    return profitValue;
  }
}
