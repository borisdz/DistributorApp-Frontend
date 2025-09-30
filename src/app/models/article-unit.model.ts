import { Article } from "./article.model";
import { Order } from "./order.model";
import { Price } from "./price.model";
import { Warehouse } from "./warehouse.model";

export interface ArticleUnit {
  unit_id?: number;
  id?: number;
  unit_expiration_date: string;
  expiryDate?: string;
  unit_serial_number: string;  
  serialNo?: string;
  unit_batch_number: string;
  batchNo?: string;
  unit_manufacture_date: string;
  manufactureDate?: string;
  unit_cost_price?: number;
  costPrice?: number;
  wh_id: number;
  whId?: number;
  art_id: number;
  artId?: number;
  ord_id?: number;
  ordId?: number;
  
  // Joined properties from DTOs
  artName?: string;
  whRegion?: string;
  whCity?: string;
  customerEmail?: string;
}