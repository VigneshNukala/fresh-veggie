import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "user1",
    items: [
      {
        product: {
          id: "1",
          name: "Organic Apples",
          price: 6.20,
          category: "fruits",
          description: "Fresh organic apples from local farms.",
          image: "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          unit: "kg",
          inStock: true,
          minOrderQuantity: 5
        },
        quantity: 10
      },
      {
        product: {
          id: "4",
          name: "Tomato",
          price: 1.25,
          category: "vegetables",
          description: "Plump, juicy tomatoes perfect for salads.",
          image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          unit: "kg",
          inStock: true,
          minOrderQuantity: 5
        },
        quantity: 15
      }
    ],
    status: "processing",
    totalAmount: 80.75,
    createdAt: "2023-11-01T10:30:00Z",
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "555-123-4567"
    },
    trackingNumber: "TRK123456"
  },
  {
    id: "ORD-002",
    userId: "user1",
    items: [
      {
        product: {
          id: "3",
          name: "Fresh Papaya",
          price: 6.20,
          category: "fruits",
          description: "Sweet, ripe papayas rich in antioxidants.",
          image: "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          unit: "kg",
          inStock: true,
          minOrderQuantity: 2
        },
        quantity: 5
      }
    ],
    status: "delivered",
    totalAmount: 31.00,
    createdAt: "2023-10-25T15:45:00Z",
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      phone: "555-123-4567"
    },
    trackingNumber: "TRK789012"
  }
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};