import { formatDistanceToNow, format, isPast } from 'date-fns';

export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatCompact = (value) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toString();
};

export const formatProbability = (value) => {
  return `${(value * 100).toFixed(0)}%`;
};

export const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatExpiry = (date) => {
  const d = new Date(date);
  if (isPast(d)) return 'Expired';
  return format(d, 'MMM d, yyyy h:mm a');
};

export const getTimeRemaining = (endDate) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0 };

  return {
    expired: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  };
};

export const calculatePayout = (amount, price) => {
  return amount / price;
};

export const calculateProfit = (shares, avgPrice) => {
  return shares * (1 - avgPrice);
};

export const shortenAddress = (address, chars = 4) => {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const getMarketStatus = (market) => {
  if (market.resolved) return 'resolved';
  if (new Date(market.endDate) < new Date()) return 'expired';
  if (new Date(market.startDate) > new Date()) return 'upcoming';
  return 'active';
};

export const getCategoryColor = (category) => {
  const colors = {
    politics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    crypto: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    sports: 'bg-green-500/20 text-green-400 border-green-500/30',
    tech: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    entertainment: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    science: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    economics: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    culture: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
};

export const generateOrderId = () => {
  return `0x${Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
};
