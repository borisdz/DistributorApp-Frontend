export interface Order {
  id: number;
  ordDate: string;
  ordSum: number;
  ordFulfillmentDate: string;
  ordComment: string;
  oStatusId: number;
  customerId: number;
  deliveryId: number;
  pfId: number;
  isAvailable?: boolean;
  missingArticles?: any[];
}
