export interface CreateProFormaDto{
    pfDeadline: string;
    ordId: number;
    customerId: number;
}

export interface ProFormaResponseDto {
    id: number;
    pfDeadline: string;
    pfDateCreated: string;
    statusId: number;
    statusName: string;
    ordId: number;
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    daysOverdue?: number;
}