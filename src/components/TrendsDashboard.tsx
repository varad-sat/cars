import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Cpu, 
  Sliders, 
  BarChart3, 
  Compass, 
  ArrowUpRight, 
  ShieldCheck, 
  Gauge,
  Flame,
  BatteryMedium
} from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/posts';

interface TrendsDashboardProps {
  onSelectPost: (slug: string) => void;
  onOpenDiagnostics: () => void;
}

export const TrendsDashboard: React.FC<TrendsDashboardProps> = ({
  onSelectPost,
  onOpenDiagnostics,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'powertrain' | 'maintenance' | 'tech'>('all');

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono-tech uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Automotive Market Intelligence 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              2026 AUTOMOTIVE <span className="text-red-500">TRENDS DASHBOARD</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Synthesized industry telemetry derived from our 10 featured articles: EV supercar engineering, charging physics, gearbox renaissance, and maintenance science.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDiagnostics}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs font-mono-tech uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-red-950/50"
            >
              <ShieldCheck className="w-4 h-4" /> Open Vehicle Diagnostics
            </button>
          </div>
        </div>

        {/* 4 Macro Trend Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>800V CHARGING TIME</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Zap className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">11 Mins</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              10% to 80% charge window on 800V architectures like AMG GT (Post #3).
            </p>
            <div className="text-[11px] font-mono-tech text-emerald-400 flex items-center gap-1">
              <span>↓ 65% faster than 400V</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>MANUAL GEARBOX DEMAND</span>
              <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                <Gauge className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">42.8%</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enthusiast take-rate in lightweight sports cars, bringing sticks back (Post #7).
            </p>
            <div className="text-[11px] font-mono-tech text-red-400 flex items-center gap-1">
              <span>↑ Resurgence vs dual-clutch</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>SYNTHETIC OIL INTERVAL</span>
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Sliders className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">10,000 mi</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              True modern synthetic oil change threshold debunking the 3k myth (Post #4).
            </p>
            <div className="text-[11px] font-mono-tech text-amber-400 flex items-center gap-1">
              <span>Save ~$250+/yr in oil</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>PHEV TOURING RANGE</span>
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <BatteryMedium className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-extrabold font-heading text-white">640+ mi</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total highway range combining 45mi EV commute + combustion cruising (Post #8).
            </p>
            <div className="text-[11px] font-mono-tech text-blue-400 flex items-center gap-1">
              <span>Dominating hybrid sales</span>
            </div>
          </div>
        </div>

        {/* Detailed Benchmark Breakdown by Category */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              10-Article Technical Telemetry Matrix
            </h2>
            <div className="text-xs font-mono-tech text-slate-400">
              Click any row to jump into the complete article
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono-tech">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase text-[11px]">
                  <th className="p-4">Post #</th>
                  <th className="p-4">Article Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Core Metric</th>
                  <th className="p-4">Value</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {BLOG_POSTS.map((post, idx) => (
                  <tr 
                    key={post.id}
                    onClick={() => onSelectPost(post.slug)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 text-red-400 font-bold">#{idx + 1}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white group-hover:text-red-400 transition-colors font-heading text-sm sm:text-base">
                        {post.title}
                      </div>
                      <div className="text-xs text-slate-400 font-sans italic line-clamp-1">
                        "{post.excerpt}"
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 uppercase text-[11px]">
                      {post.telemetry.label}
                    </td>
                    <td className="p-4 font-bold text-red-400">
                      {post.telemetry.value}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPost(post.slug);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-slate-300 group-hover:text-red-400 font-semibold"
                      >
                        Read <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Spotlight: 2026 Shift Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-red-500 font-mono-tech text-xs uppercase font-bold">Trend 01 • Powertrains</div>
            <h3 className="text-lg font-bold font-heading text-white">Electric Hypercar Aerodynamics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              With instantaneous torque on tap from axial-flux motors, aerodynamic downforce and thermal management are the new competitive battlegrounds for Ferrari and Bentley.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-red-500 font-mono-tech text-xs uppercase font-bold">Trend 02 • Infrastructure</div>
            <h3 className="text-lg font-bold font-heading text-white">800V Becomes The Standard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Halving amperage through 800V architectures cuts charging cable weight and unlocks genuine 11-minute road trip recharges, erasing range anxiety across highway corridors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-red-500 font-mono-tech text-xs uppercase font-bold">Trend 03 • Ownership</div>
            <h3 className="text-lg font-bold font-heading text-white">Data-Driven Maintenance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart vehicle owners are ditching 3,000-mile myths and relying on used EV battery degradation reports, DIY interior detailing, and 15-minute pre-highway checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
