/**
 * Shopify Storefront GraphQL Client & Query Templates
 * Supports dynamic country & language contexts via @inContext
 */

export interface ShopifyContext {
  country: string;  // e.g., 'DE', 'JP', 'US', 'FR'
  language: string; // e.g., 'DE', 'JA', 'EN', 'FR'
}

export const SHOPIFY_STORE_DOMAIN = 'havencraft-home.myshopify.com';

/**
 * Core GraphQL query template fetching Product Detail Page (PDP) data
 * including Selling Plan Groups (Subscriptions), Metafields, and Localized Prices.
 */
export const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode) 
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      tags
      options {
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          sku
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      # Subscription Selling Plans
      sellingPlanGroups(first: 5) {
        nodes {
          id
          name
          options {
            name
            values
          }
          sellingPlans(first: 10) {
            nodes {
              id
              name
              description
              priceAdjustments {
                adjustmentValue {
                  ... on SellingPlanPercentagePriceAdjustment {
                    adjustmentPercentage
                  }
                }
              }
            }
          }
        }
      }
      # HavenCraft Custom Metafields for PSEO & PDP Transparency
      materials: metafield(namespace: "custom", key: "materials_breakdown") { value }
      dimensions: metafield(namespace: "custom", key: "dimensions_spec") { value }
      assemblyGuide: metafield(namespace: "custom", key: "assembly_guide") { value }
      roomFit: metafield(namespace: "custom", key: "room_suitability") { value }
      certifications: metafield(namespace: "custom", key: "certifications") { value }
      careInstructions: metafield(namespace: "custom", key: "care_instructions") { value }
      weightCapacity: metafield(namespace: "custom", key: "weight_capacity") { value }
    }
  }
`;
