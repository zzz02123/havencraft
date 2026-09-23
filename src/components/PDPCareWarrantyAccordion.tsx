import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface PDPCareWarrantyAccordionProps {
  careInstructions: string[];
}

export const PDPCareWarrantyAccordion: React.FC<PDPCareWarrantyAccordionProps> = ({
  careInstructions,
}) => {
  const [openSection, setOpenSection] = useState<'care' | 'warranty' | 'trial' | null>('care');

  return (
    <section className="mb-14 bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-[#5F6B52]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          Care, Maintenance & Warranty Details
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 leading-relaxed">
        We build furniture intended to outlast fast-fashion disposable pieces. Review our transparent care regimen and industry-leading guarantee.
      </p>

      <div className="space-y-3">
        {/* Accordion 1: Cleaning & Wood Care Guidelines */}
        <div className="border border-[#E2D9CC] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
            className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] text-left text-sm font-bold text-[#2B2D42] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5F6B52]" />
              <span>Solid Oak & Woven Linen Care Guidelines</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#2B2D42]/60 transition-transform duration-200 ${
                openSection === 'care' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'care' && (
            <div className="p-4 bg-white text-xs text-[#2B2D42]/80 space-y-2.5 border-t border-[#E2D9CC]/60">
              <ul className="space-y-2">
                {careInstructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#5F6B52] font-bold">✓</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2D9CC]/50 text-[11px] text-[#2B2D42]/70">
                <strong>Natural Patina Note:</strong> European white oak matures gracefully over time, deepening slightly into richer golden hues when exposed to ambient room light.
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: 2-Year Manufacturer Structural Warranty */}
        <div className="border border-[#E2D9CC] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === 'warranty' ? null : 'warranty')}
            className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] text-left text-sm font-bold text-[#2B2D42] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5F6B52]" />
              <span>2-Year Manufacturer Structural Frame Warranty</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#2B2D42]/60 transition-transform duration-200 ${
                openSection === 'warranty' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'warranty' && (
            <div className="p-4 bg-white text-xs text-[#2B2D42]/80 space-y-2 border-t border-[#E2D9CC]/60 leading-relaxed">
              <p>
                HavenCraft warrants that all solid oak framing, joints, mortise connections, and internal fastener sleeves will be free from structural failure or manufacturing defects for a period of <strong>two (2) full years</strong> from delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free replacement hardware & express courier dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full replacement if structural crack occurs under normal domestic use</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: 30-Day Risk-Free Home Trial & Returns */}
        <div className="border border-[#E2D9CC] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === 'trial' ? null : 'trial')}
            className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] text-left text-sm font-bold text-[#2B2D42] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-[#5F6B52] font-mono font-bold">30D</span>
              <span>30-Day In-Home Comfort Trial & Complimentary Return Labels</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#2B2D42]/60 transition-transform duration-200 ${
                openSection === 'trial' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'trial' && (
            <div className="p-4 bg-white text-xs text-[#2B2D42]/80 space-y-2 border-t border-[#E2D9CC]/60 leading-relaxed">
              <p>
                Live with your HavenCraft furniture piece in your own home for 30 full days. Read in it, work in it, test the cushion comfort. If you don't fall in love, simply request a return label in your HavenCraft portal, and our regional freight carrier will pick it up at no expense to you.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
