import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { Search, TrendingUp, Wallet, Plus, Archive, ExternalLink } from 'lucide-react';
import useMarketStore from '../../hooks/useMarkets';
import useAppStore from '../../store';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { markets } = useMarketStore();
  const { setDepositModalOpen } = useAppStore();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (action) => {
    switch (action.type) {
      case 'market':
        navigate(`/market/${action.id}`);
        break;
      case 'create':
        navigate('/create');
        break;
      case 'deposit':
        setDepositModalOpen(true);
        break;
      case 'portfolio':
        navigate('/portfolio');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      default:
        break;
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" onClick={() => setOpen(false)}>
      <div
        className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <div className="flex items-center border-b border-white/[0.05] px-4 py-3">
            <Search className="w-4 h-4 text-zinc-600 mr-3" />
            <Command.Input
              placeholder="Search markets, actions..."
              className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-600"
              autoFocus
            />
          </div>

          <Command.List className="max-h-96 overflow-y-auto">
            {/* Markets Section */}
            <Command.Group heading="Markets" className="overflow-hidden px-0">
              {markets.slice(0, 5).map((market) => (
                <Command.Item
                  key={market.id}
                  value={market.id.toString()}
                  onSelect={() => handleSelect({ type: 'market', id: market.id })}
                  className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
                >
                  <div className="flex items-start gap-3 w-full">
                    <TrendingUp className="w-4 h-4 text-mint mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{market.question}</div>
                      <div className="text-xs text-zinc-500">${market.totalVolume.toLocaleString()}</div>
                    </div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions Section */}
            <Command.Group heading="Actions" className="overflow-hidden px-0">
              <Command.Item
                value="create"
                onSelect={() => handleSelect({ type: 'create' })}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <Plus className="w-4 h-4 text-aurora-cyan mr-3" />
                <span className="text-sm">Create Market</span>
              </Command.Item>

              <Command.Item
                value="deposit"
                onSelect={() => handleSelect({ type: 'deposit' })}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <Wallet className="w-4 h-4 text-mint mr-3" />
                <span className="text-sm">Deposit USDC</span>
              </Command.Item>

              <Command.Item
                value="portfolio"
                onSelect={() => handleSelect({ type: 'portfolio' })}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <Archive className="w-4 h-4 text-aurora-violet mr-3" />
                <span className="text-sm">Portfolio</span>
              </Command.Item>

              <Command.Item
                value="leaderboard"
                onSelect={() => handleSelect({ type: 'leaderboard' })}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <TrendingUp className="w-4 h-4 text-rose mr-3" />
                <span className="text-sm">Leaderboard</span>
              </Command.Item>
            </Command.Group>

            {/* Navigation Section */}
            <Command.Group heading="Navigation" className="overflow-hidden px-0">
              <Command.Item
                value="markets"
                onSelect={() => {
                  navigate('/markets');
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <span className="text-sm">Markets</span>
              </Command.Item>

              <Command.Item
                value="news"
                onSelect={() => {
                  navigate('/news');
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-obsidian-700/50 transition data-[selected]:bg-obsidian-700/50"
              >
                <span className="text-sm">News</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-white/[0.05] px-4 py-2 text-xs text-zinc-600 text-right">
            Press <kbd className="px-1.5 py-0.5 bg-obsidian-700 rounded">ESC</kbd> to close
          </div>
        </Command>
      </div>
    </div>
  );
}
