import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { DriverDashboardComponent } from './driver/driver-dashboard/driver-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddDriverComponent } from './admin/add-driver/add-driver.component';
import { AddVehicleComponent } from './admin/add-vehicle/add-vehicle.component';
import { AddWarehouseComponent } from './admin/add-warehouse/add-warehouse.component';
import { AddManagerComponent } from './admin/add-manager/add-manager.component';

export const routes: Routes = [
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
  },
  {
    path: 'manager/dashboard',
    component: ManagerDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_MANAGER'] },
  },
  {
    path: 'driver/dashboard',
    component: DriverDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_DRIVER'] },
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'admin/driver/add',
    component: AddDriverComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'admin/manager/add',
    component: AddManagerComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'admin/warehouse/add',
    component: AddWarehouseComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'admin/add/vehicle/add',
    component: AddVehicleComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
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
