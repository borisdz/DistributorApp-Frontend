import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProForma } from '../../models/pro-forma.model';
import { FinancialSummary } from '../../models/financial-summary.model';
import { ManagerService } from '../../services/manager.service';
import { ProFormaResponseDto } from '../../models/pro-forma-dtos.model';

@Component({
  selector: 'app-manager-finances',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
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

  constructor(
    private managerService: ManagerService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  private initForm() {
    this.proFormaForm = this.fb.group({
      orderId: ['', Validators.required],
      dueDate: ['', Validators.required],
      notes: ['']
    });
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

  createProForma() {
    if (this.proFormaForm.valid) {
      this.managerService.createProForma(this.proFormaForm.value).subscribe({
        next: () => {
          this.loadData();
          this.proFormaForm.reset();
        },
        error: (err) => console.error('Error creating pro-forma:', err)
      });
    }
  }

  togglePeriod() {
    this.selectedPeriod = this.selectedPeriod === 'monthly' ? 'quarterly' : 'monthly';
    this.loadFinancialSummaries();
  }
}