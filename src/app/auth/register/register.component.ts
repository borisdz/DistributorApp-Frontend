import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        repeatedPassword: ['', Validators.required],
        profileImage: [''],
        city: [null, Validators],
        edb: ['', Validators.required],
        compName: ['', Validators.required],
        address: ['', Validators.required],
        repImage: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('repeatedPassword')?.value;
    return pass === confirmPass ? null : { notMatching: true };
  }

  onProfileImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.patchValue({
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onRepImageSeleted(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.patchValue({
          repImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const customerData = this.registerForm.value;
      this.authService.register(customerData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Registration failed';
        },
      });
    }
  }
}
