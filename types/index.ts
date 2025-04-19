export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  description: string;
  image: string;
  unit: string;
  inStock: boolean;
  featured?: boolean;
  minOrderQuantity?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  addresses: Address[];
}