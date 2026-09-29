import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, CreditCard, IndianRupee, Smartphone, CheckCircle, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';
import { formatINR } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const { cart, cartTotal, currentUser, placeOrder, t } = useBakery();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Today at 3:15 PM');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.defaultAddress || '');
  const [customerName, setCustomerName] = useState(currentUser.name);
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+91 89782 75273');
  const [notes, setNotes] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'upi' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [upiId, setUpiId] = useState('ssbakers@upi');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  if (!isOpen) return null;

  const estimatedTax = Math.round(cartTotal * 0.05 * 100) / 100;
  const deliveryFee = orderType === 'delivery' ? 50.00 : 0;
  const total = Math.round((cartTotal + estimatedTax + deliveryFee) * 100) / 100;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        customerEmail,
        customerPhone,
        orderType,
        pickupTimeSlot: orderType === 'pickup' ? pickupTimeSlot : 'ASAP Courier Delivery',
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        paymentMethod,
        notes: notes || undefined
      });
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-amber-950 dark:text-stone-100">
              {completedOrder ? 'Order Confirmed' : 'SS Bakers Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State A: Order Completed with Email Notification Simulation */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-amber-950 dark:text-stone-100">
                Baking in Hearth Stones!
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                Thank you, <strong className="text-stone-900 dark:text-stone-100">{completedOrder.customerName}</strong>. 
                Your order <span className="font-mono font-bold text-amber-900 dark:text-amber-300">#{completedOrder.id}</span> has been received and queued in the kitchen.
              </p>
            </div>

            {/* Simulated Email Notification Card */}
            <div className="bg-amber-50/60 dark:bg-stone-800/80 rounded-2xl p-4 border border-amber-900/10 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    Email Confirmation Sent to {completedOrder.customerEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailPreview(prev => !prev)}
                  className="text-xs font-medium text-amber-800 dark:text-amber-400 hover:underline"
                >
                  {showEmailPreview ? 'Hide Preview' : 'View Email Receipt'}
                </button>
              </div>

              {showEmailPreview && (
                <div className="mt-3 p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-xs space-y-2 font-mono">
                  <div className="border-b border-stone-100 dark:border-stone-800 pb-2">
                    <p className="text-stone-400">From: orders@ssbakers.com (SS Bakers Artisan Hearth)</p>
                    <p className="text-stone-400">To: {completedOrder.customerEmail}</p>
                    <p className="font-bold text-stone-800 dark:text-stone-200">Subject: Your Fresh Oven Order #{completedOrder.id} is Confirmed!</p>
                  </div>
                  <div className="py-1">
                    <p>Dear {completedOrder.customerName},</p>
                    <p className="mt-1">Our master bakers have received your artisan order. Fresh organic flours are being prepared and baked in our French stone hearth.</p>
                    <div className="my-2 p-2 bg-stone-50 dark:bg-stone-800 rounded">
                      {completedOrder.items.map(i => (
                        <div key={i.product.id} className="flex justify-between">
                          <span>{i.quantity}x {i.product.title}</span>
                          <span>{formatINR(i.product.price * i.quantity)}</span>
                        </div>
                      ))}
                      <div className="border-t border-stone-200 dark:border-stone-700 mt-1 pt-1 flex justify-between font-bold">
                        <span>Total Paid</span>
                        <span>{formatINR(completedOrder.total)}</span>
                      </div>
                    </div>
                    <p className="text-stone-500">Pick-up / Delivery Slot: {completedOrder.pickupTimeSlot}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Order Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOrderCompleted(completedOrder);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-900 dark:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-amber-950 transition-colors"
              >
                <span>Track Live in Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs hover:bg-stone-50 dark:hover:bg-stone-800"
              >
                Return to Menu
              </button>
            </div>
          </div>
        ) : (
          /* State B: Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Pickup vs Delivery Switcher */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                1. Select Fulfillment Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                    orderType === 'pickup'
                      ? 'border-amber-800 bg-amber-50/50 dark:bg-stone-800 text-amber-950 dark:text-amber-300 font-bold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Store Pickup (Free)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                    orderType === 'delivery'
                      ? 'border-amber-800 bg-amber-50/50 dark:bg-stone-800 text-amber-950 dark:text-amber-300 font-bold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Local Courier (+₹50.00)</span>
                </button>
              </div>

              {orderType === 'pickup' ? (
                <div className="mt-3">
                  <label className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">
                    Pickup Window (SS Bakers Flagship Bakery Counter)
                  </label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Today at 2:30 PM">Today at 2:30 PM (Fresh batch)</option>
                    <option value="Today at 3:15 PM">Today at 3:15 PM (Recommended)</option>
                    <option value="Today at 4:30 PM">Today at 4:30 PM (Evening bake)</option>
                    <option value="Tomorrow Morning at 8:00 AM">Tomorrow Morning at 8:00 AM (Warm breakfast loaf)</option>
                  </select>
                </div>
              ) : (
                <div className="mt-3">
                  <label className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street, Apartment or Suite, City, Zip"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Contact Information */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                2. Customer & Confirmation Info
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Email (for digital receipt)</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Phone Number (SMS updates)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Special Order Note (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ring bell, handle delicate cake with care"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Integrated Payment Gateway */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                3. Secure Payment Method
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-amber-800 bg-amber-50/60 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-amber-800 bg-amber-50/60 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-amber-800 bg-amber-50/60 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <span className="font-mono font-bold text-xs">UPI</span>
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-amber-800 bg-amber-50/60 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <IndianRupee className="w-4 h-4" />
                  <span>Pay on Pickup</span>
                </button>
              </div>

              {/* Payment inputs */}
              {paymentMethod === 'card' && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl space-y-2 border border-stone-200 dark:border-stone-700">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs font-mono p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-0.5">Exp Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs font-mono p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-0.5">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full text-xs font-mono p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                  <label className="text-[11px] text-stone-500 block mb-0.5">UPI ID (Google Pay / PhonePe / Paytm)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="w-full text-xs font-mono p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                  />
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
                  <span>Apple Pay Express Authentication ready</span>
                  <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-300">Ready</span>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                  Pay with cash or card upon collecting your order at our SS Bakers storefront counter.
                </div>
              )}
            </div>

            {/* Total breakdown */}
            <div className="border-t border-stone-200 dark:border-stone-800 pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Due:</span>
                <span className="font-mono-numbers text-xl font-bold text-amber-950 dark:text-amber-100">
                  {formatINR(total)}
                </span>
                <span className="text-[10px] text-stone-400 block">Includes tax and packaging</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: 'var(--cta-caramel)',
                  color: 'var(--cta-text, #3D2314)'
                }}
              >
                {isProcessing ? (
                  <span>Authorizing & Dispatching...</span>
                ) : (
                  <>
                    <span>Confirm Order & Pay</span>
                    <ArrowRight className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
