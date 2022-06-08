import { InvestmentPortfolio, Stock } from ".";
import { mockStockPrices, MOCK_TICKS } from "./utils";

describe("Test InvestmentPortfolio", () => {
  describe("InvestmentPortfolio --> getStocks", () => {
    it("should return an array of stocks", () => {
      const myPortfolio = new InvestmentPortfolio();
      myPortfolio.addStock(
        new Stock({
          name: "FB",
          shares: 100,
          buyingDate: new Date("2020-01-01"),
          buyingPrice: 100,
        })
      );
      myPortfolio.addStock(
        new Stock({
          name: "MSFT",
          shares: 100,
          buyingDate: new Date("2020-01-01"),
          buyingPrice: 100,
        })
      );

      expect(myPortfolio.getStocks()).toBeInstanceOf(Array);
      expect(myPortfolio.getStocks().length).toBe(2);
    });
  });

  describe("InvestmentPortfolio --> getProfit", () => {
    it("should return a profit value when has stocks purchased before the given start date", () => {
      const myPortfolio = new InvestmentPortfolio();
      const earlierDate = new Date("2020-01-01");
      const todayDate = new Date();
      const buyingMockPrice = 100;
      const actualMockPrice = 120;
      const shares = 100;
      const stocksQty = MOCK_TICKS.length;
      const buying = buyingMockPrice * shares * stocksQty;
      const starting = actualMockPrice * shares * stocksQty;
      const endValue = actualMockPrice * shares * stocksQty;
      const startingProfit = starting - buying;
      const profitValue = endValue - startingProfit;

      MOCK_TICKS.forEach((mockTick) => {
        const stock = new Stock({
          name: mockTick,
          shares,
          buyingDate: earlierDate,
          buyingPrice: buyingMockPrice,
        });
        stock.getPrice = () => actualMockPrice;
        myPortfolio.addStock(stock);
      });

      expect(myPortfolio.getProfit(earlierDate, todayDate)).toBe(profitValue);
    });

    it("should return 0 when there is no stocks purchased between the given date range", () => {
      const myPortfolio = new InvestmentPortfolio();
      const earlierDate = new Date("2005-01-01");
      const earlierDate2 = new Date("2020-01-01");
      const todayDate = new Date();
      const buyingMockPrice = 100;
      const actualMockPrice = 120;
      MOCK_TICKS.forEach((mockTick) => {
        const stock = new Stock({
          name: mockTick,
          shares: 100,
          buyingDate: todayDate,
          buyingPrice: buyingMockPrice,
        });
        stock.getPrice = () => actualMockPrice;
        myPortfolio.addStock(stock);
      });

      expect(myPortfolio.getProfit(earlierDate, earlierDate2)).toBe(0);
    });

    it("should return an error when the end date is earlier than the start date", () => {
      const myPortfolio = new InvestmentPortfolio();
      const earlierDate = new Date("2020-01-01");
      const todayDate = new Date();
      const buyingMockPrice = 100;
      MOCK_TICKS.forEach((i) => {
        const stock = new Stock({
          name: i,
          shares: 100,
          buyingDate: earlierDate,
          buyingPrice: buyingMockPrice,
        });
        myPortfolio.addStock(stock);
      });

      expect(() => myPortfolio.getProfit(todayDate, earlierDate)).toThrowError(
        "Start date must be earlier than end date"
      );
    });
  });
});

describe("Test Stock", () => {
  describe("Stock --> getActualPrice", () => {
    it("should return an actual price of 120", () => {
      const stock = new Stock({
        name: "FB",
        shares: 100,
        buyingDate: new Date("2020-01-01"),
        buyingPrice: 100,
      });
      const date = new Date("2020-01-02");
      const price = mockStockPrices["FB"][date.toLocaleDateString()];
      expect(stock.getPrice(date)).toBe(price);
    });
  });
});
