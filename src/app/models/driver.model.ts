export interface Driver {
    id: number;
    name: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    available: boolean;
    rating?: number; // Optional field for driver rating
}