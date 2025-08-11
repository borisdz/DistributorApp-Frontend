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