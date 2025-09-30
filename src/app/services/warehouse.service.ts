import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockForecast } from '../models/stock-forecast.model';
import { Article } from '../models';
import { WarehouseStock } from '../models/warehouse-stock.model';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private http: HttpClient) {}

  getWarehouseStock(): Observable<WarehouseStock[]> {
    return this.http.get<WarehouseStock[]>(
      `${environment.apiUrl}/warehouse/stock`,
    );
  }

  getAvailableArticles(): Observable<WarehouseStock[]> {
    return this.http.get<WarehouseStock[]>(
      `${environment.apiUrl}/warehouse/articles/available`,
    );
  }

  getPendingDeliveryArticles(): Observable<WarehouseStock[]> {
    return this.http.get<WarehouseStock[]>(
      `${environment.apiUrl}/warehouse/articles/pending-delivery`,
    );
  }

  getNearExpirationArticles(): Observable<WarehouseStock[]> {
    return this.http.get<WarehouseStock[]>(
      `${environment.apiUrl}/warehouse/articles/near-expiration`,
    );
  }

  getExpiredArticles(): Observable<WarehouseStock[]> {
    return this.http.get<WarehouseStock[]>(
      `${environment.apiUrl}/warehouse/articles/expired`,
    );
  }

  getStockForecast(): Observable<StockForecast[]> {
    return this.http.get<StockForecast[]>(
      `${environment.apiUrl}/warehouse/stock-forecast`,
    );
  }
}
