import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, ChevronDown, Menu, X, ArrowRight, Flame } from 'lucide-react';
import { MEGA_MENU_ITEMS } from '../data/products';
import { MegaMenuItem } from '../types/storefront';

interface HeaderNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenRewards: () => void;
  onOpenInspector: () => void;
  onSelectCategory: (slug: string) => void;
  activeCategory: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenRewards,
  onOpenInspector,
  onSelectCategory,
  activeCategory,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<MegaMenuItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2D9CC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2B2D42] hover:bg-[#F2ECE4] rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5F6B52] flex items-center justify-center text-[#FAF8F5] shadow-xs">
              <span className="text-lg leading-none font-serif">H</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B2D42]">
                HavenCraft
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Mega Menu trigger) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#2B2D42]/80">
          {MEGA_MENU_ITEMS.map((item) => {
            const isDeals = item.slug === 'weekly-deals';
            const isActive = activeCategory === item.slug;
            return (
              <div
                key={item.slug}
                className="relative"
                onMouseEnter={() => setHoveredMenu(item)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => onSelectCategory(item.slug)}
                  className={`py-2 px-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDeals
                      ? 'text-[#D96B43] hover:text-[#C05732] font-bold'
                      : isActive
                      ? 'text-[#5F6B52] font-bold'
                      : 'hover:text-[#2B2D42]'
                  }`}
                >
                  {isDeals && <Flame className="w-4 h-4 text-[#D96B43] animate-pulse" />}
                  <span>{item.category}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {/* Desktop Mega Menu Dropdown */}
                {hoveredMenu?.slug === item.slug && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] shadow-xl z-50">
                    <div className="bg-[#FFFFFF] border border-[#E2D9CC] rounded-xl p-5 shadow-lg">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E2D9CC]/60 mb-3">
                        <div>
                          <h4 className="font-bold text-[#2B2D42] text-sm">{item.category}</h4>
                          <p className="text-xs text-[#2B2D42]/60 mt-0.5">{item.description}</p>
                        </div>
                        {item.featuredBadge && (
                          <span className="text-[11px] font-bold text-[#D96B43] bg-[#D96B43]/10 px-2 py-0.5 rounded">
                            {item.featuredBadge}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {item.subcategories.map((sub) => (
                          <button
                            key={sub.tag}
                            onClick={() => {
                              onSelectCategory(item.slug);
                              setHoveredMenu(null);
                            }}
                            className="text-left text-xs py-2 px-3 rounded-md hover:bg-[#F2ECE4] text-[#2B2D42] hover:text-[#5F6B52] font-medium transition-colors flex items-center justify-between group"
                          >
                            <span>{sub.name}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5F6B52]" />
                          </button>
                        ))}
                      </div>

                      {item.promoNotice && (
                        <div className="bg-[#FAF8F5] border border-[#E2D9CC] rounded-lg p-2.5 flex items-center justify-between text-xs">
                          <span className="text-[#2B2D42] font-medium">🎁 {item.promoNotice}</span>
                          <button
                            onClick={() => {
                              onSelectCategory(item.slug);
                              setHoveredMenu(null);
                            }}
                            className="text-[#D96B43] font-bold hover:underline"
                          >
                            Explore →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Machine Layer, Rewards, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Box / Toggle */}
          {showSearchInput ? (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search oak chair, dining table..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-white text-xs border border-[#E2D9CC] rounded-full py-1.5 pl-8 pr-7 w-48 sm:w-64 focus:outline-none focus:ring-1 focus:ring-[#5F6B52]"
              />
              <Search className="w-3.5 h-3.5 text-[#2B2D42]/50 absolute left-2.5" />
              <button
                onClick={() => setShowSearchInput(false)}
                className="absolute right-2 text-xs text-[#2B2D42]/40 hover:text-[#2B2D42]"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-[#2B2D42]/80 hover:text-[#2B2D42] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
              title="Search Catalog"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* AI / Machine Layer Inspector (Schema & llms.txt) */}
          <button
            onClick={onOpenInspector}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-[#5F6B52]/30 text-[#5F6B52] hover:bg-[#5F6B52]/10 transition-colors cursor-pointer"
            title="Inspect Machine-Readable Layer & JSON-LD"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI / Schema Layer</span>
          </button>

          {/* HavenClub Rewards */}
          <button
            onClick={onOpenRewards}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-[#F2ECE4] text-[#2B2D42] hover:bg-[#E2D9CC] transition-colors cursor-pointer"
          >
            <span>🎁 $10 Off Club</span>
          </button>

          {/* Cart Bag Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#2B2D42] text-[#FAF8F5] hover:bg-[#2B2D42]/90 rounded-lg transition-transform active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
            aria-label={`Shopping Basket with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D96B43] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Nav Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2D9CC] p-4 space-y-3">
          <div className="text-xs font-bold text-[#2B2D42]/50 tracking-wider uppercase mb-1">
            Product Categories
          </div>
          {MEGA_MENU_ITEMS.map((item) => (
            <div key={item.slug} className="border-b border-[#E2D9CC]/50 pb-2">
              <button
                onClick={() => {
                  onSelectCategory(item.slug);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm font-semibold text-[#2B2D42] py-1"
              >
                <span>{item.category}</span>
                {item.featuredBadge ? (
                  <span className="text-[10px] text-[#D96B43] font-bold bg-[#D96B43]/10 px-1.5 py-0.5 rounded">
                    {item.featuredBadge}
                  </span>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-[#5F6B52]" />
                )}
              </button>
            </div>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRewards();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-bold bg-[#F2ECE4] text-[#2B2D42] rounded-lg"
            >
              🎁 HavenClub: Join & Get $10 OFF
            </button>
            <button
              onClick={() => {
                onOpenInspector();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-semibold border border-[#5F6B52] text-[#5F6B52] rounded-lg"
            >
              ✨ Machine-Readable Layer & Schema
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
