import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Category, Manufacturer, Article, OrderItem, adaptArticle } from '../../models';
import { OrderService } from '../../services/order.service';
import { PagedModel } from '../../models/paged-model';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  form!: FormGroup;
  displayed: Article[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 50;
  orderItems: OrderItem[] = [];
  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  totalSum = 0;
  proForma = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private svc: OrderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      category: [null],
      manufacturer: [null],
      search: [''],
    });

    this.form.valueChanges.subscribe(() => this.loadPage(0));

    this.loadPage(0);

    this.svc.listCategories().subscribe((cats) => (this.categories = cats));
    this.svc
      .listManufacturers()
      .subscribe((mans) => (this.manufacturers = mans));
  }

  loadPage(page: number) {
    const { category, manufacturer, search } = this.form.value;
    this.svc
      .listArticles(category, manufacturer, search, page, this.pageSize)
      .subscribe((resp: PagedModel<Article>) => {
        const listKey = Object.keys(resp._embedded)[0];
        // Apply adapter to each article
        this.displayed = resp._embedded[listKey].map(adaptArticle);
        this.currentPage = resp.page.number;
        this.totalPages = resp.page.totalPages;
      });
  }

  prevPage() {
    if (this.currentPage > 0) this.loadPage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages)
      this.loadPage(this.currentPage + 1);
  }
  trackByArticle(_: number, a: Article) {
    return a.art_id || a.id;
  }

  addArticle(a: Article) {
    const qty = Number(prompt(`Quantity for ${a.art_name}:`, '1'));

    if (!qty || qty < 1 || qty > (a.quantity ?? 0)) {
      alert('invalid quantity');
      return;
    }
    this.orderItems.push({
      ord_id: 0,
      art_id: a.art_id ?? a.id ?? 0,
      unit_price: typeof a.price === 'number' ? a.price : (typeof a.currentPrice === 'number' ? a.currentPrice : (a.currentPrice?.price ?? 0)),
      article: a,
      quantity: qty,
    });

    this.updateTotal();
  }

  removeItem(i: number) {
    this.orderItems.splice(i, 1);
    this.updateTotal();
  }

  updateTotal() {
    this.totalSum = this.orderItems.reduce(
      (sum, it) => {
        let price = 0;
        if (it.article) {
          if (typeof it.article.price === 'number') {
            price = it.article.price;
          } else if (typeof it.article.currentPrice === 'number') {
            price = it.article.currentPrice;
          } else if (it.article.currentPrice && typeof it.article.currentPrice.price === 'number') {
            price = it.article.currentPrice.price;
          }
        }
        return sum + (price * it.quantity);
      },
      0
    );
  }

  toggleProForma(event: any) {
    this.proForma = event.target.checked;
  }

  placeOrder() {
    if (this.orderItems.length === 0) {
      alert('Add at least one item');
      return;
    }
    this.svc.placeOrder(this.orderItems, this.proForma).subscribe({
      next: (createdOrder) => {
        alert('Order placed!');
        this.orderItems = [];
        this.updateTotal();
        this.router.navigate(['/customer/dashboard']);
      },
      error: (err) => alert('Error: ' + (err.message || 'Unknown'))
    });
  }
}
