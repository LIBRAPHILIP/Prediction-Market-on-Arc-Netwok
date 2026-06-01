import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useMarketStore from '../hooks/useMarkets';

export default function MarketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markets } = useMarketStore();
  const market = markets.find(m => m.id === parseInt(id));

  if (!market) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 mb-4">Market not found</p>
        <button
          onClick={() => navigate('/markets')}
          className="btn-primary"
        >
          Back to Markets
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      <button
        onClick={() => navigate('/markets')}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="glass-card p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">{market.question}</h1>
        <p className="text-zinc-400 mb-6">{market.description}</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm text-zinc-400 mb-2">YES Probability</h3>
            <div className="text-4xl font-bold text-mint">{(market.yesPrice * 100).toFixed(0)}%</div>
          </div>
          <div>
            <h3 className="text-sm text-zinc-400 mb-2">NO Probability</h3>
            <div className="text-4xl font-bold text-rose">{(market.noPrice * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-zinc-400 mb-1">Volume</div>
            <div className="font-bold">${(market.totalVolume / 1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1">Liquidity</div>
            <div className="font-bold">${(market.totalLiquidity / 1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1">Traders</div>
            <div className="font-bold">{market.traders.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1">Category</div>
            <div className="font-bold capitalize">{market.category}</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl mt-6">
        <h2 className="text-xl font-bold mb-4">Trading Interface (Coming Soon)</h2>
        <p className="text-zinc-400">Advanced trading panel will be available in the next update.</p>
      </div>
    </div>
  );
}
