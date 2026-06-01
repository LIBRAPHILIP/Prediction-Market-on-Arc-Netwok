import { useState } from 'react';
import { TrendingUp, LayoutGrid } from 'lucide-react';
import useMarketStore from '../hooks/useMarkets';
import MarketCard from '../components/Markets/MarketCard';

export default function MarketsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const { getFilteredMarkets } = useMarketStore();
  const markets = getFilteredMarkets();

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-aurora-cyan" />
            Prediction Markets
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-aurora-cyan text-obsidian-950'
                  : 'bg-obsidian-800/50 text-zinc-400 hover:bg-obsidian-700/50'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-aurora-cyan text-obsidian-950'
                  : 'bg-obsidian-800/50 text-zinc-400 hover:bg-obsidian-700/50'
              }`}
            >
              List
            </button>
          </div>
        </div>
        <p className="text-zinc-400">{markets.length} markets available</p>
      </div>

      {/* Markets Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}
      >
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {markets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400">No markets found</p>
        </div>
      )}
    </div>
  );
}
