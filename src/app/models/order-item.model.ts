import { Article } from "./article.model";

export interface OrderItem {
  article: Article;
  quantity: number;
}
