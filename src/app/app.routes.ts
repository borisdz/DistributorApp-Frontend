import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_CUSTOMER' },
  },
  {
    path: 'customer/dashboard',
    component: ManagerDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_MANAGER' },
  },
  {
    path: 'customer/dashboard',
    component: DriverDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_DRIVER' },
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
