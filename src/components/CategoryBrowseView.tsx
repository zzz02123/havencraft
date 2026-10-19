import React, { useState } from 'react';
import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';
import { Star, ShieldCheck, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface CategoryBrowseViewProps {
  products: HavenCraftProductPDP[];
  categorySlug: string;
  currency: CurrencyConfig;
  onSelectProduct: (product: HavenCraftProductPDP) => void;
  onAddToCart: (product: HavenCraftProductPDP) => void;
}

export const CategoryBrowseView: React.FC<CategoryBrowseViewProps> = ({
  products,
  categorySlug,
  currency,
  onSelectProduct,
  onAddToCart,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const isJpy = currency.code === 'JPY';
  const formatPrice = (amt: number) =>
    `${currency.symbol}${(amt * currency.rateVsEur).toLocaleString(undefined, {
      minimumFractionDigits: isJpy ? 0 : 2,
      maximumFractionDigits: isJpy ? 0 : 2,
    })}`;

  // Mega-menu slug -> PDP room category (real catalogue uses patio/bedroom/office too)
  const SLUG_TO_ROOM: Record<string, 'living' | 'dining' | 'bedroom' | 'patio' | 'office'> = {
    'living-room': 'living',
    'dining-kitchen': 'dining',
    bedroom: 'bedroom',
    'patio-garden': 'patio',
    'home-office': 'office',
  };

  let filtered = products;
  if (categorySlug !== 'all') {
    if (categorySlug === 'weekly-deals') {
      filtered = products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    } else if (SLUG_TO_ROOM[categorySlug]) {
      filtered = products.filter((p) => p.roomCategory === SLUG_TO_ROOM[categorySlug]);
    }
  }

  if (sortOrder === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const categoryTitles: Record<string, { title: string; desc: string }> = {
    all: {
      title: 'The Full HavenCraft Collection',
      desc: 'Master-crafted solid woods, organic upholstery, and non-toxic home essentials.'
    },
    'living-room': {
      title: 'Living Room & Relaxation Havens',
      desc: 'Sculptural accent chairs, modular seating, and solid oak tables designed for everyday calm.'
    },
    'dining-kitchen': {
      title: 'Dining & Kitchen Gathering Tables',
      desc: 'Extendable dining tables with concealed mechanisms and solid wood construction.'
    },
    'weekly-deals': {
      title: '🔥 Weekly Direct Factory Liquidations',
      desc: 'Direct-from-manufacturer special offers and seasonal overstock savings up to 35%.'
    }
  };

  const currentInfo = categoryTitles[categorySlug] || categoryTitles.all;

  return (
    <div className="py-6">
      {/* Category Header Banner */}
      <div className="bg-[#F2ECE4]/80 border border-[#E2D9CC] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5F6B52] mb-1">
            HAVENCRAFT CATALOG
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2D42] mb-2">
            {currentInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#2B2D42]/70 leading-relaxed">
            {currentInfo.desc}
          </p>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-[#E2D9CC] gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2D9CC] rounded-lg text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`py-1.5 px-3 rounded-md font-semibold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#5F6B52] text-white shadow-2xs'
                : 'text-[#2B2D42]/70 hover:text-[#2B2D42]'
            }`}
          >
            All Items ({filtered.length})
          </button>
          <button
            onClick={() => setFilterType('wood')}
            className={`py-1.5 px-3 rounded-md font-semibold transition-colors cursor-pointer ${
              filterType === 'wood'
                ? 'bg-[#5F6B52] text-white shadow-2xs'
                : 'text-[#2B2D42]/70 hover:text-[#2B2D42]'
            }`}
          >
            Solid Oak & Wood
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#2B2D42]/60">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e: any) => setSortOrder(e.target.value)}
            className="bg-white border border-[#E2D9CC] rounded-lg py-1.5 px-3 text-xs font-semibold text-[#2B2D42] focus:outline-none focus:ring-1 focus:ring-[#5F6B52] cursor-pointer"
          >
            <option value="featured">Featured & Best Selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="bg-white border border-[#E2D9CC] rounded-2xl overflow-hidden shadow-xs hover:border-[#5F6B52]/50 transition-all group flex flex-col justify-between"
          >
            {/* Top Image area */}
            <div
              onClick={() => onSelectProduct(prod)}
              className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden cursor-pointer"
            >
              <img
                src={prod.images[0].url}
                alt={prod.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#2B2D42] font-semibold text-[11px] py-1 px-2.5 rounded-md border border-[#E2D9CC] flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#5F6B52]" />
                <span>{prod.category}</span>
              </div>
              {prod.compareAtPrice && (
                <div className="absolute top-3 right-3 bg-[#D96B43] text-white font-bold text-[10px] py-1 px-2 rounded shadow-xs">
                  SAVE 18%
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {prod.reviewCount > 0 && (
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[#2B2D42]">{prod.rating}</span>
                    <span className="text-[#2B2D42]/40">({prod.reviewCount})</span>
                  </div>
                )}

                <h3
                  onClick={() => onSelectProduct(prod)}
                  className="font-serif font-bold text-base text-[#2B2D42] hover:text-[#5F6B52] transition-colors cursor-pointer mb-1.5 leading-snug"
                >
                  {prod.title}
                </h3>

                <p className="text-xs text-[#2B2D42]/70 line-clamp-2 mb-4 leading-relaxed">
                  {prod.tagline}
                </p>
              </div>

              <div>
                {/* Price */}
                <div className="flex items-baseline gap-2 pt-3 border-t border-[#E2D9CC]/60 mb-4">
                  <span className="text-xl font-extrabold font-mono text-[#2B2D42]">
                    {formatPrice(prod.price)}
                  </span>
                  {prod.compareAtPrice && (
                    <span className="text-xs line-through text-[#2B2D42]/40 font-mono">
                      {formatPrice(prod.compareAtPrice)}
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-[#5F6B52] font-medium">
                    Free Courier Delivery
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="py-2.5 px-3 rounded-lg border border-[#5F6B52] text-[#5F6B52] hover:bg-[#5F6B52]/10 text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    View 12-CRO Specs
                  </button>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="py-2.5 px-3 rounded-lg bg-[#D96B43] hover:bg-[#C05732] text-white text-xs font-bold transition-colors cursor-pointer text-center shadow-xs"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
