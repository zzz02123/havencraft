import React from 'react';
import { MaterialItem } from '../types/storefront';
import { Leaf, ShieldCheck } from 'lucide-react';

interface PDPMaterialsTableProps {
  materials: MaterialItem[];
}

export const PDPMaterialsTable: React.FC<PDPMaterialsTableProps> = ({ materials }) => {
  return (
    <section className="mb-14">
      <div className="flex items-center gap-2 mb-2">
        <Leaf className="w-5 h-5 text-[#5F6B52]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          100% Non-Toxic & Sustainable Material Transparency
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 max-w-3xl leading-relaxed">
        Unlike mass synthetic furniture that off-gasses formaldehyde and volatile organic compounds (VOCs),
        HavenCraft specifies every single raw material and eco-certification. Safe for toddlers, pets, and sensitive indoor air.
      </p>

      <div className="overflow-x-auto border border-[#E2D9CC] rounded-xl bg-white shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-[#F2ECE4] text-[#2B2D42] border-b border-[#E2D9CC]">
              <th className="py-3 px-4 font-bold">Furniture Component</th>
              <th className="py-3 px-4 font-bold">Raw Material Origin</th>
              <th className="py-3 px-4 font-bold">Safety & Eco Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2D9CC]/60">
            {materials.map((m, idx) => (
              <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#2B2D42]">
                  {m.component}
                </td>
                <td className="py-3.5 px-4 text-[#2B2D42]/80">
                  {m.material}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#5F6B52]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{m.safetyCert}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#2B2D42]/60 px-1">
        <span>Formaldehyde Emission: Class E0 (Zero Detectable Emissions)</span>
        <span>CARB Phase 2 Compliant</span>
        <span>Traceable EU Harvest Chain</span>
      </div>
    </section>
  );
};
