export interface OrderDetail {
  id: number;
  name: string;
  cost: number;
  description?: string;
}

export interface OrderItem {
  id: number;
  date: Date;
  detail: OrderDetail[];
}
