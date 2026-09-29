import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product, ProductCategory, DietaryTag } from '../types';
import { ProductCard } from './ProductCard';
import { PromotionalBanner } from './PromotionalBanner';
import { Search, Sparkles, Filter, Mic, ArrowDown, Flame, Clock } from 'lucide-react';

interface CustomerCatalogViewProps {
  onQuickView: (product: Product) => void;
  onOpenVoice: () => void;
  onOpenCart: () => void;
}

export const CustomerCatalogView: React.FC<CustomerCatalogViewProps> = ({
  onQuickView,
  onOpenVoice,
  onOpenCart
}) => {
  const { products, t } = useBakery();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const dietaryOptions: DietaryTag[] = ['Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'Organic', 'Eggless'];

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t('all_items') },
    { id: 'artisan-bread', label: t('artisan_bread') },
    { id: 'viennoiserie', label: t('viennoiserie') },
    { id: 'patisserie', label: t('patisserie') },
    { id: 'savoury', label: t('savoury') },
    { id: 'beverages', label: t('beverages') }
  ];

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleBannerCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const element = document.getElementById('menu-catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(product => {
    // Search match
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.ingredients && product.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())));

    // Category match
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Dietary match (all selected dietary tags must be met)
    const matchesDietary =
      selectedDietary.length === 0 ||
      selectedDietary.every(tag => product.dietary?.includes(tag));

    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* Promotional & Seasonal Offer Banner at Top of Catalog */}
      <PromotionalBanner
        onSelectCategory={handleBannerCategorySelect}
        onOpenOfferAction={() => onOpenCart()}
      />

      {/* Storefront Hero: Single focal point conforming to e-commerce guidelines */}
      <section 
        className="relative overflow-hidden pt-8 sm:pt-16 pb-12 sm:pb-20 border-b transition-colors"
        style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--bg-cream)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Typography & CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              <div 
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold"
                style={{ color: 'var(--cta-caramel)' }}
              >
                <span>Hand-Crafted in Stone Hearth Decks</span>
                <span aria-hidden="true">·</span>
                <span>Batches Pulled Every 4 Hours</span>
              </div>

              <h1 
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-balance transition-colors"
                style={{ color: 'var(--text-chocolate)' }}
              >
                Pure sourdough levain, French butter, and honest hearth heat.
              </h1>

              <p 
                className="text-sm sm:text-base leading-relaxed max-w-xl transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                Welcome to <strong>SS Bakers</strong>. We mill stoneground heirloom grains and ferment each dough loaf over 36 hours for exceptional crumb, custardy texture, and singing caramelized crusts.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#menu-catalog"
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#D4AF37]/30 hover:shadow-lg hover:scale-[1.02] flex items-center gap-2"
                  style={{ 
                    backgroundColor: 'var(--cta-caramel)', 
                    color: 'var(--cta-text, #3D2314)'
                  }}
                >
                  <span>Explore Daily Bakes</span>
                  <ArrowDown className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
                </a>

                <button
                  onClick={onOpenVoice}
                  className="px-5 py-3.5 rounded-xl border font-semibold text-xs transition-all flex items-center gap-2 shadow-2xs hover:scale-[1.02]"
                  style={{ 
                    borderColor: 'var(--accent-rose)', 
                    backgroundColor: 'var(--card-surface, #FFFFFF)',
                    color: 'var(--text-chocolate)'
                  }}
                >
                  <Mic className="w-4 h-4" style={{ color: 'var(--cta-caramel)' }} />
                  <span>Voice Quick Order</span>
                </button>
              </div>

              {/* Claim-to-Proof Adjacency */}
              <div 
                className="pt-6 border-t grid grid-cols-3 gap-4 text-xs"
                style={{ borderColor: 'var(--accent-rose)' }}
              >
                <div>
                  <span 
                    className="font-mono-numbers text-lg sm:text-xl font-bold block"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    36h
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Natural Ferment</span>
                </div>
                <div>
                  <span 
                    className="font-mono-numbers text-lg sm:text-xl font-bold block"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    485°F
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Granite Deck Bake</span>
                </div>
                <div>
                  <span 
                    className="font-mono-numbers text-lg sm:text-xl font-bold block"
                    style={{ color: 'var(--text-chocolate)' }}
                  >
                    100%
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>French AOP Butter</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div 
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border transition-colors"
                style={{ borderColor: 'var(--accent-rose)', backgroundColor: 'var(--card-surface, #FFFFFF)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
                  alt="SS Bakers fresh sourdough loaves and pastries"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase"
                      style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #FFFFFF)' }}
                    >
                      Morning Bake 6:15 AM
                    </span>
                    <span className="text-xs opacity-90">Hearth Deck 2</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    San Francisco Sourdough Boule
                  </h3>
                  <p className="text-xs opacity-80 mt-1 line-clamp-1">
                    Crisp singing ear with caramelized blister crust & wild lactic crumb.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Catalog Grid & Interactive Filter Module */}
      <section id="menu-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span 
              className="text-xs font-mono uppercase tracking-widest font-semibold block mb-1"
              style={{ color: 'var(--cta-caramel)' }}
            >
              Storefront Catalog
            </span>
            <h2 
              className="font-display text-2xl sm:text-3xl font-bold transition-colors"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Fresh Daily Bake Selection
            </h2>
          </div>

          {/* Fast Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border shadow-2xs focus:ring-2 focus:outline-none transition-colors"
              style={{ 
                borderColor: 'var(--accent-rose)', 
                backgroundColor: 'var(--card-surface, #FFFFFF)', 
                color: 'var(--text-chocolate)' 
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs font-medium hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Segmented Control Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shadow-2xs ${
                selectedCategory === cat.id
                  ? 'text-white shadow-xs scale-[1.02]'
                  : 'bg-white dark:bg-stone-900 text-[#231309] dark:text-stone-300 hover:bg-[#FFF6F0] border border-[#F3E0D3]'
              }`}
              style={selectedCategory === cat.id ? {
                backgroundColor: 'var(--cta-caramel)',
                color: 'var(--cta-text, #3D2314)'
              } : {
                backgroundColor: 'var(--card-surface, #FFFFFF)',
                color: 'var(--text-chocolate)',
                borderColor: 'var(--accent-rose)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filter Buttons */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#231309]/60 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Dietary:
          </span>
          {dietaryOptions.map((tag) => {
            const isSelected = selectedDietary.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'border-[#E67300] bg-[#FFF6F0] text-[#E67300] font-bold shadow-2xs'
                    : 'border-[#F3E0D3] text-[#231309]/80 hover:border-[#E67300] bg-white dark:bg-stone-900'
                }`}
                style={isSelected ? {
                  borderColor: 'var(--cta-caramel)',
                  backgroundColor: 'var(--accent-rose-light)',
                  color: 'var(--cta-caramel)'
                } : {
                  borderColor: 'var(--accent-rose)',
                  backgroundColor: 'var(--card-surface, #FFFFFF)',
                  color: 'var(--text-chocolate)'
                }}
              >
                {tag} {isSelected && '✓'}
              </button>
            );
          })}
          {selectedDietary.length > 0 && (
            <button
              onClick={() => setSelectedDietary([])}
              className="text-[11px] text-[#E67300] hover:underline font-bold whitespace-nowrap ml-2"
              style={{ color: 'var(--cta-caramel)' }}
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Product Grid: 3-column desktop layout with generous gap-6/8 */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
              <span className="text-5xl mb-3 inline-block">🔍</span>
              <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
                No Bakery Items Match Your Filter
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try clearing search terms or dietary filters to browse our full daily hearth selection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary([]);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-semibold hover:bg-amber-950"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </div>

      </section>

    </div>
  );
};
