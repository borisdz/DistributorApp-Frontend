import { Component, OnInit } from '@angular/core';
import { Order } from '../../models';
import { ManagerService } from '../../services/manager.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-create-delivery',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-delivery.component.html',
  styleUrl: './create-delivery.component.css',
})
export class CreateDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  cities: City[] = [];
  vehicles: Vehicle[] = [];
  availableOrders: Order[] = [];
  selectedOrders: Order[] = [];
  warehouseStock: any[] = [];

  selectedCities: number[] = [];
  selectedVehicle: Vehicle | null = null;
  currentWeight: number = 0;
  maxWeight: number = 0;

  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private router: Router,
  ) {
    this.deliveryForm = this.fb.group({
      selectedCities: [[], Validators.required],
      selectedVehicle: [null, Validators.required],
      deliveryDate: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      selectedOrders: [[]],
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.isLoading = true;

    // Load cities and vehicles
    this.managerService.getAvailableCities().subscribe({
      next: (cities) => (this.cities = cities),
      error: (error) => this.handleError('Failed to load cities', error),
    });

    this.managerService.getAvailableVehicles().subscribe({
      next: (vehicles) => (this.vehicles = vehicles),
      error: (error) => this.handleError('Failed to load vehicles', error),
    });

    // Load warehouse stock
    this.managerService.getWarehouseStock(1).subscribe({
      // Replace with actual warehouse ID
      next: (stock) => (this.warehouseStock = stock),
      error: (error) =>
        this.handleError('Failed to load warehouse stock', error),
    });

    this.isLoading = false;
  }

  onCitySelectionChange(event: any) {
    const cityId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedCities.push(cityId);
    } else {
      this.selectedCities = this.selectedCities.filter((id) => id !== cityId);
    }

    this.deliveryForm.patchValue({ selectedCities: this.selectedCities });

    if (this.selectedCities.length > 0) {
      this.loadOrdersForSelectedCities();
    } else {
      this.availableOrders = [];
    }
  }

  onVehicleChange(event: any) {
    const vehicleId = parseInt(event.target.value);
    this.selectedVehicle =
      this.vehicles.find((v) => v.veh_id === vehicleId) || null;

    if (this.selectedVehicle) {
      this.maxWeight = this.selectedVehicle.veh_carry_weight;
      this.deliveryForm.patchValue({ selectedVehicle: vehicleId });
    }
  }

  loadOrdersForSelectedCities() {
    if (this.selectedCities.length === 0) return;

    this.isLoading = true;
    this.managerService
      .getUnassignedOrdersByCities(this.selectedCities)
      .subscribe({
        next: (orders) => {
          // Sort by oldest first
          this.availableOrders = orders.sort(
            (a, b) =>
              new Date(a.ord_date).getTime() - new Date(b.ord_date).getTime(),
          );
        },
        error: (error) => this.handleError('Failed to load orders', error),
        complete: () => (this.isLoading = false),
      });
  }

  onOrderSelectionChange(order: Order, event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Check if adding this order would exceed vehicle capacity
      const newWeight = this.currentWeight + (order.totalWeight || 0);
      if (newWeight > this.maxWeight) {
        event.target.checked = false;
        alert(
          `Adding this order would exceed vehicle capacity (${this.maxWeight}kg)`,
        );
        return;
      }

      // Check stock availability
      if (!this.checkStockAvailability(order)) {
        event.target.checked = false;
        alert('Insufficient stock for this order');
        return;
      }

      this.selectedOrders.push(order);
      this.currentWeight = newWeight;
    } else {
      this.selectedOrders = this.selectedOrders.filter(
        (o) => o.ord_id !== order.ord_id,
      );
      this.currentWeight -= order.totalWeight || 0;
    }

    this.deliveryForm.patchValue({
      selectedOrders: this.selectedOrders.map((o) => o.ord_id),
    });
  }

  checkStockAvailability(order: Order): boolean {
    if (!order.orderItems) return true;

    return order.orderItems.every((item) => {
      const stockItem = this.warehouseStock.find(
        (s) => s.art_id === item.art_id,
      );
      return stockItem && stockItem.available_quantity >= item.quantity;
    });
  }

  getSelectedCityNames(): string {
    return this.cities
      .filter((city) => this.selectedCities.includes(city.city_id))
      .map((city) => city.city_name)
      .join(', ');
  }

  getWeightPercentage(): number {
    return this.maxWeight > 0 ? (this.currentWeight / this.maxWeight) * 100 : 0;
  }

  getWeightBarClass(): string {
    const percentage = this.getWeightPercentage();
    if (percentage < 50) return 'bg-success';
    if (percentage < 80) return 'bg-warning';
    return 'bg-danger';
  }

  onCreateDelivery() {
    if (this.deliveryForm.invalid || this.selectedOrders.length === 0) {
      this.errorMessage =
        'Please fill all required fields and select at least one order';
      return;
    }

    const deliveryData = {
      del_date: this.deliveryForm.value.deliveryDate,
      del_date_created: new Date(),
      veh_id: this.selectedVehicle?.veh_id,
      d_status_id: 1, // Pending status
      orderIds: this.selectedOrders.map((o) => o.ord_id),
    };

    this.isLoading = true;
    this.managerService.createDelivery(deliveryData).subscribe({
      next: (delivery) => {
        console.log('Delivery created successfully:', delivery);
        this.router.navigate(['/manager/deliveries']);
      },
      error: (error) => this.handleError('Failed to create delivery', error),
      complete: () => (this.isLoading = false),
    });
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    this.errorMessage = message;
    this.isLoading = false;
  }

  public navigateToDeliveries(): void {
    this.router.navigate(['/manager/deliveries']);
  }
}
