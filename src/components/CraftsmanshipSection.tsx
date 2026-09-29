import React from 'react';
import { Sparkles, Clock, Flame, ShieldCheck } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold block mb-2 font-mono">
            Hearth Craftsmanship Since 1984
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-amber-950 dark:text-stone-100 tracking-tight leading-tight">
            Slow Fermentation, Stone Decks, and Pure French Butter.
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
            At SS Bakers, there are no industrial shortcuts or chemical leaveners. Every country loaf is shaped by hand, proofed over 36 hours in woven wicker bannetons, and baked directly onto 485°F granite hearth stones.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-stone-800 flex items-center justify-center text-amber-900 dark:text-amber-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
              36-Hour Cold Proofing
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Our century-old wild yeast levain breaks down starches gently into complex lactic notes, yielding a rich open crumb and exceptional digestibility.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-stone-800 flex items-center justify-center text-amber-900 dark:text-amber-300">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
              Granite Hearth Deck Baking
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Injected with bursts of live volcanic steam at load, creating that signature blistered ear, deep caramelization, and singing crust.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-stone-800 flex items-center justify-center text-amber-900 dark:text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
              84% AOP Charentes-Poitou Butter
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Every croissant has exactly 27 razor-thin layers laminated with high-fat cultured butter from western France, baking into airy honeycomb pockets.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
