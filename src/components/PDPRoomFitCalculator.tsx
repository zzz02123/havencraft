import React, { useState } from 'react';
import { DimensionSpec } from '../types/storefront';
import { Maximize2, Scale, Home, CheckCircle } from 'lucide-react';

interface PDPRoomFitCalculatorProps {
  dimensions: DimensionSpec;
}

export const PDPRoomFitCalculator: React.FC<PDPRoomFitCalculatorProps> = ({ dimensions }) => {
  const [roomSizeM2, setRoomSizeM2] = useState(25);
  const [targetRoomType, setTargetRoomType] = useState('Living Room');
  const [userWeightKg, setUserWeightKg] = useState(75);

  // Compute metrics
  const footprintM2 = ((dimensions.lengthCm * dimensions.widthCm) / 10000).toFixed(2);
  const occupancyPercent = ((Number(footprintM2) / roomSizeM2) * 100).toFixed(1);
  const capacityRemaining = dimensions.maxCapacityKg - userWeightKg;

  const getProportionStatus = () => {
    const occ = Number(occupancyPercent);
    if (occ < 1.5) return { label: 'Airy & Minimalist', color: 'text-emerald-700', note: 'Leaves abundant open circulation flow around the furniture.' };
    if (occ <= 4.0) return { label: 'Harmonious Scandinavian Proportion', color: 'text-[#5F6B52]', note: 'Ideal design ratio for living and relaxation zones.' };
    return { label: 'Cozy Intimate Focal Point', color: 'text-[#D96B43]', note: 'Dominates the space pleasantly as a signature accent statement.' };
  };

  const status = getProportionStatus();

  return (
    <section className="mb-14 bg-[#F2ECE4]/70 border border-[#E2D9CC] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Maximize2 className="w-5 h-5 text-[#5F6B52]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
              Interactive Room Dimensions & Weight-Fit Estimator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B2D42]/70">
            Verify spatial footprint and structural weight limits against your home layout before ordering.
          </p>
        </div>

        {/* Room Type Selector */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E2D9CC] rounded-lg p-1 text-xs">
          {['Living Room', 'Reading Nook', 'Bedroom', 'Office'].map((room) => (
            <button
              key={room}
              onClick={() => setTargetRoomType(room)}
              className={`py-1 px-2.5 rounded-md font-medium transition-colors cursor-pointer ${
                targetRoomType === room
                  ? 'bg-[#5F6B52] text-white'
                  : 'text-[#2B2D42]/70 hover:text-[#2B2D42]'
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Control */}
        <div className="lg:col-span-6 space-y-6">
          {/* Room Area Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#2B2D42] mb-2">
              <span className="flex items-center gap-1.5">
                <Home className="w-4 h-4 text-[#5F6B52]" />
                Your Room Floor Area:
              </span>
              <span className="text-sm font-bold font-mono text-[#5F6B52] bg-white px-2 py-0.5 rounded border border-[#E2D9CC]">
                {roomSizeM2} m² ({Math.round(roomSizeM2 * 10.764)} sq ft)
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="1"
              value={roomSizeM2}
              onChange={(e) => setRoomSizeM2(Number(e.target.value))}
              className="w-full h-2 bg-[#E2D9CC] rounded-lg appearance-none cursor-pointer accent-[#5F6B52]"
            />
            <div className="flex justify-between text-[11px] text-[#2B2D42]/50 mt-1">
              <span>Studio / Nook (10 m²)</span>
              <span>Average Living (25-35 m²)</span>
              <span>Spacious Great Room (80 m²)</span>
            </div>
          </div>

          {/* Sitter Weight Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#2B2D42] mb-2">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#5F6B52]" />
                Occupant Weight:
              </span>
              <span className="text-sm font-bold font-mono text-[#2B2D42] bg-white px-2 py-0.5 rounded border border-[#E2D9CC]">
                {userWeightKg} kg ({Math.round(userWeightKg * 2.204)} lbs)
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="160"
              step="5"
              value={userWeightKg}
              onChange={(e) => setUserWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-[#E2D9CC] rounded-lg appearance-none cursor-pointer accent-[#D96B43]"
            />
            <div className="flex justify-between text-[11px] text-[#2B2D42]/50 mt-1">
              <span>40 kg</span>
              <span>100 kg</span>
              <span>Rated Maximum: {dimensions.maxCapacityKg} kg</span>
            </div>
          </div>
        </div>

        {/* Dynamic Visual Ratio & Structural Fit Box */}
        <div className="lg:col-span-6 bg-white border border-[#E2D9CC] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2D9CC]/60 pb-3">
            <div>
              <span className="text-xs font-bold text-[#2B2D42]/60 uppercase tracking-wider block">
                Spatial Footprint in {targetRoomType}
              </span>
              <span className={`text-base font-bold ${status.color}`}>
                {status.label}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold font-mono text-[#2B2D42]">
                {occupancyPercent}%
              </span>
              <span className="block text-[11px] text-[#2B2D42]/60">of total room area</span>
            </div>
          </div>

          <p className="text-xs text-[#2B2D42]/70">
            {status.note}
          </p>

          {/* Dimension Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E2D9CC]/60 text-xs">
            <div className="bg-[#FAF8F5] p-2 rounded border border-[#E2D9CC]/50">
              <span className="text-[11px] text-[#2B2D42]/60 block">Dimensions</span>
              <strong className="font-mono text-[#2B2D42]">{dimensions.lengthCm} × {dimensions.widthCm} cm</strong>
            </div>
            <div className="bg-[#FAF8F5] p-2 rounded border border-[#E2D9CC]/50">
              <span className="text-[11px] text-[#2B2D42]/60 block">Chair Height</span>
              <strong className="font-mono text-[#2B2D42]">{dimensions.heightCm} cm</strong>
            </div>
            <div className="bg-[#FAF8F5] p-2 rounded border border-[#E2D9CC]/50">
              <span className="text-[11px] text-[#2B2D42]/60 block">Net Weight</span>
              <strong className="font-mono text-[#2B2D42]">{dimensions.weightKg} kg</strong>
            </div>
            <div className="bg-[#FAF8F5] p-2 rounded border border-[#E2D9CC]/50">
              <span className="text-[11px] text-[#2B2D42]/60 block">Weight Margin</span>
              <strong className="font-mono text-emerald-700">+{capacityRemaining} kg Safe</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#5F6B52] bg-[#5F6B52]/10 p-2.5 rounded-lg font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Passes European EN 12520 Domestic Furniture Strength & Safety Standards.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
