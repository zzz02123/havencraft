import React, { useState } from 'react';
import { HavenCraftProductPDP, CurrencyConfig } from '../types/storefront';
import { generateProductJsonLd, generateFaqJsonLd, generateMarkdownForProduct } from '../lib/jsonld-generator';
import { PRODUCT_BY_HANDLE_QUERY } from '../lib/shopify';
import { X, Copy, CheckCircle2, Code2, FileText, Bot, Database } from 'lucide-react';

interface MachineReadableInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  product: HavenCraftProductPDP;
  currency: CurrencyConfig;
}

export const MachineReadableInspector: React.FC<MachineReadableInspectorProps> = ({
  isOpen,
  onClose,
  product,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'jsonld' | 'markdown' | 'llmstxt' | 'graphql'>('jsonld');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = `https://havencraft-home.com/${currency.defaultLang}/products/${product.handle}`;
  const jsonLdCode = generateProductJsonLd(product, currency, currentUrl);
  const markdownCode = generateMarkdownForProduct(product, currency);

  const llmsTxtContent = `# HavenCraft Home (Crafting Your Everyday Haven)
> Sustainable, direct-from-manufacturer modern furniture & home essentials engineered for warm living spaces.

## Overview
HavenCraft is a direct-to-consumer & wholesale home furnishings brand operating regional fulfillment hubs across Europe (DE, FR, ES, IT), Japan (JP), and North America (US). All products are manufactured with zero-VOC finishes, FSC-certified solid woods, and OEKO-TEX Standard 100 certified textiles.

## Machine Layer Endpoints
- Base URL: https://havencraft-home.com/
- Product Markdown: /[lang]/products/[handle].md
- Product Schema: Schema.org Product, Offer, AggregateRating, FAQPage
`;

  const graphqlSnippet = `# Shopify Storefront API with @inContext
query getProductByHandle($handle: "${product.handle}") @inContext(country: ${currency.defaultCountry}, language: ${currency.defaultLang.toUpperCase()}) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    # Custom HavenCraft Metafields
    materials: metafield(namespace: "custom", key: "materials_breakdown") { value }
    dimensions: metafield(namespace: "custom", key: "dimensions_spec") { value }
    certifications: metafield(namespace: "custom", key: "certifications") { value }
  }
}`;

  let currentContent = jsonLdCode;
  if (activeTab === 'markdown') currentContent = markdownCode;
  if (activeTab === 'llmstxt') currentContent = llmsTxtContent;
  if (activeTab === 'graphql') currentContent = graphqlSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#1E1E24] text-[#FAF8F5] border border-[#2B2D42] rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5F6B52] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Machine-Readable & AI Agent Data Layer</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded">
                  200 OK
                </span>
              </h3>
              <p className="text-xs text-white/60">
                Live output generated for AI crawlers, Google Rich Snippets & Headless API agents.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-3 pb-3 border-b border-white/10 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('jsonld')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'jsonld' ? 'bg-[#5F6B52] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Schema.org JSON-LD</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'markdown' ? 'bg-[#5F6B52] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>[handle].md Endpoint</span>
          </button>

          <button
            onClick={() => setActiveTab('llmstxt')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'llmstxt' ? 'bg-[#5F6B52] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>/llms.txt</span>
          </button>

          <button
            onClick={() => setActiveTab('graphql')}
            className={`py-1.5 px-3 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'graphql' ? 'bg-[#5F6B52] text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Shopify GraphQL</span>
          </button>

          <div className="ml-auto">
            <button
              onClick={handleCopy}
              className="py-1 px-2.5 rounded-md border border-white/20 hover:bg-white/10 text-[11px] font-semibold flex items-center gap-1 cursor-pointer text-white/80 hover:text-white"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-y-auto mt-3 bg-[#131317] border border-white/10 rounded-xl p-4 font-mono text-xs leading-relaxed text-[#E2D9CC] select-text">
          <pre className="whitespace-pre-wrap">{currentContent}</pre>
        </div>

        {/* Footer Info */}
        <div className="pt-3 flex items-center justify-between text-[11px] text-white/50">
          <span>Context: {currency.code} ({currency.defaultCountry})</span>
          <span>Ready for Search Engines & Autonomous Shopping Agents</span>
        </div>
      </div>
    </div>
  );
};
