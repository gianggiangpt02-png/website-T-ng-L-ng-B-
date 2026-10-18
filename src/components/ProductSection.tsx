import React, { useState, useMemo } from 'react';
import { SanPham } from '../types';
import { ProductCard } from './ProductCard';
import { Search, ArrowUpDown, ShieldCheck } from 'lucide-react';

interface ProductSectionProps {
  products: SanPham[];
  onAddToCart: (product: SanPham) => void;
  onViewDetail: (product: SanPham) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onAddToCart,
  onViewDetail
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'Tương Nếp Đặc Biệt', label: 'Tương nếp đặc biệt' },
    { id: 'Tương Truyền Thống', label: 'Tương truyền thống' },
    { id: 'Bộ Quà Biếu', label: 'Hộp quà biếu' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.PhanLoai === selectedCategory;
        const matchesQuery =
          searchQuery.trim() === '' ||
          p.TenSP.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.MoTa.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOption === 'asc') return a.Gia - b.Gia;
        if (sortOption === 'desc') return b.Gia - a.Gia;
        return 0;
      });
  }, [products, selectedCategory, sortOption, searchQuery]);

  return (
    <section id="san-pham" className="py-20 sm:py-28 bg-[#FFF8E9] border-t border-[#E5D1B5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
              DANH MỤC ĐẶC SẢN
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
              Khám phá hương vị truyền thống
            </h2>
            <p className="text-[#79695B] text-base mt-2 max-w-xl">
              Mỗi sản phẩm là một phần của câu chuyện về hương vị quê nhà, được ủ ròng rã trong từng chum sành ngả nắng.
            </p>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5E8D0] border border-[#E5D1B5] text-xs text-[#6B321C] font-medium shrink-0 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#66734A]" />
            <span>Chính gốc làng Bợ · Đầy đủ nhãn mác & hạn dùng</span>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5D1B5]">
          {/* Category Tabs (Interactive buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#6B321C] text-[#FFF8E9] shadow-xs'
                    : 'bg-[#F5E8D0]/60 text-[#432A1D] hover:bg-[#F5E8D0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Container */}
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Tìm loại tương..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A] text-[#432A1D] placeholder-[#79695B]/60"
              />
              <Search className="w-4 h-4 text-[#79695B] absolute left-3 top-2.5" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                aria-label="Sắp xếp sản phẩm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="appearance-none pl-8 pr-8 py-2 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg text-[#432A1D] font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="asc">Giá: Thấp đến cao</option>
                <option value="desc">Giá: Cao đến thấp</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#79695B] absolute left-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#F5E8D0]/30 rounded-2xl border border-dashed border-[#E5D1B5]">
            <p className="font-serif text-lg text-[#432A1D] font-semibold mb-1">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="text-sm text-[#79695B] mb-4">
              Vui lòng thử lại với từ khóa khác hoặc bỏ chọn bộ lọc.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#FFF8E9] bg-[#6B321C] rounded-lg"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.MaSP}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
