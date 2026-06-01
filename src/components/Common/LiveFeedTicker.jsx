import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency, formatTimeAgo } from '../../utils/helpers';

const MOCK_WHALE_TRADES = [
  {
    amount: 50000,
    market: 'Bitcoin $150K',
    source: '0x1a2B...3C4d',
    sentiment: 'bullish',
    timestamp: new Date(),
  },
  {
    amount: 35000,
    market: 'Fed Rate Cuts',
    source: '0x5E6F...7G8h',
    sentiment: 'bullish',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    amount: 28000,
    market: 'AI AGI',
    source: '0x9I0J...1K2l',
    sentiment: 'bearish',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    amount: 42000,
    market: 'ETH Flip',
    source: '0x3M4N...5O6p',
    sentiment: 'neutral',
    timestamp: new Date(Date.now() - 180000),
  },
  {
    amount: 56000,
    market: 'Mars Landing',
    source: '0x7Q8R...9S0t',
    sentiment: 'bullish',
    timestamp: new Date(Date.now() - 240000),
  },
];

export default function LiveFeedTicker() {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-3 h-3 text-mint" />;
      case 'bearish':
        return <TrendingDown className="w-3 h-3 text-rose" />;
      default:
        return <Minus className="w-3 h-3 text-zinc-500" />;
    }
  };

  return (
    <div className="w-full bg-obsidian-800/40 backdrop-blur-xl border-y border-white/[0.05] px-6 py-3 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Zap className="w-4 h-4 text-aurora-cyan animate-pulse" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">BREAKING</span>
        </div>

        <div className="relative overflow-hidden flex-1">
          <div className="flex animate-marquee gap-8">
            {[...MOCK_WHALE_TRADES, ...MOCK_WHALE_TRADES].map((trade, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  {getSentimentIcon(trade.sentiment)}
                  <span className="text-xs font-mono">{formatCurrency(trade.amount)}</span>
                </div>
                <span className="text-xs text-zinc-500">on</span>
                <span className="text-xs font-semibold text-zinc-300">{trade.market}</span>
                <span className="text-xs text-zinc-600">from {trade.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
