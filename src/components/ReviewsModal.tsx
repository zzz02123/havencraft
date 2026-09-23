import React, { useState } from 'react';
import { HavenCraftProductPDP } from '../types/storefront';
import { X, Star, CheckCircle2, ThumbsUp } from 'lucide-react';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: HavenCraftProductPDP;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredReviews = filterRating
    ? product.reviews.filter((r) => r.rating === filterRating)
    : product.reviews;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white border border-[#E2D9CC] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CC]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5F6B52]">
              COMMUNITY FEEDBACK
            </span>
            <h3 className="font-serif text-xl font-bold text-[#2B2D42]">
              Verified Buyer Reviews ({product.reviewCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#2B2D42]/60 hover:text-[#2B2D42] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Score Card */}
        <div className="py-4 border-b border-[#E2D9CC] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5] p-4 rounded-xl my-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-extrabold font-mono text-[#2B2D42]">
              {product.rating}
            </span>
            <div>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-[#2B2D42]/60 block mt-0.5">
                Based on 342 verified home orders
              </span>
            </div>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterRating(null)}
              className={`py-1 px-2.5 rounded-md font-semibold cursor-pointer ${
                filterRating === null ? 'bg-[#5F6B52] text-white' : 'bg-white text-[#2B2D42] border border-[#E2D9CC]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`py-1 px-2.5 rounded-md font-semibold cursor-pointer ${
                filterRating === 5 ? 'bg-[#5F6B52] text-white' : 'bg-white text-[#2B2D42] border border-[#E2D9CC]'
              }`}
            >
              5 ★
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 border border-[#E2D9CC]/70 rounded-xl bg-white space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#2B2D42]">{rev.author}</span>
                  <span className="text-[11px] text-[#2B2D42]/50">({rev.city}, {rev.country})</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#2B2D42]/40">{rev.date}</span>
              </div>

              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <h4 className="text-xs font-bold text-[#2B2D42]">{rev.title}</h4>
              <p className="text-xs text-[#2B2D42]/80 leading-relaxed">{rev.content}</p>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#2B2D42]/60">
                <button className="flex items-center gap-1 hover:text-[#5F6B52] cursor-pointer">
                  <ThumbsUp className="w-3 h-3" /> Helpful (24)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
