import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFinancesComponent } from './manager-finances.component';

describe('ManagerFinancesComponent', () => {
  let component: ManagerFinancesComponent;
  let fixture: ComponentFixture<ManagerFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerFinancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
