import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../models';
import { Delivery } from '../../models/delivery.model';
import { OrderService } from '../../services/order.service';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-manager-dashboard',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
})
export class ManagerDashboardComponent {
  unassignedOrders: Order[] = [];
  activeDeliveries: Delivery[] = [];

  constructor(
    private orderSvc: OrderService,
    private deliverySvc: DeliveryService,
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadDeliveries();
  }

  loadOrders() {
    this.orderSvc
      .getUnassignedOrdersForWarehouse()
      .subscribe((orders) => (this.unassignedOrders = orders));
  }

  loadDeliveries() {
    this.deliverySvc
      .getActiveDeliveriesForWarehouse()
      .subscribe((deliveries) => (this.activeDeliveries = deliveries));
  }
}
