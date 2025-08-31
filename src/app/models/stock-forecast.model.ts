export interface StockForecast {
  articleName: string;
  currentStock: number;
  dailyUsage: number;
  daysRemaining: number;
  estimatedRefillDate: string;
}
