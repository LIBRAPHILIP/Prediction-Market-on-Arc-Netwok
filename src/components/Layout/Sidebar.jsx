import { Zap, TrendingUp } from 'lucide-react';
import useMarketStore from '../../hooks/useMarkets';
import useAppStore from '../../store';

const CATEGORIES = [
  { id: 'all', label: 'All Markets', icon: '🌍' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'politics', label: 'Politics', icon: '🏛️' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'tech', label: 'Tech', icon: '💻' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'economics', label: 'Economics', icon: '💰' },
];

const QUICK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'new', label: 'New' },
  { id: 'closing', label: 'Closing Soon' },
];

const TRENDING_TOPICS = [
  { name: 'Bitcoin Price', change: '+12.5%', positive: true },
  { name: 'Fed Rate Cuts', change: '+8.2%', positive: true },
  { name: 'AI Regulation', change: '-3.1%', positive: false },
  { name: 'Tech Stocks', change: '+5.8%', positive: true },
];

export default function Sidebar() {
  const { filter, setFilter, sortBy, setSortBy } = useMarketStore();
  const { isSidebarOpen } = useAppStore();

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 w-64 glass-card md:rounded-2xl p-6 overflow-y-auto
        transition-transform duration-300 z-40 md:z-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Quick Filters */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Quick Filters
        </h3>
        <div className="flex gap-2">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                filter === f.id
                  ? 'bg-aurora-cyan text-obsidian-950'
                  : 'bg-obsidian-800/50 text-zinc-400 hover:bg-obsidian-700/50'
              }`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`w-full px-3 py-2.5 text-left text-sm rounded-lg transition ${
                filter === cat.id
                  ? 'bg-aurora-cyan/20 border border-aurora-cyan/50 text-aurora-cyan'
                  : 'hover:bg-obsidian-700/50 text-zinc-300'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Trending Now
        </h3>
        <div className="space-y-2">
          {TRENDING_TOPICS.map((topic, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-lg bg-obsidian-800/30 border border-white/[0.05] hover:bg-obsidian-700/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">{topic.name}</span>
                <span className={`text-xs font-bold ${topic.positive ? 'text-mint' : 'text-rose'}`}>
                  {topic.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Info */}
      <div className="pt-4 border-t border-white/[0.05]">
        <div className="glass-card p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-aurora-cyan" />
            <span className="text-xs font-bold text-zinc-400">ARC NETWORK</span>
          </div>
          <div className="space-y-1 text-xs text-zinc-500">
            <div>Block: 2s finality</div>
            <div>Gas: USDC (6 decimals)</div>
            <div className="flex items-center gap-1 mt-2">
              <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
