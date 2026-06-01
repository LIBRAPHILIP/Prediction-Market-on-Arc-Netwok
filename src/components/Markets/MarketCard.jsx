import { Link } from 'react-router-dom';
import { Clock, BarChart3, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getTimeRemaining } from '../../utils/helpers';

export default function MarketCard({ market }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const timeRemaining = getTimeRemaining(market.endDate);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height * 8;
    const y = -(e.clientX - rect.left - rect.width / 2) / rect.width * 8;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const categoryColors = {
    crypto: 'from-orange-500 to-orange-600',
    politics: 'from-blue-500 to-blue-600',
    sports: 'from-green-500 to-green-600',
    tech: 'from-purple-500 to-purple-600',
    entertainment: 'from-pink-500 to-pink-600',
    science: 'from-cyan-500 to-cyan-600',
    economics: 'from-yellow-500 to-yellow-600',
  };

  return (
    <Link to={`/market/${market.id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="holo-card glass-card h-full cursor-pointer"
        style={{
          perspective: 1000,
          rotateX: `${rotation.x}deg`,
          rotateY: `${rotation.y}deg`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`px-2 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${categoryColors[market.category] || 'from-gray-500 to-gray-600'}`}>
              {market.category.charAt(0).toUpperCase() + market.category.slice(1)}
            </div>
            <div className="flex items-center gap-1 text-xs text-zinc-500 bg-obsidian-900/50 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3" />
              {timeRemaining.days}d
            </div>
          </div>

          {/* Question */}
          <h3 className="text-base sm:text-lg font-bold mb-3 line-clamp-2 text-zinc-100">
            {market.question}
          </h3>

          {/* Probability */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-mint/10 border border-mint/20 rounded-lg p-2">
              <div className="text-xs text-zinc-400 mb-1">YES</div>
              <div className="text-lg font-bold text-mint">${market.yesPrice.toFixed(2)}¢</div>
            </div>
            <div className="bg-rose/10 border border-rose/20 rounded-lg p-2">
              <div className="text-xs text-zinc-400 mb-1">NO</div>
              <div className="text-lg font-bold text-rose">${market.noPrice.toFixed(2)}¢</div>
            </div>
          </div>

          {/* Probability Bar */}
          <div className="w-full h-2 bg-obsidian-700/50 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-mint to-rose"
              style={{ width: `${market.yesPrice * 100}%` }}
            ></div>
          </div>

          {/* Mini Chart */}
          <div className="h-10 mb-4 flex items-end justify-between gap-1">
            {market.priceHistory.slice(-12).map((entry, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-aurora-cyan/50 to-aurora-cyan rounded-t"
                style={{ height: `${entry.price * 100}%` }}
              ></div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              ${(market.totalVolume / 1000000).toFixed(1)}M
            </div>
            <div>
              {market.traders.toLocaleString()} traders
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {market.comments}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
