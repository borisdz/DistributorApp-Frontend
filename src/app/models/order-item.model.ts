import { Article } from './article.model';

export interface OrderItem {
  item_id?: number;
  ord_id: number;
  art_id: number;
  quantity: number;
  unit_price: number;
  total_price?: number;

  article?: Article;
}
