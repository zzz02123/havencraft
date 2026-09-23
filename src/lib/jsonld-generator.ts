import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';

export function generateProductJsonLd(
  product: HavenCraftProductPDP,
  currency: CurrencyConfig,
  url: string
): string {
  const convertedPrice = (product.price * currency.rateVsEur).toFixed(currency.code === 'JPY' ? 0 : 2);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'image': product.images.map(img => img.url),
    'description': `${product.title} - HavenCraft Comfort Collection. ${product.tagline}`,
    'sku': product.id,
    'mpn': product.handle,
    'brand': {
      '@type': 'Brand',
      'name': 'HavenCraft'
    },
    'material': product.materials.map(m => `${m.component}: ${m.material} (${m.safetyCert})`).join('; '),
    'weight': {
      '@type': 'QuantitativeValue',
      'value': product.dimensions.weightKg,
      'unitCode': 'KGM'
    },
    'offers': {
      '@type': 'Offer',
      'url': url,
      'priceCurrency': currency.code,
      'price': convertedPrice,
      'priceValidUntil': '2026-12-31',
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': product.stockCount > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'HavenCraft Home Ltd'
      },
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': '0.00',
          'currency': currency.code
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': 1,
            'maxValue': 1,
            'unitCode': 'DAY'
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': 2,
            'maxValue': 4,
            'unitCode': 'DAY'
          }
        }
      },
      'hasMerchantReturnPolicy': {
        '@type': 'MerchantReturnPolicy',
        'applicableCountry': ['DE', 'FR', 'ES', 'IT', 'JP', 'US', 'GB'],
        'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
        'merchantReturnDays': 30,
        'returnMethod': 'https://schema.org/ReturnByMail',
        'returnFees': 'https://schema.org/FreeReturn'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': product.rating.toString(),
      'reviewCount': product.reviewCount.toString(),
      'bestRating': '5',
      'worstRating': '1'
    }
  };

  return JSON.stringify(schema, null, 2);
}

export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return JSON.stringify(schema, null, 2);
}

export function generateMarkdownForProduct(product: HavenCraftProductPDP, currency: CurrencyConfig): string {
  const priceDisplay = `${currency.symbol}${(product.price * currency.rateVsEur).toFixed(currency.code === 'JPY' ? 0 : 2)}`;

  return `# ${product.title}

> **Brand**: HavenCraft Home
> **Handle**: ${product.handle}
> **Category**: ${product.category}
> **Price**: ${priceDisplay} (${currency.taxLabel})
> **Rating**: ${product.rating}/5.0 (${product.reviewCount} verified buyer reviews)
> **Direct Shipping**: 24H regional dispatch, 3-5 days delivery, 30-Day in-home trial.

## Overview
${product.tagline}

## Specifications & Dimensions
- Length: ${product.dimensions.lengthCm} cm
- Width: ${product.dimensions.widthCm} cm
- Height: ${product.dimensions.heightCm} cm
- Weight: ${product.dimensions.weightKg} kg
- Weight Capacity: ${product.dimensions.maxCapacityKg} kg
- Assembly Difficulty: ${product.assemblyDifficulty} (~${product.assemblyMinutes} mins)

## 100% Eco & Material Transparency
${product.materials.map(m => `- **${m.component}**: ${m.material} — *[${m.safetyCert}]*`).join('\n')}

## Key Certifications
${product.certifications.map(c => `- ${c}`).join('\n')}

## Care & Maintenance
${product.careInstructions.map(c => `- ${c}`).join('\n')}
`;
}
