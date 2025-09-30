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
  cities: string[] = [];

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
        password: ['', Validators.required, Validators.minLength(8)],
        repeatedPassword: ['', Validators.required],
        profileImage: [null as File | null],
        city: [null, Validators.required],
        edb: ['', Validators.required, Validators.pattern(/^[0-9]{13}$/)],
        compName: ['', Validators.required],
        address: ['', Validators.required],
        repImage: [null as File | null],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const pw = group.get('password')?.value;
    const rpt = group.get('repeatedPassword')?.value;
    return pw && rpt && pw !== rpt
      ? { notMatching: true }
      : null;
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
    const formValue = this.registerForm.value;
    const password = formValue.password;
    const repeatedPassword = formValue.repeatedPassword;
    
    if (
      this.registerForm.invalid ||
      !password ||
      !repeatedPassword ||
      password !== repeatedPassword
    ) {
      return;
    }

    const formData = new FormData();
  Object.entries(formValue).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

    this.authService.register(formData).subscribe({
      next: () => alert('Registration successful!'),
      error: (err) => alert('Registration failed: ' + err.message),
    });
  }
}
