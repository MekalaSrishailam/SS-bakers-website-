import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, OrderStatus, InventoryItem, User, UserRole, CartItem, Language, ColorPalette } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_INVENTORY, DEMO_USERS } from '../data/initialData';
import { TRANSLATIONS } from '../utils/i18n';

interface NotificationToast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
}

interface BakeryContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  restockProduct: (id: string, amount: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, instructions?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: 'pickup' | 'delivery';
    pickupTimeSlot: string;
    deliveryAddress?: string;
    paymentMethod: 'card' | 'apple_pay' | 'upi' | 'cash';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  // User & Auth
  currentUser: User;
  switchUserRole: (role: UserRole) => void;
  loginUser: (email: string, role: UserRole, name?: string) => void;
  registerUser: (name: string, email: string, role: UserRole, phone?: string) => void;
  logoutUser: () => void;
  registeredUsers: User[];

  // Inventory & Supplies
  inventory: InventoryItem[];
  reorderSupply: (inventoryId: string, quantity: number) => void;
  lowStockProducts: Product[];
  lowStockSupplies: InventoryItem[];

  // Theme & Accessibility
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;

  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Notifications
  notifications: NotificationToast[];
  dismissNotification: (id: string) => void;
  addNotification: (type: NotificationToast['type'], title: string, message: string) => void;

  // Offline capability simulation
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;

  // Analytics
  getAnalytics: () => {
    todayRevenue: number;
    todayOrdersCount: number;
    averageOrderValue: number;
    topSellingItems: { title: string; count: number; revenue: number }[];
    totalBakesSold: number;
    demandForecasts: { item: string; predictedDemand: number; currentStock: number; recommendation: string }[];
  };

  // Export
  exportSalesReportCSV: () => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products state (persisted with automatic INR currency migration)
  const [products, setProducts] = useState<Product[]>(() => {
    // Purge old USD legacy keys if present
    try {
      const oldSaved = localStorage.getItem('ss_bakers_products');
      if (oldSaved) {
        const parsedOld = JSON.parse(oldSaved);
        if (Array.isArray(parsedOld) && parsedOld.some((p: any) => p.price < 40)) {
          localStorage.removeItem('ss_bakers_products');
          localStorage.removeItem('ss_bakers_orders');
          localStorage.removeItem('ss_bakers_cart');
        }
      }
    } catch (e) {
      console.error('Error migrating old currency cache:', e);
    }

    const saved = localStorage.getItem('ss_bakers_products_inr_v5');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((p: any) => p.price < 40)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ss_bakers_orders_inr_v5');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((o: any) => o.total < 100)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  // Inventory state
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('ss_bakers_inventory_inr_v5');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_INVENTORY;
  });

  // Users state
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ss_bakers_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEMO_USERS;
  });

  // Current active user (defaults to Customer for normal browsing)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return DEMO_USERS[2]; // Elena Rostova (Customer)
  });

  // Shopping cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ss_bakers_cart_inr_v5');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && !parsed.some((ci: any) => ci.product && ci.product.price < 40)) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return [];
  });

  // Active tracking order for customer view
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(() => {
    return INITIAL_ORDERS[0]; // Elena's active baking order
  });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ss_bakers_dark_mode');
    return saved === 'true';
  });

  // Color Palette Theme
  const [colorPalette, setColorPalette] = useState<ColorPalette>(() => {
    const saved = localStorage.getItem('ss_bakers_color_palette');
    return (saved as ColorPalette) || 'honey';
  });

  // Multi-language
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ss_bakers_lang');
    return (saved as Language) || 'en';
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  // Simulated offline mode
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Sync to localStorage with INR persistence
  useEffect(() => {
    localStorage.setItem('ss_bakers_products_inr_v5', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_orders_inr_v5', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_inventory_inr_v5', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_cart_inr_v5', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_color_palette', colorPalette);
    document.documentElement.setAttribute('data-theme', colorPalette);
  }, [colorPalette]);

  useEffect(() => {
    localStorage.setItem('ss_bakers_lang', language);
  }, [language]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => {
      const next = !prev;
      addNotification(
        next ? 'warning' : 'success',
        next ? 'Offline Mode Active' : 'Online Connection Restored',
        next 
          ? 'SS Bakers is caching orders locally with seamless offline resilience.'
          : 'Local order queue synchronized with live oven dispatch.'
      );
      return next;
    });
  };

  const addNotification = (type: NotificationToast['type'], title: string, message: string) => {
    const newNotif: NotificationToast = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      title,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);

    // Auto dismiss after 5s
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Product operations
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification('success', 'Product Added', `"${newProduct.title}" is now available in SS Bakers catalog.`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
    addNotification('info', 'Product Updated', `Item catalog details have been updated live across all storefront screens.`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(item => item.id !== id));
    // Also remove from cart if present
    setCart(prev => prev.filter(item => item.product.id !== id));
    if (target) {
      addNotification('warning', 'Product Removed', `"${target.title}" was removed from the catalog.`);
    }
  };

  const restockProduct = (id: string, amount: number) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + amount);
          return {
            ...item,
            stock: newStock,
            inStock: newStock > 0
          };
        }
        return item;
      })
    );
    addNotification('success', 'Stock Replenished', `Added +${amount} units to batch inventory.`);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, instructions = '') => {
    if (product.stock <= 0) {
      addNotification('error', 'Item Unavailable', `Sorry, ${product.title} is freshly baked out for the day.`);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, specialInstructions: instructions || item.specialInstructions }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock), specialInstructions: instructions }];
    });

    addNotification('success', 'Added to Bakery Bag', `${quantity}x ${product.title} added to your order.`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const safeQty = Math.min(quantity, product.stock);
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: safeQty } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders operations
  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: 'pickup' | 'delivery';
    pickupTimeSlot: string;
    deliveryAddress?: string;
    paymentMethod: 'card' | 'apple_pay' | 'upi' | 'cash';
    notes?: string;
  }): Order => {
    const subtotal = cartTotal;
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const deliveryFee = orderData.orderType === 'delivery' ? 50.00 : 0; // ₹50 delivery in Warangal
    const total = Math.round((subtotal + tax + deliveryFee) * 100) / 100;

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SS-${orderNumber}`;

    const newOrder: Order = {
      id: orderId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: [...cart],
      subtotal,
      tax,
      deliveryFee,
      total,
      orderType: orderData.orderType,
      pickupTimeSlot: orderData.pickupTimeSlot,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cash' ? 'pay_on_pickup' : 'paid',
      status: 'received',
      createdAt: new Date().toISOString(),
      estimatedReadyTime: orderData.orderType === 'pickup' ? 'Ready in 25-30 mins' : 'Delivery in ~45 mins',
      notes: orderData.notes
    };

    // Decrement stock for ordered items
    setProducts(prevProducts =>
      prevProducts.map(prod => {
        const orderItem = cart.find(ci => ci.product.id === prod.id);
        if (orderItem) {
          const updatedStock = Math.max(0, prod.stock - orderItem.quantity);
          // Check if newly triggered low stock
          if (updatedStock <= prod.lowStockThreshold && updatedStock > 0) {
            setTimeout(() => {
              addNotification(
                'warning',
                'Low Stock Alert',
                `Warning: "${prod.title}" is down to ${updatedStock} remaining in bakery stock!`
              );
            }, 800);
          }
          return {
            ...prod,
            stock: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();

    addNotification(
      'success',
      'Order Dispatched to Hearth!',
      `Order #${orderId} confirmed for ${orderData.customerName}. Master bakers are now prepping your items.`
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updated = { ...ord, status: newStatus };
          if (activeTrackingOrder?.id === orderId) {
            setActiveTrackingOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );

    const statusLabels: Record<OrderStatus, string> = {
      received: 'Received & Queued',
      baking: 'Baking in Hearth Stone Oven',
      ready: 'Packaged & Ready for Handover',
      completed: 'Completed & Fulfilled',
      cancelled: 'Cancelled'
    };

    addNotification('info', 'Order Status Updated', `Order #${orderId} is now: ${statusLabels[newStatus]}`);
  };

  // Auth operations
  const switchUserRole = (role: UserRole) => {
    const matching = registeredUsers.find(u => u.role === role);
    if (matching) {
      setCurrentUser(matching);
      addNotification('info', 'Switched Role', `Now previewing as ${matching.name} (${role.toUpperCase()})`);
    } else {
      const demoUser: User = {
        id: `user-${role}`,
        name: role === 'admin' ? 'Sarah Sterling (Owner)' : role === 'staff' ? 'Julien (Baker)' : 'Elena Rostova',
        email: `${role}@ssbakers.com`,
        role
      };
      setCurrentUser(demoUser);
    }
  };

  const loginUser = (email: string, role: UserRole, name?: string) => {
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      addNotification('success', 'Welcome Back', `Logged in as ${existing.name}`);
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name || (email.split('@')[0] || 'User'),
        email,
        role
      };
      setRegisteredUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      addNotification('success', 'Logged In', `Signed in as ${newUser.name} (${role})`);
    }
  };

  const registerUser = (name: string, email: string, role: UserRole, phone?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      phone
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addNotification('success', 'Account Created', `Welcome to SS Bakers, ${name}!`);
  };

  const logoutUser = () => {
    const guest: User = {
      id: 'guest',
      name: 'Guest Customer',
      email: 'guest@example.com',
      role: 'customer'
    };
    setCurrentUser(guest);
    addNotification('info', 'Signed Out', 'You have been safely signed out.');
  };

  // Inventory operations
  const reorderSupply = (inventoryId: string, quantity: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === inventoryId) {
          const updatedStock = item.currentStock + quantity;
          return {
            ...item,
            currentStock: updatedStock,
            lastRestocked: new Date().toISOString().split('T')[0]
          };
        }
        return item;
      })
    );
    const target = inventory.find(i => i.id === inventoryId);
    if (target) {
      addNotification(
        'success',
        'Digital Supply Order Sent',
        `Reordered +${quantity} ${target.unit} of ${target.name} from ${target.supplier}.`
      );
    }
  };

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);
  const lowStockSupplies = inventory.filter(i => i.currentStock <= i.minThreshold);

  // Analytics computation
  const getAnalytics = () => {
    const todayRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const todayOrdersCount = orders.length;
    const averageOrderValue = todayOrdersCount > 0 ? todayRevenue / todayOrdersCount : 0;

    // Item tally
    const itemMap = new Map<string, { count: number; revenue: number }>();
    orders.forEach(o => {
      o.items.forEach(ci => {
        const cur = itemMap.get(ci.product.title) || { count: 0, revenue: 0 };
        itemMap.set(ci.product.title, {
          count: cur.count + ci.quantity,
          revenue: cur.revenue + ci.quantity * ci.product.price
        });
      });
    });

    const topSellingItems = Array.from(itemMap.entries())
      .map(([title, data]) => ({ title, count: data.count, revenue: data.revenue }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const totalBakesSold = Array.from(itemMap.values()).reduce((sum, item) => sum + item.count, 0);

    const demandForecasts = products.map(p => {
      const avgDailyDemand = Math.floor(Math.random() * 15) + 10;
      const rec =
        p.stock < avgDailyDemand
          ? `Bake +${avgDailyDemand - p.stock} extra loaves for tomorrow morning rush.`
          : 'Adequate stock buffer on hand.';
      return {
        item: p.title,
        predictedDemand: avgDailyDemand,
        currentStock: p.stock,
        recommendation: rec
      };
    });

    return {
      todayRevenue: Math.round(todayRevenue * 100) / 100,
      todayOrdersCount,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      topSellingItems,
      totalBakesSold,
      demandForecasts
    };
  };

  const exportSalesReportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Items Summary', 'Order Type', 'Payment Method', 'Status', 'Date', 'Total (₹)'];
    const rows = orders.map(o => [
      o.id,
      `"${o.customerName}"`,
      `"${o.items.map(i => `${i.quantity}x ${i.product.title}`).join('; ')}"`,
      o.orderType,
      o.paymentMethod,
      o.status,
      new Date(o.createdAt).toLocaleString(),
      o.total.toFixed(2)
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SS_Bakers_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addNotification('success', 'Report Exported', 'CSV sales report downloaded successfully.');
  };

  return (
    <BakeryContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        restockProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        updateOrderStatus,
        activeTrackingOrder,
        setActiveTrackingOrder,
        currentUser,
        switchUserRole,
        loginUser,
        registerUser,
        logoutUser,
        registeredUsers,
        inventory,
        reorderSupply,
        lowStockProducts,
        lowStockSupplies,
        isDarkMode,
        toggleDarkMode,
        colorPalette,
        setColorPalette,
        language,
        setLanguage,
        t,
        notifications,
        dismissNotification,
        addNotification,
        isOfflineMode,
        toggleOfflineMode,
        getAnalytics,
        exportSalesReportCSV
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = (): BakeryContextType => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
