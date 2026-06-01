import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import useAppStore from '../store';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: 'crypto',
    endDate: '',
  });

  const { addNotification } = useAppStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification({
      type: 'success',
      message: 'Market creation submitted! (Mock)',
    });
  };

  return (
    <div className="w-full pb-24 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create a Market</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 rounded-2xl">
          <label className="block mb-2 text-sm font-semibold">Market Question</label>
          <input
            type="text"
            required
            placeholder="e.g., Will Bitcoin reach $100K by end of 2025?"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="input-modern"
          />
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            required
            placeholder="Provide details about how this market will be resolved..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-modern min-h-24"
          />
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <label className="block mb-2 text-sm font-semibold">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input-modern"
          >
            <option>crypto</option>
            <option>politics</option>
            <option>sports</option>
            <option>tech</option>
            <option>entertainment</option>
            <option>science</option>
            <option>economics</option>
          </select>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <label className="block mb-2 text-sm font-semibold">End Date</label>
          <input
            type="datetime-local"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="input-modern"
          />
        </div>

        <div className="glass-card p-6 rounded-2xl border border-mint/20 bg-mint/5">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-mint flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Market Fee</h3>
              <p className="text-sm text-zinc-400">10 USDC creator fee + gas costs</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Create Market
        </button>
      </form>
    </div>
  );
}
