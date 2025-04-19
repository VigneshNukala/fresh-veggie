export interface Product {
    id?: number;
    name: string;
    price: number;
  }
  
  export interface OrderItem {
    product_id: number;
    quantity: number;
  }
  
  export interface Order {
    id?: number;
    buyer_name: string;
    buyer_contact: string;
    delivery_address: string;
    items: OrderItem[];
    status?: string;
  }
  