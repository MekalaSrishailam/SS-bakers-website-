import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShoppingBag, Moon, Sun, Globe, User, ShieldCheck, ChefHat, Mic, Menu as MenuIcon, X, Wifi, WifiOff, Palette, Check } from 'lucide-react';
import { Language, UserRole, ColorPalette } from '../types';

interface NavbarProps {
  currentTab: 'menu' | 'craft' | 'tracker' | 'history' | 'admin' | 'staff';
  setCurrentTab: (tab: 'menu' | 'craft' | 'tracker' | 'history' | 'admin' | 'staff') => void;
  openCart: () => void;
  openAuth: () => void;
  openVoiceOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openCart,
  openAuth,
  openVoiceOrder
}) => {
  const {
    currentUser,
    cartCount,
    isDarkMode,
    toggleDarkMode,
    colorPalette,
    setColorPalette,
    language,
    setLanguage,
    t,
    switchUserRole,
    isOfflineMode,
    toggleOfflineMode,
    lowStockProducts
  } = useBakery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [paletteDropdownOpen, setPaletteDropdownOpen] = useState(false);

  const palettes: { id: ColorPalette; name: string; icon: string; preview: string; description: string }[] = [
    { 
      id: 'honey', 
      name: 'Salted Caramel Gold', 
      icon: '✨', 
      preview: 'bg-gradient-to-r from-[#D4AF37] to-[#C59F2D]',
      description: 'Warm Alabaster Cream & Salted Caramel Gold'
    },
    { 
      id: 'berry', 
      name: 'Berry Velvet', 
      icon: '🍓', 
      preview: 'bg-gradient-to-r from-pink-500 to-rose-600',
      description: 'Lush raspberry glaze & macaron rose'
    },
    { 
      id: 'truffle', 
      name: 'Dark Truffle', 
      icon: '🍫', 
      preview: 'bg-gradient-to-r from-amber-600 to-stone-800',
      description: 'Rich Belgian cocoa & golden saffron'
    },
    { 
      id: 'holiday', 
      name: 'Holiday Seasonal', 
      icon: '🎄', 
      preview: 'bg-gradient-to-r from-[#C81E2E] via-[#D4AF37] to-[#15803D]',
      description: 'Festive spiced crimson, star gold & gentle snowfall'
    },
    { 
      id: 'saffron', 
      name: 'Royal Saffron & Pistachio', 
      icon: '👑', 
      preview: 'bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#15803D]',
      description: 'Kashmiri saffron ember, cardamom cream & pistachio'
    }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'te', label: 'తెలుగు' }
  ];

  return (
    <header 
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors"
      style={{ backgroundColor: 'var(--bg-cream)', borderColor: 'var(--accent-rose)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              setCurrentTab('menu');
              setMobileMenuOpen(false);
            }}
            className="flex items-baseline text-left group focus-visible:outline-none"
          >
            <span 
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors"
              style={{ color: 'var(--text-chocolate)' }}
            >
              SS Bakers
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('menu')}
              className="hover:opacity-80 transition-colors relative py-1"
              style={{ 
                color: currentTab === 'menu' ? 'var(--cta-caramel)' : 'var(--text-chocolate)',
                fontWeight: currentTab === 'menu' ? 700 : 500
              }}
            >
              {t('nav_menu')}
              {currentTab === 'menu' && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" 
                  style={{ backgroundColor: 'var(--cta-caramel)' }}
                />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('craft')}
              className="hover:opacity-80 transition-colors relative py-1"
              style={{ 
                color: currentTab === 'craft' ? 'var(--cta-caramel)' : 'var(--text-chocolate)',
                fontWeight: currentTab === 'craft' ? 700 : 500
              }}
            >
              {t('nav_about')}
              {currentTab === 'craft' && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" 
                  style={{ backgroundColor: 'var(--cta-caramel)' }}
                />
              )}
            </button>

            <button
              onClick={() => {
                setCurrentTab('menu');
                setTimeout(() => {
                  const inquiry = document.getElementById('custom-cake-inquiry');
                  if (inquiry) inquiry.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:opacity-80 transition-colors relative py-1 flex items-center gap-1.5"
              style={{ color: 'var(--text-chocolate)' }}
            >
              <span>Custom Cakes</span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                style={{ 
                  backgroundColor: 'var(--accent-rose-light)', 
                  color: 'var(--cta-caramel)', 
                  borderColor: 'var(--accent-rose)' 
                }}
              >
                100% Eggless
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('tracker')}
              className={`hover:text-[#D4AF37] dark:hover:text-white transition-colors relative py-1 ${
                currentTab === 'tracker' ? 'text-[#3D2314] dark:text-[#D4AF37] font-bold' : ''
              }`}
            >
              {t('nav_live_tracker')}
              {currentTab === 'tracker' && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" 
                  style={{ backgroundColor: 'var(--cta-caramel)' }}
                />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              className={`hover:text-[#D4AF37] dark:hover:text-white transition-colors relative py-1 ${
                currentTab === 'history' ? 'text-[#3D2314] dark:text-[#D4AF37] font-bold' : ''
              }`}
            >
              {t('nav_history')}
              {currentTab === 'history' && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" 
                  style={{ backgroundColor: 'var(--cta-caramel)' }}
                />
              )}
            </button>

            {/* Admin or Staff link */}
            {(currentUser.role === 'admin' || currentUser.role === 'staff') && (
              <button
                onClick={() => setCurrentTab(currentUser.role === 'admin' ? 'admin' : 'staff')}
                className={`flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors relative py-1 ${
                  currentTab === 'admin' || currentTab === 'staff' ? 'text-[#3D2314] dark:text-[#D4AF37] font-bold' : 'text-[#3D2314]/80 dark:text-stone-300'
                }`}
              >
                {currentUser.role === 'admin' ? <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> : <ChefHat className="w-4 h-4 text-[#D4AF37]" />}
                <span>{currentUser.role === 'admin' ? t('nav_admin') : t('nav_staff')}</span>
                {lowStockProducts.length > 0 && currentUser.role === 'admin' && (
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" title="Low stock alerts" />
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Voice Rapid Order Affordance */}
            <button
              onClick={openVoiceOrder}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              title="Voice Rapid Order"
              aria-label="Voice Rapid Order"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Offline Simulator */}
            <button
              onClick={toggleOfflineMode}
              className={`p-2 rounded-lg transition-colors ${
                isOfflineMode
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200'
                  : 'text-stone-600 dark:text-stone-300 hover:text-amber-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isOfflineMode ? 'Operating Offline (Cached Mode)' : 'Live Connected Mode'}
              aria-label="Toggle offline simulation"
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(prev => !prev);
                  setRoleDropdownOpen(false);
                }}
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 text-xs uppercase font-mono"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        language === l.code
                          ? 'bg-amber-50 dark:bg-stone-800 font-semibold text-amber-900 dark:text-amber-300'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Attractive Color Palette Theme Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setPaletteDropdownOpen(prev => !prev);
                  setLangDropdownOpen(false);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 p-2 rounded-lg transition-colors border shadow-2xs"
                style={{ 
                  borderColor: 'var(--accent-rose)', 
                  backgroundColor: 'var(--accent-rose-light)',
                  color: 'var(--text-chocolate)'
                }}
                title="Change Bakery Aesthetic & Colors"
                aria-label="Change Color Theme"
              >
                <Palette className="w-4 h-4" style={{ color: 'var(--cta-caramel)' }} />
                <span className="hidden lg:inline text-xs font-semibold capitalize font-mono">
                  {palettes.find(p => p.id === colorPalette)?.icon}
                </span>
              </button>
              
              {paletteDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white dark:bg-stone-900 border rounded-2xl shadow-2xl p-2 z-50"
                  style={{ borderColor: 'var(--accent-rose)' }}
                >
                  <div className="px-2 py-1.5 border-b mb-1" style={{ borderColor: 'var(--accent-rose)' }}>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold block" style={{ color: 'var(--cta-caramel)' }}>
                      Attractive Bakery Palettes
                    </span>
                  </div>
                  {palettes.map((p) => {
                    const isSelected = colorPalette === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setColorPalette(p.id);
                          setPaletteDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                          isSelected
                            ? 'font-bold'
                            : 'hover:opacity-85 text-stone-700 dark:text-stone-300'
                        }`}
                        style={isSelected ? {
                          backgroundColor: 'var(--accent-rose-light)',
                          color: 'var(--cta-caramel)'
                        } : undefined}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{p.icon}</span>
                          <div>
                            <span className="block font-semibold">{p.name}</span>
                            <span className="text-[10px] text-stone-500 font-normal line-clamp-1">{p.description}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`w-3.5 h-3.5 rounded-full ${p.preview} shadow-2xs`} />
                          {isSelected && <Check className="w-3.5 h-3.5" style={{ color: 'var(--cta-caramel)' }} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Switcher / Auth Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(prev => !prev);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 hover:border-amber-700/40 text-stone-800 dark:text-stone-200 transition-colors bg-stone-50 dark:bg-stone-800/80"
              >
                <div className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.role === 'admin' ? 'A' : currentUser.role === 'staff' ? 'K' : 'C'}
                </div>
                <span className="hidden sm:inline font-sans font-medium max-w-[100px] truncate">
                  {currentUser.role === 'admin' ? 'Owner (Admin)' : currentUser.role === 'staff' ? 'Baker Staff' : 'Customer'}
                </span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      Simulate User Role
                    </div>
                    <button
                      onClick={() => {
                        switchUserRole('customer');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        currentUser.role === 'customer'
                          ? 'bg-amber-50 dark:bg-stone-800 font-semibold text-amber-900 dark:text-amber-300'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Customer View
                      </span>
                      {currentUser.role === 'customer' && <span className="text-[10px] text-amber-700">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('admin');
                        setCurrentTab('admin');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        currentUser.role === 'admin'
                          ? 'bg-amber-50 dark:bg-stone-800 font-semibold text-amber-900 dark:text-amber-300'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Business Owner (Admin)
                      </span>
                      {currentUser.role === 'admin' && <span className="text-[10px] text-amber-700">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('staff');
                        setCurrentTab('staff');
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        currentUser.role === 'staff'
                          ? 'bg-amber-50 dark:bg-stone-800 font-semibold text-amber-900 dark:text-amber-300'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ChefHat className="w-3.5 h-3.5 text-amber-600" /> Baker / Kitchen Staff
                      </span>
                      {currentUser.role === 'staff' && <span className="text-[10px] text-amber-700">Active</span>}
                    </button>
                  </div>

                  <div className="pt-1 mt-1 border-t border-stone-100 dark:border-stone-800">
                    <button
                      onClick={() => {
                        openAuth();
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-amber-900 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800 rounded-lg transition-colors font-medium"
                    >
                      Login / Create New Account...
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Bag CTA */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md shadow-[#D4AF37]/30 hover:shadow-lg hover:scale-[1.02] whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
              style={{ 
                backgroundColor: 'var(--cta-caramel)', 
                color: 'var(--cta-text, #3D2314)' 
              }}
              aria-label={`View bakery bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" style={{ color: 'var(--cta-text, #3D2314)' }} />
              <span className="hidden sm:inline">{t('cart')}</span>
              <span 
                className="font-mono-numbers px-1.5 py-0.2 rounded-full text-[11px] font-bold"
                style={{ backgroundColor: 'rgba(61, 35, 20, 0.15)', color: 'var(--cta-text, #3D2314)' }}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <button
              onClick={() => { setCurrentTab('menu'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'menu' ? 'bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('nav_menu')}
            </button>
            <button
              onClick={() => { setCurrentTab('craft'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'craft' ? 'bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('nav_about')}
            </button>
            <button
              onClick={() => { setCurrentTab('tracker'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'tracker' ? 'bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('nav_live_tracker')}
            </button>
            <button
              onClick={() => { setCurrentTab('history'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentTab === 'history' ? 'bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              {t('nav_history')}
            </button>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-amber-900 dark:text-amber-300 bg-amber-100/50 dark:bg-stone-800 rounded-lg flex items-center justify-between"
              >
                <span>{t('nav_admin')}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}
            {currentUser.role === 'staff' && (
              <button
                onClick={() => { setCurrentTab('staff'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-amber-900 dark:text-amber-300 bg-amber-100/50 dark:bg-stone-800 rounded-lg flex items-center justify-between"
              >
                <span>{t('nav_staff')}</span>
                <ChefHat className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
