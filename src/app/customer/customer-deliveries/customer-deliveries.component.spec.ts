import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeliveriesComponent } from './customer-deliveries.component';

describe('CustomerDeliveriesComponent', () => {
  let component: CustomerDeliveriesComponent;
  let fixture: ComponentFixture<CustomerDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDeliveriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
