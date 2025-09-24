import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Manager } from '../models/manager.model';
import { FinancialSummary } from '../models/financial-summary.model';
import { ProForma, ProFormaResponseDto } from '../models/pro-forma-dtos.model';
import { Driver } from '../models/driver.model';
import { Vehicle } from '../models/vehicle.model';
import { City } from '../models/city.model';
import { Order } from '../models';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) { }

  getProfile(): Observable<Manager> {
    return this.http.get<Manager>(`${environment.apiUrl}/manager/profile`);
  }

  updateProfile(data: Partial<Manager>): Observable<Manager> {
    return this.http.put<Manager>(
      `${environment.apiUrl}/manager/profile`,
      data,
    );
  }

  updateProfilePicture(file: File): Observable<Manager> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Manager>(
      `${environment.apiUrl}/manager/profile-picture`,
      formData,
    );
  }

  getAllProFormas(): Observable<ProFormaResponseDto[]> {
    return this.http.get<ProFormaResponseDto[]>(`${environment.apiUrl}/pro-forma/manager/all`);
  }

  getMonthlyFinancialSummary(): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${environment.apiUrl}/manager/finances/monthly-report`);
  }

  getQuarterlyFinancialSummary(): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${environment.apiUrl}/manager/finances/quarterly-report`);
  }

  createProForma(proForma: number): Observable<ProFormaResponseDto> {
    return this.http.post<ProFormaResponseDto>(`${environment.apiUrl}/manager/pro-formas`, proForma);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.apiUrl}/driver/manager/list-all`);
  }

  getAvailableCities(): Observable<City[]> {
  return this.http.get<City[]>(`${environment.apiUrl}/manager/cities`);
}

getAvailableVehicles(): Observable<Vehicle[]> {
  return this.http.get<Vehicle[]>(`${environment.apiUrl}/manager/vehicles`);
}

getUnassignedOrdersByCities(cityIds: number[]): Observable<Order[]> {
  const params = new HttpParams().set('cityIds', cityIds.join(','));
  return this.http.get<Order[]>(`${environment.apiUrl}/manager/orders/unassigned`, { params });
}

getWarehouseStock(warehouseId: number): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/manager/warehouse/${warehouseId}/stock`);
}

createDelivery(deliveryData: any): Observable<Delivery> {
  return this.http.post<Delivery>(`${environment.apiUrl}/manager/delivery/create`, deliveryData);
}
}
