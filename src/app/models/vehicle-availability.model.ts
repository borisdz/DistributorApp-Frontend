import { Vehicle } from './vehicle.model';

export interface VehicleAvailability extends Vehicle {
  isAvailable: boolean;
  conflictingDeliveryId?: number;
}