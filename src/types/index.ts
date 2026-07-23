export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge: string;
  prepTime: string;
};

export type OrderRecord = {
  id: string;
  customerName: string;
  pickupTime: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  total: number;
  createdAt: string;
  status: string;
  paymentStatus?: string;
};
