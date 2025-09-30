export interface Customer {
    id: number
    // from UserDto:
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

    // from CustomerDto:
    edb: string;
    compName: string;
    address: string;
    repImage?: string;
}