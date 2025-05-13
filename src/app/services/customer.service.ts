import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCurrentOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/order/customer-current-orders`);
  }

  getCurrentDeliveries(): Observable<Delivery[]>{
    return this.http.get<Delivery[]>(`${environment.apiUrl}/delivery/customer-current-deliveries`);
  }
}
