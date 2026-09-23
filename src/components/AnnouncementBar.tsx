import React from 'react';
import { CurrencyConfig } from '../types/storefront';
import { CURRENCY_CONFIGS } from '../data/products';
import { ShieldCheck, Truck, RotateCcw, Globe } from 'lucide-react';

interface AnnouncementBarProps {
  currentCurrency: CurrencyConfig;
  onSelectCurrency: (currency: CurrencyConfig) => void;
  onOpenRewards: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currentCurrency,
  onSelectCurrency,
  onOpenRewards,
}) => {
  return (
    <div className="bg-[#2B2D42] text-[#FAF8F5] text-xs font-medium border-b border-[#2B2D42]/20 py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Core Direct Trust Highlights */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start gap-4">
          <div className="flex items-center gap-1.5 text-emerald-300">
            <Truck className="w-3.5 h-3.5" />
            <span className="text-[#FAF8F5]">
              Direct Local Warehouse Dispatch <strong className="text-emerald-300">(24H)</strong>
            </span>
          </div>
          <span className="hidden md:inline text-white/30">·</span>
          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>VAT & Delivery Included</span>
          </div>
          <span className="hidden lg:inline text-white/30">·</span>
          <div className="hidden lg:flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>30-Day Risk-Free In-Home Trial</span>
          </div>
        </div>

        {/* Currency & Rewards Link */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRewards}
            className="text-amber-300 hover:text-amber-200 font-semibold tracking-wide transition-colors cursor-pointer"
          >
            HavenClub: Join & Get $10 OFF
          </button>

          <span className="text-white/30">|</span>

          {/* Regional Currency Switcher */}
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-white/60" />
            <select
              aria-label="Select Currency and Region"
              value={currentCurrency.code}
              onChange={(e) => onSelectCurrency(CURRENCY_CONFIGS[e.target.value])}
              className="bg-transparent text-[#FAF8F5] font-semibold text-xs rounded px-1 py-0.5 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-1 focus:ring-amber-300 cursor-pointer"
            >
              <option value="EUR" className="bg-[#2B2D42] text-white">🇪🇺 EUR (€)</option>
              <option value="USD" className="bg-[#2B2D42] text-white">🇺🇸 USD ($)</option>
              <option value="JPY" className="bg-[#2B2D42] text-white">🇯🇵 JPY (¥)</option>
              <option value="GBP" className="bg-[#2B2D42] text-white">🇬🇧 GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
