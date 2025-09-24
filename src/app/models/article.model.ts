import { Category } from "./category.model";
import { Manufacturer } from "./manufacturer.model";
import { Price } from "./price.model";

export interface Article {
  art_id?: number;
  art_name: string;
  art_image: string;
  art_weight: number;
  ctg_id: number;
  man_id: number;
  
  category?: Category;
  manufacturer?: Manufacturer;
  currentPrice?: Price;
}
