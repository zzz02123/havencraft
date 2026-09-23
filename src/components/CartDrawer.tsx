import React, { useState } from 'react';
import { CartItem, CurrencyConfig } from '../types/storefront';
import { X, Trash2, ShieldCheck, Lock, ArrowRight, CheckCircle2, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (idx: number, newQty: number) => void;
  onRemoveItem: (idx: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const isJpy = currency.code === 'JPY';
  const formatPrice = (val: number) =>
    `${currency.symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: isJpy ? 0 : 2,
      maximumFractionDigits: isJpy ? 0 : 2,
    })}`;

  const subtotal = items.reduce(
    (acc, item) => acc + item.effectivePrice * item.quantity * currency.rateVsEur,
    0
  );

  const discountAmount = appliedPromo === 'HAVEN10' ? (isJpy ? 1500 : 10 * currency.rateVsEur) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HAVEN10') {
      setAppliedPromo('HAVEN10');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E2D9CC] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E2D9CC] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-[#2B2D42]">Your Haven Basket</span>
              <span className="text-xs bg-[#5F6B52] text-white font-mono px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#2B2D42]/60 hover:text-[#2B2D42] hover:bg-[#E2D9CC]/50 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F2ECE4] px-5 py-3 border-b border-[#E2D9CC] text-xs">
            <div className="flex items-center justify-between text-[#2B2D42] font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Direct Local Delivery:</span>
              </span>
              <span className="text-emerald-700 font-bold">FREE on All Orders</span>
            </div>
            <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-600 rounded-full" />
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B2D42]">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-[#2B2D42]/70 max-w-xs mx-auto leading-relaxed">
                  Thank you for crafting your haven. Order <strong>#HC-2026-9841</strong> has been dispatched to our regional fulfillment center. Tracking sent to your inbox.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E2D9CC] text-xs text-left max-w-xs mx-auto space-y-1">
                  <div><strong>Estimated Delivery:</strong> 2-3 Business Days</div>
                  <div><strong>Fulfillment:</strong> Regional Logistics Hub</div>
                  <div><strong>Trial:</strong> 30-Day In-Home Guarantee</div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                  className="mt-4 py-2.5 px-6 bg-[#5F6B52] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center mx-auto text-[#2B2D42]/40">
                  🛋️
                </div>
                <p className="text-sm font-semibold text-[#2B2D42]">Your basket is empty</p>
                <p className="text-xs text-[#2B2D42]/60">Explore our solid wood furniture pieces and textiles.</p>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemPrice = item.effectivePrice * currency.rateVsEur;
                return (
                  <div
                    key={idx}
                    className="flex gap-3.5 pb-4 border-b border-[#E2D9CC]/60 bg-[#FAF8F5] p-3 rounded-xl border"
                  >
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-lg border border-[#E2D9CC] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#2B2D42] line-clamp-2">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#2B2D42]/40 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.purchaseType === 'subscribe' && (
                        <span className="inline-block text-[10px] font-bold text-[#D96B43] bg-[#D96B43]/10 px-1.5 py-0.5 rounded mt-1">
                          👑 HavenClub VIP Tier (-15%)
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E2D9CC] rounded-md bg-white">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#2B2D42] hover:bg-[#FAF8F5]"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#2B2D42] hover:bg-[#FAF8F5]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-extrabold font-mono text-[#2B2D42]">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-5 border-t border-[#E2D9CC] bg-[#FAF8F5] space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (try: HAVEN10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs py-2 px-3 border border-[#E2D9CC] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#5F6B52]"
                />
                <button
                  type="submit"
                  className="text-xs font-bold px-3 py-2 bg-[#2B2D42] text-white rounded-lg hover:bg-[#2B2D42]/80 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-xs text-emerald-700 font-semibold flex items-center justify-between">
                  <span>✓ Code HAVEN10 Applied</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Subtotal lines */}
              <div className="space-y-1.5 text-xs text-[#2B2D42]/80 pt-2 border-t border-[#E2D9CC]/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Regional Shipping</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2B2D42] pt-2 border-t border-[#E2D9CC]/60">
                  <span>Total (Taxes Included)</span>
                  <span className="font-mono text-base font-extrabold text-[#D96B43]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-[#D96B43] hover:bg-[#C05732] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Securing Order with Local Warehouse...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#2B2D42]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL · 30-Day Money Back</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
