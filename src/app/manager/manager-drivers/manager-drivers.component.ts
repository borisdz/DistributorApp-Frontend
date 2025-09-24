import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Driver } from '../../models/driver.model';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-drivers',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './manager-drivers.component.html',
  styleUrl: './manager-drivers.component.css',
})
export class ManagerDriversComponent {
  drivers: Driver[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private managerService: ManagerService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkAuthentication();
    this.loadDrivers();
  }

  checkAuthentication() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No authentication token found');
      this.errorMessage = 'Authentication required. Please log in.';
      this.router.navigate(['/login']);
      return;
    }

    const decoded = this.authService.parseJwt(token);
    if (!decoded) {
      console.error('Invalid token format');
      this.errorMessage = 'Invalid authentication token. Please log in again.';
      this.authService.clearToken();
      this.router.navigate(['/login']);
      return;
    }

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      console.error('Token expired');
      this.errorMessage = 'Your session has expired. Please log in again.';
      this.authService.clearToken();
      this.router.navigate(['/login']);
      return;
    }

    console.log('Token is valid:', decoded);
  }

  loadDrivers() {
    this.isLoading = true;
    this.errorMessage = null;

    this.managerService.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.isLoading = false;
        console.log('Drivers loaded successfully:', drivers);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading drivers:', error);

        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please log in again.';
          this.authService.clearToken();
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.errorMessage = 'You do not have permission to view drivers.';
        } else if (error.status === 0) {
          this.errorMessage =
            'Cannot connect to server. Please check your connection.';
        } else {
          this.errorMessage = `Error loading drivers: ${error.message || error.statusText}`;
        }
      },
    });
  }

  getLicenseStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'valid':
        return 'status-valid';
      case 'expiring':
        return 'status-expiring';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  }
}
