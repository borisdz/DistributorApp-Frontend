import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private http: HttpClient) {}

  getActiveDeliveriesForWarehouse(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${environment.apiUrl}/delivery/active`);
  }
}
