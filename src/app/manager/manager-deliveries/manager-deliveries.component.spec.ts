import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDeliveriesComponent } from './manager-deliveries.component';

describe('ManagerDeliveriesComponent', () => {
  let component: ManagerDeliveriesComponent;
  let fixture: ComponentFixture<ManagerDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDeliveriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
