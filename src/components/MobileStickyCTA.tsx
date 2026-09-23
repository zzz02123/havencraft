import React from 'react';
import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';

interface MobileStickyCTAProps {
  product: HavenCraftProductPDP;
  currency: CurrencyConfig;
  onAddToCart: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  product,
  currency,
  onAddToCart,
}) => {
  const isJpy = currency.code === 'JPY';
  const priceFormatted = `${currency.symbol}${(product.price * currency.rateVsEur).toLocaleString(undefined, {
    minimumFractionDigits: isJpy ? 0 : 2,
    maximumFractionDigits: isJpy ? 0 : 2,
  })}`;

  return (
    <aside
      aria-label="Mobile purchase bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E2D9CC] z-40 px-4 flex items-center justify-between shadow-lg"
    >
      <div>
        <div className="text-[10px] uppercase font-bold text-[#5F6B52] tracking-wider leading-none mb-0.5">
          Free Express Delivery
        </div>
        <div className="text-lg font-extrabold font-mono text-[#2B2D42] leading-none">
          {priceFormatted}
        </div>
      </div>

      <button
        onClick={onAddToCart}
        className="h-10 px-5 rounded-lg bg-[#D96B43] hover:bg-[#C05732] active:scale-95 text-white text-xs font-bold transition-transform shadow-sm flex items-center justify-center cursor-pointer whitespace-nowrap"
      >
        ADD TO BASKET
      </button>
    </aside>
  );
};
