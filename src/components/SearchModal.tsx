import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { SanPham, Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SanPham[];
  articles: Article[];
  onSelectProduct: (product: SanPham) => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  articles,
  onSelectProduct,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.TenSP.toLowerCase().includes(q) ||
        p.MoTa.toLowerCase().includes(q) ||
        p.ThanhPhan.toLowerCase().includes(q)
    );
  }, [products, query]);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFF8E9] rounded-2xl shadow-2xl border border-[#E5D1B5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E5D1B5] bg-[#F5E8D0]/60 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8A4B2A] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm theo tên tương, nguyên liệu, món ăn, bài viết..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm sm:text-base text-[#432A1D] placeholder-[#79695B]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#79695B] hover:text-[#432A1D] px-2 py-1"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
            className="p-1.5 text-[#432A1D] hover:bg-[#E5D1B5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-[#79695B]">
              <p className="font-semibold text-sm text-[#432A1D] mb-1">Gợi ý từ khóa tìm kiếm:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Tương nếp 500ml', 'Tương hũ sành', 'Kho cá', 'Nếp cái hoa vàng', 'Làng Bợ', 'Muối hầm'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-[#F5E8D0] hover:bg-[#E5D1B5] text-[#432A1D] text-xs font-medium transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Product Results */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#8A4B2A] mb-3">
                  Sản phẩm ({filteredProducts.length})
                </span>
                {filteredProducts.length === 0 ? (
                  <p className="text-xs text-[#79695B] italic">Không có sản phẩm nào khớp.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.MaSP}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5E8D0] cursor-pointer transition-colors border border-transparent hover:border-[#E5D1B5]"
                      >
                        <img
                          src={p.HinhAnh}
                          alt={p.TenSP}
                          className="w-12 h-12 rounded-lg object-cover bg-[#F5E8D0] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-[#432A1D] truncate">
                            {p.TenSP}
                          </h4>
                          <span className="text-xs text-[#79695B]">
                            {p.DungTich} ·{' '}
                            <span className="font-semibold text-[#6B321C]">
                              {new Intl.NumberFormat('vi-VN').format(p.Gia)}₫
                            </span>
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8A4B2A]" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Results */}
              <div className="pt-4 border-t border-[#E5D1B5]">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#8A4B2A] mb-3">
                  Bài viết & Ẩm thực ({filteredArticles.length})
                </span>
                {filteredArticles.length === 0 ? (
                  <p className="text-xs text-[#79695B] italic">Không có bài viết nào khớp.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a);
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-[#F5E8D0] cursor-pointer transition-colors border border-transparent hover:border-[#E5D1B5]"
                      >
                        <span className="text-[11px] font-semibold text-[#8A4B2A] block">
                          {a.category}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#432A1D] mt-0.5">
                          {a.title}
                        </h4>
                        <p className="text-xs text-[#79695B] line-clamp-1 mt-1">{a.excerpt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
