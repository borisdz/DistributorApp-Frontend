import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      {
        const credentials = this.loginForm.value;
        this.authService.login(credentials.email,credentials.password).subscribe({
          next: (response) => {
            localStorage.setItem('jwtToken', response.token);
            console.log('The received token is: ' + response.token);
            this.onLoginSuccess();
          },
          error: (err) => {
            this.errorMessage = err.error.errorMessage || 'Login failed';
          },
        });
      }
    }
  }

  onLoginSuccess() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }

    const decodedToken = this.authService.parseJwt(token);
    const roles: string[] = decodedToken?.roles || [];

    if(roles.length===0){
      this.router.navigate(['/']);
      return;
    }

    console.log("The user's role is: " + roles);

    const primaryRole = roles[0].toUpperCase();

    switch (primaryRole) {
      case 'ROLE_CUSTOMER':
        this.router.navigate(['/customer/dashboard']);
        break;
      case 'ROLE_MANAGER':
        this.router.navigate(['/manager/dashboard']);
        break;
      case 'ROLE_DRIVER':
        this.router.navigate(['/driver/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
