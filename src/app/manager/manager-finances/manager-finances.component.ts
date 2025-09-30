import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FinancialSummary } from '../../models/financial-summary.model';
import { ManagerService } from '../../services/manager.service';
import { ProFormaResponseDto } from '../../models/pro-forma-dtos.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-finances',
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-finances.component.html',
  styleUrl: './manager-finances.component.css'
})
export class ManagerFinancesComponent {
  allProFormas: ProFormaResponseDto[] = [];
  unpaidProFormas: ProFormaResponseDto[] = [];
  pendingProFormas: ProFormaResponseDto[] = [];
  overdueProFormas: ProFormaResponseDto[] = [];

  monthlySummary: FinancialSummary | null = null;
  quarterlySummary: FinancialSummary | null = null;

  proFormaForm!: FormGroup;
  selectedPeriod: 'monthly' | 'quarterly' = 'monthly';

  orderIdForProForma: number | null = null;
  isCreatingProForma: boolean = false;
  proFormaCreationStatus: { success: boolean; message?: string } | null = null;

  constructor(
    private managerService: ManagerService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.managerService.getAllProFormas().subscribe({
      next: (data: ProFormaResponseDto[]) => {
        this.allProFormas = data;
        this.categorizeProFormas();
      },
      error: (err: string) => console.error('Error loading pro-formas:', err)
    });

    this.loadFinancialSummaries();
  }

  private categorizeProFormas() {
    const now = new Date();

    this.unpaidProFormas = this.allProFormas.filter(pf => pf.statusName == 'UNPAID');
    this.pendingProFormas = this.allProFormas.filter(pf => pf.statusName == 'PENDING');
    this.overdueProFormas = this.allProFormas.filter(pf =>
      pf.statusName == 'UNPAID' && new Date(pf.pfDeadline) < now
    );
  }

  loadFinancialSummaries() {
    if (this.selectedPeriod === 'monthly') {
      this.managerService.getMonthlyFinancialSummary().subscribe({
        next: (data) => this.monthlySummary = data,
        error: (err) => console.error('Error loading monthly summary:', err)
      });
    } else {
      this.managerService.getQuarterlyFinancialSummary().subscribe({
        next: (data) => this.quarterlySummary = data,
        error: (err) => console.error('Error loading quarterly summary:', err)
      });
    }
  }

  togglePeriod() {
    this.selectedPeriod = this.selectedPeriod === 'monthly' ? 'quarterly' : 'monthly';
    this.loadFinancialSummaries();
  }

  createProForma() {
    if (!this.orderIdForProForma) return;

    this.isCreatingProForma = true;
    this.proFormaCreationStatus = null;

    this.managerService.createProForma(this.orderIdForProForma).subscribe({
      next: (response) => {
        this.isCreatingProForma = false;
        this.proFormaCreationStatus = { success: true };
        this.orderIdForProForma = null;

        this.loadFinancialSummaries();

        setTimeout(() => {
          this.proFormaCreationStatus = null;
        }, 3000);
      },
      error: (error) => {
        this.isCreatingProForma = false;
        this.proFormaCreationStatus = {
          success: false,
          message: error.error?.message || 'Failed to create pro-forma'
        };
      }
    });

  }
}