/**
 * Shopify Storefront API client (read-only, public token).
 * Used by the HavenCraft storefront to read the real catalogue from
 * td5kxa-2d.myshopify.com instead of the local mock data.
 *
 * The Storefront token is a public, read-only credential — safe in a browser
 * bundle. Never put Admin API credentials (SHOPIFY_CLIENT_ID/SECRET) here.
 */

const env = (import.meta as any).env || {};

export const SHOP_DOMAIN: string =
  env.VITE_SHOPIFY_SHOP_DOMAIN || 'td5kxa-2d.myshopify.com';
export const STOREFRONT_TOKEN: string =
  env.VITE_SHOPIFY_STOREFRONT_TOKEN || '1b79f0225e90f1b6c94941ca775e9d46';
export const API_VERSION: string = env.VITE_SHOPIFY_API_VERSION || '2025-07';

const ENDPOINT = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: ShopifyVariant[] };
  options: Array<{ name: string; values: string[] }>;
}

async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Storefront API ${res.status}: ${text.slice(0, 160)}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join('; '));
  }
  if (!res.ok) throw new Error(`Storefront API ${res.status}`);
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id handle title description descriptionHtml vendor productType tags availableForSale
  featuredImage { url altText width height }
  images(first: 12) { nodes { url altText width height } }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  options { name values }
  variants(first: 20) {
    nodes {
      id title sku availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
    }
  }
`;

/** First page(s) of the catalogue. */
export async function fetchProducts(opts: { first?: number; query?: string | null } = {}) {
  const { first = 60, query = null } = opts;
  const data = await gql<{ products: { nodes: ShopifyProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string } } }>(
    `query Products($first: Int!, $query: String) {
       products(first: $first, query: $query) {
         pageInfo { hasNextPage endCursor }
         nodes { ${PRODUCT_FIELDS} }
       }
     }`,
    { first, query }
  );
  return data.products;
}

/** Every product in the store (paginated, capped). */
type ProductPage = {
  products: { nodes: ShopifyProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
};

export async function fetchAllProducts(max = 250): Promise<ShopifyProduct[]> {
  const out: ShopifyProduct[] = [];
  let after: string | null = null;
  while (out.length < max) {
    const data = (await gql(
      `query Products($first: Int!, $after: String) {
         products(first: $first, after: $after) {
           pageInfo { hasNextPage endCursor }
           nodes { ${PRODUCT_FIELDS} }
         }
       }`,
      { first: Math.min(100, max - out.length), after }
    )) as ProductPage;
    out.push(...data.products.nodes);
    if (!data.products.pageInfo.hasNextPage) break;
    after = data.products.pageInfo.endCursor;
  }
  return out.slice(0, max);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await gql<{ product: ShopifyProduct | null }>(
    `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
    { handle }
  );
  return data.product;
}

/** Create a Shopify cart and return its hosted checkout URL. */
export async function createCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<{ id: string; checkoutUrl: string; totalQuantity: number }> {
  const data = await gql<any>(
    `mutation CartCreate($input: CartInput!) {
       cartCreate(input: $input) {
         cart { id checkoutUrl totalQuantity }
         userErrors { field message }
       }
     }`,
    { input: { lines } }
  );
  const errs = data.cartCreate.userErrors;
  if (errs?.length) throw new Error(errs.map((e: any) => e.message).join('; '));
  return data.cartCreate.cart;
}
