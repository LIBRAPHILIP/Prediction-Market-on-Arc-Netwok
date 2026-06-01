import { create } from 'zustand';

const MOCK_NEWS = [
  {
    id: 1,
    title: 'US Federal Reserve Signals Rate Cuts in 2025',
    summary: 'Federal Reserve officials hint at possible interest rate reductions next year, sparking market volatility across equities.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500',
    source: 'Reuters',
    country: 'us',
    category: 'economics',
    sentiment: 'bullish',
    trending: true,
    timestamp: '2024-11-20T14:32:00Z',
    marketIdeas: [
      { question: 'Will the US Federal Reserve cut rates below 3% in 2025?', category: 'economics' },
      { question: 'Will Treasury yields fall below 4% by Q2 2025?', category: 'economics' },
    ],
  },
  {
    id: 2,
    title: 'Bitcoin Surge Continues to New All-Time Highs',
    summary: 'Bitcoin surpasses $48,000 amid growing institutional adoption and positive regulatory news from multiple countries.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500',
    source: 'CoinDesk',
    country: 'global',
    category: 'crypto',
    sentiment: 'bullish',
    trending: true,
    timestamp: '2024-11-21T09:15:00Z',
    marketIdeas: [
      { question: 'Will Bitcoin reach $150,000 by end of 2025?', category: 'crypto' },
      { question: 'Will Bitcoin surpass Ethereum in NFT trading volume?', category: 'crypto' },
    ],
  },
  {
    id: 3,
    title: 'Chinese Tech Stocks Face New Regulatory Scrutiny',
    summary: 'Chinese regulators announce new rules affecting major tech companies, causing significant market decline.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500',
    source: 'Bloomberg',
    country: 'cn',
    category: 'tech',
    sentiment: 'bearish',
    trending: true,
    timestamp: '2024-11-21T16:45:00Z',
    marketIdeas: [
      { question: 'Will Alibaba stock recover by Q1 2025?', category: 'tech' },
      { question: 'Will China ease tech regulations before 2026?', category: 'tech' },
    ],
  },
  {
    id: 4,
    title: 'OpenAI Releases Advanced AI Model',
    summary: 'OpenAI unveils a new large language model with significantly improved reasoning capabilities and reduced hallucinations.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    source: 'TechCrunch',
    country: 'us',
    category: 'tech',
    sentiment: 'bullish',
    trending: true,
    timestamp: '2024-11-22T10:20:00Z',
    marketIdeas: [
      { question: 'Will AI achieve AGI capabilities before 2027?', category: 'tech' },
      { question: 'Will AI be used in over 50% of enterprises by 2026?', category: 'tech' },
    ],
  },
  {
    id: 5,
    title: 'UK Economy Shows Signs of Weakness',
    summary: 'UK GDP growth slows to 0.1% in Q3, raising concerns about recession as businesses face headwinds.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500',
    source: 'The Guardian',
    country: 'uk',
    category: 'economics',
    sentiment: 'bearish',
    trending: false,
    timestamp: '2024-11-22T08:00:00Z',
    marketIdeas: [
      { question: 'Will UK economy enter recession in 2025?', category: 'economics' },
      { question: 'Will the Bank of England cut rates in 2025?', category: 'economics' },
    ],
  },
  {
    id: 6,
    title: 'European Union Passes AI Regulation Bill',
    summary: 'EU formally adopts AI Act, establishing strict rules for high-risk AI systems and creating new compliance requirements.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    source: 'Politico',
    country: 'eu',
    category: 'tech',
    sentiment: 'neutral',
    trending: false,
    timestamp: '2024-11-23T12:30:00Z',
    marketIdeas: [
      { question: 'Will AI companies reduce European operations due to AI Act?', category: 'tech' },
      { question: 'Will other countries adopt similar AI regulations by 2026?', category: 'tech' },
    ],
  },
  {
    id: 7,
    title: 'Tesla Reports Record Quarterly Sales',
    summary: 'Tesla achieves highest quarterly revenue ever amid strong EV demand and Cybertruck production ramp-up.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500',
    source: 'Wall Street Journal',
    country: 'us',
    category: 'tech',
    sentiment: 'bullish',
    trending: false,
    timestamp: '2024-11-23T15:10:00Z',
    marketIdeas: [
      { question: 'Will Tesla stock reach $300 by end of 2025?', category: 'tech' },
      { question: 'Will Tesla become the most valuable auto company by 2026?', category: 'tech' },
    ],
  },
  {
    id: 8,
    title: 'Olympics 2024: Historic Medal Count',
    summary: 'India achieves record-breaking medal count at Paris Olympics, marking a significant milestone in sports history.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
    source: 'ESPN',
    country: 'in',
    category: 'sports',
    sentiment: 'bullish',
    trending: false,
    timestamp: '2024-11-24T11:25:00Z',
    marketIdeas: [
      { question: 'Will India win more medals than China at next Olympics?', category: 'sports' },
      { question: 'Will Indian cricket team win ICC World Cup 2025?', category: 'sports' },
    ],
  },
  {
    id: 9,
    title: 'Nigeria Becomes Largest African Cryptocurrency Hub',
    summary: 'Nigeria surpasses South Africa in crypto adoption rates, with government backing emerging blockchain initiatives.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500',
    source: 'Cointelegraph',
    country: 'ng',
    category: 'crypto',
    sentiment: 'bullish',
    trending: false,
    timestamp: '2024-11-24T14:50:00Z',
    marketIdeas: [
      { question: 'Will African crypto market reach $100B by 2026?', category: 'crypto' },
      { question: 'Will Nigeria launch central bank digital currency before 2026?', category: 'crypto' },
    ],
  },
  {
    id: 10,
    title: 'Australia Announces AI Innovation Fund',
    summary: 'Australian government commits $20 billion to AI research and development over the next five years.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    source: 'ABC News',
    country: 'au',
    category: 'tech',
    sentiment: 'bullish',
    trending: false,
    timestamp: '2024-11-25T09:35:00Z',
    marketIdeas: [
      { question: 'Will Australia become top-5 AI research hub by 2026?', category: 'tech' },
      { question: 'Will Australian AI startups raise over $5B in 2025?', category: 'tech' },
    ],
  },
  {
    id: 11,
    title: 'Japan Launches Digital Yen Initiative',
    summary: 'Bank of Japan announces plans to pilot digital yen with major financial institutions in coming months.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500',
    source: 'Nikkei',
    country: 'jp',
    category: 'crypto',
    sentiment: 'neutral',
    trending: false,
    timestamp: '2024-11-25T13:20:00Z',
    marketIdeas: [
      { question: 'Will Digital Yen launch nationally before 2026?', category: 'crypto' },
      { question: 'Will other countries adopt similar CBDC initiatives by 2026?', category: 'crypto' },
    ],
  },
  {
    id: 12,
    title: 'South Korea Gaming Industry Reaches $50B Milestone',
    summary: 'South Korean gaming market sets new records driven by mobile gaming and esports investments.',
    imageUrl: 'https://images.unsplash.com/photo-1577720643272-265f434a22f5?w=500',
    source: 'Korea Times',
    country: 'kr',
    category: 'entertainment',
    sentiment: 'bullish',
    trending: false,
    timestamp: '2024-11-26T10:45:00Z',
    marketIdeas: [
      { question: 'Will South Korea dominate global esports by 2026?', category: 'entertainment' },
      { question: 'Will Korean game studios reach $100B revenue by 2027?', category: 'entertainment' },
    ],
  },
];

const useNewsStore = create((set, get) => ({
  news: MOCK_NEWS,
  selectedCategory: 'all',
  selectedCountry: 'global',
  searchQuery: '',
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredNews: () => {
    const { news, selectedCategory, selectedCountry, searchQuery } = get();
    
    return news.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedCountry !== 'global' && item.country !== selectedCountry) return false;
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  },
  
  getTrendingNews: () => {
    return get().news.filter(n => n.trending).slice(0, 5);
  },
  
  getNewsById: (id) => {
    return get().news.find(n => n.id === id);
  },
}));

export default useNewsStore;
