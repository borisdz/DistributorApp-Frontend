export interface StockForecast {
  articleId: number;
  predictedStock: number;
  reorderLevel: number;
  leadTime: number;
}
