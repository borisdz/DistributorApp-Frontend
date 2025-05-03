import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-add-manager',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css',
})
export class AddManagerComponent {
  form!: FormGroup;
  cities: any[] = [];
  selectedWarehouse: { id: number; address: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatedPassword: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        mobile: ['', Validators.required],
        profileImage: [null],
        city: ['', Validators.required],
        warehouseId: ['', Validators.required], // will hold ID
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    this.loadCities();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();

    for (const [key, value] of Object.entries(this.form.value)) {
      formData.append(key, value as any);
    }

    this.admin.addManager(formData).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (e) => alert('Error creating manager: ' + e.message),
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const pw = group.get('password')?.value;
    const rpt = group.get('repeatedPassword')?.value;
    return pw && rpt && pw !== rpt ? { notMatching: true } : null;
  }

  loadCities() {
    this.http
      .get<any[]>(`${environment.apiUrl}/cities/listAll`)
      .subscribe((data) => (this.cities = data));
  }

  onCityChange(event: Event) {
    const cityId = Number((event.target as HTMLSelectElement).value);

    this.http
      .get<{ id: number; address: string }>(
        `${environment.apiUrl}/warehouse/find-by-city?cityId=${cityId}`
      )
      .subscribe((warehouse) => {
        this.selectedWarehouse = warehouse;
        this.form.patchValue({ warehouseId: warehouse.id });
      });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) this.form.patchValue({ profileImage: file });
  }
}
