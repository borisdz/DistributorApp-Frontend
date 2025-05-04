import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-add-warehouse',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.css',
})
export class AddWarehouseComponent {
  form!: FormGroup;
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      address: ['', Validators.required],
      city: [null, Validators.required],
    });

    this.loadCities();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();

    for (const [key, value] of Object.entries(this.form.value)) {
      formData.append(key, value as any);
    }

    this.admin.addWarehouse(formData).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (e) => alert('Error creating warehosue: ' + e.message),
    });
  }

  loadCities() {
    this.http
      .get<any[]>(`${environment.apiUrl}/cities/listAll`)
      .subscribe((data) => (this.cities = data));
  }
}
