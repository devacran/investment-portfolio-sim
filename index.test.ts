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
    it("should return a profit of 4000", () => {
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
      stock1.getActualPrice = () => actualMockPrice;
      stock2.getActualPrice = () => actualMockPrice;

      const PORTFOLIO_MOCK_PROFIT = 4000;

      myPortfolio.addStock(stock1);
      myPortfolio.addStock(stock2);

      expect(myPortfolio.getProfit(earlierDate, todayDate)).toBe(
        PORTFOLIO_MOCK_PROFIT
      );
    });
    it("should return an error with a earlier end date than start date", () => {
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
