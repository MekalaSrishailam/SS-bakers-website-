import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    clearCart,
    t
  } = useBakery();

  if (!isOpen) return null;

  const estimatedTax = Math.round(cartTotal * 0.05 * 100) / 100; // 5% GST
  const grandTotal = Math.round((cartTotal + estimatedTax) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-400" />
            <h2 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
              Bakery Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 dark:divide-stone-800">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500 dark:text-stone-400">
              <span className="text-5xl mb-3">🧺</span>
              <p className="font-display text-lg font-bold text-amber-950 dark:text-stone-200">
                Your bakery bag is empty
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Fresh loaves, croissants, and delicate tarts are pulled from the oven every morning.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-4 py-2 text-xs font-semibold text-amber-950 dark:text-amber-200 bg-amber-100 dark:bg-stone-800 rounded-xl hover:bg-amber-200 transition-colors"
              >
                Browse Daily Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-3 first:pt-0 last:pb-0">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      {formatINR(item.product.price)} each
                      {item.specialInstructions && (
                        <p className="text-[11px] italic text-amber-800 dark:text-amber-300 mt-0.5 truncate">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-800">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono-numbers text-xs font-semibold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="px-2 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-mono-numbers text-xs font-bold text-amber-950 dark:text-amber-200">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/80">
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 mb-4">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-mono-numbers font-medium">{formatINR(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('tax')}</span>
                <span className="font-mono-numbers">{formatINR(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-stone-900 dark:text-stone-100 font-bold text-sm pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Estimated Total</span>
                <span className="font-mono-numbers text-amber-900 dark:text-amber-300">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--cta-caramel)',
                color: 'var(--cta-text, #3D2314)'
              }}
            >
              <span>{t('checkout')}</span>
              <ArrowRight className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simulated encrypted checkout & immediate live oven dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
