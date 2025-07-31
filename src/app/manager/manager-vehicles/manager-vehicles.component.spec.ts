import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerVehiclesComponent } from './manager-vehicles.component';

describe('ManagerVehiclesComponent', () => {
  let component: ManagerVehiclesComponent;
  let fixture: ComponentFixture<ManagerVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
