import { Category } from './category.model';
import { Manufacturer } from './manufacturer.model';
import { Price } from './price.model';

export interface Article {
  art_id?: number;
  id?: number;
  art_name: string;
  name?: string;
  art_image: string;
  image?: string;
  art_weight: number;
  weight?: number;
  ctg_id: number;
  categoryId?: number;
  man_id: number;
  manufacturerId?: number;
  
  category?: Category | string;
  manufacturer?: Manufacturer | string;
  currentPrice?: Price | number;
  quantity?: number;
  price?: number;
  minQuantity?: number;
}

export function adaptArticle(backendArticle: any): Article {
  return {
    art_id: backendArticle.id || backendArticle.art_id,
    id: backendArticle.id || backendArticle.art_id,
    art_name: backendArticle.name || backendArticle.art_name,
    name: backendArticle.name || backendArticle.art_name,
    art_image: backendArticle.image || backendArticle.art_image,
    image: backendArticle.image || backendArticle.art_image,
    art_weight: backendArticle.weight || backendArticle.art_weight,
    weight: backendArticle.weight || backendArticle.art_weight,
    ctg_id: backendArticle.categoryId || backendArticle.ctg_id,
    categoryId: backendArticle.categoryId || backendArticle.ctg_id,
    man_id: backendArticle.manufacturerId || backendArticle.man_id,
    manufacturerId: backendArticle.manufacturerId || backendArticle.man_id,
    
    category: backendArticle.category,
    manufacturer: backendArticle.manufacturer,
    currentPrice: backendArticle.price || backendArticle.currentPrice,
    price: backendArticle.price || 
           (typeof backendArticle.currentPrice === 'object' ? 
             backendArticle.currentPrice.price : 
             backendArticle.currentPrice),
    quantity: backendArticle.quantity
  };
}
