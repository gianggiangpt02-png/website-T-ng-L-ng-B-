import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300000;
  const STANDARD_SHIPPING_FEE = 25000;

  const subtotal = items.reduce((acc, cur) => acc + cur.product.Gia * cur.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;

  const formatVND = (num: number) => new Intl.NumberFormat('vi-VN').format(num) + '₫';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FFF8E9] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5D1B5] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5D1B5] bg-[#F5E8D0]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#6B321C]" />
            <h2 className="font-serif text-lg font-bold text-[#432A1D]">
              Giỏ hàng của bạn ({items.reduce((acc, cur) => acc + cur.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="p-1.5 text-[#432A1D] hover:bg-[#E5D1B5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress indicator */}
        <div className="px-5 py-3 bg-[#F5E8D0]/40 border-b border-[#E5D1B5]/80 text-xs text-[#79695B]">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <div className="flex items-center gap-2 text-[#66734A] font-semibold">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Tuyệt vời! Đơn hàng của bạn được miễn phí giao hàng toàn quốc.</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span>
                  Mua thêm <strong className="text-[#6B321C]">{formatVND(remainingForFreeShipping)}</strong> để được Miễn phí giao hàng
                </span>
                <span className="font-medium tabular-nums">
                  {Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E5D1B5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#DDA33A] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#79695B]">
              <div className="w-16 h-16 rounded-full bg-[#F5E8D0] flex items-center justify-center mb-4 text-[#8A4B2A]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="font-serif text-lg font-bold text-[#432A1D] mb-1">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-xs max-w-xs mb-6">
                Hãy lựa chọn những mẻ tương nếp Làng Bợ thơm ngon được ủ nắng tự nhiên cho gia đình bạn nhé!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-[#FFF8E9] bg-[#6B321C] rounded-lg shadow-xs hover:bg-[#8A4B2A]"
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.MaSP}
                className="flex gap-3.5 p-3 rounded-xl bg-[#FFF8E9] border border-[#E5D1B5] shadow-xs"
              >
                <img
                  src={item.product.HinhAnh}
                  alt={item.product.TenSP}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-lg object-cover bg-[#F5E8D0] shrink-0 border border-[#E5D1B5]/60"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-[#432A1D] truncate">
                        {item.product.TenSP}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.MaSP)}
                        aria-label={`Xóa ${item.product.TenSP}`}
                        className="text-[#79695B] hover:text-red-700 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-[#79695B] block mt-0.5">
                      Quy cách: {item.product.DungTich}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-serif text-sm font-bold text-[#6B321C] tabular-nums">
                      {formatVND(item.product.Gia)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#E5D1B5] rounded-md bg-[#FFF8E9]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.MaSP, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#432A1D] hover:bg-[#F5E8D0] rounded-l-md"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#432A1D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.MaSP, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#432A1D] hover:bg-[#F5E8D0] rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary & Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5D1B5] bg-[#F5E8D0]/50 shrink-0 space-y-3">
            <div className="space-y-1.5 text-xs text-[#79695B]">
              <div className="flex justify-between">
                <span>Tạm tính hàng:</span>
                <span className="font-semibold text-[#432A1D] tabular-nums">
                  {formatVND(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-[#432A1D] tabular-nums">
                  {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#432A1D] pt-2 border-t border-[#E5D1B5]">
                <span>Tổng thanh toán:</span>
                <span className="font-serif text-lg text-[#6B321C] tabular-nums">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9] transition-all shadow-md active:scale-[0.99]"
            >
              <span>Tiến hành đặt hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#79695B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66734A]" />
              <span>Kiểm tra hàng trước khi thanh toán (COD)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
