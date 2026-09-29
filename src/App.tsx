import React, { useState } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { CustomerCatalogView } from './components/CustomerCatalogView';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { OrderHistoryView } from './components/OrderHistoryView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LiveKitchenKDS } from './components/admin/LiveKitchenKDS';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { VoiceOrderModal } from './components/VoiceOrderModal';
import { BusinessShowcase } from './components/BusinessShowcase';
import { ConsultationModal } from './components/ConsultationModal';
import { FestiveAnimation } from './components/FestiveAnimation';
import { Footer } from './components/Footer';
import { Product, Order } from './types';
import { ShoppingBag, Utensils, Clock, ShieldCheck, History } from 'lucide-react';

function BakeryApp() {
  const { currentUser, cartCount, setActiveTrackingOrder } = useBakery();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'menu' | 'craft' | 'tracker' | 'history' | 'admin' | 'staff'>('menu');

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const handleOrderCompleted = (order: Order) => {
    setActiveTrackingOrder(order);
    setCurrentTab('tracker');
  };

  const handleAdminRedirect = () => {
    setCurrentTab('admin');
  };

  const handleOrderOnline = () => {
    setCurrentTab('menu');
    const menuEl = document.getElementById('menu-catalog');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors"
      style={{ backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
    >
      
      {/* Real-time Toasts */}
      <ToastContainer />

      {/* Holiday Seasonal Visual Animations (Snowflakes & Confetti) */}
      <FestiveAnimation />

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openCart={() => setIsCartOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
        openVoiceOrder={() => setIsVoiceOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'menu' && (
          <>
            <CustomerCatalogView
              onQuickView={(prod) => setInspectedProduct(prod)}
              onOpenVoice={() => setIsVoiceOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
            />
            <BusinessShowcase
              onOrderOnline={handleOrderOnline}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
            <CraftsmanshipSection />
          </>
        )}

        {currentTab === 'craft' && (
          <div className="py-8">
            <BusinessShowcase
              onOrderOnline={handleOrderOnline}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
            <CraftsmanshipSection />
          </div>
        )}

        {currentTab === 'tracker' && (
          <LiveOrderTracker />
        )}

        {currentTab === 'history' && (
          <OrderHistoryView
            onTrackOrder={(ord) => {
              setActiveTrackingOrder(ord);
              setCurrentTab('tracker');
            }}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            onSwitchToCustomer={() => setCurrentTab('menu')}
          />
        )}

        {currentTab === 'staff' && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <LiveKitchenKDS />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => setCurrentTab(tab)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Mobile Bottom Thumb Navigation (<15% viewport height cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('menu')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            currentTab === 'menu' ? 'text-amber-900 dark:text-amber-300 font-bold' : 'text-stone-500'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => setCurrentTab('tracker')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            currentTab === 'tracker' ? 'text-amber-900 dark:text-amber-300 font-bold' : 'text-stone-500'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Tracker</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-medium text-stone-500"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-900 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-mono font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <button
          onClick={() => setCurrentTab('history')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
            currentTab === 'history' ? 'text-amber-900 dark:text-amber-300 font-bold' : 'text-stone-500'
          }`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
        </button>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => setCurrentTab('admin')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${
              currentTab === 'admin' ? 'text-amber-900 dark:text-amber-300 font-bold' : 'text-amber-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Admin</span>
          </button>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAdminLoginRedirect={handleAdminRedirect}
      />

      {/* Voice Rapid Order Entry Modal */}
      <VoiceOrderModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSuccess={() => setIsCartOpen(true)}
      />

      {/* Custom Cake Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <BakeryProvider>
      <BakeryApp />
    </BakeryProvider>
  );
}
