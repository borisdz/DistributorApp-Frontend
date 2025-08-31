import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Article } from '../../models';
import { StockForecast } from '../../models/stock-forecast.model';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-manager-warehouse',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './manager-warehouse.component.html',
  styleUrl: './manager-warehouse.component.css',
})
export class ManagerWarehouseComponent {
  availableArticles: Article[] = [];
  pendingDeliveryArticles: Article[] = [];
  nearExpirationArticles: Article[] = [];
  expiredArticles: Article[] = [];
  stockForecast: StockForecast[] = [];
  totalLoss: number = 0;
  warehouseId: number = 1;

  public Math = Math;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit() {
    this.loadWarehouseData();
  }

  loadWarehouseData() {
    this.warehouseService
      .getAvailableArticles(this.warehouseId)
      .subscribe((articles) => (this.availableArticles = articles));
    this.warehouseService
      .getPendingDeliveryArticles(this.warehouseId)
      .subscribe((articles) => (this.pendingDeliveryArticles = articles));
    this.warehouseService
      .getNearExpirationArticles(this.warehouseId)
      .subscribe((articles) => (this.nearExpirationArticles = articles));
    this.warehouseService
      .getExpiredArticles(this.warehouseId)
      .subscribe((articles) => (this.expiredArticles = articles));
    this.warehouseService
      .getStockForecast(this.warehouseId)
      .subscribe((forecast) => (this.stockForecast = forecast));
  }

  calculateTotalLoss() {
    this.totalLoss = this.expiredArticles.reduce(
      (sum, article) => sum + article.quantity * article.unitPrice,
      0,
    );
  }

  getDaysUntilExpiration(expirationDate: string): number {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStockLevel(quantity: number, minQuantity: number): string {
    if (quantity <= 0) return 'out-of-stock';
    if (quantity <= minQuantity) return 'low-stock';
    if (quantity <= minQuantity * 2) return 'medium-stock';
    return 'high-stock';
  }
}
