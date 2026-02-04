
export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Out of Stock' | 'Draft';
  sales: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
}

export interface AnalyticsData {
  month: string;
  revenue: number;
  orders: number;
}
