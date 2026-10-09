/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from './data/posts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { VehicleReports } from './components/VehicleReports';
import { TrendsDashboard } from './components/TrendsDashboard';
import { Footer } from './components/Footer';
import { SavedModal } from './components/SavedModal';
import { SearchModal } from './components/SearchModal';
import { 
  Filter, 
  Flame, 
  Wrench, 
  SlidersHorizontal, 
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'dashboard' | 'reports'>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [reportInitialTab, setReportInitialTab] = useState<string>('pre-trip');

  // Search & Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'quickest' | 'longest'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals State
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Bookmarks State (persisted to localStorage)
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('apex_saved_posts');
      return stored ? JSON.parse(stored) : ['post-1', 'post-3'];
    } catch {
      return ['post-1', 'post-3'];
    }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize browser history / URL hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        const slug = hash.replace('#/article/', '');
        setSelectedPostSlug(slug);
        setCurrentView('article');
      } else if (hash === '#/dashboard') {
        setCurrentView('dashboard');
        setSelectedPostSlug(null);
      } else if (hash.startsWith('#/reports')) {
        setCurrentView('reports');
        setSelectedPostSlug(null);
      } else {
        setCurrentView('home');
        setSelectedPostSlug(null);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update hash when view or post changes
  const navigateTo = (view: 'home' | 'dashboard' | 'reports', articleSlug?: string) => {
    if (view === 'home') {
      window.history.pushState(null, '', '#/');
      setCurrentView('home');
      setSelectedPostSlug(null);
    } else if (view === 'dashboard') {
      window.history.pushState(null, '', '#/dashboard');
      setCurrentView('dashboard');
      setSelectedPostSlug(null);
    } else if (view === 'reports') {
      window.history.pushState(null, '', '#/reports');
      setCurrentView('reports');
      setSelectedPostSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    window.history.pushState(null, '', `#/article/${slug}`);
    setSelectedPostSlug(slug);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTool = (toolId: string) => {
    setReportInitialTab(toolId);
    navigateTo('reports');
  };

  // Toggle bookmark
  const handleToggleSave = (postId: string) => {
    setSavedPostIds((prev) => {
      let updated: string[];
      if (prev.includes(postId)) {
        updated = prev.filter((id) => id !== postId);
        showToast('Article removed from saved collection');
      } else {
        updated = [...prev, postId];
        showToast('Article added to saved collection');
      }
      try {
        localStorage.setItem('apex_saved_posts', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleClearAllSaved = () => {
    setSavedPostIds([]);
    try {
      localStorage.removeItem('apex_saved_posts');
    } catch (e) {
      console.error(e);
    }
    showToast('Saved list cleared');
  };

  // Categories list
  const categories = ['All', 'Supercars & Hypercars', 'Maintenance & DIY', 'EV & Charging', 'Buying Guides', 'Enthusiast & Tech'];

  // Filtered & sorted posts for homepage grid
  const filteredPosts = useMemo(() => {
    let posts = [...BLOG_POSTS];

    // Category filter
    if (selectedCategory !== 'All') {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    // Search query filter if typed on homepage
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'quickest') {
      posts.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else if (sortBy === 'longest') {
      posts.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
    }

    return posts;
  }, [selectedCategory, searchQuery, sortBy]);

  // Active post for detail page
  const currentPost = useMemo(() => {
    if (!selectedPostSlug) return BLOG_POSTS[0];
    return BLOG_POSTS.find((p) => p.slug === selectedPostSlug) || BLOG_POSTS[0];
  }, [selectedPostSlug]);

  // Saved posts objects
  const savedPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => savedPostIds.includes(p.id));
  }, [savedPostIds]);

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Automotive Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        savedCount={savedPostIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOMEPAGE */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              featuredPost={BLOG_POSTS[0]}
              onReadPost={handleSelectArticle}
              onExploreDiagnostic={() => navigateTo('reports')}
            />

            {/* Main Articles Index Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              {/* Filter, Search & Controls Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                          : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {cat} {cat === 'All' && `(${BLOG_POSTS.length})`}
                    </button>
                  ))}
                </div>

                {/* Secondary Sort & Quick Inline Search */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="default">Issue Order</option>
                      <option value="quickest">Quickest Read</option>
                      <option value="longest">In-Depth First</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Filter 10 stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-36 sm:w-48 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Grid of All 10 Article Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-red-500" />
                    The 2026 Editorial Dispatch
                    <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                      Showing {filteredPosts.length} of {BLOG_POSTS.length} stories
                    </span>
                  </h2>

                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, idx) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      index={BLOG_POSTS.findIndex((p) => p.id === post.id)}
                      isSaved={savedPostIds.includes(post.id)}
                      onToggleSave={handleToggleSave}
                      onSelect={handleSelectArticle}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Tool Banner between editorial content */}
              <div className="rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-950 border border-red-800/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-red-400 uppercase font-bold">
                    <Wrench className="w-4 h-4" /> Garage Companion Tools
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    Need Pre-Trip Inspections or Used EV Diagnostics?
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Run our interactive 15-minute road trip audit (Post #2), test EV battery health degradation formulas (Post #10), or simulate 800V fast-charging curves (Post #3).
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('reports')}
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs font-mono-tech uppercase tracking-wider transition-colors shrink-0 shadow-lg shadow-red-950/50 cursor-pointer flex items-center gap-2"
                >
                  <span>Launch Diagnostic Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: DYNAMIC ARTICLE DETAIL PAGE */}
        {currentView === 'article' && (
          <ArticleDetail
            post={currentPost}
            isSaved={savedPostIds.includes(currentPost.id)}
            onToggleSave={handleToggleSave}
            onBack={() => navigateTo('home')}
            onSelectPost={handleSelectArticle}
            onOpenTool={handleOpenTool}
          />
        )}

        {/* VIEW 3: 2026 AUTOMOTIVE TRENDS DASHBOARD */}
        {currentView === 'dashboard' && (
          <TrendsDashboard
            onSelectPost={handleSelectArticle}
            onOpenDiagnostics={() => navigateTo('reports')}
          />
        )}

        {/* VIEW 4: VEHICLE DIAGNOSTICS & REPORTS */}
        {currentView === 'reports' && (
          <VehicleReports
            initialTab={reportInitialTab}
            onReadArticle={handleSelectArticle}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onFilterCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('home');
        }}
      />

      {/* Saved Articles Modal */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedPosts={savedPosts}
        onSelectPost={handleSelectArticle}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearAllSaved}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPost={handleSelectArticle}
      />

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-red-500/40 text-white text-xs font-mono-tech shadow-2xl animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
