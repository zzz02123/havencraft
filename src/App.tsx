import React, { useState } from 'react';
import { PRODUCTS_CATALOG, CURRENCY_CONFIGS } from './data/products';
import { HavenCraftProductPDP, CurrencyConfig, CartItem } from './types/storefront';
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

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCY_CONFIGS.EUR);
  const [activeProduct, setActiveProduct] = useState<HavenCraftProductPDP>(PRODUCTS_CATALOG[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'pdp' | 'browse'>('pdp');

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (
    product: HavenCraftProductPDP,
    purchaseType: 'onetime' | 'subscribe' = 'onetime',
    quantity: number = 1
  ) => {
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
  };

  const handleAddBundle = (main: HavenCraftProductPDP, bundleItem: any) => {
    // Add main product
    handleAddToCart(main, 'onetime', 1);
    // Add accessory item at 20% discount
    const accessoryProduct: HavenCraftProductPDP = PRODUCTS_CATALOG.find(
      (p) => p.handle === bundleItem.handle
    ) || {
      id: bundleItem.id,
      title: bundleItem.title,
      handle: bundleItem.handle,
      tagline: 'Bundle Accessory',
      category: 'Textiles',
      roomCategory: 'living',
      descriptionHtml: '<p>Tactile wool accessory.</p>',
      price: bundleItem.price * 0.8, // 20% bundle discount
      images: [{ url: bundleItem.image, altText: bundleItem.title }],
      materials: [],
      dimensions: { lengthCm: 180, widthCm: 130, heightCm: 2, weightKg: 1.2, maxCapacityKg: 0 },
      roomSuitability: ['Living Room'],
      certifications: ['RWS Certified'],
      assemblyDifficulty: 'None',
      assemblyMinutes: 0,
      careInstructions: [],
      sellingPlans: [],
      reviews: [],
      rating: 4.9,
      reviewCount: 94,
      stockCount: 30,
      warehouseLocation: 'Regional Hub'
    };
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

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setViewMode(slug === 'all' ? 'pdp' : 'browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: HavenCraftProductPDP) => {
    setActiveProduct(product);
    setViewMode('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

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

      {/* Mode View Switcher (PDP vs Category Catalog) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 pb-20">
        {viewMode === 'browse' ? (
          <CategoryBrowseView
            products={PRODUCTS_CATALOG}
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
            <PDPCrossSellBundle
              mainProduct={activeProduct}
              currency={currentCurrency}
              onAddBundle={handleAddBundle}
            />
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
      <ReviewsModal
        isOpen={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        product={activeProduct}
      />

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
