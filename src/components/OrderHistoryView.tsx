import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { RotateCcw, Clock, MapPin, CheckCircle, Package } from 'lucide-react';
import { Order } from '../types';
import { formatINR } from '../utils/currency';

interface OrderHistoryViewProps {
  onTrackOrder: (order: Order) => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({ onTrackOrder }) => {
  const { orders, currentUser, addToCart, t } = useBakery();

  // Filter orders matching current customer or all for demo ease
  const customerOrders = currentUser.role === 'customer'
    ? orders.filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || o.customerName === currentUser.name)
    : orders;

  const displayOrders = customerOrders.length > 0 ? customerOrders : orders;

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity, item.specialInstructions);
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-2">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-amber-950 dark:text-stone-100">
            Order History & Past Bakes
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Logged in as <strong className="text-stone-800 dark:text-stone-200">{currentUser.name}</strong> ({currentUser.email})
          </p>
        </div>
        <span className="text-xs font-mono text-stone-400">
          {displayOrders.length} order{displayOrders.length !== 1 ? 's' : ''} on record
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {displayOrders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-200">
              No Previous Orders Found
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Your previous sourdough loaves, viennoiserie, and artisan pastry receipts will appear here.
            </p>
          </div>
        ) : (
          displayOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-5 sm:p-6 shadow-xs hover:border-amber-700/30 transition-all"
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded">
                    #{order.id}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    order.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : order.status === 'ready'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="py-4 space-y-2">
                {order.items.map((ci) => (
                  <div key={ci.product.id} className="flex items-center justify-between text-xs">
                    <span className="text-stone-800 dark:text-stone-200">
                      <strong>{ci.quantity}x</strong> {ci.product.title}
                      {ci.specialInstructions && (
                        <span className="italic text-stone-400 block text-[11px] ml-4">
                          Note: "{ci.specialInstructions}"
                        </span>
                      )}
                    </span>
                    <span className="font-mono-numbers text-stone-600 dark:text-stone-400">
                      {formatINR(ci.product.price * ci.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer info & reorder action */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 text-stone-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {order.pickupTimeSlot}
                  </span>
                  <span>
                    Total: <strong className="font-mono-numbers text-amber-950 dark:text-amber-200 font-bold">{formatINR(order.total)}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTrackOrder(order)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium text-xs transition-colors"
                  >
                    View Status
                  </button>

                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--cta-caramel)',
                      color: 'var(--cta-text, #3D2314)'
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" style={{ color: 'var(--cta-text, #3D2314)' }} />
                    <span>Re-order Items</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
