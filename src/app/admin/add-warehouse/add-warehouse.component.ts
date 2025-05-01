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
  selector: 'app-add-warehouse',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.css',
})
export class AddWarehouseComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      compName: ['', Validators.required],
      address: ['', Validators.required],
      city: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.admin
      .addWarehouse(this.form.value)
      .subscribe(() => this.router.navigate(['/admin/dashboard']));
  }
}
