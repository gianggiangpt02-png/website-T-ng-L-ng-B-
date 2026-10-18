import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { SanPham } from '../types';

interface ProductCardProps {
  product: SanPham;
  onAddToCart: (product: SanPham) => void;
  onViewDetail: (product: SanPham) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetail
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  // Format Vietnamese currency
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.Gia) + '₫';

  return (
    <div
      onClick={() => onViewDetail(product)}
      className="group cursor-pointer rounded-2xl bg-[#FFF8E9] border border-[#E5D1B5] overflow-hidden hover:border-[#DDA33A] hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
    >
      <div>
        {/* Product Image Slot with styled fallback */}
        <div className="relative aspect-4/3 overflow-hidden bg-[#F5E8D0]">
          <img
            src={product.HinhAnh}
            alt={product.TenSP}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Unboxed subtle status tag */}
          <div className="absolute top-3 left-3 bg-[#FFF8E9]/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-medium text-[#6B321C] shadow-xs">
            {product.DungTich}
          </div>

          {/* Quick view icon button overlay on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            aria-label={`Xem chi tiết ${product.TenSP}`}
            className="absolute top-3 right-3 p-2 bg-[#FFF8E9]/90 hover:bg-[#FFF8E9] text-[#432A1D] rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5">
          {/* Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-[#79695B] mb-2 font-medium">
            <span>{product.PhanLoai || 'Tương thủ công'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#66734A]">{product.TrangThai}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#432A1D] group-hover:text-[#6B321C] transition-colors line-clamp-2 mb-2 leading-snug">
            {product.TenSP}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#79695B] line-clamp-2 leading-relaxed mb-4">
            {product.MoTa}
          </p>
        </div>
      </div>

      {/* Footer bar with Price & Add to Cart button */}
      <div className="px-5 pb-5 pt-2 border-t border-[#E5D1B5]/60 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] text-[#79695B] uppercase tracking-wider">Giá bán</span>
          <span className="font-serif text-lg sm:text-xl font-bold text-[#6B321C] tabular-nums">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-xs active:scale-95 ${
            justAdded
              ? 'bg-[#66734A] text-[#FFF8E9]'
              : 'bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Đã thêm</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Thêm vào giỏ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
