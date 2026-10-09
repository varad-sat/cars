import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar, 
  Gauge, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  VolumeX,
  Wrench,
  Check,
  Tag,
  Sliders,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/posts';

interface ArticleDetailProps {
  post: BlogPost;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
  onBack: () => void;
  onSelectPost: (slug: string) => void;
  onOpenTool: (toolId: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  post,
  isSaved,
  onToggleSave,
  onBack,
  onSelectPost,
  onOpenTool,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Scroll to top on mount or when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [post.slug]);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find next and prev posts
  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // Related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id && (p.category === post.category || true)).slice(0, 3);

  // Determine relevant diagnostic tool based on post id
  const getRelevantTool = () => {
    if (post.id === 'post-2') {
      return { id: 'pre-trip', name: '15-Min Road Trip Readiness Inspector', icon: Wrench };
    }
    if (post.id === 'post-3') {
      return { id: 'charge-calc', name: '800V vs 400V Charging Speed Comparator', icon: Gauge };
    }
    if (post.id === 'post-4') {
      return { id: 'oil-interval', name: 'Synthetic Oil Interval & Myth Savings Calculator', icon: Sliders };
    }
    if (post.id === 'post-10') {
      return { id: 'ev-battery', name: 'Used EV Battery Health (SoH) Estimator', icon: CheckCircle2 };
    }
    return null;
  };

  const relevantTool = getRelevantTool();

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed',
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 pb-20">
      {/* Article Header & Navigation Bar */}
      <div className="sticky top-18 z-30 bg-[#0d1017]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-red-500 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font size control */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm ${fontSize === 'large' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-base ${fontSize === 'xlarge' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title={isSaved ? 'Saved' : 'Save article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-emerald-600 text-white text-[10px] font-mono-tech px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Category & Date Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech">
            <span className="px-2.5 py-1 rounded bg-red-600/20 text-red-400 border border-red-500/40 uppercase font-bold tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              {post.readTime}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-[1.12]">
            {post.title}
          </h1>

          {/* Excerpt as Lead Paragraph */}
          <div className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-red-600 border-y border-r border-slate-800 text-lg sm:text-xl font-medium text-slate-200 italic shadow-md">
            "{post.excerpt}"
          </div>

          {/* Author Byline Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-red-500/40"
              />
              <div>
                <div className="font-semibold text-white text-sm sm:text-base">{post.author.name}</div>
                <div className="text-xs text-slate-400 font-mono-tech">{post.author.role}</div>
              </div>
            </div>

            {/* Audio narration button */}
            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-2 text-xs font-mono-tech text-slate-300 hover:text-white cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>Pause Audio Brief</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-red-400" />
                    <span>Listen to Article (Audio Brief)</span>
                  </>
                )}
              </button>
              {isPlayingAudio && (
                <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-500 h-full transition-all duration-300" 
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Hero Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11]/80 via-transparent to-transparent" />
          
          {/* Telemetry pill overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-950/85 backdrop-blur-md p-3 px-4 rounded-xl border border-red-500/30 flex items-center gap-3">
            <Gauge className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">{post.telemetry.label}</div>
              <div className="text-base font-bold font-mono-tech text-white">
                {post.telemetry.value} <span className="text-xs text-slate-400 font-normal">({post.telemetry.sublabel})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Primary Content Block (EXACT CONTENT REQUIRED BY USER) */}
        <div className="space-y-6 pt-2">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/90 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-red-400 uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4" /> Editorial Dispatch
            </div>
            
            <p className={`${fontClasses[fontSize]} text-slate-200 font-normal leading-relaxed`}>
              {post.content}
            </p>
          </div>

          {/* Interactive Diagnostic Tool Trigger if relevant */}
          {relevantTool && (
            <div className="p-5 rounded-xl bg-red-950/30 border border-red-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-600 text-white shrink-0">
                  <relevantTool.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-red-400 uppercase font-semibold">Interactive Tool Available</div>
                  <div className="text-white font-medium text-sm sm:text-base">{relevantTool.name}</div>
                </div>
              </div>
              <button
                onClick={() => onOpenTool(relevantTool.id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-md"
              >
                Launch Diagnostic Tool <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Key Takeaways Callout Box */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-500" />
              Key Technical Takeaways
            </h3>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Deep Dive Section */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-5">
            <h3 className="text-xl font-bold font-heading text-white">
              {post.technicalDeepDive.heading}
            </h3>

            {post.technicalDeepDive.paragraphs.map((para, i) => (
              <p key={i} className={`${fontClasses[fontSize]} text-slate-300 leading-relaxed`}>
                {para}
              </p>
            ))}

            {/* Specifications Table */}
            {post.technicalDeepDive.specsTable && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-mono-tech uppercase text-slate-400 mb-3 tracking-wider">
                  Technical Specifications & Benchmarks
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {post.technicalDeepDive.specsTable.map((spec, sIdx) => (
                    <div 
                      key={sIdx}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono-tech text-xs"
                    >
                      <span className="text-slate-400">{spec.label}</span>
                      <span className="font-bold text-red-400">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <Tag className="w-4 h-4 text-slate-500" />
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono-tech text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Previous and Next Navigation Bar */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              onClick={() => onSelectPost(prevPost.slug)}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1 text-xs font-mono-tech text-slate-400 mb-1">
                <ChevronLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS ARTICLE</span>
              </div>
              <div className="text-sm font-bold font-heading text-white group-hover:text-red-400 transition-colors line-clamp-1">
                {prevPost.title}
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextPost ? (
            <button
              onClick={() => onSelectPost(nextPost.slug)}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 text-right transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1 text-xs font-mono-tech text-slate-400 mb-1">
                <span>NEXT ARTICLE</span>
                <ChevronRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold font-heading text-white group-hover:text-red-400 transition-colors line-clamp-1">
                {nextPost.title}
              </div>
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Related Stories Grid */}
        <div className="pt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-500" />
              More Stories from the Garage
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
            >
              View all 10 articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rPost) => (
              <div
                key={rPost.id}
                onClick={() => onSelectPost(rPost.slug)}
                className="group p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 cursor-pointer transition-all space-y-2.5"
              >
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950">
                  <img
                    src={rPost.coverImage}
                    alt={rPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-[10px] font-mono-tech text-red-400 uppercase">{rPost.category}</div>
                <div className="text-sm font-bold font-heading text-white group-hover:text-red-400 transition-colors line-clamp-2">
                  {rPost.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">{rPost.excerpt}</div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
