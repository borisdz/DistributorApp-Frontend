import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { Delivery } from '../../models/delivery.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent {
  orders: Order[] = [];
  deliveries: Delivery[] = [];

  constructor(private svc: CustomerService) {}

  ngOnInit() {
    this.svc.getCurrentOrders().subscribe({
      next: (o) => (this.orders = o),
      error: () => alert('Failed to load orders.'),
    });

    this.svc.getCurrentDeliveries().subscribe({
      next: (d) => (this.deliveries = d),
      error: () => alert('Failed to load deliveries.'),
    });
  }

  trackByOrder(_: number, o: Order) {
    return o.ord_date + o.ord_sum;
  }

  trackByDelivery(_: number, d: Delivery) {
    return d.del_date + (d.driverName ?? 'Driver name unavailable');
  }
}
