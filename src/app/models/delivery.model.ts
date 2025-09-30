import { Order } from "./order.model";

export interface Delivery {
  del_id?: number;
  del_date_created: Date;
  del_date: Date;
  del_start_time?: string;
  del_end_time?: string;
  del_start_km?: number;
  del_end_km?: number;
  d_status_id: number;
  veh_id: number;
  orders?: Order[];

  driverId?: number;
  driverName?: string;
  driverImage?: string;
  deliveryStatus?: string;
  orderCount?: number;
}