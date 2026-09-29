import React, { useState } from 'react';
import { Product } from '../types';
import { useBakery } from '../context/BakeryContext';
import { Plus, Eye, Flame, Clock } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, t } = useBakery();
  const [imageFailed, setImageFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isLowStock = product.stock <= product.lowStockThreshold && product.stock > 0;
  const isOutOfStock = product.stock <= 0;

  // Category fallback styling
  const categoryGradients: Record<string, string> = {
    'artisan-bread': 'from-amber-100 to-amber-200 dark:from-stone-800 dark:to-stone-900',
    'viennoiserie': 'from-orange-100 to-amber-150 dark:from-stone-800 dark:to-stone-900',
    'patisserie': 'from-rose-100 to-amber-100 dark:from-stone-800 dark:to-stone-900',
    'savoury': 'from-emerald-100 to-amber-100 dark:from-stone-800 dark:to-stone-900',
    'beverages': 'from-amber-200 to-stone-200 dark:from-stone-800 dark:to-stone-900'
  };

  return (
    <article
      className="group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
      style={{ 
        backgroundColor: 'var(--card-surface, #FFFFFF)',
        borderColor: isHovered ? 'var(--cta-caramel)' : 'var(--accent-rose)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Slot with Resilient Zero-Broken-Image Fallback */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden transition-colors"
        style={{ backgroundColor: 'var(--accent-rose-light)' }}
      >
        {!imageFailed && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br ${categoryGradients[product.category] || 'from-amber-50 to-stone-100'} text-[#3D2314] dark:text-amber-100`}>
            <span className="font-display text-4xl mb-2">🍞</span>
            <span className="text-xs font-semibold tracking-wider uppercase opacity-75">{product.category.replace('-', ' ')}</span>
            <span className="text-xs text-center font-display italic mt-1 px-4 line-clamp-2">{product.title}</span>
          </div>
        )}

        {/* Minimal Unboxed Editorial Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span 
              className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs border backdrop-blur-xs"
              style={{ 
                backgroundColor: 'var(--card-surface, #FFFFFF)', 
                color: 'var(--cta-caramel)', 
                borderColor: 'var(--accent-rose)' 
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Trigger on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className={`absolute bottom-3 right-3 p-2 rounded-xl shadow-md border transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
          }`}
          style={{ 
            borderColor: 'var(--accent-rose)', 
            backgroundColor: 'var(--card-surface, #FFFFFF)',
            color: 'var(--cta-caramel)' 
          }}
          aria-label={`Quick inspect ${product.title}`}
          title="Quick inspect"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">
        
        {/* Unboxed Metadata Line with Typographic Separators */}
        <div 
          className="flex items-center gap-1.5 text-xs mb-1.5 font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="uppercase tracking-wider font-semibold text-[11px]">
            {product.category.replace('-', ' ')}
          </span>
          {product.dietary.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{product.dietary.slice(0, 2).join(', ')}</span>
            </>
          )}
          {product.prepTimeMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3 opacity-70" />
                {product.prepTimeMinutes}m
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-display text-lg font-bold transition-colors cursor-pointer line-clamp-1 hover:opacity-80"
          style={{ color: 'var(--text-chocolate)' }}
        >
          {product.title}
        </h3>

        {/* Description */}
        <p 
          className="text-xs line-clamp-2 mt-1.5 leading-relaxed flex-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {product.description}
        </p>

        {/* Stock & Price Line */}
        <div 
          className="pt-4 mt-3 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--accent-rose)' }}
        >
          <div>
            <div 
              className="font-mono-numbers text-lg font-bold"
              style={{ color: 'var(--text-chocolate)' }}
            >
              {formatINR(product.price)}
            </div>
            
            {/* Dynamic Stock State */}
            <div className="text-[11px] font-medium mt-0.5">
              {isOutOfStock ? (
                <span className="text-rose-600 dark:text-rose-400 font-semibold">{t('out_of_stock')}</span>
              ) : isLowStock ? (
                <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--cta-caramel)' }}>
                  <Flame className="w-3 h-3 inline animate-pulse" />
                  Only {product.stock} left in batch
                </span>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {product.stock} fresh in store
                </span>
              )}
            </div>
          </div>

          {/* Functional Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
              isOutOfStock
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed border-stone-200'
                : 'shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95'
            }`}
            style={!isOutOfStock ? {
              backgroundColor: 'var(--cta-caramel)',
              color: 'var(--cta-text, #3D2314)'
            } : undefined}
            aria-label={`Add ${product.title} to bag`}
          >
            <Plus className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
            <span>{t('add_to_cart')}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
