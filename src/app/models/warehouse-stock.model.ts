import { Article } from "./article.model";

export interface WarehouseStock {
  article: Article;
  quantity: number;
  nearestExpirationDate: string;
  sellingPrice: number;
  costPrice: number;
  manufacturerName: string;
  categoryName: string;

  profit?: number;
  profitMargin?: number;
  daysToExpiration?: number;
  expirationStatus?: 'ok' | 'near' | 'expired';
}

export function getMinQuantity(stock: WarehouseStock): number {
  return stock.article?.minQuantity ?? 10;
}

export function calculateProfitMargin(stock: WarehouseStock): number {
  if (!stock.sellingPrice || !stock.costPrice || stock.costPrice === 0)
    return 0;

  return ((stock.sellingPrice - stock.costPrice) / stock.costPrice) * 100;
}

export function calculateDaysToExpiration(
  stock: WarehouseStock,
): number | null {
  if (!stock.nearestExpirationDate) return null;

  const expDate = new Date(stock.nearestExpirationDate);
  const today = new Date();

  expDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = expDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getExpirationStatus(
  stock: WarehouseStock,
): 'ok' | 'near' | 'expired' {
  const daysToExpiration = calculateDaysToExpiration(stock);

  if (daysToExpiration === null) return 'ok';
  if (daysToExpiration < 0) return 'expired';
  if (daysToExpiration <= 7) return 'near';
  return 'ok';
}
