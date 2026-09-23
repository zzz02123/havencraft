import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check } from 'lucide-react';

export const PDPFAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is assembly complicated for this oak accent lounge chair?',
      a: 'Not at all. The chair is engineered for a 15-minute, single-person assembly. All essential bolts, internal dampening pads, and an ergonomic T-handle hex key are included in the packaging with step-by-step illustrated instructions.'
    },
    {
      q: 'What is your regional warehouse dispatch and return policy?',
      a: 'We operate domestic logistics hubs across Germany (Frankfurt), France (Paris), Japan (Chiba), and the US (New Jersey). Orders dispatch within 24 hours with standard 2-4 business day transit. We provide a 30-Day in-home trial: if you are not delighted, we arrange freight pick-up with zero return fees.'
    },
    {
      q: 'Are the wood, foam, and fabric truly non-toxic and zero-VOC?',
      a: 'Yes, 100%. All timber is sustainably harvested and FSC-certified European white oak, sealed with natural linseed and carnauba plant oils. The fabric satisfies OEKO-TEX Standard 100 Class 1 (baby safe), and our high-resilience memory cold foam is CertiPUR-US certified.'
    },
    {
      q: 'How does the HavenClub VIP Care subscription work?',
      a: 'Selecting HavenClub VIP gives you an instant 15% discount on today\'s order, extends your structural manufacturer warranty from 2 years to 3 years, and provides complimentary annual upholstery cleaning care kit refills with priority courier dispatch.'
    },
    {
      q: 'What is the maximum weight capacity?',
      a: 'The chair is structurally rated and laboratory-certified for a static load capacity of 160 kg (352 lbs), backed by our concealed high-tensile carbon steel frame joinery.'
    }
  ];

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-[#5F6B52]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          Frequently Asked Questions & Product FAQ
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 leading-relaxed">
        Everything you need to know about specifications, delivery guarantees, and materials.
      </p>

      <div className="space-y-2.5">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-[#E2D9CC] rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#2B2D42] hover:bg-[#FAF8F5] transition-colors cursor-pointer gap-4"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#2B2D42]/60 shrink-0 transition-transform duration-200 ${
                  openIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-4 pb-4 pt-1 text-xs text-[#2B2D42]/80 leading-relaxed border-t border-[#E2D9CC]/50 bg-[#FAF8F5]/40">
                <p>{faq.a}</p>
                <div className="mt-2 text-[11px] text-[#5F6B52] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Backed by HavenCraft Direct Guarantee</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
