import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X, LogOut, Wallet, RefreshCw } from 'lucide-react';
import useWalletStore from '../../hooks/useWallet';
import useAppStore from '../../store';
import { shortenAddress, formatNumber } from '../../utils/helpers';

export default function Navbar() {
  const { address, isConnected, balance, connect, disconnect, refreshBalance } = useWalletStore();
  const { isDepositModalOpen, setDepositModalOpen, setWalletModalOpen, isSidebarOpen, toggleSidebar } = useAppStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
      setWalletModalOpen(true);
    }
  };

  return (
    <nav className="glass-card sticky top-0 z-50 mx-4 mt-3 rounded-2xl">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition">
          <Zap className="w-6 h-6 text-aurora-cyan" />
          <span className="bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-pink bg-clip-text text-transparent">
            PredictARC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/markets" className="text-zinc-400 hover:text-zinc-200 transition">
            Markets
          </Link>
          <Link to="/portfolio" className="text-zinc-400 hover:text-zinc-200 transition">
            Portfolio
          </Link>
          <Link to="/create" className="text-zinc-400 hover:text-zinc-200 transition">
            Create
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <button
                onClick={() => setDepositModalOpen(true)}
                className="btn-yes hidden sm:inline-flex"
              >
                Deposit
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="glass-card px-4 py-2 hover:bg-obsidian-700/50 transition"
                >
                  <div className="text-sm">
                    <div className="text-zinc-400">{shortenAddress(address)}</div>
                    <div className="text-mint font-mono">{formatNumber(parseFloat(balance), 2)} USDC</div>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl overflow-hidden">
                    <div className="px-3 py-2 text-xs text-zinc-500">Balance</div>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="flex-1 font-mono text-mint text-sm">{formatNumber(parseFloat(balance), 2)} USDC</div>
                      <button
                        onClick={async () => {
                          setIsRefreshing(true);
                          try {
                            await refreshBalance();
                          } catch (e) {
                            console.error('Refresh failed', e);
                          }
                          setIsRefreshing(false);
                        }}
                        className="p-2 rounded hover:bg-obsidian-700/40 transition"
                        aria-label="Refresh balance"
                      >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    <div className="border-t border-white/[0.03]"></div>

                    <button
                      onClick={() => {
                        disconnect();
                        setProfileOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-obsidian-700/50 transition flex items-center gap-2 text-rose"
                    >
                      <LogOut className="w-4 h-4" />
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={handleConnect}
              className="btn-primary hidden sm:inline-flex gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-obsidian-700/50 rounded-lg transition"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
