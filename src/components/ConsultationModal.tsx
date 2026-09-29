import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, Calendar, Cake, Phone, Mail, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { addNotification } = useBakery();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Wedding Reception');
  const [servingSize, setServingSize] = useState('50 - 100 Guests');
  const [isEgglessRequired, setIsEgglessRequired] = useState(true);
  const [flavorPreference, setFlavorPreference] = useState('Dark Chocolate Velvet & Gold Leaf');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addNotification(
      'success',
      'Consultation Booked',
      `Thank you, ${clientName}! Our head cake designer will contact you at ${clientPhone} within 2 business hours.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FDFBF7] dark:bg-[#1E130D] rounded-3xl shadow-2xl border border-[#F3E1DC] dark:border-stone-800 overflow-hidden my-8"
        style={{ backgroundColor: 'var(--bg-cream)', borderColor: 'var(--accent-rose)' }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#3D2314]/60 hover:text-[#3D2314] hover:bg-[#F3E1DC]/50 dark:hover:text-stone-200"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-amber-950 dark:text-stone-100">
              Cake Consultation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
              We have received your custom design brief for your <strong>{eventType}</strong>. Our senior pastry artist will review your specifications and call you at <strong className="font-mono text-amber-900 dark:text-amber-300">{clientPhone}</strong>.
            </p>
            <div className="p-4 bg-amber-50 dark:bg-stone-800 rounded-2xl border border-amber-900/10 text-xs text-left font-mono space-y-1">
              <p><strong>Client:</strong> {clientName}</p>
              <p><strong>Target Date:</strong> {eventDate || 'Upcoming Weekend'}</p>
              <p><strong>Dietary:</strong> {isEgglessRequired ? '100% Certified Eggless' : 'Standard Recipe'}</p>
              <p><strong>Studio Flagship:</strong> Warangal Chowrastha (Opposite Grand Gayathri Hotel)</p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs transition-colors"
            >
              Return to Bakery
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold mb-1">
                <Cake className="w-4 h-4" />
                <span>Bespoke Pâtisserie Design</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-amber-950 dark:text-stone-100">
                Book a Custom Cake Consultation
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Collaborate directly with our master pastry chef on multi-tiered wedding cakes, corporate milestones, and eggless designer concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Pooja Reddy"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Phone Number (Call / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="8978275273"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Celebration Date *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  <option value="Wedding Reception">Wedding Reception (Multi-Tier)</option>
                  <option value="First Birthday Celebration">Milestone Birthday / First Birthday</option>
                  <option value="Anniversary Gala">Anniversary Celebration</option>
                  <option value="Corporate Launch">Corporate Brand Launch</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                  Estimated Guest Count
                </label>
                <select
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  <option value="25 - 50 Guests">25 - 50 Guests (1 to 2 Tiers)</option>
                  <option value="50 - 100 Guests">50 - 100 Guests (2 to 3 Tiers)</option>
                  <option value="100 - 300 Guests">100 - 300 Guests (Grand Multi-Tier)</option>
                  <option value="300+ Guests">300+ Guests (Bespoke Showcase)</option>
                </select>
              </div>
            </div>

            {/* Eggless Requirement Checkbox */}
            <div 
              className="p-3 bg-[#F3E1DC]/40 dark:bg-stone-800/60 rounded-xl border border-[#F3E1DC] dark:border-stone-700 flex items-center justify-between"
              style={{ backgroundColor: 'var(--accent-rose-light)', borderColor: 'var(--accent-rose)' }}
            >
              <div>
                <span 
                  className="text-xs font-bold text-[#3D2314] dark:text-stone-100 block"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  100% Eggless Customisation
                </span>
                <span className="text-[11px] text-[#3D2314]/70">
                  Dedicated pure vegetarian kitchen workflow with zero gelatin.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isEgglessRequired}
                onChange={(e) => setIsEgglessRequired(e.target.checked)}
                className="w-4 h-4 rounded text-[#3D2314] focus:ring-[#D4AF37] cursor-pointer"
              />
            </div>

            <div>
              <label 
                className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-400 block mb-1"
                style={{ color: 'var(--text-chocolate)' }}
              >
                Design Theme, Color Palette & Reference Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your color palette, floral preferences, or desired fondant motifs..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-stone-100 focus:border-[#D4AF37]"
                style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/25 hover:shadow-lg hover:scale-[1.01]"
              style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #FFFFFF)' }}
            >
              <Send className="w-4 h-4 text-white" />
              <span>Submit Consultation Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
