import React from 'react';
import { ShieldCheck, Heart, Instagram, Sparkles } from 'lucide-react';

export const PDPFooterTrust: React.FC = () => {
  const communityPosts = [
    {
      author: '@nordic.haven.home',
      room: 'Munich Penthouse',
      text: 'Morning light with the HavenCraft oak lounger. Best reading nook in our home.',
      likes: '1,420'
    },
    {
      author: '@tokyo_japandi_living',
      room: 'Setagaya Apartment',
      text: 'Warm wood grains and no squeaking. So cozy for matcha afternoon sessions.',
      likes: '984'
    },
    {
      author: '@studio.charlottenburg',
      room: 'Berlin Studio',
      text: 'Assembled in literally 15 minutes. Heavy oak frame, beautiful linen upholstery.',
      likes: '2,150'
    }
  ];

  return (
    <footer className="border-t border-[#E2D9CC] pt-12 pb-24 lg:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Community Proof Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5F6B52] bg-[#5F6B52]/10 px-3 py-1 rounded-full mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>#MyHavenCraft Community</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42] mb-2">
            Loved in Over 45,000 Everyday Havens
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2D42]/70 max-w-lg mx-auto">
            Tag @HavenCraftHome with your living space to get featured and receive a $100 seasonal styling voucher.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
            {communityPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E2D9CC] rounded-xl p-4 text-xs shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#2B2D42]">{post.author}</span>
                  <span className="text-[11px] text-[#2B2D42]/50">{post.room}</span>
                </div>
                <p className="text-[#2B2D42]/80 leading-relaxed mb-3 italic">
                  "{post.text}"
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#D96B43] font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-[#D96B43]" />
                  <span>{post.likes} community likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Costway-Style High-Trust Payment & Security Badges */}
        <div className="bg-[#FAF8F5] border border-[#E2D9CC] rounded-2xl p-6 mb-8 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2B2D42] mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed Safe & Frictionless Secure Checkout</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-[#2B2D42]/80">
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">💳 Visa</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">💳 Mastercard</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">🅿️ PayPal</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">🛍️ Klarna. Pay in 3</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">🍏 Apple Pay</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs">🏦 SEPA Direct</span>
            <span className="bg-white border border-[#E2D9CC] py-1.5 px-3 rounded-md shadow-2xs text-emerald-700">🔒 256-Bit SSL</span>
          </div>

          <div className="mt-4 text-[11px] text-[#2B2D42]/60 flex flex-wrap items-center justify-center gap-4">
            <span>✓ Direct-from-Manufacturer Pricing Guarantee</span>
            <span>·</span>
            <span>✓ 30-Day In-Home Trial</span>
            <span>·</span>
            <span>✓ Zero Restocking Fees</span>
          </div>
        </div>

        {/* Footer Links & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#2B2D42]/60 gap-4 pt-6 border-t border-[#E2D9CC]/60">
          <div>
            © 2026 HavenCraft Home Technologies Inc. Crafting Your Everyday Haven.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#2B2D42] cursor-pointer">GDPR Privacy Rights</span>
            <span>·</span>
            <span className="hover:text-[#2B2D42] cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-[#2B2D42] cursor-pointer">EU Timber Regulation (EUTR)</span>
            <span>·</span>
            <span className="hover:text-[#2B2D42] cursor-pointer">Fulfillment Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
