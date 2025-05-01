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

@Component({
  selector: 'app-add-manager',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css',
})
export class AddManagerComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.admin
      .addManager(this.form.value)
      .subscribe(() => this.router.navigate(['/admin/dashboard']));
  }
}
