# Investment Portfolio Exercise

Simple Portfolio class that has a collection of Stocks and a "Profit" method that receives 2 dates and returns the profit of the Portfolio between those dates. Assuming each Stock has a "Price" method that receives a date and returns its price.

## Installation

Use npm or yarn.

```bash
npm i
```

```bash
yarn install
```

## Usage

```typescript
import { InvestmentPortfolio, Stock } from ".";

const myPortfolio = new InvestmentPortfolio();

myPortfolio.addStock(
  new Stock({
    name: "FB",
    shares: 1200,
    buyingDate: new Date(2019, 3, 3),
    buyingPrice: 100,
  })
);
myPortfolio.addStock(
  new Stock({
    name: "MSFT",
    shares: 183,
    buyingDate: new Date(2019, 3, 3),
    buyingPrice: 100,
  })
);
myPortfolio.addStock(
  new Stock({
    name: "AAPL",
    shares: 187,
    buyingDate: new Date(2020, 4, 19),
    buyingPrice: 100,
  })
);
myPortfolio.addStock(
  new Stock({
    name: "GOOG",
    shares: 25,
    buyingDate: new Date(2020, 4, 19),
    buyingPrice: 100,
  })
);

// * Date range supported from January 1st, 2015 to December 31st, 2022
// * This can be changed by changing the range in the generateMockStockPrices function

console.log(
  myPortfolio.getProfit(new Date(2020, 10, 9), new Date(2020, 10, 10))
);
```

## Run Tests

```bash
yarn test
```

## Run demo example

```bash
npx ts-node demo.ts
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
