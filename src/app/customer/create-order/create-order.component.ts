import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Category, Manufacturer, Article, OrderItem } from '../../models';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  articles: Article[] = [];
  displayed: Article[] = [];
  orderItems: OrderItem[] = [];
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
      category: [''],
      manufacturer: [''],
      search: [''],
    });

    this.svc.listCategories().subscribe((c) => (this.categories = c));
    this.svc.listManufacturers().subscribe((m) => (this.manufacturers = m));
    this.svc.listArticles().subscribe((a) => {
      this.articles = a;
      this.applyFilter();
    });

    this.form.valueChanges.subscribe(() => this.applyFilter());
  }

  applyFilter() {
    const { category, manufacturer, search } = this.form.value;

    const term = (search || '').toLowerCase();

    this.displayed = this.articles.filter((a) => {
      return (
        (!category || a.categoryId === +category) &&
        (!manufacturer || a.manufacturerId === +manufacturer) &&
        (!term || a.name.toLowerCase().includes(term))
      );
    });
  }

  addArticle(a: Article) {
    const qty = Number(prompt(`Quantity for ${a.name}:`, '1'));

    if (!qty || qty < 1 || qty > a.quantity) {
      alert('invalid quantity');
      return;
    }
    this.orderItems.push({
      articleId: a.id,
      articleName: a.name,
      manufacturerName: a.manufacturer,
      unitPrice: a.price,
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
      (sum, it) => sum + it.unitPrice * it.quantity,
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
      next: () => {
        alert('Order placed!');
        this.orderItems = [];
        this.updateTotal();
        this.router.navigate(['/customer/dashboard']);
      },
      error: () => alert('Error'),
    });
  }
}
