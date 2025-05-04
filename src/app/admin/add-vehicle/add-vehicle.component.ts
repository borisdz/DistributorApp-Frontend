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
  selector: 'app-add-vehicle',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  form!: FormGroup;
  warehouses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      vehicleCarryWeight: ['', Validators.required],
      vehicleServiceInterval: ['', Validators.required],
      vehicleKilometers: ['', Validators.required],
      vehicleLastService: ['', Validators.required],
      vehicleLastServiceKm: ['', Validators.required],
      vehiclePlate: ['', Validators.required],
      vehicleVIN: ['', Validators.required],
      vehicleRegDate: ['', Validators.required],
      warehouseId: ['', Validators.required],
    });

    this.loadWarehouses();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    this.admin.addVehicle(formData).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (e) => alert('Error adding vehicle: ' + e.message),
    });
  }

  loadWarehouses() {
    this.http
      .get<any[]>(`${environment.apiUrl}/warehouse/all`)
      .subscribe((data) => {
        this.warehouses = data;
      });
  }
}
