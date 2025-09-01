import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Driver } from '../../models/driver.model';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-drivers',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './manager-drivers.component.html',
  styleUrl: './manager-drivers.component.css'
})
export class ManagerDriversComponent {
  drivers: Driver[] = [];
  errorMessage: string | null = null;

  constructor(private managerService: ManagerService) { }

  ngOnInit(){
    this.loadDrivers();
  }

  loadDrivers(){
    this.managerService
    .getDrivers()
    .subscribe((drivers) => (this.drivers = drivers));
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