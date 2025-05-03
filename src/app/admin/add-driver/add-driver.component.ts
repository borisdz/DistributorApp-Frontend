import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-add-driver',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css',
})
export class AddDriverComponent {
  form!: FormGroup;
  cities: any[] = [];
  vehicles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mobile: ['', Validators.required],
      profileImage: [null],
      city: ['', Validators.required],
      vehicle: ['', Validators.required],
    });

    this.loadCities();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    this.admin.addDriver(formData).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (e) => alert('Error adding driver: ' + e.message),
    });
  }

  loadCities() {
    this.http.get<any[]>(`${environment.apiUrl}/city/all`).subscribe((data) => {
      this.cities = data;
    });
  }

  onCityDropdownChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.onCityChange(+value);
  }

  onCityChange(cityId: number) {
    this.http
      .get<any[]>(`${environment.apiUrl}/vehicle/find-by-city?cityId=${cityId}`)
      .subscribe((data) => {
        this.vehicles = data;
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ profileImage: file });
    }
  }
}
