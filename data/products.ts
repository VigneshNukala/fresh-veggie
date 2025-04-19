import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Fruits",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "fruits"
  },
  {
    id: "2",
    name: "Vegetables",
    image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "vegetables"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    price: 6.20,
    category: "fruits",
    description: "Fresh organic apples from local farms. Perfect for eating raw or making delicious pies and desserts.",
    image: "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    featured: true,
    minOrderQuantity: 5
  },
  {
    id: "2",
    name: "Fresh Kiwi Fruit",
    price: 6.20,
    salePrice: 3.45,
    category: "fruits",
    description: "Tangy and sweet kiwis packed with vitamin C and dietary fiber.",
    image: "https://images.pexels.com/photos/51312/kiwi-fruit-vitamins-healthy-eating-51312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    minOrderQuantity: 3
  },
  {
    id: "3",
    name: "Fresh Papaya",
    price: 6.20,
    category: "fruits",
    description: "Sweet, ripe papayas rich in antioxidants and perfect for smoothies.",
    image: "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    featured: true,
    minOrderQuantity: 2
  },
  {
    id: "4",
    name: "Tomato",
    price: 1.25,
    category: "vegetables",
    description: "Plump, juicy tomatoes perfect for salads, sauces, and sandwiches.",
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    minOrderQuantity: 5
  },
  {
    id: "5",
    name: "Mustard Greens",
    price: 3.45,
    category: "vegetables",
    description: "Fresh, leafy mustard greens. Perfect for salads, stir-fries, and more.",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "bunch",
    inStock: true,
    featured: true,
    minOrderQuantity: 3
  },
  {
    id: "6",
    name: "Broccoli",
    price: 3.45,
    category: "vegetables",
    description: "Fresh broccoli florets, rich in vitamins and minerals.",
    image: "https://images.pexels.com/photos/161514/broccolli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    featured: true,
    minOrderQuantity: 2
  },
  {
    id: "7",
    name: "Peanut Butter",
    price: 1.25,
    category: "bakery",
    description: "Creamy, all-natural peanut butter with no added sugars or preservatives.",
    image: "https://images.pexels.com/photos/2089717/pexels-photo-2089717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "jar",
    inStock: true,
    featured: true,
    minOrderQuantity: 3
  },
  {
    id: "8",
    name: "Strawberry Bread",
    price: 6.20,
    category: "bakery",
    description: "Fresh-baked strawberry bread made with real strawberries.",
    image: "https://images.pexels.com/photos/2693447/pexels-photo-2693447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "loaf",
    inStock: true,
    minOrderQuantity: 1
  },
  {
    id: "9",
    name: "Pumpkin",
    price: 3.45,
    category: "vegetables",
    description: "Fresh, organic pumpkins perfect for soups, pies, and decoration.",
    image: "https://images.pexels.com/photos/620045/pexels-photo-620045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "each",
    inStock: true,
    minOrderQuantity: 1
  },
  {
    id: "10",
    name: "Red Onion",
    price: 3.45,
    category: "vegetables",
    description: "Fresh red onions with a mild, sweet flavor perfect for salads and garnishes.",
    image: "https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    unit: "kg",
    inStock: true,
    minOrderQuantity: 2
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};