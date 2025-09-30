export interface CreateProFormaDto{
    ordId: number;
}

export interface ProFormaResponseDto {
    id: number;
    pfDeadline: string;
    pfDateCreated: string;
    pfTotal: number;
    discountId: number;
    discountAmount: number;
    statusId: number;
    statusName: string;
    ordId: number;
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    daysOverdue?: number;
}

export interface ProForma {
    id: number;
    orderId: number;
    amount: number;
    dueDate: Date;
    status: 'pending' | 'paid' | 'overdue';
    isPaid: boolean;
    isCreated: boolean;
    daysOverdue?: number;
    notes?: string;
}