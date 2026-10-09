import React, { useState } from 'react';
import { 
  Gauge, 
  BookOpen, 
  Wrench, 
  LineChart, 
  Bookmark, 
  Search, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'article' | 'dashboard' | 'reports';
  onNavigate: (view: 'home' | 'dashboard' | 'reports', articleSlug?: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenSavedModal,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'dashboard' | 'reports') => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1017]/95 backdrop-blur-md border-b border-slate-800">
      {/* Top red racing stripe accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-red-600/15 border border-red-500/40 group-hover:border-red-500 transition-colors">
              <Gauge className="w-5 h-5 text-red-500 group-hover:rotate-45 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-bold tracking-wider text-white">APEX</span>
                <span className="font-heading text-xl font-black text-red-500 tracking-wider">PULSE</span>
                <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 ml-1">2026</span>
              </div>
              <p className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400">Modern Automotive Journal</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'home' || currentView === 'article'
                  ? 'bg-slate-800/80 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-400" />
              <span>Articles</span>
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-slate-800/80 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <LineChart className="w-4 h-4 text-red-400" />
              <span>Trends & Telemetry</span>
            </button>

            <button
              onClick={() => handleNavClick('reports')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'reports'
                  ? 'bg-slate-800/80 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Wrench className="w-4 h-4 text-red-400" />
              <span>Vehicle Diagnostics</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                TOOLS
              </span>
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-xs"
              title="Search articles"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search journal...</span>
            </button>

            <button
              onClick={onOpenSavedModal}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-red-600 text-white font-mono-tech text-[10px] font-bold shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0d1017] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' || currentView === 'article'
                ? 'bg-red-600/15 text-red-400 border border-red-500/30'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Magazine Home (10 Articles)</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'dashboard'
                ? 'bg-red-600/15 text-red-400 border border-red-500/30'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Trends & Telemetry Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'reports'
                ? 'bg-red-600/15 text-red-400 border border-red-500/30'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Vehicle Diagnostics & Calculators</span>
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono-tech">
              <Compass className="w-3.5 h-3.5 text-red-400" /> 2026 AUTOMOTIVE PULSE
            </span>
            <button 
              onClick={() => {
                onOpenSavedModal();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Bookmark className="w-3.5 h-3.5" /> Saved Articles ({savedCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
