import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2, Clock, Box } from 'lucide-react';
import { CurrencyConfig } from '../types/storefront';

interface PDPShippingETACalculatorProps {
  currency: CurrencyConfig;
}

export const PDPShippingETACalculator: React.FC<PDPShippingETACalculatorProps> = ({ currency }) => {
  const [postalCode, setPostalCode] = useState('10115');
  const [calculatedResult, setCalculatedResult] = useState<{
    hub: string;
    dispatchDate: string;
    deliveryEstimate: string;
    carrier: string;
    taxStatus: string;
  }>({
    hub: 'Frankfurt Central Distribution Hub (Hub-EU-01)',
    dispatchDate: 'Tomorrow by 14:00 CET',
    deliveryEstimate: '2-3 Business Days (Friday, Sep 25)',
    carrier: 'DHL Freight Express & Local Delivery Partner',
    taxStatus: 'All EU VAT & Customs Duties Included (Zero Surcharges)'
  });

  const handleCalculate = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.startsWith('100') || trimmed.includes('TOKYO') || currency.code === 'JPY') {
      setCalculatedResult({
        hub: 'Tokyo Bay Fulfillment Center (Chiba Hub)',
        dispatchDate: '24時間以内発送 (翌日14時まで)',
        deliveryEstimate: '1〜2営業日お届け (佐川急便 / ヤマト運輸)',
        carrier: 'Sagawa Express Heavy Cargo Delivery',
        taxStatus: '国内倉庫出荷・消費税込・追加関税一切なし'
      });
    } else if (trimmed.startsWith('75') || trimmed.includes('PARIS')) {
      setCalculatedResult({
        hub: 'Paris Nord Logistics Hub (Garonor)',
        dispatchDate: 'Demain avant 15:00 CET',
        deliveryEstimate: '2 jours ouvrables (Vendredi, Sep 25)',
        carrier: 'Geodis Calberson Home Delivery',
        taxStatus: 'TVA 20% incluse, livraison gratuite à domicile'
      });
    } else if (trimmed.startsWith('10') || trimmed.startsWith('90') || currency.code === 'USD') {
      setCalculatedResult({
        hub: 'New Jersey East Coast Hub / Ontario West Coast Hub',
        dispatchDate: 'Dispatches within 24 Hours',
        deliveryEstimate: '3-4 Business Days with Live Tracking',
        carrier: 'FedEx Home Delivery & Freight',
        taxStatus: 'Zero hidden import fees; standard state sales tax calculated at checkout'
      });
    } else {
      setCalculatedResult({
        hub: 'Frankfurt Central Fulfillment Center',
        dispatchDate: 'Dispatches within 24 Hours',
        deliveryEstimate: '2-4 Business Days with Track & Trace',
        carrier: 'DHL Freight European Logistics',
        taxStatus: 'Direct Manufacturer Pricing, VAT Included'
      });
    }
  };

  const presetCodes = [
    { label: 'Berlin 10115', code: '10115' },
    { label: 'Paris 75001', code: '75001' },
    { label: 'Tokyo 100-0001', code: '100-0001' },
    { label: 'New York 10001', code: '10001' },
    { label: 'London EC1A', code: 'EC1A 1BB' }
  ];

  return (
    <section className="mb-14 bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-5 h-5 text-[#5F6B52]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          Direct Local Warehouse Fast Delivery Estimator
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 leading-relaxed">
        Costway-style regional distribution networks mean your order dispatches from local inventory rather than slow overseas containers.
      </p>

      {/* Postal Input Box */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-4">
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-[#2B2D42]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter Postal / ZIP Code (e.g. 10115 or 100-0001)"
            className="w-full bg-[#FAF8F5] text-xs font-semibold text-[#2B2D42] border border-[#E2D9CC] rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-[#5F6B52]"
          />
        </div>
        <button
          onClick={() => handleCalculate(postalCode)}
          className="bg-[#5F6B52] hover:bg-[#4E5842] text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors cursor-pointer"
        >
          Calculate ETA
        </button>
      </div>

      {/* Quick Presets */}
      <div className="flex items-center flex-wrap gap-2 mb-6">
        <span className="text-[11px] text-[#2B2D42]/60">Quick Test Locations:</span>
        {presetCodes.map((item) => (
          <button
            key={item.code}
            onClick={() => {
              setPostalCode(item.code);
              handleCalculate(item.code);
            }}
            className="text-[11px] font-medium py-1 px-2 rounded-md bg-[#F2ECE4] hover:bg-[#E2D9CC] text-[#2B2D42] transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Real-time Calculation Result Card */}
      <div className="bg-[#FAF8F5] border border-[#E2D9CC] rounded-xl p-4.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E2D9CC]/60 gap-2">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-[#5F6B52]" />
            <span className="text-xs font-bold text-[#2B2D42]">
              Fulfillment Node: <span className="text-[#5F6B52]">{calculatedResult.hub}</span>
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
            ✓ In Stock & Reserved
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-[#2B2D42]/60 block mb-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5F6B52]" /> Warehouse Dispatch
            </span>
            <strong className="text-[#2B2D42]">{calculatedResult.dispatchDate}</strong>
          </div>
          <div>
            <span className="text-[#2B2D42]/60 block mb-0.5 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#5F6B52]" /> Estimated Delivery
            </span>
            <strong className="text-[#2B2D42]">{calculatedResult.deliveryEstimate}</strong>
          </div>
          <div>
            <span className="text-[#2B2D42]/60 block mb-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Courier Partner
            </span>
            <strong className="text-[#2B2D42]">{calculatedResult.carrier}</strong>
          </div>
        </div>

        <div className="text-[11px] text-[#2B2D42]/70 pt-2 border-t border-[#E2D9CC]/50">
          <strong>Tax & Duty Assurance:</strong> {calculatedResult.taxStatus}
        </div>
      </div>
    </section>
  );
};
