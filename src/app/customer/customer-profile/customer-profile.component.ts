import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Customer } from '../../models';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent {
  profile!: Customer;
  form!: FormGroup;
  editMode = false;

  constructor(
    private svc: CustomerService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.svc.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.buildForm(profile);
    });
  }

  private buildForm(p: Customer) {
    this.form = this.fb.group({
      firstName: [p.firstName, Validators.required],
      lastName: [p.lastName, Validators.required],
      email: [p.email, [Validators.required, Validators.email]],
      phone: [p.phone, Validators.required],
      edb: [p.edb, Validators.required],
      compName: [p.compName, Validators.required],
      address: [p.address, Validators.required],
      city: [p.cityId, Validators.required],
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) this.buildForm(this.profile);
  }

  saveProfile() {
    if (this.form.invalid) return;
    this.svc.updateProfile(this.form.value).subscribe({
      next: () => {
        this.loadProfile();
        this.editMode = false;
      },
      error: (err) => alert('Save failed: ' + err.message),
    });
  }

  changeProfileImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.svc.updateProfilePicture(file).subscribe((u) => (this.profile = u));
    }
  }

  changeRepImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.svc.updateRepImage(file).subscribe((u) => (this.profile = u));
    }
  }
}
