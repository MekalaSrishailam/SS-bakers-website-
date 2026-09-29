import { Product, Order, InventoryItem, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'San Francisco Country Sourdough',
    category: 'artisan-bread',
    price: 240.00,
    description: '36-hour slow fermented wild yeast boule with an blistered ear, deep mahogany caramelized crust, and open, custardy crumb.',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Organic', 'Dairy-Free'],
    stock: 14,
    lowStockThreshold: 5,
    prepTimeMinutes: 25,
    badge: 'Signature Hearth Loaf',
    inStock: true,
    calories: 180,
    ingredients: ['Stoneground organic wheat', 'Rye starter levain', 'Filtered water', 'Maldon sea salt']
  },
  {
    id: 'prod-2',
    title: 'Traditional French Butter Croissant',
    category: 'viennoiserie',
    price: 140.00,
    description: '27 laminated micro-layers folded with 84% cultured AOP Charentes-Poitou butter. Shatteringly crisp shell and tender honeycomb interior.',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    stock: 22,
    lowStockThreshold: 6,
    prepTimeMinutes: 10,
    badge: 'Parisian Masterpiece',
    inStock: true,
    calories: 260,
    ingredients: ['T55 French wheat flour', 'AOP cultured butter', 'Fresh whole milk', 'Cane sugar', 'Yeast']
  },
  {
    id: 'prod-3',
    title: 'Dark Chocolate Velvet Gateau',
    category: 'patisserie',
    price: 320.00,
    description: 'Layers of moist Venezuelan dark chocolate biscuit, 70% Valrhona dark ganache mousse, mirror glaze, and delicate 24k edible gold leaf.',
    // Here is our generated image
    imageUrl: '/src/assets/images/chocolate_ganache_cake_1790540477942.jpg',
    dietary: ['Vegetarian', 'Nut-Free'],
    stock: 8,
    lowStockThreshold: 4,
    prepTimeMinutes: 15,
    badge: 'Chef Highlight',
    inStock: true,
    calories: 380,
    ingredients: ['70% Valrhona Guanaja cocoa', 'French cream', 'Madagascar bourbon vanilla', 'Organic eggs']
  },
  {
    id: 'prod-4',
    title: 'Wild Raspberry & Sicilian Pistachio Tart',
    category: 'patisserie',
    price: 260.00,
    description: 'Crisp sablee tart shell filled with roasted Bronte pistachio frangipane, lemon verbena pastry cream, and fresh organic raspberries.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    stock: 4, // low stock demonstration!
    lowStockThreshold: 5,
    prepTimeMinutes: 12,
    badge: 'Seasonal Harvest',
    inStock: true,
    calories: 310,
    ingredients: ['Almond sablee dough', 'Bronte pistachios', 'Fresh raspberries', 'Madagascar vanilla']
  },
  {
    id: 'prod-5',
    title: 'Cardamom Orange Morning Bun',
    category: 'viennoiserie',
    price: 160.00,
    description: 'Spiced croissant dough rolled with freshly ground green cardamom, Seville orange zest, and turbinado sugar, baked in cast iron cups.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian', 'Nut-Free'],
    stock: 12,
    lowStockThreshold: 4,
    prepTimeMinutes: 8,
    badge: 'Staff Favorite',
    inStock: true,
    calories: 290,
    ingredients: ['Laminated dough', 'Green cardamom pods', 'Seville orange peel', 'Raw turbinado sugar']
  },
  {
    id: 'prod-6',
    title: 'Rosemary & Flaky Sea Salt Focaccia',
    category: 'savoury',
    price: 180.00,
    description: 'Cold-fermented high hydration dough generously dimpled with Ligurian extra virgin olive oil, fresh garden rosemary, and coarse flaky Maldon salt.',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Dairy-Free', 'Eggless', 'Nut-Free'],
    stock: 9,
    lowStockThreshold: 4,
    prepTimeMinutes: 18,
    badge: 'Wood-Fired Slab',
    inStock: true,
    calories: 220,
    ingredients: ['Italian 00 flour', 'Cold pressed olive oil', 'Fresh organic rosemary', 'Maldon flake salt']
  },
  {
    id: 'prod-7',
    title: 'Roasted Almond Frangipane Croissant',
    category: 'viennoiserie',
    price: 180.00,
    description: 'Twice-baked butter croissant saturated with orange blossom syrup, filled with rich roasted almond cream, and crowned with toasted slivers.',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
    stock: 3, // low stock trigger!
    lowStockThreshold: 5,
    prepTimeMinutes: 10,
    badge: 'Limited Run',
    inStock: true,
    calories: 340,
    ingredients: ['Twice baked croissant', 'California almond flour', 'Orange blossom water', 'Icing sugar']
  },
  {
    id: 'prod-8',
    title: 'Single-Origin Ethiopian Cold Brew',
    category: 'beverages',
    price: 140.00,
    description: '20-hour immersion brew featuring Guji heirloom beans. Bright floral jasmine notes with a silky nectarine finish served over artisanal crystal ice.',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Eggless', 'Nut-Free'],
    stock: 30,
    lowStockThreshold: 8,
    prepTimeMinutes: 3,
    badge: 'Specialty Roast',
    inStock: true,
    calories: 5,
    ingredients: ['100% Arabica Guji beans', 'Triple filtered mountain water']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SS-1048',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@example.com',
    customerPhone: '+91 98490 12345',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        specialInstructions: 'Please slice one loaf medium thickness'
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 4
      }
    ],
    subtotal: 1040.00,
    tax: 52.00,
    deliveryFee: 0,
    total: 1092.00,
    orderType: 'pickup',
    pickupTimeSlot: 'Today at 3:30 PM',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    status: 'baking',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    estimatedReadyTime: '3:30 PM',
    notes: 'Celebrating family brunch tomorrow morning'
  },
  {
    id: 'SS-1049',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@example.com',
    customerPhone: '+91 89782 75273',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        specialInstructions: 'Please add happy birthday topper if possible'
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 2
      }
    ],
    subtotal: 840.00,
    tax: 42.00,
    deliveryFee: 50.00,
    total: 932.00,
    orderType: 'delivery',
    pickupTimeSlot: 'ASAP (~45 mins)',
    deliveryAddress: '742 Evergreen Terrace, Suite 4B, Warangal',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'received',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    estimatedReadyTime: '4:15 PM'
  },
  {
    id: 'SS-1047',
    customerName: 'Aria Thorne',
    customerEmail: 'aria.thorne@example.com',
    customerPhone: '+91 91234 56789',
    items: [
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[7],
        quantity: 2
      }
    ],
    subtotal: 460.00,
    tax: 23.00,
    deliveryFee: 0,
    total: 483.00,
    orderType: 'pickup',
    pickupTimeSlot: 'Today at 2:00 PM',
    paymentMethod: 'cash',
    paymentStatus: 'pay_on_pickup',
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    estimatedReadyTime: 'Ready now at pickup counter'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Type 55 French White Wheat Flour',
    category: 'flour',
    currentStock: 42,
    unit: 'kg',
    minThreshold: 50, // Low alert
    costPerUnit: 65.00,
    supplier: 'Moulins Viron (Paris)',
    lastRestocked: '2026-09-20'
  },
  {
    id: 'inv-2',
    name: 'AOP Charentes-Poitou Sheet Butter 84%',
    category: 'dairy',
    currentStock: 28,
    unit: 'kg',
    minThreshold: 20,
    costPerUnit: 420.00,
    supplier: 'Lescure Dairy Co.',
    lastRestocked: '2026-09-22'
  },
  {
    id: 'inv-3',
    name: 'Valrhona Guanaja 70% Dark Feves',
    category: 'specialty',
    currentStock: 12,
    unit: 'kg',
    minThreshold: 15, // Low alert
    costPerUnit: 1250.00,
    supplier: 'Valrhona Grand Chocolat',
    lastRestocked: '2026-09-18'
  },
  {
    id: 'inv-4',
    name: 'Stoneground Rye Starter Flour',
    category: 'flour',
    currentStock: 65,
    unit: 'kg',
    minThreshold: 30,
    costPerUnit: 85.00,
    supplier: 'Bobs Red Mill Artisan',
    lastRestocked: '2026-09-24'
  },
  {
    id: 'inv-5',
    name: 'Bronte Green Pistachio Paste',
    category: 'specialty',
    currentStock: 3.5,
    unit: 'kg',
    minThreshold: 5, // Low alert
    costPerUnit: 1800.00,
    supplier: 'DOP Sicilia Exports',
    lastRestocked: '2026-09-15'
  },
  {
    id: 'inv-6',
    name: 'Recycled Kraft Artisan Bread Bags',
    category: 'packaging',
    currentStock: 320,
    unit: 'units',
    minThreshold: 200,
    costPerUnit: 12.00,
    supplier: 'EcoPack Solutions',
    lastRestocked: '2026-09-25'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Sarah Sterling (Owner)',
    email: 'sarah@ssbakers.com',
    role: 'admin',
    phone: '+1 (555) 777-2253',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-staff',
    name: 'Julien Laurent (Head Baker)',
    email: 'julien@ssbakers.com',
    role: 'staff',
    phone: '+1 (555) 777-2254',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-customer',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'customer',
    phone: '+1 (555) 234-8901',
    defaultAddress: '142 Walnut Grove Ave, Apt 3',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];
