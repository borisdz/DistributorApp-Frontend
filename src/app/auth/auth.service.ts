import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environment';
import { StorageService } from '../services/storage.service';

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

  constructor(private storage: StorageService) {}

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
    console.log('Token is:' + token.toString);
    return this.storage.set(environment.tokenKey, token);
  }

  getToken(): string | null {
    return this.storage.get(environment.tokenKey);
  }

  clearToken() {
    this.storage.remove(environment.tokenKey);
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
