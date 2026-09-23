import React from 'react';
import { Compass, Check } from 'lucide-react';

interface PDPRoomSuitabilityProps {
  rooms: string[];
}

export const PDPRoomSuitability: React.FC<PDPRoomSuitabilityProps> = ({ rooms }) => {
  const interiorStyles = [
    { name: 'Japandi Warm Minimalist', match: '98% Aesthetic Match', notes: 'Matches bleached birch, warm oak, and beige earthenware.' },
    { name: 'Mid-Century Modern', match: '95% Aesthetic Match', notes: 'Complements brass accents and geometric architectural lines.' },
    { name: 'Contemporary Scandinavian', match: '99% Aesthetic Match', notes: 'Harmonizes with abundant natural daylight and muted earth tones.' }
  ];

  return (
    <section className="mb-14 bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Compass className="w-5 h-5 text-[#5F6B52]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
          Interior Style & Living Space Compatibility
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#2B2D42]/70 mb-5 leading-relaxed">
        Designed with gentle organic curves and warm neutral hues that adapt naturally across residential architectural genres.
      </p>

      {/* Target Rooms Badges */}
      <div className="mb-6">
        <div className="text-xs font-bold text-[#2B2D42]/70 uppercase tracking-wider mb-2.5">
          Verified Room Placements
        </div>
        <div className="flex flex-wrap gap-2.5">
          {rooms.map((room) => (
            <span
              key={room}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#F2ECE4] text-[#2B2D42] text-xs font-semibold border border-[#E2D9CC]"
            >
              <Check className="w-3.5 h-3.5 text-[#5F6B52]" />
              <span>{room}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Style Pairings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4 border-t border-[#E2D9CC]/60 text-xs">
        {interiorStyles.map((style) => (
          <div key={style.name} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E2D9CC]/50">
            <div className="flex items-center justify-between font-bold text-[#2B2D42] mb-1">
              <span>{style.name}</span>
              <span className="text-[10px] text-[#5F6B52] bg-[#5F6B52]/10 px-1.5 py-0.5 rounded">
                {style.match}
              </span>
            </div>
            <p className="text-[#2B2D42]/70 text-[11px] leading-relaxed">
              {style.notes}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
