import React from 'react';
import { Zap, Flame, ShieldCheck, ChevronRight, Activity, Cpu } from 'lucide-react';
import { BlogPost } from '../data/posts';

interface HeroSectionProps {
  featuredPost: BlogPost;
  onReadPost: (slug: string) => void;
  onExploreDiagnostic: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredPost,
  onReadPost,
  onExploreDiagnostic,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-800/80 bg-[#0b0d11]">
      {/* Background Subtle Gradient & Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] mesh-glow pointer-events-none opacity-60" />
      
      {/* Telemetry Ticker Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 px-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs font-mono-tech">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold uppercase tracking-wider">LIVE TELEMETRY:</span>
            <span className="hidden sm:inline text-slate-400">2026 Season Analysis Active</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-500">800V DC CHARGE:</span>
              <span className="text-slate-200 font-semibold text-emerald-400">10-80% in 11m</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-500">SYNTHETIC OIL:</span>
              <span className="text-slate-200 font-semibold text-amber-400">7.5k-10k mi</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-500">MANUAL TAKE RATE:</span>
              <span className="text-slate-200 font-semibold text-red-400">+42.8% Enthusiast</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Editorial Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono-tech uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Issue #26 • Modern Car Culture & Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              WHERE HORSEPOWER MEETS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">HIGH-VOLTAGE TECH</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              From 800-volt hypercars and F1-derived electric powertrains to honest maintenance mythbusting and stick-shift revivals—unfiltered reporting for real drivers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onReadPost(featuredPost.slug)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-700/40 cursor-pointer"
              >
                <span>Read Featured Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDiagnostic}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-sm font-medium transition-colors cursor-pointer"
              >
                <Activity className="w-4 h-4 text-red-400" />
                <span>Vehicle Health Tools</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-bold font-heading text-white">10</div>
                <div className="text-[11px] font-mono-tech text-slate-400 uppercase">Complete Articles</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-bold font-heading text-red-400">11 Min</div>
                <div className="text-[11px] font-mono-tech text-slate-400 uppercase">800V Charge Time</div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <div className="text-xl sm:text-2xl font-bold font-heading text-amber-400">100%</div>
                <div className="text-[11px] font-mono-tech text-slate-400 uppercase">Local Zero-DB Data</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Feature Card */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => onReadPost(featuredPost.slug)}
              className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-2xl"
            >
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-mono-tech font-bold uppercase tracking-wider shadow-md">
                  FEATURE STORY
                </span>
                <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-md text-slate-200 text-[11px] font-mono-tech border border-white/10">
                  {featuredPost.category}
                </span>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-[#0d1017]/40 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3 bg-[#0d1017]">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono-tech">
                  <span>{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-red-400 transition-colors leading-snug">
                  {featuredPost.title}
                </h3>

                <p className="text-slate-300 text-sm italic font-medium">
                  "{featuredPost.excerpt}"
                </p>

                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {featuredPost.content}
                </p>

                {/* Telemetry spec block on the card */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-tech text-slate-500 uppercase block">{featuredPost.telemetry.label}</span>
                    <span className="text-sm font-bold font-mono-tech text-red-400">{featuredPost.telemetry.value}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200 group-hover:text-red-400 transition-colors">
                    Read Story <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
