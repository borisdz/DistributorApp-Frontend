import { ArticleUnit } from './article-unit.model';
import { Customer } from './customer.model';
import { OrderItem } from './order-item.model';
import { OrderStatus } from './order-status.model';

export interface Order {
  ord_id: number;
  ord_date: string;
  ord_sum: number;
  ord_fulfillment_date?: string;
  ord_comment?: string;
  user_id: number;
  o_status_id: number;
  wh_id: number;
  city_id: number;
  
  customerName?: string;
  customerAddress?: string;
  cityName?: string;
  orderItems?: OrderItem[];
  totalWeight?: number;
}
