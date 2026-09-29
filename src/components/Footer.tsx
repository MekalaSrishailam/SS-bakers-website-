import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShieldCheck, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'menu' | 'craft' | 'tracker' | 'history' | 'admin' | 'staff') => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth }) => {
  const { currentUser, switchUserRole } = useBakery();

  return (
    <footer 
      className="border-t py-12 sm:py-16 text-xs transition-colors"
      style={{ backgroundColor: 'var(--bg-cream)', borderColor: 'var(--accent-rose)', color: 'var(--text-muted)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b"
          style={{ borderColor: 'var(--accent-rose)' }}
        >
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span 
              className="font-display text-2xl font-bold tracking-tight block transition-colors"
              style={{ color: 'var(--text-chocolate)' }}
            >
              SS Bakers
            </span>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Artisanal stone-hearth baking, designer celebration cakes, and 100% eggless customisation.
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--cta-caramel)' }} />
                <span>opposite to grandgayathri hotel, warangal chowrastha, near warangal bus stand-506300</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cta-caramel)' }} />
                <a href="tel:8978275273" className="font-mono font-bold hover:underline" style={{ color: 'var(--text-chocolate)' }}>8978275273</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--cta-caramel)' }} />
                <a href="mailto:ssbakers@gmail.com" className="font-mono font-medium hover:underline" style={{ color: 'var(--text-chocolate)' }}>ssbakers@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <span 
              className="text-xs font-semibold uppercase tracking-wider block mb-3 font-mono"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Bakery Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-chocolate)' }}>
                  Daily Hearth Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craft')} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-chocolate)' }}>
                  Our Baking Craft & Levain
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-chocolate)' }}>
                  Live Oven Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-chocolate)' }}>
                  Order Invoices & History
                </button>
              </li>
            </ul>
          </div>

          {/* Bakery Hours */}
          <div>
            <span 
              className="text-xs font-semibold uppercase tracking-wider block mb-3 font-mono"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Baking Schedule
            </span>
            <div className="space-y-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <p><strong style={{ color: 'var(--text-chocolate)' }}>Tue – Fri:</strong> 6:30 AM – 4:00 PM</p>
              <p><strong style={{ color: 'var(--text-chocolate)' }}>Sat – Sun:</strong> 7:00 AM – 3:00 PM</p>
              <p className="font-bold pt-1" style={{ color: 'var(--cta-caramel)' }}>Fresh morning bake pulled at 6:15 AM</p>
            </div>
          </div>

          {/* Admin & Simulation Switcher */}
          <div>
            <span 
              className="text-xs font-semibold uppercase tracking-wider block mb-3 font-mono"
              style={{ color: 'var(--text-chocolate)' }}
            >
              Business Portal
            </span>
            <p className="mb-3 text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Manage inventory, live KDS kitchen feeds, and catalog items.
            </p>

            <div className="flex flex-col gap-2">
              {currentUser.role === 'admin' ? (
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs text-white"
                  style={{ backgroundColor: 'var(--cta-caramel)', color: 'var(--cta-text, #FFFFFF)' }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Enter Owner Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    switchUserRole('admin');
                    onNavigate('admin');
                  }}
                  className="px-3 py-2 rounded-xl border font-semibold text-xs text-center transition-colors"
                  style={{ 
                    borderColor: 'var(--accent-rose)', 
                    backgroundColor: 'var(--card-surface, #FFFFFF)', 
                    color: 'var(--text-chocolate)' 
                  }}
                >
                  Switch to Admin (Owner) Mode
                </button>
              )}

              <button
                onClick={onOpenAuth}
                className="text-left hover:underline pt-1 text-[11px] font-semibold"
                style={{ color: 'var(--cta-caramel)' }}
              >
                Sign in with custom credentials...
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div 
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>&copy; {new Date().getFullYear()} SS Bakers Inc. All rights reserved. Artisan stone-hearth baking.</span>
          <span className="font-mono">Real-time dynamic inventory & orders synchronized.</span>
        </div>
      </div>
    </footer>
  );
};
