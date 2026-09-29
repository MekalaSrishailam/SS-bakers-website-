import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, ShieldCheck, User as UserIcon, ChefHat, Lock, Mail, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLoginRedirect: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAdminLoginRedirect
}) => {
  const { loginUser, registerUser, t } = useBakery();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  // Preset demo accounts for effortless evaluation
  const setDemoAccount = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('sarah@ssbakers.com');
      setName('Sarah Sterling (Owner)');
    } else if (selectedRole === 'staff') {
      setEmail('julien@ssbakers.com');
      setName('Julien Laurent (Head Baker)');
    } else {
      setEmail('elena.rostova@example.com');
      setName('Elena Rostova');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      loginUser(email || `${role}@ssbakers.com`, role, name);
    } else {
      registerUser(name || 'Bakery Guest', email || 'customer@example.com', role, phone);
    }
    onClose();

    if (role === 'admin') {
      onAdminLoginRedirect();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="pt-8 px-6 pb-4 text-center">
          <span className="text-3xl mb-2 inline-block">🥖</span>
          <h2 className="font-display text-2xl font-bold text-amber-950 dark:text-stone-100">
            {mode === 'login' ? 'Sign in to SS Bakers' : 'Create an Account'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Artisanal sourdough, viennoiserie, and live oven dispatch
          </p>

          {/* Toggle Login vs Register */}
          <div className="mt-5 flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          
          {/* Simulated Role Selector (Customer vs Business Owner / Admin vs Waitstaff) */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1.5">
              Select Profile Role
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setDemoAccount('customer')}
                className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                  role === 'customer'
                    ? 'border-amber-800 bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span className="truncate">Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount('admin')}
                className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                  role === 'admin'
                    ? 'border-amber-800 bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="truncate">Admin Owner</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount('staff')}
                className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                  role === 'staff'
                    ? 'border-amber-800 bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-bold'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span className="truncate">Baker Staff</span>
              </button>
            </div>
          </div>

          {/* Registration Extra Fields */}
          {mode === 'register' && (
            <div>
              <label className="text-[11px] text-stone-500 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Sterling"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-[11px] text-stone-500 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] text-stone-500 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-[11px] text-stone-500 block mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs mt-2"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{mode === 'login' ? `Sign In as ${role.toUpperCase()}` : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {role === 'admin' && (
            <p className="text-[11px] text-center text-amber-800 dark:text-amber-400 italic">
              Signing in as Business Owner redirects immediately to the Admin Dashboard.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
