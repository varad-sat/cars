import React, { useState } from 'react';
import { Gauge, Mail, Check, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'dashboard' | 'reports') => void;
  onFilterCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080a0e] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              SUBSCRIBE TO <span className="text-red-500">THE APEX DISPATCH</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Weekly telemetry breakdowns, deep maintenance guides, and trackside engineering analysis delivered to your inbox every Thursday.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="driver@performance.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs font-mono-tech uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-md"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Subscribed!
                  </span>
                ) : (
                  'Join The Garage'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                <Gauge className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-wider">APEX PULSE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modern automotive journal engineered for purists, EV converts, and weekend DIY mechanics.
            </p>
            <div className="text-[11px] font-mono-tech text-slate-500">
              Zero-External Database • High-Performance Local Architecture
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-mono-tech uppercase text-white font-bold tracking-wider">Sections</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition-colors">
                  Magazine Index (10 Articles)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-red-400 transition-colors">
                  Trends & Telemetry Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reports')} className="hover:text-red-400 transition-colors">
                  Vehicle Health Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reports')} className="hover:text-red-400 transition-colors">
                  Used EV Battery Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Topics */}
          <div className="space-y-3">
            <div className="text-xs font-mono-tech uppercase text-white font-bold tracking-wider">Automotive Topics</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition-colors">
                  Electric Supercars & Hypercars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition-colors">
                  800V Ultra-Fast Charging
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition-colors">
                  Manual Transmission Engagement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition-colors">
                  DIY Detailing & Maintenance Myths
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Garage Standards */}
          <div className="space-y-3">
            <div className="text-xs font-mono-tech uppercase text-white font-bold tracking-wider">Standards</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-red-500" /> Master Tech Verified
              </div>
              <p className="text-[11px] text-slate-400">
                All maintenance intervals checked against OEM technical service bulletins.
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-slate-400 hover:text-white transition-colors cursor-pointer pt-1"
            >
              <ArrowUp className="w-3.5 h-3.5 text-red-500" /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono-tech">
          <div>
            © 2026 APEX PULSE JOURNAL. ALL RIGHTS RESERVED.
          </div>
          <div>
            BUILT WITH NEXT.JS ARCHITECTURE & TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
