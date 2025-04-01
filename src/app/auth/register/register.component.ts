import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
    this.registerForm = this.fb.nonNullable.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        repeatedPassword: ['', Validators.required],
        profileImage: [''],
        city: [null, Validators.required],
        edb: ['', Validators.required],
        compName: ['', Validators.required],
        address: ['', Validators.required],
        repImage: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const repeatedPassword = group.get('repeatedPassword')?.value;
    if (
      password &&
      repeatedPassword &&
      password.value !== repeatedPassword.value
    ) {
      return { notMatching: true };
    }
    return null;
  };

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
