import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Check, Sparkles, Truck, Droplets } from 'lucide-react';
import { SanPham } from '../types';

interface ProductDetailModalProps {
  product: SanPham | null;
  onClose: () => void;
  onAddToCart: (product: SanPham, quantity: number) => void;
  onQuickCheckout: (product: SanPham, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickCheckout
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.Gia) + '₫';

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1800);
  };

  const handleBuyNow = () => {
    onQuickCheckout(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FFF8E9] rounded-2xl shadow-2xl border border-[#E5D1B5] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ chi tiết"
          className="absolute top-4 right-4 z-20 p-2 text-[#432A1D] hover:bg-[#F5E8D0] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery View */}
          <div className="md:col-span-5 bg-[#F5E8D0] p-6 flex flex-col justify-between">
            <div className="rounded-xl overflow-hidden border border-[#E5D1B5] shadow-sm aspect-4/3 md:aspect-square bg-[#FFF8E9]">
              <img
                src={product.HinhAnh}
                alt={product.TenSP}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[#6B321C] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#66734A] shrink-0" />
                <span>100% nguyên liệu tự nhiên · Không phụ gia</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#6B321C] font-medium">
                <Droplets className="w-4 h-4 text-[#DDA33A] shrink-0" />
                <span>Ủ chum sành truyền thống phơi trọn nắng trời</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#6B321C] font-medium">
                <Truck className="w-4 h-4 text-[#8A4B2A] shrink-0" />
                <span>Giao hàng toàn quốc · Miễn phí từ 300.000₫</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Specs */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs text-[#79695B] font-medium mb-1.5">
                <span>{product.PhanLoai || 'Tương Làng Bợ'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#66734A] font-semibold">{product.TrangThai}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#432A1D] leading-tight">
                {product.TenSP}
              </h2>

              {/* Price & Packaging */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#6B321C] tabular-nums">
                  {formattedPrice}
                </span>
                <span className="text-sm text-[#79695B] font-medium">
                  / {product.DungTich}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#79695B] leading-relaxed">
              {product.MoTa}
            </p>

            {/* Verified Attributes list */}
            {product.DacDiem && product.DacDiem.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#432A1D] uppercase tracking-wider">
                  Đặc điểm nổi bật:
                </p>
                <ul className="space-y-1 text-xs text-[#79695B]">
                  {product.DacDiem.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DDA33A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            <div className="p-3.5 rounded-xl bg-[#F5E8D0]/60 border border-[#E5D1B5] space-y-1 text-xs text-[#79695B]">
              <span className="font-semibold text-[#432A1D] block">Thành phần tự nhiên:</span>
              <p>{product.ThanhPhan}</p>
            </div>

            {/* Usage & Storage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#79695B]">
              {product.CachDung && (
                <div className="p-3 rounded-lg bg-[#FFF8E9] border border-[#E5D1B5]">
                  <span className="font-semibold text-[#432A1D] block mb-1">Món ăn kết hợp:</span>
                  <p>{product.CachDung}</p>
                </div>
              )}
              {product.BaoQuan && (
                <div className="p-3 rounded-lg bg-[#FFF8E9] border border-[#E5D1B5]">
                  <span className="font-semibold text-[#432A1D] block mb-1">Bảo quản:</span>
                  <p>{product.BaoQuan}</p>
                </div>
              )}
            </div>

            {/* Purchasing Controls */}
            <div className="pt-4 border-t border-[#E5D1B5] space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#432A1D] uppercase tracking-wider">
                  Số lượng:
                </span>
                <div className="flex items-center border border-[#E5D1B5] rounded-lg bg-[#FFF8E9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-base font-semibold text-[#432A1D] hover:bg-[#F5E8D0] rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold tabular-nums text-[#432A1D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-base font-semibold text-[#432A1D] hover:bg-[#F5E8D0] rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-xs ${
                    addedSuccess
                      ? 'bg-[#66734A] text-[#FFF8E9]'
                      : 'bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã thêm vào giỏ hàng</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm vào giỏ hàng</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold bg-[#DDA33A] hover:bg-[#F2C96D] text-[#432A1D] transition-all duration-200 shadow-xs text-center"
                >
                  Đặt hàng ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
