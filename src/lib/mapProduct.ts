/**
 * Adapter: Shopify Storefront product -> HavenCraft PDP model.
 *
 * The store's products come from the Casalivo (ArkSwift) catalogue: Spanish
 * titles/descriptions plus a generated "Ficha técnica" table inside
 * descriptionHtml. This module extracts that structured data so the existing
 * 12-section PDP keeps working with real products.
 */
import type { HavenCraftProductPDP, MaterialItem } from '../types/storefront';
import type { ShopifyProduct } from './storefront';

/** The storefront brand prefix that should not be repeated inside HavenCraft UI. */
const STRIP_PREFIX = /^Casalivo\s+/i;

function stripBrand(title: string): string {
  return title.replace(STRIP_PREFIX, '').trim();
}

function plainText(html: string): string {
  return (html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSentence(text: string, max = 150): string {
  const clean = text.trim();
  const cut = clean.split(/(?<=[.!?])\s/)[0] || clean;
  return cut.length > max ? `${cut.slice(0, max - 1)}…` : cut;
}

/** Pull the <strong>Label</strong> / value pairs out of the spec table. */
function readSpecTable(html: string): Record<string, string> {
  const specs: Record<string, string> = {};
  const rowRe = /<tr>\s*<td>\s*<strong>(.*?)<\/strong>\s*<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/gi;
  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(html))) {
    const key = plainText(m[1]).toLowerCase();
    const value = plainText(m[2]);
    if (key && value) specs[key] = value;
  }
  return specs;
}

function parseDimensions(medidas: string | undefined) {
  const dims = { lengthCm: 0, widthCm: 0, heightCm: 0 };
  if (!medidas) return dims;
  const nums = medidas.match(/\d+(?:[.,]\d+)?/g) || [];
  const [l, w, h] = nums.map((n) => Number(n.replace(',', '.')));
  return { lengthCm: l || 0, widthCm: w || 0, heightCm: h || 0 };
}

function roomFromType(productType: string): HavenCraftProductPDP['roomCategory'] {
  const t = (productType || '').toLowerCase();
  if (/(garden|greenhouse|shed|grill|parasol|outdoor|patio|planter|bbq)/.test(t)) return 'patio';
  if (/(bed|nightstand|wardrobe|bookcase|shel|storage|cabinet|dresser|dressing|jewellery)/.test(t)) return 'bedroom';
  if (/(office|desk|chair)/.test(t)) return 'office';
  if (/(dining|table|buffet|sideboard|stool|bar|kitchen|server)/.test(t)) return 'dining';
  if (/(cat|dog|pet|litter|scratcher)/.test(t)) return 'living';
  return 'living';
}

function assemblyFor(roomCategory: string, productType: string) {
  const t = (productType || '').toLowerCase();
  if (/(greenhouse|shed|gazebo|pergola)/.test(t)) return { assemblyDifficulty: '2-person build', assemblyMinutes: 90 };
  if (roomCategory === 'patio') return { assemblyDifficulty: 'Light assembly', assemblyMinutes: 30 };
  if (/(table|sofa|bed|wardrobe|cabinet|bookcase|shel|nightstand|dresser)/.test(t))
    return { assemblyDifficulty: 'Flat-pack', assemblyMinutes: 45 };
  return { assemblyDifficulty: 'Ready to use', assemblyMinutes: 0 };
}

export function mapShopifyProduct(p: ShopifyProduct): HavenCraftProductPDP {
  const specs = readSpecTable(p.descriptionHtml);
  const dims = parseDimensions(specs['medidas (cm)'] || specs['medidas']);
  const weight = Number((specs['peso'] || '').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

  const materialNames = (specs['material'] || '')
    .split(/[,/]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const materials: MaterialItem[] = materialNames.map((name, i) => ({
    component: i === 0 ? 'Main structure' : `Component ${i + 1}`,
    material: name,
    safetyCert: 'EU standard',
  }));
  if (specs['color']) {
    materials.push({ component: 'Finish', material: specs['color'], safetyCert: '—' });
  }

  const roomCategory = roomFromType(p.productType);
  const { assemblyDifficulty, assemblyMinutes } = assemblyFor(roomCategory, p.productType);

  const price = Number(p.priceRange.minVariantPrice.amount);
  const compareAt = Number(p.compareAtPriceRange?.minVariantPrice?.amount || 0);
  const firstVariant = p.variants.nodes[0];

  return {
    id: p.id,
    title: stripBrand(p.title),
    handle: p.handle,
    tagline: firstSentence(plainText(p.descriptionHtml)),
    category: p.productType || 'Collection',
    roomCategory,
    descriptionHtml: p.descriptionHtml || `<p>${plainText(p.description)}</p>`,
    price,
    compareAtPrice: compareAt > price ? compareAt : undefined,
    images: (p.images.nodes.length ? p.images.nodes : p.featuredImage ? [p.featuredImage] : []).map(
      (img) => ({ url: img.url, altText: img.altText || stripBrand(p.title) })
    ),
    materials,
    dimensions: {
      ...dims,
      weightKg: weight,
      maxCapacityKg: 0,
    },
    roomSuitability: [roomCategory.charAt(0).toUpperCase() + roomCategory.slice(1)],
    certifications: ['EU fulfilled'],
    assemblyDifficulty,
    assemblyMinutes,
    careInstructions: ['Wipe with a soft dry cloth', 'Avoid prolonged direct sunlight'],
    sellingPlans: [],
    reviews: [],
    rating: 0,
    reviewCount: 0,
    // Exact available quantity needs the `unauthenticated_read_product_inventory`
    // Storefront scope; until then use availability + a display-only number.
    stockCount: p.availableForSale ? 25 : 0,
    warehouseLocation: 'EU Warehouse',
    variantId: firstVariant?.id,
    availableForSale: p.availableForSale,
  };
}

export function mapShopifyProducts(list: ShopifyProduct[]): HavenCraftProductPDP[] {
  return list.map(mapShopifyProduct);
}
