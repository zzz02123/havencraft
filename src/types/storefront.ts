export type SupportedCountry = 'DE' | 'FR' | 'JP' | 'US' | 'UK';
export type SupportedLanguage = 'de' | 'fr' | 'ja' | 'en';
export type CurrencyCode = 'EUR' | 'JPY' | 'USD' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateVsEur: number;
  taxLabel: string;
  defaultCountry: SupportedCountry;
  defaultLang: SupportedLanguage;
}

export interface MaterialItem {
  component: string;
  material: string;
  safetyCert: string;
}

export interface DimensionSpec {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
  maxCapacityKg: number;
}

export interface SellingPlan {
  id: string;
  name: string;
  discountPercentage: number;
  features: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  country: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  userPhoto?: string;
}

export interface CrossSellBundleItem {
  id: string;
  handle: string;
  title: string;
  price: number;
  image: string;
  discountPercent: number;
}

export interface HavenCraftProductPDP {
  id: string;
  title: string;
  handle: string;
  tagline: string;
  category: string;
  roomCategory: 'living' | 'dining' | 'bedroom' | 'patio' | 'office';
  descriptionHtml: string;
  price: number;
  compareAtPrice?: number;
  images: Array<{ url: string; altText: string }>;
  materials: MaterialItem[];
  dimensions: DimensionSpec;
  roomSuitability: string[];
  certifications: string[];
  assemblyDifficulty: string;
  assemblyMinutes: number;
  careInstructions: string[];
  sellingPlans: SellingPlan[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  bundleItem?: CrossSellBundleItem;
  stockCount: number;
  warehouseLocation: string;
}

export interface CartItem {
  product: HavenCraftProductPDP;
  quantity: number;
  purchaseType: 'onetime' | 'subscribe';
  effectivePrice: number;
  selectedColor?: string;
}

export interface MegaMenuItem {
  category: string;
  slug: string;
  description: string;
  subcategories: Array<{ name: string; tag: string }>;
  featuredBadge?: string;
  promoNotice?: string;
}
