import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { 
  Sparkles, 
  Cake, 
  Croissant, 
  Utensils, 
  Leaf, 
  Star, 
  CheckCircle2, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Award,
  Users,
  Building,
  HeartHandshake,
  Send,
  MessageSquareHeart,
  Palette
} from 'lucide-react';

interface BusinessShowcaseProps {
  onOrderOnline: () => void;
  onOpenConsultation: () => void;
}

export const BusinessShowcase: React.FC<BusinessShowcaseProps> = ({
  onOrderOnline,
  onOpenConsultation
}) => {
  const { addNotification } = useBakery();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // In-page Custom Order Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [celebrationDate, setCelebrationDate] = useState('');
  const [occasionType, setOccasionType] = useState('Birthday Celebration');
  const [cakeTierSize, setCakeTierSize] = useState('2-Tier (35 - 50 Guests)');
  const [isEggless, setIsEggless] = useState(true);
  const [flavorChoice, setFlavorChoice] = useState('Dark Chocolate Velvet & Gold Leaf');
  const [budgetRange, setBudgetRange] = useState('₹2,000 - ₹5,000');
  const [designNotes, setDesignNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCustomOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    addNotification(
      'success',
      'Inquiry Received with Love',
      `Thank you, ${clientName}! Our master baker will reach out to you at ${clientPhone} within 2 business hours.`
    );
  };

  // 1. Key Offerings Services with warm copywriting
  const services = [
    {
      icon: <Cake className="w-6 h-6 text-[#3D2314] dark:text-[#D4AF37]" />,
      badge: 'Artisan Designer',
      title: 'Custom Designer Cakes',
      description: 'Handcrafted multi-tier wedding centerpieces, mirror-glaze velvet gateaux, and sweet fondant sculptures created with delicate sugar florals.'
    },
    {
      icon: <Croissant className="w-6 h-6 text-[#3D2314] dark:text-[#D4AF37]" />,
      badge: 'French Viennoiserie',
      title: 'Artisan Confectionery',
      description: 'Warm, flaky 27-layer cultured butter croissants, Bronte pistachio tarts, and slow-proofed brioche baked fresh every sunrise.'
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#3D2314] dark:text-[#D4AF37]" />,
      badge: 'Warm & Comforting',
      title: 'Savory Fast-Food Staples',
      description: 'Freshly baked calzones, flaky paneer puffs, stuffed Mediterranean focaccia pockets, and rich slow-steeped espresso beverages.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      badge: 'Pure Vegetarian Love',
      title: '100% Eggless Customisation',
      description: 'Crafted in dedicated pure vegetarian workflows. Irresistibly moist sponge, airy frosting, and melt-in-your-mouth textures with zero eggs or gelatin.'
    }
  ];

  // 2. Proof Metrics & Verified Testimonials
  const milestones = [
    { value: '18,500+', label: 'Celebrations Sweetened', icon: <Award className="w-5 h-5 text-[#3D2314] dark:text-[#D4AF37]" /> },
    { value: '12+', label: 'Kitchen & Retail Hubs', icon: <Building className="w-5 h-5 text-[#3D2314] dark:text-[#D4AF37]" /> },
    { value: '99.4%', label: 'On-Time Joyful Deliveries', icon: <Clock className="w-5 h-5 text-[#3D2314] dark:text-[#D4AF37]" /> },
    { value: '100%', label: 'Eggless Certified Kitchen', icon: <Leaf className="w-5 h-5 text-emerald-700 dark:text-emerald-400" /> }
  ];

  const testimonials = [
    {
      quote: "The 3-tier dark chocolate velvet wedding cake for our reception in Warangal was simply magical! Every single guest loved that it was 100% eggless while being exceptionally moist and luxurious.",
      author: "Pooja & Rakesh Reddy",
      event: "Grand Wedding Reception (500 Guests)",
      rating: 5
    },
    {
      quote: "Stepping into SS Bakers fills you with the cozy aroma of warm cinnamon and roasted cocoa. Their fresh morning sourdough and almond croissants are a breakfast staple for our family.",
      author: "Dr. Vikram K. Rao",
      event: "Weekend Family Breakfast",
      rating: 5
    },
    {
      quote: "Our daughter's first birthday princess cake was sculpted to perfection! The pastel pink buttercream was smooth, gentle on sweetness, and arrived in pristine condition.",
      author: "Sunita & Anish Deshmukh",
      event: "First Birthday Celebration",
      rating: 5
    }
  ];

  // 3. FAQs: 3 Realistic High-Conversion Questions
  const faqs = [
    {
      question: "Are your 100% eggless cakes baked in a separate, dedicated vegetarian kitchen?",
      answer: "Yes, with the utmost care and love! We operate strict vegetarian preparation protocols with separate mixing bowls, baking pans, and ovens designated specifically for our 100% Eggless creations. We substitute egg proteins with fermented cultured yogurt, natural flax levain, and organic fruit pectin to achieve a velvety, heavenly crumb."
    },
    {
      question: "How much advance notice is needed for custom designer and multi-tiered celebration cakes?",
      answer: "For standard custom celebration cakes (1-2 tiers), we kindly suggest placing your order 24 to 48 hours in advance so our head cake decorators can hand-sculpt your details. For grand multi-tiered wedding centerpieces (3+ tiers) or complex architectural fondant motifs, 3 to 5 days allows us to guarantee perfect artistry and custom color matching."
    },
    {
      question: "What are your delivery windows and how do you safeguard delicate celebration cakes?",
      answer: "We offer temperature-controlled courier delivery across Warangal, Hanamkonda, and Kazipet within scheduled 45-minute windows from 8:00 AM to 9:30 PM daily. Each celebration cake is packaged in a heavy-duty reinforced pedestal box with internal food-safe supports and cooling bases to ensure your cake arrives picture-perfect."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
      
      {/* SECTION 1: Key Offerings (Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#3D2314]/80 dark:text-[#D4AF37] font-semibold block mb-2">
            Baked Fresh With Warmth & Passion
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl font-bold text-[#3D2314] dark:text-[#FDFBF7] tracking-tight leading-tight"
            style={{ color: 'var(--text-chocolate)' }}
          >
            Our Heartfelt Bakery Offerings
          </h2>
          <p 
            className="text-[#3D2314]/80 dark:text-stone-300 text-sm mt-3 leading-relaxed"
            style={{ color: 'var(--text-chocolate)' }}
          >
            Welcome to the home of slow stone-hearth baking! Whether you're planning an unforgettable wedding or dropping in for an afternoon treat, we craft each recipe with pure French butter, unbleached flours, and sincere love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <div 
              key={idx}
              className="rounded-3xl p-6 border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              style={{ backgroundColor: 'var(--card-surface, #FFFFFF)', borderColor: 'var(--accent-rose)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 w-12 h-12 rounded-2xl flex items-center justify-center border"
                    style={{ backgroundColor: 'var(--accent-rose-light)', borderColor: 'var(--accent-rose)' }}
                  >
                    {svc.icon}
                  </div>
                  <span 
                    className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border font-bold"
                    style={{ backgroundColor: 'var(--accent-rose-light)', color: 'var(--cta-caramel)', borderColor: 'var(--accent-rose)' }}
                  >
                    {svc.badge}
                  </span>
                </div>
                
                <h3 
                  className="font-display text-lg font-bold mb-2 transition-colors"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  {svc.title}
                </h3>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {svc.description}
                </p>
              </div>

              <div 
                className="mt-6 pt-4 border-t flex items-center gap-1.5 text-xs font-semibold"
                style={{ borderColor: 'var(--accent-rose)', color: 'var(--text-chocolate)' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Baked From Scratch Daily</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Proof & Credibility (Metrics, Visual Portfolio, Testimonials) */}
      <section 
        className="border-y py-16 transition-colors"
        style={{ backgroundColor: 'var(--bg-cream)', borderColor: 'var(--accent-rose)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Milestone Metrics Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-3xl border text-center shadow-xs transition-colors"
                style={{ backgroundColor: 'var(--card-surface, #FFFFFF)', borderColor: 'var(--accent-rose)' }}
              >
                <div 
                  className="inline-flex p-2.5 rounded-2xl mb-2 border"
                  style={{ backgroundColor: 'var(--accent-rose-light)', borderColor: 'var(--accent-rose)' }}
                >
                  {m.icon}
                </div>
                <div 
                  className="font-mono-numbers text-3xl sm:text-4xl font-extrabold"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  {m.value}
                </div>
                <div className="text-xs font-medium mt-1 uppercase tracking-wider font-mono" style={{ color: 'var(--text-muted)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Masterpiece Portfolio */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#3D2314]/80 dark:text-[#D4AF37] font-semibold block mb-1">
                  Sweet Memories Captured
                </span>
                <h3 
                  className="font-display text-2xl sm:text-3xl font-bold text-[#3D2314] dark:text-[#FDFBF7]"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  Visual Masterpiece Portfolio
                </h3>
                <p 
                  className="text-xs text-[#3D2314]/80 dark:text-stone-400 mt-1 max-w-xl"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  Take a peek into our pastry atelier: from three-tier pastel floral wedding gateaux to rich, golden-crusted sourdough loaves cooling on pine baker racks.
                </p>
              </div>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-2.5 rounded-2xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-900 text-[#3D2314] dark:text-stone-200 hover:bg-[#F3E1DC]/50 text-xs font-semibold self-start md:self-auto flex items-center gap-2 shadow-2xs transition-colors"
                style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
              >
                <Palette className="w-4 h-4 text-[#3D2314] dark:text-[#D4AF37]" />
                <span>Explore Custom Flavor & Design Book</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800 border border-[#F3E1DC] dark:border-stone-700 shadow-sm"
                style={{ borderColor: 'var(--accent-rose)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Tiered Celebration Cake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2314]/90 via-[#3D2314]/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span 
                    className="text-[10px] font-mono uppercase text-[#3D2314] font-bold px-2 py-0.5 rounded bg-[#D4AF37] w-fit mb-1"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    Designer Highlight
                  </span>
                  <h4 className="font-display text-base font-bold text-white">Pastel Rose Botanical Wedding Gateau</h4>
                  <p className="text-xs text-[#F3E1DC]">100% Eggless vanilla bean sponge with delicate petal textures</p>
                </div>
              </div>

              <div 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800 border border-[#F3E1DC] dark:border-stone-700 shadow-sm"
                style={{ borderColor: 'var(--accent-rose)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80"
                  alt="Stone Hearth Loaves"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2314]/90 via-[#3D2314]/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span 
                    className="text-[10px] font-mono uppercase text-[#3D2314] font-bold px-2 py-0.5 rounded bg-[#D4AF37] w-fit mb-1"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    Hearth Tradition
                  </span>
                  <h4 className="font-display text-base font-bold text-white">Country Sourdough Boule</h4>
                  <p className="text-xs text-[#F3E1DC]">36-hour wild yeast slow fermentation with crackling crust</p>
                </div>
              </div>

              <div 
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800 border border-[#F3E1DC] dark:border-stone-700 shadow-sm"
                style={{ borderColor: 'var(--accent-rose)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
                  alt="French Viennoiserie Croissants"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2314]/90 via-[#3D2314]/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span 
                    className="text-[10px] font-mono uppercase text-[#3D2314] font-bold px-2 py-0.5 rounded bg-[#D4AF37] w-fit mb-1"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    Morning Pâtisserie
                  </span>
                  <h4 className="font-display text-base font-bold text-white">Pure French Butter Croissants</h4>
                  <p className="text-xs text-[#F3E1DC]">Folded with 84% cultured AOP butter for delicate honeycomb layers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div>
            <h3 
              className="font-display text-2xl font-bold text-[#3D2314] dark:text-[#FDFBF7] mb-6 text-center"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Warm Words from Our Bakery Family
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl border shadow-2xs flex flex-col justify-between transition-colors"
                  style={{ backgroundColor: 'var(--card-surface, #FFFFFF)', borderColor: 'var(--accent-rose)' }}
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p 
                      className="text-xs sm:text-sm italic leading-relaxed"
                      style={{ color: 'var(--text-chocolate)' }}
                    >
                      "{t.quote}"
                    </p>
                  </div>

                  <div 
                    className="mt-5 pt-4 border-t"
                    style={{ borderColor: 'var(--accent-rose)' }}
                  >
                    <p 
                      className="text-xs font-bold"
                      style={{ color: 'var(--text-chocolate)' }}
                    >
                      {t.author}
                    </p>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Custom Cake Inquiry Form (Layout Component) */}
      <section id="custom-cake-inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl border p-6 sm:p-10 shadow-md transition-colors"
          style={{ backgroundColor: 'var(--card-surface, #FFFFFF)', borderColor: 'var(--accent-rose)' }}
        >
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span 
              className="text-xs font-mono uppercase tracking-widest font-semibold block mb-1"
              style={{ color: 'var(--cta-caramel)' }}
            >
              Bespoke Celebration Studio
            </span>
            <h2 
              className="font-display text-2xl sm:text-3xl font-bold transition-colors"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Custom Cake Inquiry & Design Form
            </h2>
            <p 
              className="text-xs sm:text-sm mt-2 leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Tell us your celebration dreams! Our cake artists will customize tiered designs, palette themes, and 100% eggless flavor profiles to make your occasion truly unforgettable.
            </p>
          </div>

          {formSubmitted ? (
            <div 
              className="p-8 text-center rounded-2xl border space-y-3 animate-in fade-in duration-300"
              style={{ backgroundColor: 'var(--accent-rose-light)', borderColor: 'var(--accent-rose)' }}
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 
                className="font-display text-xl font-bold"
                style={{ color: 'var(--text-chocolate)' }}
              >
                Thank You, {clientName}!
              </h3>
              <p 
                className="text-xs sm:text-sm max-w-md mx-auto"
                style={{ color: 'var(--text-muted)' }}
              >
                Your custom cake design inquiry for your <strong>{occasionType}</strong> has been received by our head baker. We will call you directly at <strong className="font-mono" style={{ color: 'var(--cta-caramel)' }}>{clientPhone}</strong> to finalize sketches.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-3 px-5 py-2.5 text-xs font-bold rounded-xl text-white shadow-xs hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #FFFFFF)' }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomOrderSubmit} className="space-y-5">
              
              {/* Row 1: Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  />
                </div>

                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Phone Number (WhatsApp for Design Sketches) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 8978275273"
                    className="w-full text-xs font-mono p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  />
                </div>
              </div>

              {/* Row 2: Date & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  />
                </div>

                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Celebration Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={celebrationDate}
                    onChange={(e) => setCelebrationDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  />
                </div>

                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Occasion / Event *
                  </label>
                  <select
                    value={occasionType}
                    onChange={(e) => setOccasionType(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  >
                    <option value="Wedding Reception">Wedding Reception (Multi-Tier)</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Baby Shower / Naming Ceremony">Baby Shower / Naming Ceremony</option>
                    <option value="Anniversary Gala">Anniversary Milestone</option>
                    <option value="Corporate Celebration">Corporate Milestone</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Tiers, Flavors & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Tier & Guest Serving Size
                  </label>
                  <select
                    value={cakeTierSize}
                    onChange={(e) => setCakeTierSize(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  >
                    <option value="Single Tier (15 - 25 Guests)">Single Tier (15 - 25 Guests)</option>
                    <option value="2-Tier (35 - 50 Guests)">2-Tier (35 - 50 Guests)</option>
                    <option value="3-Tier Grand (75 - 120 Guests)">3-Tier Grand (75 - 120 Guests)</option>
                    <option value="Bespoke Showcase (150+ Guests)">Bespoke Showcase (150+ Guests)</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Flavor Profile Preference
                  </label>
                  <select
                    value={flavorChoice}
                    onChange={(e) => setFlavorChoice(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  >
                    <option value="Dark Chocolate Velvet & Gold Leaf">Dark Chocolate Velvet & Gold Leaf</option>
                    <option value="Wild Raspberry & Bronte Pistachio">Wild Raspberry & Bronte Pistachio</option>
                    <option value="Madagascar Vanilla & Pastel Rose">Madagascar Vanilla & Pastel Rose</option>
                    <option value="Belgian Hazelnut Praline">Belgian Hazelnut Praline</option>
                    <option value="Mango Saffron Shrikhand Gateau">Mango Saffron Shrikhand Gateau</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    Estimated Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                  >
                    <option value="₹1,500 - ₹3,000">₹1,500 - ₹3,000 (Artisan Single)</option>
                    <option value="₹3,000 - ₹6,000">₹3,000 - ₹6,000 (Tiered Designer)</option>
                    <option value="₹6,000 - ₹12,000">₹6,000 - ₹12,000 (Luxury Wedding)</option>
                    <option value="₹12,000+">₹12,000+ (Grand Architectural)</option>
                  </select>
                </div>
              </div>

              {/* Eggless Requirement Switcher */}
              <div 
                className="p-4 bg-[#F3E1DC]/40 dark:bg-[#2A1510] rounded-2xl border border-[#F3E1DC] dark:border-stone-700 flex items-center justify-between"
                style={{ backgroundColor: 'var(--accent-rose-light)', borderColor: 'var(--accent-rose)' }}
              >
                <div>
                  <span 
                    className="text-xs font-bold text-[#3D2314] dark:text-[#FDFBF7] block"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    100% Certified Eggless Requirement
                  </span>
                  <span className="text-[11px] text-[#3D2314]/70">
                    Prepared in dedicated pure vegetarian facilities with zero gelatin or animal byproduct enzymes.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3D2314]"></div>
                </label>
              </div>

              {/* Custom Design Notes */}
              <div>
                <label 
                  className="text-[11px] font-semibold text-[#3D2314] dark:text-stone-300 block mb-1"
                  style={{ color: 'var(--text-chocolate)' }}
                >
                  Design Vision, Color Palette & Custom Inscriptions
                </label>
                <textarea
                  rows={3}
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="Describe your theme (e.g. Pastel pink watercolor with gold leaf, baby safari characters, or fresh botanical florals)..."
                  className="w-full text-xs p-3 rounded-xl border border-[#F3E1DC] dark:border-stone-700 bg-[#FDFBF7] dark:bg-stone-800 text-[#3D2314] dark:text-[#FDFBF7] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)', color: 'var(--text-chocolate)' }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:scale-[1.01] transition-all active:scale-[0.99] border border-white/20"
                style={{ 
                  backgroundColor: 'var(--cta-caramel)', 
                  color: 'var(--cta-text, #FFFFFF)' 
                }}
              >
                <Send className="w-4 h-4 text-white" />
                <span>Submit Custom Cake Inquiry</span>
              </button>
            </form>
          )}

        </div>
      </section>

      {/* SECTION 4: Realistic High-Conversion FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span 
            className="text-xs font-mono uppercase tracking-widest font-semibold block mb-1"
            style={{ color: 'var(--cta-caramel)' }}
          >
            Questions & Answers
          </span>
          <h2 
            className="font-display text-3xl font-bold transition-colors"
            style={{ color: 'var(--text-chocolate)' }}
          >
            Frequently Asked Questions
          </h2>
          <p 
            className="text-xs mt-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear guidelines on eggless safety, custom ordering lead times, and temperature-controlled logistics.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border overflow-hidden shadow-2xs transition-all"
                style={{ backgroundColor: 'var(--card-surface, #FFFFFF)', borderColor: 'var(--accent-rose)' }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span 
                    className="font-display text-sm sm:text-base font-bold transition-colors"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    {faq.question}
                  </span>
                  <div 
                    className="p-1.5 rounded-lg shrink-0 transition-colors"
                    style={{ backgroundColor: 'var(--accent-rose-light)', color: 'var(--cta-caramel)' }}
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div 
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t"
                    style={{ borderColor: 'var(--accent-rose)', color: 'var(--text-muted)' }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Warm Contact Details & High-Visibility CTAs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="bg-gradient-to-br from-[#3D2314] via-[#2D170D] to-[#452210] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-[#F3E1DC]/30"
          style={{ borderColor: 'var(--accent-rose)' }}
        >
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Warm Greeting & Flagship Contact Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span 
                  className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block mb-2"
                  style={{ color: 'var(--cta-caramel)' }}
                >
                  SS Bakers Flagship Bakery Hub
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  We Can't Wait to Bake For Your Special Day
                </h2>
                <p className="text-sm text-[#F3E1DC] mt-3 leading-relaxed">
                  Visit our counter to smell the fresh morning loaves, connect with our friendly baking team, or place your instant order online.
                </p>
              </div>

              {/* Exact Provided Contact Details with Warm Styling */}
              <div className="pt-2 space-y-3 font-mono text-xs">
                <a 
                  href="tel:8978275273"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/20"
                >
                  <div 
                    className="p-2.5 rounded-xl shrink-0 font-bold shadow-xs"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    <Phone className="w-4 h-4" style={{ color: 'var(--text-chocolate)' }} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/80 block uppercase font-sans">Telephone / WhatsApp Orders</span>
                    <span className="text-sm font-bold tracking-wider text-white">8978275273</span>
                  </div>
                </a>

                <a 
                  href="mailto:ssbakers@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/20"
                >
                  <div 
                    className="p-2.5 rounded-xl shrink-0 font-bold shadow-xs"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    <Mail className="w-4 h-4" style={{ color: 'var(--text-chocolate)' }} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/80 block uppercase font-sans">Official Email Inquiries</span>
                    <span className="text-sm font-bold tracking-wider text-white">ssbakers@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20">
                  <div 
                    className="p-2.5 rounded-xl shrink-0 mt-0.5 font-bold shadow-xs"
                    style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--text-chocolate)' }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: 'var(--text-chocolate)' }} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/80 block uppercase font-sans">Flagship Storefront Address</span>
                    <span className="text-xs sm:text-sm font-sans font-medium text-white leading-snug">
                      opposite to grandgayathri hotel, warangal chowrastha, near warangal bus stand-506300
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: High-Visibility CTAs (Primary & Secondary) */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl">
              
              <div className="text-center pb-2">
                <span 
                  className="text-xs font-mono uppercase font-bold tracking-wider"
                  style={{ color: 'var(--cta-caramel)' }}
                >
                  Immediate Bakery Action
                </span>
                <h3 className="font-display text-xl font-bold mt-1 text-white">
                  Start Your Bakery Experience
                </h3>
              </div>

              {/* PRIMARY CTA: High-Visibility Order Online */}
              <button
                onClick={onOrderOnline}
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-[#F3E1DC]/50 cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--cta-caramel)', 
                  color: 'var(--text-chocolate)'
                }}
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-5 h-5" style={{ color: 'var(--text-chocolate)' }} />
              </button>

              {/* SECONDARY CTA: Book Custom Cake Consultation */}
              <button
                onClick={onOpenConsultation}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm"
              >
                <Cake className="w-4 h-4 text-white" />
                <span>Book a Custom Cake Consultation</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/90 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fresh from the oven with real-time tracking</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
