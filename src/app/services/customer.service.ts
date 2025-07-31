import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Delivery } from '../models/delivery.model';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCurrentOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${environment.apiUrl}/order/customer-current-orders`,
    );
  }

  getCurrentDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(
      `${environment.apiUrl}/delivery/customer-current-deliveries`,
    );
  }

  getProfile(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customer/profile`);
  }

  updateProfile(data: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.apiUrl}/customer/profile`,
      data,
    );
  }

  updateProfilePicture(file: File): Observable<Customer> {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Customer>(
      `${environment.apiUrl}/customer/profile/picture`,
      fd,
    );
  }

  updateRepImage(file: File): Observable<Customer> {
    const fd = new FormData();
    fd.append('repImage', file);
    return this.http.post<Customer>(
      `${environment.apiUrl}/customer/profile/rep-image`,
      fd,
    );
  }
}
