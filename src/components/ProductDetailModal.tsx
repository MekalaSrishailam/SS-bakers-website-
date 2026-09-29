import React, { useState } from 'react';
import { Product } from '../types';
import { useBakery } from '../context/BakeryContext';
import { X, Plus, Minus, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, t } = useBakery();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const maxAvailable = Math.min(product.stock, 20);

  const handleAdd = () => {
    addToCart(product, quantity, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Side */}
        <div className="md:w-1/2 relative bg-stone-100 dark:bg-stone-800/50 min-h-[240px] md:min-h-full">
          {!imageError && product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-100">
              <span className="font-display text-5xl mb-3">🥐</span>
              <p className="text-sm font-semibold uppercase tracking-wider">{product.category}</p>
            </div>
          )}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-950 dark:text-amber-100 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm px-3 py-1 rounded-md shadow-xs">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="uppercase tracking-wider font-semibold text-amber-800 dark:text-amber-400">
              {product.category.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.stock > 0 ? `${product.stock} available today` : 'Sold out'}</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-amber-950 dark:text-amber-100 leading-tight">
            {product.title}
          </h2>

          <div className="font-mono-numbers text-xl font-bold text-amber-900 dark:text-amber-300 mt-2">
            {formatINR(product.price)}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Dietary & Highlights */}
          {product.dietary.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Dietary & Allergens
              </span>
              <div className="text-xs text-stone-700 dark:text-stone-300 flex flex-wrap gap-x-3 gap-y-1">
                {product.dietary.map(d => (
                  <span key={d} className="inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Key Hearth Ingredients
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                {product.ingredients.join(', ')}.
              </p>
            </div>
          )}

          {/* Special baking note */}
          <div className="mt-4">
            <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Custom Baking Request (Optional)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Sliced medium, birthday candles, warm lightly..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>

          {/* Quantity and Order Action */}
          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-4">
            <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-800">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1 || isOutOfStock}
                className="p-2 text-stone-600 hover:text-stone-900 dark:text-stone-300 disabled:opacity-40"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono-numbers px-3 text-xs font-semibold text-stone-800 dark:text-stone-100">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.min(maxAvailable, q + 1))}
                disabled={quantity >= maxAvailable || isOutOfStock}
                className="p-2 text-stone-600 hover:text-stone-900 dark:text-stone-300 disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                  : 'shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95'
              }`}
              style={!isOutOfStock ? {
                backgroundColor: 'var(--cta-caramel)',
                color: 'var(--cta-text, #3D2314)'
              } : undefined}
            >
              <ShoppingBag className="w-4 h-4" style={!isOutOfStock ? { color: 'var(--cta-text, #3D2314)' } : undefined} />
              <span>{isOutOfStock ? t('out_of_stock') : `${t('add_to_cart')} · ${formatINR(product.price * quantity)}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
