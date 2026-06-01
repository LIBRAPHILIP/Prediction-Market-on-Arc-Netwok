export default function LeaderboardPage() {
  const topTraders = [
    { rank: 1, address: '0x1a2B...3C4d', profit: 125000, winRate: '68%', volume: 450000 },
    { rank: 2, address: '0x5E6F...7G8h', profit: 98500, winRate: '62%', volume: 380000 },
    { rank: 3, address: '0x9I0J...1K2l', profit: 87200, winRate: '59%', volume: 320000 },
  ];

  return (
    <div className="w-full pb-24">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/[0.05]">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4 font-semibold">Rank</th>
              <th className="px-6 py-4 font-semibold">Address</th>
              <th className="px-6 py-4 font-semibold">Profit</th>
              <th className="px-6 py-4 font-semibold">Win Rate</th>
              <th className="px-6 py-4 font-semibold">Volume</th>
            </tr>
          </thead>
          <tbody>
            {topTraders.map((trader) => (
              <tr key={trader.rank} className="border-t border-white/[0.05] hover:bg-obsidian-700/30 transition">
                <td className="px-6 py-4 font-bold">{trader.rank}</td>
                <td className="px-6 py-4 font-mono text-zinc-300">{trader.address}</td>
                <td className="px-6 py-4 font-bold text-mint">${trader.profit.toLocaleString()}</td>
                <td className="px-6 py-4">{trader.winRate}</td>
                <td className="px-6 py-4 text-zinc-400">${(trader.volume / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
