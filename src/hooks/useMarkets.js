import { create } from 'zustand';
import { ethers } from 'ethers';
import { PREDICT_ARC_ABI, USDC_ABI } from '../contracts/abis';
import { CONTRACT_ADDRESSES } from '../utils/arc-config';
import useWalletStore from './useWallet';

const MOCK_MARKETS = [
  {
    id: 1,
    question: 'Will Bitcoin reach $150,000 by end of 2025?',
    description: 'This market resolves to "Yes" if the price of Bitcoin (BTC) reaches or exceeds $150,000 USD at any point before December 31, 2025, 23:59 UTC.',
    category: 'crypto',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400',
    endDate: '2025-12-31T23:59:00Z',
    startDate: '2024-01-01T00:00:00Z',
    yesPrice: 0.34,
    noPrice: 0.66,
    totalVolume: 2450000,
    totalLiquidity: 890000,
    totalYesShares: 340000,
    totalNoShares: 660000,
    traders: 4521,
    resolved: false,
    outcome: null,
    creator: '0x1234...5678',
    oracle: '0xabcd...ef01',
    priceHistory: [
      { time: '2024-01', price: 0.25 },
      { time: '2024-03', price: 0.28 },
      { time: '2024-05', price: 0.32 },
      { time: '2024-07', price: 0.30 },
      { time: '2024-09', price: 0.35 },
      { time: '2024-11', price: 0.34 },
    ],
    orderBook: {
      bids: [
        { price: 0.33, size: 5000, total: 5000 },
        { price: 0.32, size: 12000, total: 17000 },
        { price: 0.31, size: 8000, total: 25000 },
        { price: 0.30, size: 20000, total: 45000 },
        { price: 0.29, size: 15000, total: 60000 },
      ],
      asks: [
        { price: 0.35, size: 4000, total: 4000 },
        { price: 0.36, size: 10000, total: 14000 },
        { price: 0.37, size: 7000, total: 21000 },
        { price: 0.38, size: 18000, total: 39000 },
        { price: 0.39, size: 12000, total: 51000 },
      ],
    },
    comments: 234,
  },
  {
    id: 2,
    question: 'Will AI achieve AGI capabilities before 2027?',
    description: 'Resolves to "Yes" if any AI system demonstrates generally accepted Artificial General Intelligence capabilities as verified by a panel of at least 5 leading AI researchers.',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    endDate: '2027-01-01T00:00:00Z',
    startDate: '2024-06-01T00:00:00Z',
    yesPrice: 0.18,
    noPrice: 0.82,
    totalVolume: 1870000,
    totalLiquidity: 650000,
    totalYesShares: 180000,
    totalNoShares: 820000,
    traders: 3210,
    resolved: false,
    outcome: null,
    creator: '0x2345...6789',
    oracle: '0xbcde...f012',
    priceHistory: [
      { time: '2024-06', price: 0.12 },
      { time: '2024-07', price: 0.15 },
      { time: '2024-08', price: 0.14 },
      { time: '2024-09', price: 0.17 },
      { time: '2024-10', price: 0.19 },
      { time: '2024-11', price: 0.18 },
    ],
    orderBook: {
      bids: [
        { price: 0.17, size: 8000, total: 8000 },
        { price: 0.16, size: 15000, total: 23000 },
        { price: 0.15, size: 10000, total: 33000 },
        { price: 0.14, size: 25000, total: 58000 },
        { price: 0.13, size: 20000, total: 78000 },
      ],
      asks: [
        { price: 0.19, size: 6000, total: 6000 },
        { price: 0.20, size: 12000, total: 18000 },
        { price: 0.21, size: 8000, total: 26000 },
        { price: 0.22, size: 20000, total: 46000 },
        { price: 0.23, size: 15000, total: 61000 },
      ],
    },
    comments: 567,
  },
  {
    id: 3,
    question: 'Will the US Federal Reserve cut rates below 3% in 2025?',
    description: 'This market resolves to "Yes" if the Federal Funds Rate target upper bound falls below 3.00% at any scheduled or emergency FOMC meeting in 2025.',
    category: 'economics',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400',
    endDate: '2025-12-31T23:59:00Z',
    startDate: '2024-09-01T00:00:00Z',
    yesPrice: 0.56,
    noPrice: 0.44,
    totalVolume: 3200000,
    totalLiquidity: 1100000,
    totalYesShares: 560000,
    totalNoShares: 440000,
    traders: 5678,
    resolved: false,
    outcome: null,
    creator: '0x3456...7890',
    oracle: '0xcdef...0123',
    priceHistory: [
      { time: '2024-09', price: 0.45 },
      { time: '2024-10', price: 0.48 },
      { time: '2024-11', price: 0.52 },
      { time: '2024-12', price: 0.55 },
      { time: '2025-01', price: 0.56 },
    ],
    orderBook: {
      bids: [
        { price: 0.55, size: 10000, total: 10000 },
        { price: 0.54, size: 20000, total: 30000 },
        { price: 0.53, size: 15000, total: 45000 },
        { price: 0.52, size: 30000, total: 75000 },
        { price: 0.51, size: 25000, total: 100000 },
      ],
      asks: [
        { price: 0.57, size: 8000, total: 8000 },
        { price: 0.58, size: 18000, total: 26000 },
        { price: 0.59, size: 12000, total: 38000 },
        { price: 0.60, size: 25000, total: 63000 },
        { price: 0.61, size: 20000, total: 83000 },
      ],
    },
    comments: 892,
  },
];

const useMarketStore = create((set, get) => ({
  markets: MOCK_MARKETS,
  selectedMarket: null,
  isLoading: false,
  filter: 'all',
  sortBy: 'volume',
  searchQuery: '',

  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredMarkets: () => {
    const { markets, filter, sortBy, searchQuery } = get();
    let filtered = [...markets];

    if (filter !== 'all') {
      filtered = filtered.filter(m => m.category === filter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.question.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'volume':
        filtered.sort((a, b) => b.totalVolume - a.totalVolume);
        break;
      case 'liquidity':
        filtered.sort((a, b) => b.totalLiquidity - a.totalLiquidity);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
      case 'ending':
        filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        break;
      case 'probability':
        filtered.sort((a, b) => b.yesPrice - a.yesPrice);
        break;
      default:
        break;
    }

    return filtered;
  },

  selectMarket: async (marketId) => {
    set({ isLoading: true });
    const market = get().markets.find(m => m.id === marketId);
    set({ selectedMarket: market, isLoading: false });
    return market;
  },

  buyShares: async (marketId, outcome, amount, maxPrice) => {
    const { signer } = useWalletStore.getState();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.predictARC,
      PREDICT_ARC_ABI,
      signer
    );

    const tx = await contract.buyShares(
      marketId,
      outcome,
      ethers.parseUnits(amount.toString(), 6),
      ethers.parseUnits(maxPrice.toString(), 18)
    );

    await tx.wait();
    return tx;
  },

  sellShares: async (marketId, outcome, shares) => {
    const { signer } = useWalletStore.getState();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.predictARC,
      PREDICT_ARC_ABI,
      signer
    );

    const tx = await contract.sellShares(
      marketId,
      outcome,
      ethers.parseUnits(shares.toString(), 6)
    );

    await tx.wait();
    return tx;
  },

  createMarket: async (question, description, endDate, oracle, category) => {
    const { signer } = useWalletStore.getState();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.predictARC,
      PREDICT_ARC_ABI,
      signer
    );

    const tx = await contract.createMarket(
      question,
      description,
      Math.floor(new Date(endDate).getTime() / 1000),
      oracle,
      category
    );

    const receipt = await tx.wait();
    return receipt;
  },

  placeOrder: async (marketId, outcome, price, amount, orderType) => {
    const { signer } = useWalletStore.getState();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.predictARC,
      PREDICT_ARC_ABI,
      signer
    );

    const tx = await contract.placeOrder(
      marketId,
      outcome,
      ethers.parseUnits(price.toString(), 18),
      ethers.parseUnits(amount.toString(), 6),
      orderType
    );

    await tx.wait();
    return tx;
  },

  cancelOrder: async (orderId) => {
    const { signer } = useWalletStore.getState();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.predictARC,
      PREDICT_ARC_ABI,
      signer
    );

    const tx = await contract.cancelOrder(orderId);
    await tx.wait();
    return tx;
  },

  checkAllowance: async (address) => {
    // Mock implementation
    return 10000;
  },
}));

export default useMarketStore;
