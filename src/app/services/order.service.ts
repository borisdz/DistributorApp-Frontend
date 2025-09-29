import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Category, Manufacturer, Order, OrderItem } from '../models';
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
      `${environment.apiUrl}/manufacturer/all`,
    );
  }

  listArticles(
    categoryId: number | null,
    manufacturerId: number | null,
    nameFilter: string,
    page: number,
    size: number,
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
      { params },
    );
  }

  placeOrder(orderItems: OrderItem[], proForma: boolean): Observable<any> {
    const createOrderPayload = {
      orderItems: orderItems.map((it) => ({
        article: {
          id: it.article?.id ?? null,
          name: it.article?.name ?? '',
          manufacturer: it.article?.manufacturer ?? null,
          quantity: it.article?.quantity ?? 0,
          manufacturerId: it.article?.manufacturerId ?? null,
          price: it.article?.price ?? 0,
          category: it.article?.category ?? null,
          categoryId: it.article?.categoryId ?? null,
          weight: it.article?.weight ?? 0,
          image: it.article?.image ?? null,
        },
        quantity: it.quantity,
      })),
      proForma: proForma,
    };

    return this.http.post(
      `${environment.apiUrl}/order/create`,
      createOrderPayload,
    );
  }

  getUnassignedOrdersForWarehouse(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/order/manager/unassigned-orders`);
  }
}
