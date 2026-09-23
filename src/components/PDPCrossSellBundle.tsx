import React, { useState } from 'react';
import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';
import { Plus, Check, Sparkles, CheckCircle2 } from 'lucide-react';

interface PDPCrossSellBundleProps {
  mainProduct: HavenCraftProductPDP;
  currency: CurrencyConfig;
  onAddBundle: (main: HavenCraftProductPDP, bundleItem: any) => void;
}

export const PDPCrossSellBundle: React.FC<PDPCrossSellBundleProps> = ({
  mainProduct,
  currency,
  onAddBundle,
}) => {
  const [bundleAdded, setBundleAdded] = useState(false);
  const bundle = mainProduct.bundleItem;

  if (!bundle) return null;

  const isJpy = currency.code === 'JPY';
  const mainPrice = mainProduct.price * currency.rateVsEur;
  const accessoryPrice = bundle.price * currency.rateVsEur;
  const bundleDiscount = 0.20; // 20% discount on accessory
  const discountedAccessoryPrice = accessoryPrice * (1 - bundleDiscount);
  const totalBundlePrice = mainPrice + discountedAccessoryPrice;
  const totalSavings = accessoryPrice - discountedAccessoryPrice;

  const formatPrice = (val: number) =>
    `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: isJpy ? 0 : 2,
      maximumFractionDigits: isJpy ? 0 : 2,
    })}`;

  const handleBuyBundle = () => {
    onAddBundle(mainProduct, bundle);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section className="mb-14 bg-[#F2ECE4]/70 border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-[#D96B43]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          Frequently Bought Together (Routine Bundle)
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 leading-relaxed">
        Pair your solid oak lounge chair with our traceable organic virgin wool throw blanket and save 20% on the accessory.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white border border-[#E2D9CC] rounded-xl p-5 shadow-xs">
        {/* Product Items Pair */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Main Item */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg border border-[#E2D9CC]/60 w-full sm:w-64">
            <img
              src={mainProduct.images[0].url}
              alt={mainProduct.title}
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-cover rounded-md border border-[#E2D9CC]"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-[#5F6B52] uppercase block">This Item</span>
              <h4 className="text-xs font-bold text-[#2B2D42] truncate">{mainProduct.title}</h4>
              <span className="text-xs font-extrabold font-mono text-[#2B2D42]">
                {formatPrice(mainPrice)}
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center shrink-0 text-[#2B2D42]">
            <Plus className="w-4 h-4" />
          </div>

          {/* Accessory Item */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg border border-[#E2D9CC]/60 w-full sm:w-64">
            <img
              src={bundle.image}
              alt={bundle.title}
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-cover rounded-md border border-[#E2D9CC]"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-[#D96B43] uppercase block">Save 20%</span>
              <h4 className="text-xs font-bold text-[#2B2D42] truncate">{bundle.title}</h4>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="font-extrabold text-[#D96B43]">{formatPrice(discountedAccessoryPrice)}</span>
                <span className="text-[#2B2D42]/40 line-through text-[11px]">{formatPrice(accessoryPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & 1-Click Buy Action */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2D9CC]/60">
          <div className="text-center lg:text-right">
            <div className="text-xs text-[#2B2D42]/60">Bundle Total (2 Items):</div>
            <div className="text-2xl font-extrabold font-mono text-[#2B2D42]">
              {formatPrice(totalBundlePrice)}
            </div>
            <div className="text-xs font-semibold text-emerald-700">
              You save {formatPrice(totalSavings)} instantly!
            </div>
          </div>

          <button
            onClick={handleBuyBundle}
            className={`w-full sm:w-auto py-3 px-6 rounded-lg text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              bundleAdded
                ? 'bg-emerald-600 scale-[1.02]'
                : 'bg-[#5F6B52] hover:bg-[#4E5842] active:scale-[0.98]'
            }`}
          >
            {bundleAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>BOTH ADDED TO BASKET!</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>BUY BOTH WITH 1-CLICK</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
