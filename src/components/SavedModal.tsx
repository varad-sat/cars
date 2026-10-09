import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../data/posts';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPosts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onRemoveSaved: (postId: string) => void;
  onClearAll: () => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedPosts,
  onSelectPost,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#0d1017] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-heading text-white">
              Saved Articles ({savedPosts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {savedPosts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-slate-300 font-medium">No saved articles yet</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Bookmark your favorite car culture stories, guides, and engineering deep-dives to read offline anytime.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div
                key={post.id}
                className="group p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 flex items-center justify-between gap-3 transition-all"
              >
                <div 
                  onClick={() => {
                    onSelectPost(post.slug);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[10px] font-mono-tech text-red-400 uppercase">{post.category}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectPost(post.slug);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-red-600 transition-colors"
                    title="Read article"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(post.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedPosts.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-mono-tech text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
