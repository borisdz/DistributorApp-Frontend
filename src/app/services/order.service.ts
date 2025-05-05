import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Category, Manufacturer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  listCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/all`);
  }

  listManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(
      `${environment.apiUrl}/manufacturer/all`
    );
  }

  listArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}/article/all`);
  }

  placeOrder(orderItems: any[], proForma: boolean): Observable<any> {
    return this.http.post(`${environment.apiUrl}/order/create-order`, {
      orderItems,
      proForma,
    });
  }
}
