import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerWarehouseComponent } from './manager-warehouse.component';

describe('ManagerWarehouseComponent', () => {
  let component: ManagerWarehouseComponent;
  let fixture: ComponentFixture<ManagerWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
