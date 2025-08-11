import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Delivery } from '../../models/delivery.model';
import { TypeofExpression } from '@angular/compiler';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-manager-deliveries',
  imports: [NavbarComponent, DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './manager-deliveries.component.html',
  styleUrl: './manager-deliveries.component.css',
})
export class ManagerDeliveriesComponent {
  deliveries: Delivery[] = [];
  sortedBy: string = 'date';
  sortAsc: boolean = true;
  selectedDelivery: Delivery | null = null;

  constructor(
    private deliverySvc: DeliveryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.deliverySvc.getAllDeliveriesForWarehouse().subscribe({
      next: (deliveries) => {
        this.deliveries = deliveries;
      },
      error: (err) => {
        console.error('Error fetching deliveries:', err);
      },
    });
  }

  sortTable(by: string) {
    this.sortAsc = this.sortedBy === by ? !this.sortAsc : true;
    this.sortedBy = by;
    this.deliveries.sort((a, b) => {
      let valA, valB;
      if (by === 'date') {
        valA = new Date(a.delDate).getTime();
        valB = new Date(b.delDate).getTime();
      } else if (by === 'driver') {
        valA = a.driverName.toLowerCase();
        valB = b.driverName.toLowerCase();
      } else if (by === 'city') {
        valA = a.delCities.join(',').toLowerCase();
        valB = b.delCities.join(',').toLowerCase();
      }

      return this.sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
  }

  openDeliveryDetails(delivery: Delivery){
    this.selectedDelivery = delivery;
  }

  closeModal(){
    this.selectedDelivery = null;
  }

  goToDriver(driverId: number){
    this.router.navigate(['/manager/drivers', driverId]);
  }

  goToOrder(orderId: number){
    this.router.navigate(['/manager/orders', orderId]);
  }

}
