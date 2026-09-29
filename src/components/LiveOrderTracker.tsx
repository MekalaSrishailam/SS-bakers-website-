import React, { useState, useEffect, useMemo } from 'react';
import { useBakery } from '../context/BakeryContext';
import { CheckCircle2, Flame, PackageCheck, Truck, Clock, Sparkles, AlertCircle, Timer, Thermometer } from 'lucide-react';
import { OrderStatus } from '../types';
import { formatINR } from '../utils/currency';

export const LiveOrderTracker: React.FC = () => {
  const { orders, activeTrackingOrder, setActiveTrackingOrder, updateOrderStatus } = useBakery();
  const [now, setNow] = useState<number>(Date.now());

  // Real-time 1-second interval ticker for live countdown and smooth progress updates
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentOrder = activeTrackingOrder || orders[0];

  // Dynamic remaining bake time and progress calculation based on status & creation timestamp
  const trackingMetrics = useMemo(() => {
    if (!currentOrder) {
      return {
        progressPercent: 0,
        remainingText: '--',
        phaseName: 'No Active Order',
        phaseDescription: '',
        elapsedMinutes: 0,
        estimatedCompletionTime: '',
        isCompleted: false,
        isCancelled: false
      };
    }

    const isCancelled = currentOrder.status === 'cancelled';
    const isCompleted = currentOrder.status === 'completed';

    // Calculate expected total bake and prep duration based on item prep times
    const maxItemPrepTime = currentOrder.items.reduce(
      (max, item) => Math.max(max, item.product.prepTimeMinutes || 20),
      20
    );
    // Base 32 mins for deck temperature, crumb structure & cooling
    const totalExpectedMinutes = Math.max(28, maxItemPrepTime + 10);
    const totalExpectedMs = totalExpectedMinutes * 60 * 1000;

    const createdAtMs = new Date(currentOrder.createdAt).getTime();
    const elapsedMs = Math.max(0, now - createdAtMs);
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);

    const completionDate = new Date(createdAtMs + totalExpectedMs);
    const estimatedCompletionTime = completionDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let progressPercent = 0;
    let remainingText = '';
    let phaseName = '';
    let phaseDescription = '';

    if (isCancelled) {
      progressPercent = 0;
      remainingText = 'Cancelled';
      phaseName = 'Order Cancelled';
      phaseDescription = 'This bakery ticket was cancelled.';
    } else if (isCompleted) {
      progressPercent = 100;
      remainingText = '0m (Freshly Handed Over)';
      phaseName = 'Fulfilled & Enjoyed Fresh';
      phaseDescription = 'Freshly pulled from hearth stone deck, bagged, and handed over to customer.';
    } else if (currentOrder.status === 'ready') {
      // Cooling on bakery racks and sealed in kraft bag: 80% to 95%
      const readySeconds = Math.min(300, elapsedSeconds - (totalExpectedMinutes - 6) * 60);
      const readyPercent = Math.min(96, Math.max(82, 85 + Math.floor((Math.max(0, readySeconds) / 300) * 11)));
      progressPercent = readyPercent;
      remainingText = 'Ready for Pickup / Handover Now';
      phaseName = 'Phase 3: Packaged & Bakery Counter Ready';
      phaseDescription = 'Crust has set, resting on pine cooling racks, and sealed in eco-kraft packaging with butter grease paper.';
    } else if (currentOrder.status === 'baking') {
      // Wood-stone hearth deck baking: 25% to 80%
      const bakePhaseDurationMs = totalExpectedMs * 0.55;
      const bakeElapsedMs = Math.max(0, elapsedMs - totalExpectedMs * 0.2);
      const ratio = Math.min(0.95, bakeElapsedMs / bakePhaseDurationMs);
      progressPercent = Math.min(78, Math.max(28, Math.round(25 + ratio * 53)));

      const remainingTotalSeconds = Math.max(
        120,
        Math.round(((100 - progressPercent) / 100) * totalExpectedMinutes * 60)
      );
      const remMin = Math.floor(remainingTotalSeconds / 60);
      const remSec = remainingTotalSeconds % 60;
      remainingText = `~${remMin}m ${remSec < 10 ? '0' : ''}${remSec}s remaining`;
      phaseName = 'Phase 2: Wood-Stone Hearth Deck Baking (485°F)';
      phaseDescription = 'Loaves expanding with singing blistered ears; deep Maillard caramelization & lactic crumb rise underway.';
    } else {
      // 'received': 5% to 25%
      const prepRatio = Math.min(0.9, elapsedSeconds / 360);
      progressPercent = Math.min(25, Math.max(10, Math.round(10 + prepRatio * 15)));
      const remainingMinutes = Math.max(15, totalExpectedMinutes - elapsedMinutes);
      remainingText = `~${remainingMinutes} mins remaining`;
      phaseName = 'Phase 1: Dough Proofing & Recipe Verification';
      phaseDescription = 'Organic stoneground flour levain hydration weighed; banneton proofing verified by master baker.';
    }

    return {
      progressPercent,
      remainingText,
      phaseName,
      phaseDescription,
      elapsedMinutes,
      estimatedCompletionTime,
      isCompleted,
      isCancelled
    };
  }, [currentOrder, now]);

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <span className="text-5xl mb-4 inline-block">🥐</span>
        <h2 className="font-display text-2xl font-bold text-[#3D2314] dark:text-stone-100">
          No Active Bakery Orders
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          Explore our artisan sourdoughs, French viennoiserie, and designer cakes to place your first hearth order.
        </p>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; description: string; icon: React.ReactNode }[] = [
    {
      status: 'received',
      label: 'Order Received & Proofing',
      description: 'Dough weighed & fermentation checked by master baker',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      status: 'baking',
      label: 'Baking in Hearth Stones',
      description: 'In the 485°F wood-stone deck oven developing crispy caramelized crust',
      icon: <Flame className="w-5 h-5" />
    },
    {
      status: 'ready',
      label: 'Packaged & Ready',
      description: 'Cooled on pine bakery racks, sealed in eco-kraft bag for pickup',
      icon: <PackageCheck className="w-5 h-5" />
    },
    {
      status: 'completed',
      label: currentOrder.orderType === 'delivery' ? 'Delivered' : 'Picked Up',
      description: 'Fulfilled & enjoyed fresh from the oven',
      icon: <Truck className="w-5 h-5" />
    }
  ];

  const statusIndexMap: Record<OrderStatus, number> = {
    received: 0,
    baking: 1,
    ready: 2,
    completed: 3,
    cancelled: -1
  };

  const currentStepIndex = statusIndexMap[currentOrder.status];

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F3E1DC] dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span 
              className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border"
              style={{ 
                backgroundColor: 'var(--accent-rose-light)', 
                borderColor: 'var(--accent-rose)', 
                color: 'var(--text-chocolate)' 
              }}
            >
              Order #{currentOrder.id}
            </span>
            <span className="text-xs text-stone-500 font-mono">
              Placed {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 
            className="font-display text-2xl sm:text-3xl font-bold mt-1 tracking-tight"
            style={{ color: 'var(--text-chocolate)' }}
          >
            Real-Time Oven Tracker
          </h1>
        </div>

        {/* Order Selector if multiple orders exist */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-stone-500 whitespace-nowrap">Switch Order:</label>
            <select
              value={currentOrder.id}
              onChange={(e) => {
                const found = orders.find(o => o.id === e.target.value);
                if (found) setActiveTrackingOrder(found);
              }}
              className="text-xs p-2 rounded-xl border bg-white dark:bg-stone-900 font-medium"
              style={{ borderColor: 'var(--accent-rose)', color: 'var(--text-chocolate)' }}
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  #{o.id} - {o.customerName} ({o.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Hero Tracking Card */}
      <div 
        className="mt-8 rounded-3xl border p-6 sm:p-8 shadow-sm transition-colors"
        style={{ 
          backgroundColor: 'var(--card-surface, #FFFFFF)', 
          borderColor: 'var(--accent-rose)' 
        }}
      >
        
        {/* Estimated Status Banner */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border mb-6"
          style={{ 
            backgroundColor: 'var(--accent-rose-light)', 
            borderColor: 'var(--accent-rose)' 
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl shadow-xs"
              style={{ 
                backgroundColor: 'var(--cta-caramel)', 
                color: 'var(--cta-text, #3D2314)' 
              }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p 
                className="text-[11px] font-mono font-bold uppercase tracking-wider"
                style={{ color: 'var(--cta-caramel)' }}
              >
                {currentOrder.orderType === 'pickup' ? 'Estimated Pickup Window' : 'Estimated Courier Arrival'}
              </p>
              <p 
                className="text-sm sm:text-base font-bold font-mono-numbers"
                style={{ color: 'var(--text-chocolate)' }}
              >
                {currentOrder.pickupTimeSlot}
              </p>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-[11px]">Hearth Deck 2 • 485°F Stone Base</span>
          </div>
        </div>

        {/* 🌟 NEW FEATURE: Live Dynamic Bake Progress Bar & Estimated Remaining Time */}
        <div 
          className="p-5 sm:p-6 rounded-2xl border mb-8 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 dark:from-[#241712] dark:via-stone-900 dark:to-[#1A120D] shadow-xs"
          style={{ borderColor: 'var(--accent-rose)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
                  <Flame className="w-4 h-4 animate-pulse" />
                </span>
                <span 
                  className="font-display text-sm sm:text-base font-bold"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  {trackingMetrics.phaseName}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {trackingMetrics.phaseDescription}
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Estimated Remaining Time
              </span>
              <div 
                className="font-mono-numbers text-base sm:text-lg font-extrabold flex items-center gap-1.5 sm:justify-end"
                style={{ color: 'var(--cta-caramel)' }}
              >
                <Timer className="w-4 h-4" />
                <span>{trackingMetrics.remainingText}</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                {trackingMetrics.progressPercent}% of bake cycle completed
              </span>
            </div>
          </div>

          {/* Progress Bar Container with Oven Heat Gradient */}
          <div className="relative pt-2">
            <div 
              className="w-full h-4 rounded-full p-0.5 overflow-hidden border relative bg-stone-100 dark:bg-stone-800 shadow-inner"
              style={{ borderColor: 'var(--accent-rose)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#D4AF37] via-[#EA580C] to-[#C81E2E] shadow-sm relative overflow-hidden"
                style={{ width: `${trackingMetrics.progressPercent}%` }}
              >
                {/* Subtle animated light shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Stage Milestone Markers */}
            <div className="grid grid-cols-4 mt-2 text-[10px] font-mono text-stone-400 pt-1">
              <div className="text-left">
                <span className="font-bold text-stone-600 dark:text-stone-300">0%</span>
                <span className="hidden sm:inline"> · Proofing</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-stone-600 dark:text-stone-300">25%</span>
                <span className="hidden sm:inline"> · In Deck</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-stone-600 dark:text-stone-300">75%</span>
                <span className="hidden sm:inline"> · Blister Crust</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-stone-600 dark:text-stone-300">100%</span>
                <span className="hidden sm:inline"> · Ready</span>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Bar */}
          <div 
            className="mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono"
            style={{ borderColor: 'var(--accent-rose)', color: 'var(--text-muted)' }}
          >
            <div className="flex items-center gap-2">
              <Thermometer className="w-3.5 h-3.5 text-orange-600" />
              <span>Oven Hearth: <strong>485°F</strong> / 252°C</span>
              <span aria-hidden="true">·</span>
              <span>Elapsed: <strong>{trackingMetrics.elapsedMinutes} mins</strong></span>
            </div>
            <div>
              <span>Calculated Target: <strong>{trackingMetrics.estimatedCompletionTime}</strong></span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const isDone = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div key={step.status} className="flex flex-col relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'text-white ring-4 ring-orange-200 dark:ring-stone-800 animate-pulse'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                    }`}
                    style={isCurrent ? { backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #3D2314)' } : undefined}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                      Step 0{idx + 1}
                    </span>
                    <span 
                      className={`text-xs font-bold leading-tight block ${
                        isCurrent 
                          ? 'font-extrabold' 
                          : isDone 
                          ? 'text-stone-900 dark:text-stone-200' 
                          : 'text-stone-400'
                      }`}
                      style={isCurrent ? { color: 'var(--text-chocolate)' } : undefined}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed pl-12 md:pl-0" style={{ color: 'var(--text-muted)' }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Kitchen Simulation Controls (Allows user to test live tracking!) */}
        <div 
          className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-3 text-xs p-3 rounded-2xl"
          style={{ 
            borderColor: 'var(--accent-rose)', 
            backgroundColor: 'var(--accent-rose-light)' 
          }}
        >
          <span className="font-semibold text-xs" style={{ color: 'var(--text-chocolate)' }}>
            Simulate Kitchen Progress:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updateOrderStatus(currentOrder.id, 'received')}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                currentOrder.status === 'received' 
                  ? 'text-white font-bold shadow-xs' 
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
              }`}
              style={currentOrder.status === 'received' ? { backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #3D2314)', borderColor: 'var(--accent-rose)' } : { borderColor: 'var(--accent-rose)' }}
            >
              Received
            </button>
            <button
              onClick={() => updateOrderStatus(currentOrder.id, 'baking')}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                currentOrder.status === 'baking' 
                  ? 'text-white font-bold shadow-xs' 
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
              }`}
              style={currentOrder.status === 'baking' ? { backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #3D2314)', borderColor: 'var(--accent-rose)' } : { borderColor: 'var(--accent-rose)' }}
            >
              In Oven
            </button>
            <button
              onClick={() => updateOrderStatus(currentOrder.id, 'ready')}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                currentOrder.status === 'ready' 
                  ? 'text-white font-bold shadow-xs' 
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
              }`}
              style={currentOrder.status === 'ready' ? { backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #3D2314)', borderColor: 'var(--accent-rose)' } : { borderColor: 'var(--accent-rose)' }}
            >
              Ready
            </button>
            <button
              onClick={() => updateOrderStatus(currentOrder.id, 'completed')}
              className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                currentOrder.status === 'completed' 
                  ? 'bg-emerald-700 text-white font-bold shadow-xs' 
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300'
              }`}
              style={currentOrder.status !== 'completed' ? { borderColor: 'var(--accent-rose)' } : undefined}
            >
              Complete
            </button>
          </div>
        </div>

      </div>

      {/* Itemized Order Breakdown with INR Currency */}
      <div 
        className="mt-8 rounded-3xl border p-6 shadow-sm transition-colors"
        style={{ 
          backgroundColor: 'var(--card-surface, #FFFFFF)', 
          borderColor: 'var(--accent-rose)' 
        }}
      >
        <h3 
          className="font-display text-lg font-bold mb-4"
          style={{ color: 'var(--text-chocolate)' }}
        >
          Order Items Summary
        </h3>
        <div className="divide-y" style={{ borderColor: 'var(--accent-rose)' }}>
          {currentOrder.items.map((item) => (
            <div key={item.product.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span 
                  className="font-mono-numbers text-xs font-semibold px-2 py-0.5 rounded border"
                  style={{ 
                    backgroundColor: 'var(--accent-rose-light)', 
                    borderColor: 'var(--accent-rose)',
                    color: 'var(--cta-caramel)' 
                  }}
                >
                  {item.quantity}x
                </span>
                <div>
                  <h4 
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    {item.product.title}
                  </h4>
                  {item.specialInstructions && (
                    <p className="text-[11px] italic" style={{ color: 'var(--cta-caramel)' }}>
                      Note: "{item.specialInstructions}"
                    </p>
                  )}
                </div>
              </div>
              <div 
                className="font-mono-numbers text-xs font-bold"
                style={{ color: 'var(--text-chocolate)' }}
              >
                {formatINR(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div 
          className="mt-4 pt-4 border-t flex justify-between items-center text-xs"
          style={{ borderColor: 'var(--accent-rose)' }}
        >
          <span style={{ color: 'var(--text-muted)' }}>
            Payment Method: <strong className="uppercase" style={{ color: 'var(--text-chocolate)' }}>{currentOrder.paymentMethod}</strong> ({currentOrder.paymentStatus})
          </span>
          <div className="text-right">
            <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Total Charged (INR)</span>
            <span 
              className="font-mono-numbers text-lg font-bold"
              style={{ color: 'var(--cta-caramel)' }}
            >
              {formatINR(currentOrder.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
