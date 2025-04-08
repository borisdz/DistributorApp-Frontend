import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtHelper = new JwtHelperService();
  private currentUserSubject = new BehaviorSubject<any>(null);

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => this.storeToken(response.token)),
        catchError((error) => {
          this.clearToken();
          throw error;
        })
      );
  }

  register(userData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData);
  }

  resetPassword(email: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/reset-password`,
      email
    );
  }

  private storeToken(token: string) {
    return localStorage.setItem(environment.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(environment.tokenKey);
    this.currentUserSubject.next(null);
  }

  parseJwt(token: string) {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (e) {
      return null;
    }
  }
}
