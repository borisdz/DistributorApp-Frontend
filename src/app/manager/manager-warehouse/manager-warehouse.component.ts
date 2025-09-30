import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { StockForecast } from '../../models/stock-forecast.model';
import { WarehouseService } from '../../services/warehouse.service';
import { WarehouseStock } from '../../models/warehouse-stock.model';

@Component({
  selector: 'app-manager-warehouse',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './manager-warehouse.component.html',
  styleUrl: './manager-warehouse.component.css',
})
export class ManagerWarehouseComponent {
  availableArticles: WarehouseStock[] = [];
  pendingDeliveryArticles: WarehouseStock[] = [];
  nearExpirationArticles: WarehouseStock[] = [];
  expiredArticles: WarehouseStock[] = [];
  stockForecast: StockForecast[] = [];
  totalLoss: number = 0;

  public Math = Math;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.loadWarehouseData();
  }

  loadWarehouseData() {
    this.warehouseService
      .getAvailableArticles()
      .subscribe((articles) => (this.availableArticles = articles));
    this.warehouseService
      .getPendingDeliveryArticles()
      .subscribe((articles) => (this.pendingDeliveryArticles = articles));
    this.warehouseService
      .getNearExpirationArticles()
      .subscribe((articles) => (this.nearExpirationArticles = articles));
    this.warehouseService
      .getExpiredArticles()
      .subscribe((articles) => (this.expiredArticles = articles));
    this.warehouseService
      .getStockForecast()
      .subscribe((forecast) => (this.stockForecast = forecast));
  }

  calculateTotalLoss() {
    this.totalLoss = this.expiredArticles.reduce(
      (sum, stock) => sum + stock.quantity * (stock.article.price || 0), 0
    );
  }

  getDaysUntilExpiration(expirationDate: string): number {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStockLevel(quantity: number, minQuantity: number): string {
      const minQty = minQuantity ?? 10;

    if (quantity <= 0) return 'out-of-stock';
    if (quantity <= minQty) return 'low-stock';
    if (quantity <= minQty * 2) return 'medium-stock';
    return 'high-stock';
  }

  getMinQuantity(stock: WarehouseStock): number {
  return stock.article?.minQuantity ?? 10;
}
}
