import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addDriver(data: any): Observable<any> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/admin/create-driver`,
      data
    );
  }

  addManager(data: any): Observable<any> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/admin/create-manager`,
      data
    );
  }

  addWarehouse(data: any): Observable<any> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/admin/create-warehouse`,
      data
    );
  }

  addVehicle(data: any): Observable<any> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/admin/create-vehicle`,
      data
    );
  }
}
