import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50"></div>

      {/* Animated Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan/10 rounded-full mix-blend-multiply filter blur-3xl animate-aurora"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-aurora-violet/10 rounded-full mix-blend-multiply filter blur-3xl animate-aurora" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-aurora-pink/10 rounded-full mix-blend-multiply filter blur-3xl animate-aurora" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-obsidian-800/50 border border-white/[0.08] rounded-full backdrop-blur-sm hover:border-white/[0.15] transition">
          <Zap className="w-4 h-4 text-aurora-cyan" />
          <span className="text-sm text-zinc-400">Prediction Market on ARC Network</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Predict the future.
          <br />
          <span className="bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-pink bg-clip-text text-transparent">
            Own the outcome.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
          Trade on global events with Circle CCTP integration. Fast, fair, and frictionless prediction markets powered by ARC Network.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate('/markets')}
            className="btn-primary group flex items-center justify-center gap-2"
          >
            Explore Markets
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
          <button
            onClick={() => navigate('/create')}
            className="btn-ghost"
          >
            How it works
          </button>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-12 border-t border-white/[0.05]">
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-aurora-cyan mb-2" />
            <div className="text-sm text-zinc-400">Proof of Stake</div>
            <div className="text-xs text-zinc-600">Secured</div>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-6 h-6 text-mint mb-2" />
            <div className="text-sm text-zinc-400">2s Finality</div>
            <div className="text-xs text-zinc-600">Fast Execution</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 flex items-center justify-center text-aurora-pink mb-2 font-bold">$</div>
            <div className="text-sm text-zinc-400">$12.4M Volume</div>
            <div className="text-xs text-zinc-600">Active Trading</div>
          </div>
        </div>
      </div>
    </div>
  );
}
