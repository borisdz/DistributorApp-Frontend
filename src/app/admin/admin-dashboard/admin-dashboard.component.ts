import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReportsSummaryComponent } from '../reports-summary/reports-summary.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarComponent, CommonModule, ReportsSummaryComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
