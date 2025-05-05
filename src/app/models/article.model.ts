export interface Article {
  id: number;
  name: string;
  categoryId: number;
  manufacturerId: number;
  manufacturer: string;
  price: number;
  quantity: number;
  image?: string;
}
