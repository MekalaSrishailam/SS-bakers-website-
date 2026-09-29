export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Nut-Free' | 'Dairy-Free' | 'Organic' | 'Eggless';

export type ProductCategory = 'artisan-bread' | 'viennoiserie' | 'patisserie' | 'savoury' | 'beverages';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  description: string;
  imageUrl: string;
  dietary: DietaryTag[];
  stock: number;
  lowStockThreshold: number;
  prepTimeMinutes: number;
  badge?: string;
  inStock: boolean;
  calories?: number;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'received' | 'baking' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  orderType: 'pickup' | 'delivery';
  pickupTimeSlot: string;
  deliveryAddress?: string;
  paymentMethod: 'card' | 'apple_pay' | 'upi' | 'cash';
  paymentStatus: 'paid' | 'pay_on_pickup';
  status: OrderStatus;
  createdAt: string;
  estimatedReadyTime: string;
  notes?: string;
}

export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  defaultAddress?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'flour' | 'dairy' | 'sweeteners' | 'specialty' | 'packaging';
  currentStock: number;
  unit: 'kg' | 'liters' | 'units' | 'bags';
  minThreshold: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
}

export type Language = 'en' | 'fr' | 'es' | 'de' | 'te';

export type ColorPalette = 'honey' | 'berry' | 'truffle' | 'holiday' | 'saffron';
