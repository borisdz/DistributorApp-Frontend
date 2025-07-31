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
  orders: Order[] = [];
  deliveries: Delivery[] = [];

  constructor(
    private orderSvc: OrderService,
    private deliverySvc: DeliveryService,
  ) {}

  ngOnInit() {
    this.orderSvc.getUnassignedOrdersForWarehouse().subscribe({
      next: (o) => (this.orders = o),
      error: () => alert('Failed to load unassigned orders.'),
    });

    this.deliverySvc.getActiveDeliveriesForWarehouse().subscribe({
      next: (d) => (this.deliveries = d),
      error: () => alert('Failed to load active deliveries.'),
    });
  }
}
