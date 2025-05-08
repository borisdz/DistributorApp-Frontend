import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Category, Manufacturer } from '../models';
import { PageResponse } from '../models/page-response.model';
import { PagedModel } from '../models/paged-model';

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

  listArticles(
    categoryId: number | null,
    manufacturerId: number | null,
    nameFilter: string,
    page: number,
    size: number
  ): Observable<PagedModel<Article>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categoryId != null)
      params = params.set('categoryId', categoryId.toString());
    if (manufacturerId != null)
      params = params.set('manufacturerId', manufacturerId.toString());
    if (nameFilter) params = params.set('search', nameFilter);

    return this.http.get<PagedModel<Article>>(
      `${environment.apiUrl}/article/all-pages`,
      { params }
    );
  }

  placeOrder(orderItems: any[], proForma: boolean): Observable<any> {
    return this.http.post(`${environment.apiUrl}/order/create-order`, {
      orderItems,
      proForma,
    });
  }
}
