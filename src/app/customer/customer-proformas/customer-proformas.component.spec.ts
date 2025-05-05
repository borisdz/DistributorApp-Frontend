import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProformasComponent } from './customer-proformas.component';

describe('CustomerProformasComponent', () => {
  let component: CustomerProformasComponent;
  let fixture: ComponentFixture<CustomerProformasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProformasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
