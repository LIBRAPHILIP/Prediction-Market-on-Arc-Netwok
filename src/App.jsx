import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import LiveFeedTicker from './components/Common/LiveFeedTicker';
import SpotlightCursor from './components/Common/SpotlightCursor';
import CommandPalette from './components/Common/CommandPalette';
import ParticleBackground from './components/Common/ParticleBackground';
import DepositModal from './components/Wallet/DepositModal';
import HomePage from './pages/HomePage';
import MarketsPage from './pages/MarketsPage';
import MarketDetailPage from './pages/MarketDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import CreatePage from './pages/CreatePage';
import LeaderboardPage from './pages/LeaderboardPage';
import DisputePage from './pages/DisputePage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian-950 text-zinc-100 overflow-x-hidden">
        <ParticleBackground />
        <SpotlightCursor />
        
        <Navbar />
        <LiveFeedTicker />

        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 pt-4 px-4 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/market/:id" element={<MarketDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/disputes" element={<DisputePage />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </main>
        </div>

        <CommandPalette />
        <DepositModal />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
