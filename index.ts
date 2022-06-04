class Stock {
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
class InvestmentPortfolio {
  private stocks: Stock[] = [];
  profit: number = 0;
  addStock(stocks: IStock | IStock[]) {
    if (Array.isArray(stocks)) {
      stocks.forEach((stock) => this.stocks.push(new Stock(stock)));
    } else {
      this.stocks.push(new Stock(stocks));
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
      starterValue *= stock.buyingPrice * stock.shares;
      endValue += stock.getActualPrice() * stock.shares;
    }
    return endValue - starterValue;
  }
}
interface IStock {
  name: string;
  shares: number;
  buyingDate: Date;
  buyingPrice: number;
}

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const myPortfolio = new InvestmentPortfolio();

myPortfolio.addStock({
  name: "BTC",
  shares: 1200,
  buyingDate: new Date(2020, 3, 3),
  buyingPrice: 123,
});
myPortfolio.addStock({
  name: "DMA",
  shares: 183,
  buyingDate: new Date(2010, 6, 3),
  buyingPrice: 164564,
});
myPortfolio.addStock({
  name: "RTE",
  shares: 187,
  buyingDate: new Date(2009, 5, 3),
  buyingPrice: 56757,
});
myPortfolio.addStock({
  name: "JGL",
  shares: 25,
  buyingDate: new Date(2021, 2, 1),
  buyingPrice: 1288,
});
