import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Manager } from '../models/manager.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

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
}
