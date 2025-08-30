export interface Article {
  id: number;
  name: string;
  manufacturer: string;
  quantity: number;
  manufacturerId: number;
  price: number;
  category: string;
  categoryId: number;
  weight: number;
  image?: string;
  unitPrice: number;
}
