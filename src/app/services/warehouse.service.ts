import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockForecast } from '../models/stock-forecast.model';
import { Article } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private http: HttpClient) {}

  getAvailableArticles(warehouseId: number) {
    return this.http.get<Article[]>(
      `/api/warehouses/${warehouseId}/articles/available`,
    );
  }

  getPendingDeliveryArticles(warehouseId: number) {
    return this.http.get<Article[]>(
      `/api/warehouses/${warehouseId}/articles/pending-delivery`,
    );
  }

  getNearExpirationArticles(warehouseId: number) {
    return this.http.get<Article[]>(
      `/api/warehouses/${warehouseId}/articles/near-expiration`,
    );
  }

  getExpiredArticles(warehouseId: number) {
    return this.http.get<Article[]>(
      `/api/warehouses/${warehouseId}/articles/expired`,
    );
  }

  getStockForecast(warehouseId: number) {
    return this.http.get<StockForecast[]>(
      `/api/warehouses/${warehouseId}/stock-forecast`,
    );
  }
}
