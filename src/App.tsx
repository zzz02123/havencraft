import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS_CATALOG, CURRENCY_CONFIGS } from './data/products';
import { HavenCraftProductPDP, CurrencyConfig, CartItem } from './types/storefront';
import { fetchAllProducts, createCheckout } from './lib/storefront';
import { mapShopifyProducts } from './lib/mapProduct';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeaderNav } from './components/HeaderNav';
import { PDPHeroSection } from './components/PDPHeroSection';
import { PDPMaterialsTable } from './components/PDPMaterialsTable';
import { PDPRoomFitCalculator } from './components/PDPRoomFitCalculator';
import { PDPFeaturesGrid } from './components/PDPFeaturesGrid';
import { PDPRoomSuitability } from './components/PDPRoomSuitability';
import { PDPAssemblyGuide } from './components/PDPAssemblyGuide';
import { PDPCareWarrantyAccordion } from './components/PDPCareWarrantyAccordion';
import { PDPShippingETACalculator } from './components/PDPShippingETACalculator';
import { PDPFAQSection } from './components/PDPFAQSection';
import { PDPCrossSellBundle } from './components/PDPCrossSellBundle';
import { PDPFooterTrust } from './components/PDPFooterTrust';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { CartDrawer } from './components/CartDrawer';
import { RewardsModal } from './components/RewardsModal';
import { MachineReadableInspector } from './components/MachineReadableInspector';
import { ReviewsModal } from './components/ReviewsModal';
import { CategoryBrowseView } from './components/CategoryBrowseView';

type CatalogSource = 'shopify' | 'local';

const handleFromUrl = () => new URLSearchParams(window.location.search).get('p');
const categoryFromUrl = () => new URLSearchParams(window.location.search).get('c');

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCY_CONFIGS.EUR);
  const [catalog, setCatalog] = useState<HavenCraftProductPDP[]>(PRODUCTS_CATALOG);
  const [activeProduct, setActiveProduct] = useState<HavenCraftProductPDP>(PRODUCTS_CATALOG[0]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl() || 'all');
  const [viewMode, setViewMode] = useState<'pdp' | 'browse'>(categoryFromUrl() ? 'browse' : 'pdp');
  const [source, setSource] = useState<CatalogSource>('local');
  const [loading, setLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // ---- Live catalogue from the Shopify Storefront API -------------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const shopifyProducts = await fetchAllProducts(250);
        if (cancelled) return;
        if (shopifyProducts.length) {
          const mapped = mapShopifyProducts(shopifyProducts);
          setCatalog(mapped);
          const wanted = handleFromUrl();
          setActiveProduct(mapped.find((p) => p.handle === wanted) || mapped[0]);
          setSource('shopify');
        } else {
          setCatalogError('Storefront API returned no products — showing local demo data.');
        }
      } catch (err: any) {
        if (!cancelled) setCatalogError(err?.message || 'Storefront API unavailable');
        console.warn('[storefront] falling back to local catalogue:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Browser back/forward between products
  useEffect(() => {
    const onPop = () => {
      const cat = categoryFromUrl();
      if (cat) {
        setActiveCategory(cat);
        setViewMode('browse');
        return;
      }
      const wanted = handleFromUrl();
      if (!wanted) return;
      const found = catalog.find((p) => p.handle === wanted);
      if (found) {
        setActiveProduct(found);
        setViewMode('pdp');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [catalog]);

  const handleAddToCart = useCallback(
    (product: HavenCraftProductPDP, purchaseType: 'onetime' | 'subscribe' = 'onetime', quantity: number = 1) => {
      const effectivePrice = purchaseType === 'subscribe' ? product.price * 0.85 : product.price;

      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) => item.product.id === product.id && item.purchaseType === purchaseType
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += quantity;
          return updated;
        }
        return [...prev, { product, quantity, purchaseType, effectivePrice }];
      });
      setCartOpen(true);
    },
    []
  );

  const handleAddBundle = (main: HavenCraftProductPDP, bundleItem: any) => {
    handleAddToCart(main, 'onetime', 1);
    const accessoryProduct =
      catalog.find((p) => p.handle === bundleItem.handle) ||
      ({
        ...main,
        id: bundleItem.id,
        title: bundleItem.title,
        handle: bundleItem.handle,
        tagline: 'Bundle accessory',
        price: bundleItem.price * 0.8,
        compareAtPrice: undefined,
        images: [{ url: bundleItem.image, altText: bundleItem.title }],
      } as HavenCraftProductPDP);
    handleAddToCart(accessoryProduct, 'onetime', 1);
  };

  const handleUpdateQuantity = (idx: number, newQty: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[idx].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  /** Real Shopify checkout: create a cart and hand over to Shopify's hosted checkout. */
  const handleCheckout = async () => {
    setCheckoutError(null);
    const lines = cartItems
      .map((item) => ({ merchandiseId: item.product.variantId || '', quantity: item.quantity }))
      .filter((l) => l.merchandiseId);

    if (source !== 'shopify' || lines.length !== cartItems.length) {
      setCheckoutError('Demo catalogue — connect the Storefront API to check out for real.');
      return;
    }

    setCheckingOut(true);
    try {
      const cart = await createCheckout(lines);
      if (!cart?.checkoutUrl) throw new Error('No checkout URL returned');
      window.location.href = cart.checkoutUrl;
    } catch (err: any) {
      setCheckoutError(err?.message || 'Checkout failed');
      setCheckingOut(false);
    }
  };

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setViewMode(slug === 'all' ? 'pdp' : 'browse');
    const url = new URL(window.location.href);
    if (slug === 'all') url.searchParams.delete('c');
    else url.searchParams.set('c', slug);
    url.searchParams.delete('p');
    window.history.pushState({ category: slug }, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: HavenCraftProductPDP) => {
    setActiveProduct(product);
    setViewMode('pdp');
    const url = new URL(window.location.href);
    url.searchParams.set('p', product.handle);
    url.searchParams.delete('c');
    window.history.pushState({ handle: product.handle }, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#2B2D42] gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#E2D9CC] border-t-[#D96B43] animate-spin" />
        <p className="text-xs font-semibold text-[#5F6B52]">Loading the live catalogue…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2B2D42]">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenRewards={() => setRewardsOpen(true)}
      />

      {/* 2. Mega Menu Navigation Header (3-Zone Top Bar Contract) */}
      <HeaderNav
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenRewards={() => setRewardsOpen(true)}
        onOpenInspector={() => setInspectorOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
      />

      {/* Live-data status strip */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className={`w-1.5 h-1.5 rounded-full ${source === 'shopify' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className={source === 'shopify' ? 'text-[#5F6B52] font-semibold' : 'text-amber-700 font-semibold'}>
            {source === 'shopify' ? `${catalog.length} products live from Shopify Storefront API` : 'Local demo catalogue'}
          </span>
          {catalogError && <span className="text-amber-700/80 truncate">· {catalogError}</span>}
        </div>
      </div>

      {/* Mode View Switcher (PDP vs Category Catalog) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 pb-20">
        {viewMode === 'browse' ? (
          <CategoryBrowseView
            products={catalog}
            categorySlug={activeCategory}
            currency={currentCurrency}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod) => handleAddToCart(prod, 'onetime', 1)}
          />
        ) : (
          <div>
            {/* The 12-Section High-Converting CRO PDP Architecture */}
            {/* Section 1 & 2: Hero Gallery & Contiguous Purchase Engine */}
            <PDPHeroSection
              product={activeProduct}
              currency={currentCurrency}
              onAddToCart={handleAddToCart}
              onOpenReviews={() => setReviewsOpen(true)}
            />

            {/* Section 3: 100% Non-Toxic & Sustainable Material Transparency */}
            <PDPMaterialsTable materials={activeProduct.materials} />

            {/* Section 4: Interactive Room Dimensions & Weight-Fit Estimator */}
            <PDPRoomFitCalculator dimensions={activeProduct.dimensions} />

            {/* Section 5: Product Differentiation & Solution Guarantee */}
            <PDPFeaturesGrid />

            {/* Section 6: Suitable Rooms & Interior Styles */}
            <PDPRoomSuitability rooms={activeProduct.roomSuitability} />

            {/* Section 7: Step-by-Step Instructions & Assembly Guide */}
            <PDPAssemblyGuide
              assemblyDifficulty={activeProduct.assemblyDifficulty}
              assemblyMinutes={activeProduct.assemblyMinutes}
            />

            {/* Section 8: Safety & Care Precautions + Structural Warranty Accordion */}
            <PDPCareWarrantyAccordion careInstructions={activeProduct.careInstructions} />

            {/* Section 9: Local Warehouse Fast Delivery Estimator */}
            <PDPShippingETACalculator currency={currentCurrency} />

            {/* Section 10: Dynamic JSON-LD Schema FAQ Section */}
            <PDPFAQSection />

            {/* Section 11: Frequently Bought Together (Routine Bundling with 1-Click Savings) */}
            <PDPCrossSellBundle mainProduct={activeProduct} currency={currentCurrency} onAddBundle={handleAddBundle} />
          </div>
        )}
      </main>

      {/* Section 12: Guaranteed Safe & Secure Payment Trust Badges & Social Community */}
      <PDPFooterTrust />

      {/* Mobile Sticky CTA Bar (Strictly 64px height limit, single-tap checkout) */}
      {viewMode === 'pdp' && (
        <MobileStickyCTA
          product={activeProduct}
          currency={currentCurrency}
          onAddToCart={() => handleAddToCart(activeProduct, 'onetime', 1)}
        />
      )}

      {/* Slide-over Shopping Basket Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onCheckout={handleCheckout}
        isCheckingOut={checkingOut}
        checkoutError={checkoutError}
      />

      {/* HavenClub Member Rewards Modal */}
      <RewardsModal
        isOpen={rewardsOpen}
        onClose={() => setRewardsOpen(false)}
        onApplyCode={(code) => {
          // Keep code ready
        }}
      />

      {/* Verified Reviews Modal */}
      <ReviewsModal isOpen={reviewsOpen} onClose={() => setReviewsOpen(false)} product={activeProduct} />

      {/* Machine-Readable Layer & Schema.org JSON-LD Inspector */}
      <MachineReadableInspector
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        product={activeProduct}
        currency={currentCurrency}
      />
    </div>
  );
}
