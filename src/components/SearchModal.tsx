import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Clock, Tag } from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/posts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPost: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = BLOG_POSTS.filter((post) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0d1017] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 10 articles by keywords, Ferrari, 800V, manual, oil myths..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-mono-tech"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching automotive articles found for "{query}".
            </div>
          ) : (
            results.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post.slug);
                  onClose();
                }}
                className="group p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/50 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono-tech">
                    <span className="text-red-400 uppercase font-bold">{post.category}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{post.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {post.excerpt}
                  </p>
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
          <span>Showing {results.length} of {BLOG_POSTS.length} articles</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
