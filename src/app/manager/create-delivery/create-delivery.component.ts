import { Component } from '@angular/core';
import { Article, Order } from '../../models';
import { ManagerService } from '../../services/manager.service';
import { OrderService } from '../../services/order.service';
import { Delivery } from '../../models/delivery.model';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-create-delivery',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-delivery.component.html',
  styleUrl: './create-delivery.component.css'
})
export class CreateDeliveryComponent {
  form!: FormGroup;
  undeliveredOrders: Order[] = [];
  selectedOrders: Order[] = [];
  deliveryDate: Date | null = null;
  driverName: string = '';
  delivery: Delivery | null = null;
  drivers: Driver[] = [];
  warehouseStock: { [articleId: string]: { quantity: number } } = {};

  constructor(
    private orderSvc: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private managerSvc: ManagerService
  ){}

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  private initForm(){
    this.form = this.fb.group({
      deliveryDate: ['', Validators.required],
      driverId: ['', Validators.required]
    })
  }

  private loadData(){
    this.orderSvc.getUnassignedOrdersForWarehouse().subscribe(orders => {
      this.undeliveredOrders = orders;
    });

    this.managerSvc.getAvailableDrivers(this.deliveryDate).subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  isOrderAvailable(order: Order): boolean {
    // TODO: Implement order item article list so we can check if all articles are available in the warehouse
    // return order.articles.every(article=> this.warehouseStock[article.id]?.quantity >= article.quantity)
    return false;
  }

  getMissingArticles(order: Order): Article[]{
    return order.articles.filter(article=> !this.warehouseStock[article.id] ||
      this.warehouseStock[article.id].quantity < article.quantity
    );
  }

  toggleOrderSelection(order: Order){
    if (!this.isOrderAvailable(order)) return;

    const index = this.selectedOrders.indexOf(order);
    if(index===-1){
      this.selectedOrders.push(order);
    }else{
      this.selectedOrders.splice(index,1);
    }
  }

  createDelivery(){
    if(this.form.invalid || !this.selectedOrders.length) return;

    const delivery: Delivery = {
      orders: this.selectedOrders.map(o=>o.id),
      driverId: this.form.get('driverId')?.value,
      delDate: this.form.get('deliveryDate')?.value,
      delStatus: 'pending'
    };

    this.managerSvc.createDelivery(delivery).subscribe({
      next: () => {
        alert('Delivery created successfully');
        this.router.navigate(['/manager/deliveries']);
      },
      error: () => alert('Failed to create delivery')
    });
  }

  private checkOrdersAvailability(){
    this.undeliveredOrders.forEach(order => {
      order.isAvailable = this.isOrderAvailable(order);
      order.missingArticles = this.getMissingArticles(order);
    });
  }
}
