import heroOakLounge from '../assets/images/hero_oak_lounge_chair_1790141595540.jpg';
import loungeChairAngle from '../assets/images/lounge_chair_angle_1790141607092.jpg';
import loungeChairLivingRoom from '../assets/images/lounge_chair_living_room_1790141618481.jpg';
import diningTableImg from '../assets/images/dining_table_solid_wood_1790141628871.jpg';
import woolBlanketImg from '../assets/images/wool_throw_blanket_1790141638159.jpg';
import { HavenCraftProductPDP, MegaMenuItem, CurrencyConfig } from '../types/storefront';

export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateVsEur: 1,
    taxLabel: 'VAT included (EU Direct)',
    defaultCountry: 'DE',
    defaultLang: 'en'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateVsEur: 1.08,
    taxLabel: 'Taxes included at checkout',
    defaultCountry: 'US',
    defaultLang: 'en'
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    rateVsEur: 165,
    taxLabel: '税込 (Domestic Warehouse)',
    defaultCountry: 'JP',
    defaultLang: 'ja'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateVsEur: 0.85,
    taxLabel: 'VAT included',
    defaultCountry: 'UK',
    defaultLang: 'en'
  }
};

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    category: 'Living Room',
    slug: 'living-room',
    description: 'Ergonomic seating, modular couches, and warm solid oak centerpieces.',
    subcategories: [
      { name: 'Accent & Lounge Chairs', tag: 'accent-chairs' },
      { name: 'Modular Cloud Sofas', tag: 'sofas' },
      { name: 'Solid Oak Coffee Tables', tag: 'coffee-tables' },
      { name: 'Media Consoles & TV Stands', tag: 'tv-stands' },
      { name: 'Organic Wool Throws & Rugs', tag: 'rugs-textiles' }
    ],
    featuredBadge: 'Best Seller',
    promoNotice: 'Direct Factory Clearance: Extra 15% off with code HAVEN10'
  },
  {
    category: 'Bedroom',
    slug: 'bedroom',
    description: 'Natural solid wood platform beds, nightstands, and breathable linen textiles.',
    subcategories: [
      { name: 'Solid Wood Platform Beds', tag: 'beds' },
      { name: 'Floating Nightstands (Pairs)', tag: 'nightstands' },
      { name: 'Wardrobes & 6-Drawer Dressers', tag: 'dressers' },
      { name: 'Natural Latex Mattresses', tag: 'mattresses' },
      { name: 'Stone-Washed Linen Bedding', tag: 'bedding' }
    ],
    promoNotice: 'Free In-Room Delivery on all Bed Frames'
  },
  {
    category: 'Dining & Kitchen',
    slug: 'dining-kitchen',
    description: 'Extendable dining tables, ergonomic dining chairs, and solid wood kitchen islands.',
    subcategories: [
      { name: 'Extendable Solid Oak Tables', tag: 'dining-tables' },
      { name: 'Comfort Curved Dining Chairs', tag: 'dining-chairs' },
      { name: 'Bar Stools & Counter Seating', tag: 'bar-stools' },
      { name: 'Freestanding Kitchen Islands', tag: 'kitchen-islands' },
      { name: 'Buffet Sideboards & Credenzas', tag: 'sideboards' }
    ],
    featuredBadge: 'New Season'
  },
  {
    category: 'Patio & Garden',
    slug: 'patio-garden',
    description: 'Weatherproof teak conversation sets, outdoor dining, and rust-proof loungers.',
    subcategories: [
      { name: 'Teak Conversation Sets', tag: 'patio-sets' },
      { name: 'All-Weather Chaise Loungers', tag: 'sun-loungers' },
      { name: 'Aluminium Outdoor Dining Tables', tag: 'outdoor-dining' },
      { name: 'Sun Gazebos & Cantilever Umbrellas', tag: 'umbrellas' },
      { name: 'Smokeless Outdoor Fire Pits', tag: 'fire-pits' }
    ],
    promoNotice: 'Seasonal Patio Overstock: Up to 35% OFF'
  },
  {
    category: 'Home Office',
    slug: 'home-office',
    description: 'Sustainable ergonomic standing desks, supportive task chairs, and modular shelving.',
    subcategories: [
      { name: 'Solid Hardwood Standing Desks', tag: 'standing-desks' },
      { name: 'Lumbar-Support Task Chairs', tag: 'office-chairs' },
      { name: 'Modular Wall Bookshelves', tag: 'bookshelves' },
      { name: 'Under-Desk File Credenzas', tag: 'storage-filing' }
    ]
  },
  {
    category: 'Weekly Deals',
    slug: 'weekly-deals',
    description: 'Direct manufacturer liquidations, weekly bundle markdowns, and overstock.',
    subcategories: [
      { name: '⚡ Under €199 Doorbuys', tag: 'under-199' },
      { name: '📦 Warehouse Overstock Box Clearance', tag: 'overstock' },
      { name: '🎁 Buy 1 Get 1 50% Off Textiles', tag: 'bundle-deals' },
      { name: '🌟 Factory Direct Floor Samples', tag: 'open-box' }
    ],
    featuredBadge: 'Save up to 60%'
  }
];

export const PRODUCTS_CATALOG: HavenCraftProductPDP[] = [
  {
    id: 'gid://shopify/Product/8839201',
    title: 'HavenCraft Warm Oak Ergonomic Accent Lounge Chair',
    handle: 'nordic-oak-lounger',
    tagline: 'Crafted for Everyday Rest: Solid European Oak with Breathable Woven Linen',
    category: 'Living Room',
    roomCategory: 'living',
    descriptionHtml: `
      <p>Elevate your everyday relaxation with our master-crafted ergonomic lounge chair. Precision-carved from FSC-certified European white oak and paired with high-resilience memory cushioning wrapped in breathable, spill-resistant linen.</p>
      <p>Features zero-VOC plant-oil finishes to preserve your indoor air purity, plus reinforced acoustic joint dampers for completely silent, lifetime sitting comfort.</p>
    `,
    price: 289.00,
    compareAtPrice: 350.00,
    images: [
      { url: heroOakLounge, altText: 'HavenCraft Warm Oak Ergonomic Accent Lounge Chair in Sunlit Living Room' },
      { url: loungeChairAngle, altText: 'Close-up craftsmanship detail of solid oak armrest joints' },
      { url: loungeChairLivingRoom, altText: 'Lounge chair styled next to minimalist side table' }
    ],
    materials: [
      { component: 'Primary Frame & Legs', material: '100% Solid European White Oak (Kiln-Dried)', safetyCert: 'FSC-Certified C12498' },
      { component: 'Upholstery Fabric', material: '85% Recycled Linen / 15% Organic Cotton Weave', safetyCert: 'OEKO-TEX Standard 100 Class 1' },
      { component: 'Core Cushioning', material: 'High-Resilience Bio-Based Cold Foam', safetyCert: 'CertiPUR-US Certified' },
      { component: 'Surface Finish', material: 'Hand-Rubbed Organic Linseed & Carnauba Oil', safetyCert: 'Zero-VOC / EN 71-3 Child-Safe' },
      { component: 'Internal Joint Fasteners', material: 'Cadmium-Free High-Tensile Carbon Steel Bolts', safetyCert: 'DIN EN ISO 898-1' }
    ],
    dimensions: {
      lengthCm: 84,
      widthCm: 76,
      heightCm: 82,
      weightKg: 18.5,
      maxCapacityKg: 160
    },
    roomSuitability: ['Living Room', 'Reading Nook', 'Master Bedroom', 'Sunroom', 'Executive Office'],
    certifications: [
      '100% FSC Solid Wood',
      'OEKO-TEX 100 Fabric',
      'Zero-VOC Organic Oil Finish',
      '2-Year Structural Frame Warranty',
      '30-Day Risk-Free Home Trial'
    ],
    assemblyDifficulty: 'Easy (Single Person, Hex Key Included)',
    assemblyMinutes: 15,
    careInstructions: [
      'Wipe wooden surfaces clean with a soft, slightly damp lint-free cloth.',
      'For fabric spills, blot immediately with a clean dry towel (water beads up due to eco hydrophobic treatment).',
      'Avoid placing directly against intense radiant heat sources to protect natural wood grain oils.',
      'Re-tighten hex bolts gently after the first 6 months of normal home use.'
    ],
    sellingPlans: [
      {
        id: 'plan_haven_club_vip',
        name: 'HavenClub VIP Membership Purchase',
        discountPercentage: 15,
        features: [
          'Instant 15% discount today',
          'Extended 3-Year Structural Warranty',
          'Free annual upholstery cleaning kit refill',
          'Priority local courier slot dispatch'
        ]
      }
    ],
    bundleItem: {
      id: 'gid://shopify/Product/8839209',
      handle: 'wool-throw-blanket',
      title: 'HavenCraft Organic Virgin Wool Tactile Throw Blanket',
      price: 45.00,
      image: woolBlanketImg,
      discountPercent: 20
    },
    reviews: [
      {
        id: 'rev_1',
        author: 'Julian M.',
        city: 'Hamburg',
        country: 'Germany',
        rating: 5,
        date: '2026-08-14',
        title: 'Outstanding build quality and zero wood smells',
        content: 'I was hesitant to buy furniture online, but this chair exceeded expectations. Solid heavy oak legs, zero chemical smell upon unboxing, and the assembly took literally 12 minutes. The linen fabric feels soft yet durable.',
        verified: true
      },
      {
        id: 'rev_2',
        author: 'Elena R.',
        city: 'Lyon',
        country: 'France',
        rating: 5,
        date: '2026-07-29',
        title: 'Perfect reading nook companion',
        content: 'The recline angle is scientifically comfortable for reading. Fast delivery from their EU warehouse in only 3 days. Super happy with HavenCraft.',
        verified: true
      },
      {
        id: 'rev_3',
        author: 'Kenji T.',
        city: 'Tokyo',
        country: 'Japan',
        rating: 5,
        date: '2026-06-11',
        title: 'Great Japandi aesthetic and sturdy joints',
        content: 'Fits nicely in our Tokyo apartment. Compact footprint yet very roomy seating space. Highly recommended!',
        verified: true
      }
    ],
    rating: 4.88,
    reviewCount: 342,
    stockCount: 19,
    warehouseLocation: 'Regional Hub (Frankfurt / Chiba / New Jersey)'
  },
  {
    id: 'gid://shopify/Product/8839202',
    title: 'HavenCraft Solid White Oak Extendable Dining Table',
    handle: 'artisan-extendable-dining-table',
    tagline: 'Seats 6 to 10 with Whisper-Quiet Concealed Butterfly Extension Mechanism',
    category: 'Dining & Kitchen',
    roomCategory: 'dining',
    descriptionHtml: `
      <p>A lifetime dining centerpiece designed for intimate breakfasts and grand festive dinner parties. Crafted from select European white oak with end-grain detailing and an effortless 1-person butterfly expansion leaf.</p>
    `,
    price: 689.00,
    compareAtPrice: 849.00,
    images: [
      { url: diningTableImg, altText: 'HavenCraft Solid White Oak Extendable Dining Table in Modern Dining Room' },
      { url: heroOakLounge, altText: 'Matching wood tone furniture setup' }
    ],
    materials: [
      { component: 'Tabletop & Legs', material: 'Solid Grade-A European White Oak', safetyCert: 'FSC 100%' },
      { component: 'Extension Rails', material: 'Anodized Aircraft Aluminum Sliding Tracks', safetyCert: 'ISO 9001' },
      { component: 'Coating', material: 'Matte Food-Safe Polyurethane & Wax Oil', safetyCert: 'FDA / LFGB Food Contact Approved' }
    ],
    dimensions: {
      lengthCm: 180, // extends to 240cm
      widthCm: 90,
      heightCm: 76,
      weightKg: 52.0,
      maxCapacityKg: 220
    },
    roomSuitability: ['Dining Room', 'Open Plan Kitchen', 'Loft Space'],
    certifications: [
      '100% Solid Oak',
      'Food-Safe Certified Finish',
      'Concealed Butterfly Mechanism',
      '5-Year Frame Guarantee'
    ],
    assemblyDifficulty: 'Moderate (2 Persons, ~25 mins)',
    assemblyMinutes: 25,
    careInstructions: [
      'Wipe with a damp cloth; use mild dish soap for stubborn food grease.',
      'Always use coasters and trivets for piping hot cookware.'
    ],
    sellingPlans: [],
    reviews: [
      {
        id: 'rev_tab_1',
        author: 'Sophie B.',
        city: 'Munich',
        country: 'Germany',
        rating: 5,
        date: '2026-08-01',
        title: 'The butterfly extension mechanism is pure genius',
        content: 'Glides out smoothly without any squeaking. Heavy, sturdy oak table that will last for decades.',
        verified: true
      }
    ],
    rating: 4.92,
    reviewCount: 188,
    stockCount: 8,
    warehouseLocation: 'Regional Hub (Direct Freight Pallet)'
  },
  {
    id: 'gid://shopify/Product/8839209',
    title: 'HavenCraft Organic Virgin Wool Tactile Throw Blanket',
    handle: 'wool-throw-blanket',
    tagline: '100% Unbleached High-Mountain Virgin Wool in Natural Oatmeal Grain',
    category: 'Living Room',
    roomCategory: 'living',
    descriptionHtml: `
      <p>Add effortless warmth and textural depth to any armchair or sofa. Woven from unbleached high-mountain wool with fringe edges.</p>
    `,
    price: 45.00,
    compareAtPrice: 65.00,
    images: [
      { url: woolBlanketImg, altText: 'HavenCraft Organic Virgin Wool Tactile Throw Blanket folded' }
    ],
    materials: [
      { component: 'Fiber', material: '100% Traceable Virgin Wool', safetyCert: 'Responsible Wool Standard (RWS)' }
    ],
    dimensions: {
      lengthCm: 180,
      widthCm: 130,
      heightCm: 2,
      weightKg: 1.2,
      maxCapacityKg: 0
    },
    roomSuitability: ['Living Room', 'Bedroom', 'Balcony Lounging'],
    certifications: ['RWS Certified', 'Hypoallergenic Natural Fibers'],
    assemblyDifficulty: 'No Assembly Required',
    assemblyMinutes: 0,
    careInstructions: ['Dry clean or gentle hand wash with cold water and wool detergent.'],
    sellingPlans: [],
    reviews: [],
    rating: 4.85,
    reviewCount: 94,
    stockCount: 45,
    warehouseLocation: 'Regional Hub (Frankfurt / Tokyo / NY)'
  }
];
