import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(userDetails: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userDetails);
  }
}
