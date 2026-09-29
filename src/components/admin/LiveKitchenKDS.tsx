import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { OrderStatus } from '../../types';
import { Flame, Clock, CheckCircle, Volume2, VolumeX, ArrowRight, User, Phone, MapPin } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export const LiveKitchenKDS: React.FC = () => {
  const { orders, updateOrderStatus, addNotification } = useBakery();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'pickup' | 'delivery'>('all');

  // Play synthesized acoustic chime for new orders/updates
  const playBakeryChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio not supported or blocked');
    }
  };

  const columns: { status: OrderStatus; label: string; badgeColor: string; icon: React.ReactNode }[] = [
    {
      status: 'received',
      label: '1. Received & Prep Queue',
      badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
      icon: <Clock className="w-4 h-4 text-amber-600" />
    },
    {
      status: 'baking',
      label: '2. In Hearth Deck Oven',
      badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
      icon: <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
    },
    {
      status: 'ready',
      label: '3. Packaged & Counter Ready',
      badgeColor: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
      icon: <CheckCircle className="w-4 h-4 text-emerald-600" />
    }
  ];

  const filteredOrders = orders.filter(o => {
    if (filterType === 'all') return true;
    return o.orderType === filterType;
  });

  const handleAdvanceStatus = (orderId: string, currentStatus: OrderStatus) => {
    playBakeryChime();
    if (currentStatus === 'received') {
      updateOrderStatus(orderId, 'baking');
    } else if (currentStatus === 'baking') {
      updateOrderStatus(orderId, 'ready');
    } else if (currentStatus === 'ready') {
      updateOrderStatus(orderId, 'completed');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
              Kitchen Display System (KDS) & Live Hearth Feed
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time synchronization with active customer orders, oven timers, and pickup stations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Audio Chime Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(prev => !prev);
              if (!soundEnabled) playBakeryChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              soundEnabled
                ? 'bg-amber-100/70 border-amber-300 text-amber-900 dark:bg-stone-800 dark:border-stone-700 dark:text-amber-300'
                : 'bg-white border-stone-200 text-stone-500 dark:bg-stone-900 dark:border-stone-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Chime Alert On' : 'Chime Muted'}</span>
          </button>

          {/* Filter Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-xs p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
          >
            <option value="all">All Service Types</option>
            <option value="pickup">Store Pickup Only</option>
            <option value="delivery">Courier Delivery Only</option>
          </select>
        </div>
      </div>

      {/* KDS Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colOrders = filteredOrders.filter(o => o.status === col.status);

          return (
            <div
              key={col.status}
              className="bg-stone-100/70 dark:bg-stone-900/60 rounded-3xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 flex flex-col min-h-[500px]"
            >
              {/* Column Title */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  {col.icon}
                  <h3 className="font-display text-sm font-bold text-stone-900 dark:text-stone-100">
                    {col.label}
                  </h3>
                </div>
                <span className="font-mono-numbers text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-2xs">
                  {colOrders.length}
                </span>
              </div>

              {/* Orders in Column */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {colOrders.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-center text-stone-400 text-xs">
                    <span>No orders currently in this phase</span>
                  </div>
                ) : (
                  colOrders.map((order) => {
                    const elapsedMins = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60));

                    return (
                      <div
                        key={order.id}
                        className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200/90 dark:border-stone-800 shadow-xs hover:border-amber-700/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Order Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 text-xs">
                            <span className="font-mono font-bold text-amber-900 dark:text-amber-400">
                              #{order.id}
                            </span>
                            <span className="text-[11px] font-mono text-stone-400">
                              {elapsedMins}m ago · {order.pickupTimeSlot}
                            </span>
                          </div>

                          {/* Customer info */}
                          <div className="mt-2 text-xs">
                            <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                              <User className="w-3.5 h-3.5 text-stone-400" />
                              <span>{order.customerName}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                              <Phone className="w-3 h-3 text-stone-400" />
                              <span>{order.customerPhone}</span>
                            </div>
                            {order.deliveryAddress && (
                              <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                                <MapPin className="w-3 h-3 text-stone-400" />
                                <span className="truncate">{order.deliveryAddress}</span>
                              </div>
                            )}
                          </div>

                          {/* Itemized Order List */}
                          <div className="mt-3 py-2 bg-stone-50 dark:bg-stone-800/50 rounded-xl px-3 space-y-1.5 text-xs">
                            {order.items.map((ci) => (
                              <div key={ci.product.id} className="flex items-start justify-between">
                                <span className="text-stone-800 dark:text-stone-200">
                                  <strong className="text-amber-900 dark:text-amber-300 font-mono">{ci.quantity}x</strong> {ci.product.title}
                                </span>
                              </div>
                            ))}
                            {order.notes && (
                              <p className="text-[11px] italic text-amber-800 dark:text-amber-400 pt-1 border-t border-stone-200 dark:border-stone-700">
                                Chef note: "{order.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Advancement CTA */}
                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                          <span className="font-mono-numbers text-xs font-bold text-stone-700 dark:text-stone-300">
                            {formatINR(order.total)}
                          </span>

                          <button
                            onClick={() => handleAdvanceStatus(order.id, order.status)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs transition-colors shadow-2xs"
                          >
                            <span>
                              {order.status === 'received' && 'Move to Oven'}
                              {order.status === 'baking' && 'Mark Ready'}
                              {order.status === 'ready' && 'Complete Order'}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completed Orders Quick Archive Drawer / Summary */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200 dark:border-stone-800">
        <h3 className="font-display text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
          Fulfilled Batch Archive Today ({orders.filter(o => o.status === 'completed').length})
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {orders.filter(o => o.status === 'completed').length === 0 ? (
            <span className="text-stone-400 text-xs">No fulfilled orders archived yet today.</span>
          ) : (
            orders
              .filter(o => o.status === 'completed')
              .map(o => (
                <span
                  key={o.id}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono text-[11px]"
                >
                  #{o.id} · {o.customerName} (${o.total.toFixed(2)})
                </span>
              ))
          )}
        </div>
      </div>

    </div>
  );
};
