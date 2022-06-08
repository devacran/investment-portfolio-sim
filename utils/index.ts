import { SuportedTicks } from "..";

export const MOCK_TICKS: SuportedTicks[] = ["AAPL", "MSFT", "GOOG", "FB"];
export function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
type IMockPrices = Record<string, Record<string, number>>;

export function generateMockStockPrices(
  stockList: string[],
  startDate: Date,
  endDate: Date
) {
  const mockStockPrices: IMockPrices = {};
  stockList.forEach((i) => {
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      mockStockPrices[i] = mockStockPrices[i] ?? {};
      const date = d.toLocaleDateString();
      mockStockPrices[i][date] = randomNumberBetween(20, 100);
    }
  });
  return mockStockPrices;
}
export const mockStockPrices = generateMockStockPrices(
  MOCK_TICKS,
  new Date(2015, 1, 1),
  new Date(2022, 9, 9)
);
