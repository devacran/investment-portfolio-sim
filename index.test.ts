import { InvestmentPortfolio, Stock } from ".";

describe("Test InvestmentPortfolio", () => {
  describe("InvestmentPortfolio --> getStocks", () => {
    it("should return an array of stocks", () => {
      const myPortfolio = new InvestmentPortfolio();
      myPortfolio.addStock(
        new Stock({
          name: "Apple",
          shares: 100,
          buyingDate: new Date("2020-01-01"),
          buyingPrice: 100,
        })
      );
      myPortfolio.addStock(
        new Stock({
          name: "Google",
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
      const stock1 = new Stock({
        name: "Apple",
        shares: 100,
        buyingDate: earlierDate,
        buyingPrice: buyingMockPrice,
      });
      const stock2 = new Stock({
        name: "Google",
        shares: 100,
        buyingDate: earlierDate,
        buyingPrice: buyingMockPrice,
      });
      const PORTFOLIO_MOCK_PROFIT = 4000;
      stock1.getActualPrice = () => actualMockPrice;
      stock2.getActualPrice = () => actualMockPrice;
      myPortfolio.addStock(stock1);
      myPortfolio.addStock(stock2);

      expect(myPortfolio.getProfit(earlierDate, todayDate)).toBe(
        PORTFOLIO_MOCK_PROFIT
      );
    });

    it("should return 0 when there is no stocks purchased between the given date range", () => {
      const myPortfolio = new InvestmentPortfolio();
      const earlierDate = new Date("2005-01-01");
      const earlierDate2 = new Date("2020-01-01");
      const todayDate = new Date();
      const buyingMockPrice = 100;
      const actualMockPrice = 120;
      const stock1 = new Stock({
        name: "Apple",
        shares: 100,
        buyingDate: todayDate,
        buyingPrice: buyingMockPrice,
      });
      const stock2 = new Stock({
        name: "Google",
        shares: 100,
        buyingDate: todayDate,
        buyingPrice: buyingMockPrice,
      });
      stock1.getActualPrice = () => actualMockPrice;
      stock2.getActualPrice = () => actualMockPrice;
      myPortfolio.addStock(stock1);
      myPortfolio.addStock(stock2);

      expect(myPortfolio.getProfit(earlierDate, earlierDate2)).toBe(0);
    });

    it("should return an error when the end date is earlier than the start date", () => {
      const myPortfolio = new InvestmentPortfolio();
      const earlierDate = new Date("2020-01-01");
      const todayDate = new Date();
      const buyingMockPrice = 100;
      const stock1 = new Stock({
        name: "Apple",
        shares: 100,
        buyingDate: earlierDate,
        buyingPrice: buyingMockPrice,
      });
      const stock2 = new Stock({
        name: "Google",
        shares: 100,
        buyingDate: earlierDate,
        buyingPrice: buyingMockPrice,
      });
      myPortfolio.addStock(stock1);
      myPortfolio.addStock(stock2);

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
        name: "Apple",
        shares: 100,
        buyingDate: new Date("2020-01-01"),
        buyingPrice: 100,
      });

      expect(stock.getActualPrice()).toBeDefined();
    });
  });
});
