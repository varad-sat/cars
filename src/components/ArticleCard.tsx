import React from 'react';
import { Bookmark, Clock, ArrowUpRight, Gauge, Tag } from 'lucide-react';
import { BlogPost } from '../data/posts';

interface ArticleCardProps {
  post: BlogPost;
  index: number;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
  onSelect: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  index,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <article className="group relative flex flex-col rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-600/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-red-950/20">
      {/* Article Number Accent */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-red-400 font-mono-tech text-[10px] font-bold border border-red-500/30">
          POST #{index + 1}
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-slate-300 font-mono-tech text-[10px] border border-slate-700/60">
          {post.category}
        </span>
      </div>

      {/* Bookmark Action Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(post.id);
        }}
        className={`absolute top-3 right-3 z-20 p-2 rounded-lg backdrop-blur-md transition-colors ${
          isSaved
            ? 'bg-red-600 text-white shadow-md'
            : 'bg-black/60 text-slate-400 hover:text-white hover:bg-black/80 border border-white/10'
        }`}
        title={isSaved ? 'Remove from saved' : 'Save article'}
        aria-label="Bookmark"
      >
        <Bookmark className="w-3.5 h-3.5 fill-current" />
      </button>

      {/* Image Container with aspect ratio */}
      <div 
        onClick={() => onSelect(post.slug)}
        className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
      </div>

      {/* Card Content Body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 space-y-3 justify-between">
        <div className="space-y-2.5">
          {/* Metadata bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono-tech">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-400" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(post.slug)}
            className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-red-400 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-300 text-sm font-medium italic border-l-2 border-red-500/80 pl-2.5 py-0.5">
            "{post.excerpt}"
          </p>

          {/* Content summary snippet */}
          <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Card Footer: Telemetry & Author */}
        <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3">
          {/* Telemetry pill */}
          <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-slate-400 truncate">
              <Gauge className="w-3 h-3 text-red-500 shrink-0" />
              <span className="truncate">{post.telemetry.label}</span>
            </div>
            <span className="text-xs font-bold font-mono-tech text-red-400 shrink-0 ml-2">
              {post.telemetry.value}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-700"
              />
              <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
                {post.author.name}
              </span>
            </div>

            {/* Read Button */}
            <button
              onClick={() => onSelect(post.slug)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200 group-hover:text-red-400 transition-colors cursor-pointer"
            >
              Read Article
              <ArrowUpRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
