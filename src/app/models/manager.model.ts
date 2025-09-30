export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  cityId?: number;
  cityName?: string;
  regionName?: string;
  role: string;
  clazz_: string;
  userActive: boolean;
  warehouseId: number;
  warehouseRegion: string;
  warehouseCity: string;
}
