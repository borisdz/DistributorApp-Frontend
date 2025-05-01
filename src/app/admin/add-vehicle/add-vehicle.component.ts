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

@Component({
  selector: 'app-add-vehicle',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      plateNumber: ['', Validators.required],
      model: ['', Validators.required],
      capacity: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.admin
      .addVehicle(this.form.value)
      .subscribe(() => this.router.navigate(['/admin/dashboard']));
  }
}
