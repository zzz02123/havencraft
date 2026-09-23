import React, { useState } from 'react';
import { X, Gift, CheckCircle2, Copy, Sparkles, Shield } from 'lucide-react';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCode: (code: string) => void;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  onApplyCode,
}) => {
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setClaimed(true);
      onApplyCode('HAVEN10');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('HAVEN10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white border border-[#E2D9CC] rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#2B2D42]/60 hover:text-[#2B2D42] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#5F6B52]/10 text-[#5F6B52] flex items-center justify-center mx-auto mb-3">
            <Gift className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#5F6B52] block mb-1">
            HAVENCLUB REWARDS
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#2B2D42] mb-2">
            Claim Your $10 Welcome Voucher
          </h3>

          <p className="text-xs text-[#2B2D42]/70 leading-relaxed mb-5">
            Join 45,000+ home enthusiasts for exclusive seasonal promotions, extended 3-year structural warranties, and member-only pricing.
          </p>

          {!claimed ? (
            <form onSubmit={handleClaim} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs py-3 px-4 border border-[#E2D9CC] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#5F6B52] text-[#2B2D42]"
              />

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#D96B43] hover:bg-[#C05732] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                UNLOCK $10 VOUCHER
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#2B2D42]/60 pt-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>Zero spam. Unsubscribe anytime with 1-click.</span>
              </div>
            </form>
          ) : (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-[#FAF8F5] border border-emerald-300 rounded-xl space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to HavenClub! Your code is active:</span>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="font-mono text-xl font-extrabold text-[#D96B43] tracking-wider bg-white px-4 py-1.5 rounded-lg border border-[#E2D9CC]">
                    HAVEN10
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 border border-[#E2D9CC] rounded-lg hover:bg-white text-xs font-semibold text-[#2B2D42] cursor-pointer"
                    title="Copy code"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#5F6B52] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Start Shopping with $10 Off
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
