import React, { useState } from 'react';
import { Sparkles, Tag, Clock, ArrowRight, X, ChevronRight, Cake, Percent } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

interface PromoOffer {
  id: string;
  badge: string;
  headline: string;
  subtext: string;
  code: string;
  expiryNote: string;
  accentColor: string;
  categoryTrigger?: string;
}

interface PromotionalBannerProps {
  onSelectCategory?: (category: string) => void;
  onOpenOfferAction?: (code: string) => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  onSelectCategory,
  onOpenOfferAction
}) => {
  const { addNotification } = useBakery();
  const [isVisible, setIsVisible] = useState(true);
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  const seasonalOffers: PromoOffer[] = [
    {
      id: 'holiday-season',
      badge: 'Holiday Winter Special',
      headline: 'Festive Spiced Plum Cake & Belgian Truffle Gift Boxes (100% Eggless)',
      subtext: 'Steeped candied fruits, cinnamon spices, and holiday gold ribbon packaging.',
      code: 'HOLIDAY25',
      expiryNote: 'Limited Festive Bakes',
      accentColor: 'from-red-950 via-emerald-950 to-stone-900',
      categoryTrigger: 'patisserie'
    },
    {
      id: 'autumn-hearth',
      badge: 'Weekend Hearth Special',
      headline: 'Complimentary Viennoiserie Pastry with Any 2 Sourdough Loaves',
      subtext: 'Stone-deck baked fresh daily at 6:15 AM. 100% natural wild levain & French butter.',
      code: 'HEARTH25',
      expiryNote: 'Ends Sunday 4:00 PM',
      accentColor: 'from-amber-900 via-amber-800 to-amber-950',
      categoryTrigger: 'artisan-bread'
    },
    {
      id: 'designer-cakes',
      badge: 'Custom Celebration Special',
      headline: '15% Off Designer & 100% Eggless Celebration Cakes',
      subtext: 'Bespoke multi-tier velvet gateaux, gold leaf accents & custom fondant artistry.',
      code: 'EGGLESS15',
      expiryNote: 'Early Bird Bookings',
      accentColor: 'from-rose-950 via-stone-900 to-amber-950',
      categoryTrigger: 'patisserie'
    },
    {
      id: 'morning-espresso',
      badge: 'Breakfast Bundle',
      headline: 'Add Ethiopian Guji Cold Brew to Any Hot Croissant for ₹99',
      subtext: 'Slow 20-hour cold drip immersion served over crystal block ice.',
      code: 'BREWPAIR',
      expiryNote: 'Daily until 11:30 AM',
      accentColor: 'from-stone-900 via-stone-850 to-amber-900',
      categoryTrigger: 'viennoiserie'
    }
  ];

  if (!isVisible) return null;

  const currentOffer = seasonalOffers[activeOfferIndex];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    addNotification(
      'success',
      'Promo Code Applied',
      `Coupon code "${code}" copied to clipboard! It will auto-apply at checkout.`
    );
    if (onOpenOfferAction) {
      onOpenOfferAction(code);
    }
  };

  const handleNextOffer = () => {
    setActiveOfferIndex((prev) => (prev + 1) % seasonalOffers.length);
  };

  return (
    <aside 
      aria-label="Seasonal Announcements and Offers"
      className="relative w-full bg-gradient-to-r text-white shadow-md border-b border-amber-900/20 overflow-hidden transition-all duration-300"
      style={{
        backgroundImage: activeOfferIndex === 0
          ? 'linear-gradient(110deg, #580c14 0%, #154326 50%, #291507 100%)'
          : activeOfferIndex === 1
          ? 'linear-gradient(110deg, #451a03 0%, #78350f 45%, #291507 100%)'
          : activeOfferIndex === 2
          ? 'linear-gradient(110deg, #4c0519 0%, #1c1917 50%, #451a03 100%)'
          : 'linear-gradient(110deg, #1c1917 0%, #292524 50%, #78350f 100%)'
      }}
    >
      {/* Subtle background decorative warm rings */}
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-amber-600/10 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
          
          {/* Left: Badge, Headline & Subtext */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden sm:flex p-2 rounded-xl bg-white/10 backdrop-blur-xs text-amber-300 shrink-0 border border-white/10">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  {currentOffer.badge}
                </span>
                <span className="text-[11px] text-amber-200/70 hidden sm:inline flex items-center gap-1">
                  <Clock className="w-3 h-3 inline" /> {currentOffer.expiryNote}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-tight text-white line-clamp-1">
                {currentOffer.headline}
              </p>
              <p className="text-[11px] text-stone-300 hidden md:block line-clamp-1 opacity-90">
                {currentOffer.subtext}
              </p>
            </div>
          </div>

          {/* Right: Actions, Code, Carousel dots & Dismiss */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 w-full md:w-auto shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-white/10">
            
            {/* Promo Code Pill with Copy Action */}
            <button
              onClick={() => handleCopyCode(currentOffer.code)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-mono font-medium transition-all active:scale-95 shadow-2xs"
              title="Click to copy coupon code"
              aria-label={`Copy coupon code ${currentOffer.code}`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Use Code: <strong>{currentOffer.code}</strong></span>
            </button>

            {/* Direct Shop Action Link */}
            {currentOffer.categoryTrigger && onSelectCategory && (
              <button
                onClick={() => onSelectCategory(currentOffer.categoryTrigger!)}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold transition-all shadow-xs"
              >
                <span>View Bakes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Cycle through offers */}
            <button
              onClick={handleNextOffer}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Next Announcement"
              aria-label="Next seasonal offer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dismiss banner */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Dismiss announcement"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {seasonalOffers.map((offer, idx) => (
            <button
              key={offer.id}
              onClick={() => setActiveOfferIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeOfferIndex === idx ? 'w-6 bg-amber-300' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Slide to offer ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
