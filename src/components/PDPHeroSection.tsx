import React, { useState } from 'react';
import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';
import { Star, ShieldCheck, Truck, RotateCcw, Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface PDPHeroSectionProps {
  product: HavenCraftProductPDP;
  currency: CurrencyConfig;
  onAddToCart: (product: HavenCraftProductPDP, purchaseType: 'onetime' | 'subscribe', quantity: number) => void;
  onOpenReviews: () => void;
}

export const PDPHeroSection: React.FC<PDPHeroSectionProps> = ({
  product,
  currency,
  onAddToCart,
  onOpenReviews,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscribe'>('onetime');
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState('Natural White Oak');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Price calculations
  const rawPrice = product.price * currency.rateVsEur;
  const rawComparePrice = product.compareAtPrice ? product.compareAtPrice * currency.rateVsEur : null;
  const isJpy = currency.code === 'JPY';

  const formatPrice = (amt: number) =>
    `${currency.symbol}${amt.toLocaleString(undefined, {
      minimumFractionDigits: isJpy ? 0 : 2,
      maximumFractionDigits: isJpy ? 0 : 2,
    })}`;

  const currentOneTimePrice = formatPrice(rawPrice);
  const currentVipPrice = formatPrice(rawPrice * 0.85);
  const currentComparePrice = rawComparePrice ? formatPrice(rawComparePrice) : null;
  const discountPercent = rawComparePrice ? Math.round(((rawComparePrice - rawPrice) / rawComparePrice) * 100) : 18;

  const handleBuy = () => {
    onAddToCart(product, purchaseType, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const finishOptions = [
    { name: 'Natural White Oak', colorHex: '#D7C4A5', inStock: true },
    { name: 'Warm Smoked Walnut', colorHex: '#6F4E37', inStock: true },
    { name: 'Nordic Bleached Ash', colorHex: '#EAE6DF', inStock: true },
  ];

  return (
    <section className="mb-12">
      {/* Module 1: Breadcrumb Navigation & Local Warehouse Dispatch Status */}
      <div className="flex flex-wrap items-center justify-between text-xs text-[#2B2D42]/70 pb-4 mb-6 border-b border-[#E2D9CC]/60 gap-2">
        <nav className="flex items-center gap-1.5" aria-label="Breadcrumb">
          <span className="hover:text-[#2B2D42] cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3 text-[#2B2D42]/40" />
          <span className="hover:text-[#2B2D42] cursor-pointer">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#2B2D42]/40" />
          <span className="text-[#5F6B52] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-[#5F6B52]">
            In Stock at {product.warehouseLocation}
          </span>
          <span className="text-[#2B2D42]/40">·</span>
          <span className="text-[#D96B43] font-bold">
            {product.stockCount > 0 && product.stockCount <= 5
              ? `Only ${product.stockCount} left`
              : product.stockCount > 0
                ? 'In stock'
                : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Module 2: Contiguous Hero Gallery & CRO Purchase Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Visual Showcase (55% on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-[#F2ECE4] border border-[#E2D9CC] aspect-[4/3] group shadow-xs">
            <img
              src={product.images[activeImageIdx]?.url}
              alt={product.images[activeImageIdx]?.altText || product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#2B2D42] font-semibold text-xs py-1 px-2.5 rounded-md border border-[#E2D9CC] flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5F6B52]" />
              <span>100% Solid European Oak</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-[#2B2D42]/80 text-[#FAF8F5] text-[11px] py-1 px-2 rounded backdrop-blur-xs">
              Image {activeImageIdx + 1} of {product.images.length}
            </div>
          </div>

          {/* Interactive Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative rounded-xl overflow-hidden w-20 h-20 shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIdx === idx
                    ? 'border-[#5F6B52] ring-2 ring-[#5F6B52]/20 scale-95'
                    : 'border-[#E2D9CC] hover:border-[#5F6B52]/60 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Highlights & Guarantees Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2ECE4]/70 border border-[#E2D9CC] rounded-xl text-xs text-[#2B2D42]/80">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#5F6B52] shrink-0" />
              <div>
                <strong className="block text-[#2B2D42]">24H Dispatch</strong>
                <span>Regional courier dispatch</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#5F6B52] shrink-0" />
              <div>
                <strong className="block text-[#2B2D42]">30-Day Trial</strong>
                <span>Hassle-free home returns</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5F6B52] shrink-0" />
              <div>
                <strong className="block text-[#2B2D42]">2-Yr Warranty</strong>
                <span>Solid structural guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 shadow-xs">
          {/* Brand Kicker */}
          <div className="text-xs font-bold tracking-wider uppercase text-[#5F6B52] mb-1.5">
            HAVENCRAFT COMFORT COLLECTION
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2D42] tracking-tight mb-2 leading-tight">
            {product.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-4 leading-relaxed">
            {product.tagline}
          </p>

          {/* Star Rating with Review Trigger — hidden while a product has no reviews yet */}
          {product.reviewCount > 0 && (
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#E2D9CC]/60 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-[#2B2D42]">{product.rating}</span>
            <span className="text-[#2B2D42]/40">·</span>
            <button
              onClick={onOpenReviews}
              className="text-[#5F6B52] hover:underline font-semibold cursor-pointer"
            >
              {product.reviewCount} Verified Home Reviews
            </button>
          </div>
          )}

          {/* Pricing Display */}
          <div className="bg-[#FAF8F5] border border-[#E2D9CC] rounded-xl p-4 mb-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#2B2D42] font-mono tabular-nums">
                {purchaseType === 'subscribe' ? currentVipPrice : currentOneTimePrice}
              </span>
              {currentComparePrice && (
                <span className="text-sm line-through text-[#2B2D42]/40 font-mono tabular-nums">
                  {currentComparePrice}
                </span>
              )}
              <span className="text-xs font-bold bg-[#D96B43] text-white px-2 py-0.5 rounded">
                SAVE {purchaseType === 'subscribe' ? discountPercent + 15 : discountPercent}%
              </span>
            </div>
            <div className="text-xs text-[#2B2D42]/60 mt-1 flex items-center justify-between">
              <span>{currency.taxLabel}</span>
              <span className="text-emerald-700 font-semibold">✓ Free Courier Delivery</span>
            </div>
          </div>

          {/* Wood Finish Options */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#2B2D42] mb-2">
              <span>Selected Finish: <strong className="text-[#5F6B52]">{selectedFinish}</strong></span>
              <span className="text-[#5F6B52] text-[11px]">Organic Oil Seal</span>
            </div>
            <div className="flex items-center gap-3">
              {finishOptions.map((fin) => (
                <button
                  key={fin.name}
                  onClick={() => setSelectedFinish(fin.name)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    selectedFinish === fin.name
                      ? 'border-[#5F6B52] bg-[#5F6B52]/10 text-[#2B2D42] ring-1 ring-[#5F6B52]'
                      : 'border-[#E2D9CC] bg-white text-[#2B2D42]/80 hover:border-[#5F6B52]/50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: fin.colorHex }}
                  />
                  <span>{fin.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subscribe & Save / HavenClub VIP Toggle (Costway / High CRO Pattern) */}
          <div className="border-2 border-[#5F6B52]/40 rounded-xl p-3.5 mb-5 bg-white space-y-2">
            <div className="text-xs font-bold text-[#5F6B52] flex items-center justify-between">
              <span>👑 Purchase Plan & HavenClub Benefits</span>
              <span className="text-[11px] bg-[#5F6B52]/10 text-[#5F6B52] font-semibold px-2 py-0.5 rounded">
                Member Tier
              </span>
            </div>

            {/* Radio Option 1: One-time */}
            <label
              className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                purchaseType === 'onetime'
                  ? 'border-[#5F6B52] bg-[#FAF8F5]'
                  : 'border-transparent hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="purchase_mode"
                  checked={purchaseType === 'onetime'}
                  onChange={() => setPurchaseType('onetime')}
                  className="accent-[#5F6B52] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#2B2D42]">
                  Standard One-Time Direct Order
                </span>
              </div>
              <span className="text-xs font-bold text-[#2B2D42] font-mono tabular-nums">
                {currentOneTimePrice}
              </span>
            </label>

            {/* Radio Option 2: VIP Member Care */}
            <label
              className={`flex items-start justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                purchaseType === 'subscribe'
                  ? 'border-[#D96B43] bg-[#D96B43]/5'
                  : 'border-transparent hover:bg-[#FAF8F5]/60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="radio"
                  name="purchase_mode"
                  checked={purchaseType === 'subscribe'}
                  onChange={() => setPurchaseType('subscribe')}
                  className="accent-[#D96B43] w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-[#D96B43] flex items-center gap-1">
                    <span>HavenClub VIP Order (Save Extra 15%)</span>
                  </div>
                  <div className="text-[11px] text-[#2B2D42]/60 mt-0.5">
                    Includes 3-Year Extended Warranty & priority local queue
                  </div>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#D96B43] font-mono tabular-nums shrink-0">
                {currentVipPrice}
              </span>
            </label>
          </div>

          {/* Quantity & Add to Cart Engine */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-[#E2D9CC] rounded-lg bg-[#FAF8F5] p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#2B2D42] hover:bg-[#E2D9CC] rounded font-bold text-sm transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold font-mono text-[#2B2D42]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#2B2D42] hover:bg-[#E2D9CC] rounded font-bold text-sm transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleBuy}
              className={`flex-1 py-3.5 px-6 rounded-lg font-bold text-sm text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 scale-[1.02]'
                  : 'bg-[#D96B43] hover:bg-[#C05732] active:scale-[0.98]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ADDED TO BASKET!</span>
                </>
              ) : (
                <>
                  <span>ADD TO BASKET — FREE EXPRESS DELIVERY</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Guarantees Micro-Row */}
          <div className="flex items-center justify-between text-[11px] text-[#2B2D42]/70 pt-3 border-t border-[#E2D9CC]/60">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Checkout
            </span>
            <span>·</span>
            <span>Direct Manufacturer Pricing</span>
            <span>·</span>
            <span>Free Delivery & Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
};
