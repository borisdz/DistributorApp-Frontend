import { Driver } from "./driver.model";
import { Warehouse } from "./warehouse.model";

export interface Vehicle {
  veh_id: number;
  veh_carry_weight: number;
  veh_kilometers: number;
  veh_service_interval: number;
  veh_last_service?: string;
  veh_last_service_km?: number;
  veh_vin: string;
  veh_plate: string;
  veh_reg_date: string;
  
  driver?: Driver;
}