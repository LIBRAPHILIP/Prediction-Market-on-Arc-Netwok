import { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import useAppStore from '../../store';
import useCCTP from '../../hooks/useCCTP';
import { formatCurrency } from '../../utils/helpers';

export default function DepositModal() {
  const { isDepositModalOpen, setDepositModalOpen } = useAppStore();
  const { bridgeUSDC, isBridging, bridgeStep } = useCCTP();
  
  const [step, setStep] = useState(0);
  const [selectedChain, setSelectedChain] = useState(null);
  const [amount, setAmount] = useState('');

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
    { id: 'sepolia', name: 'Sepolia (Testnet)', icon: '⟠' },
  ];

  const quickAmounts = [100, 500, 1000, 5000];

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else setIsDepositModalOpen(false);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBridge = async () => {
    if (!amount || !selectedChain) return;
    try {
      await bridgeUSDC(selectedChain, parseFloat(amount));
      setStep(3);
    } catch (error) {
      console.error('Bridge error:', error);
    }
  };

  if (!isDepositModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40" onClick={() => setDepositModalOpen(false)}>
      <div
        className="w-full max-w-md glass-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.05]">
          <h2 className="text-xl font-bold">Deposit USDC</h2>
          <button
            onClick={() => setDepositModalOpen(false)}
            className="p-2 hover:bg-obsidian-700/50 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 px-6 pt-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition ${
                i < step || (i === step && bridgeStep)
                  ? 'bg-mint'
                  : i === step
                  ? 'bg-aurora-cyan'
                  : 'bg-obsidian-700/50'
              }`}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-64">
          {step === 0 && (
            <div>
              <h3 className="font-semibold mb-4">Select Source Chain</h3>
              <div className="space-y-3">
                {chains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => {
                      setSelectedChain(chain.id);
                      setStep(1);
                    }}
                    className={`w-full p-4 rounded-lg border-2 transition text-left ${
                      selectedChain === chain.id
                        ? 'border-aurora-cyan bg-aurora-cyan/10'
                        : 'border-white/[0.08] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{chain.icon}</span>
                      <span className="font-semibold">{chain.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4">Enter Amount</h3>
              <div className="space-y-4">
                <div className="flex gap-2 items-center justify-between bg-obsidian-800/50 p-4 rounded-lg">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">From</div>
                    <div className="text-sm font-semibold">{chains.find(c => c.id === selectedChain)?.name}</div>
                  </div>
                  <div>→</div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">To</div>
                    <div className="text-sm font-semibold">ARC Network</div>
                  </div>
                </div>

                <input
                  type="number"
                  placeholder="Enter amount in USDC"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-modern"
                />

                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a.toString())}
                      className="btn-ghost"
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                <div className="bg-obsidian-800/50 p-4 rounded-lg text-sm text-zinc-400">
                  <div className="flex justify-between mb-2">
                    <span>Gas Fee</span>
                    <span>~$2-5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETA</span>
                    <span>5-15 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold mb-4">Confirm</h3>
              <div className="space-y-3">
                <div className="bg-obsidian-800/50 p-4 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Amount</div>
                  <div className="text-lg font-bold">{formatCurrency(parseFloat(amount) || 0)}</div>
                </div>
                <div className="bg-obsidian-800/50 p-4 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Source</div>
                  <div className="text-lg font-bold">{chains.find(c => c.id === selectedChain)?.name}</div>
                </div>
                <div className="bg-obsidian-800/50 p-4 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Destination</div>
                  <div className="text-lg font-bold">ARC Network</div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              {isBridging ? (
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-obsidian-700 border-t-aurora-cyan animate-spin"></div>
                  <p className="font-semibold mb-2">{bridgeStep}</p>
                </div>
              ) : (
                <div>
                  <Check className="w-16 h-16 mx-auto mb-4 text-mint" />
                  <p className="font-semibold">Bridge Complete!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-white/[0.05]">
          <button
            onClick={handleBack}
            disabled={isBridging}
            className="flex-1 btn-ghost"
          >
            Back
          </button>
          {step < 2 && (
            <button
              onClick={handleNext}
              disabled={isBridging || (step === 1 && !amount)}
              className="flex-1 btn-primary"
            >
              Next
            </button>
          )}
          {step === 2 && (
            <button
              onClick={handleBridge}
              disabled={isBridging}
              className="flex-1 btn-primary"
            >
              Bridge
            </button>
          )}
          {step === 3 && (
            <button
              onClick={() => setDepositModalOpen(false)}
              className="flex-1 btn-primary"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
