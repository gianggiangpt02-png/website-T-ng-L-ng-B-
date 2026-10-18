import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Award } from 'lucide-react';
import { CategoryKey } from './TopCategoryNav';
import logoImg from '../assets/images/logo_tuong_lang_bo.png';

interface HeaderProps {
  cartCount: number;
  activeCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenSearch,
  onOpenAiChat
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exact 6 categories requested by user
  const navLinks: Array<{ id: CategoryKey; label: string }> = [
    { id: 'trang-chu', label: 'Trang chủ' },
    { id: 'san-pham', label: 'Sản phẩm' },
    { id: 'cau-chuyen', label: 'Câu chuyện' },
    { id: 'quy-trinh', label: 'Quy trình' },
    { id: 'ocop', label: 'Chứng nhận OCOP' },
    { id: 'lien-he', label: 'Liên hệ' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8E9]/95 backdrop-blur-md shadow-xs border-b border-[#E5D1B5]/80 py-2.5 sm:py-3'
            : 'bg-[#FFF8E9] py-3.5 sm:py-4 border-b border-[#E5D1B5]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-8 */}
          <div className="flex items-center justify-between gap-6 lg:gap-8">
            {/* Zone 1: Single text element wordmark / Brand Logo */}
            <button
              onClick={() => onSelectCategory('trang-chu')}
              className="group flex items-center gap-2.5 sm:gap-3 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A] rounded cursor-pointer"
            >
              <img
                src={logoImg}
                alt="Logo Tương Làng Bợ"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
              />
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#432A1D] group-hover:text-[#6B321C] transition-colors leading-tight">
                  Tương Làng Bợ
                </span>
                <span className="block text-[11px] text-[#79695B] font-medium tracking-wide">
                  Hương vị truyền thống Việt
                </span>
              </div>
            </button>

            {/* Zone 2: Concise single-line nav links with active state */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[#432A1D]">
              {navLinks.map((link) => {
                const isActive = activeCategory === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onSelectCategory(link.id)}
                    className={`cursor-pointer py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors relative ${
                      isActive
                        ? 'text-[#6B321C] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#DDA33A]'
                        : 'text-[#432A1D] hover:text-[#6B321C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#DDA33A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions - Search, Cart count, Quick Order */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                aria-label="Tìm kiếm sản phẩm"
                className="p-2 text-[#432A1D] hover:text-[#6B321C] hover:bg-[#F5E8D0]/60 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A] cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Chatbot shortcut button */}
              <button
                onClick={onOpenAiChat}
                aria-label="Tư vấn cùng Bé Chum Bợ"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#432A1D] bg-[#F5E8D0] hover:bg-[#E5D1B5] border border-[#E5D1B5] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DDA33A] animate-spin" style={{ animationDuration: '4s' }} />
                <span>Bé Chum Bợ 🍯</span>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label={`Giỏ hàng ${cartCount} sản phẩm`}
                className="relative p-2 text-[#432A1D] hover:text-[#6B321C] hover:bg-[#F5E8D0]/60 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A] cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-[#6B321C] text-[#FFF8E9] text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs animate-in zoom-in-75">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* CTA Button */}
              <button
                onClick={() => onSelectCategory('san-pham')}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#FFF8E9] bg-[#6B321C] hover:bg-[#8A4B2A] rounded-lg transition-all shadow-xs active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Đặt hàng ngay
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Mở menu điện thoại"
                className="lg:hidden p-2 text-[#432A1D] hover:text-[#6B321C] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DDA33A] cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5D1B5] bg-[#FFF8E9] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1.5 text-base font-medium text-[#432A1D]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    activeCategory === link.id
                      ? 'bg-[#6B321C] text-[#FFF8E9] font-bold'
                      : 'hover:bg-[#F5E8D0] text-[#432A1D]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeCategory === link.id && (
                    <span className="text-xs text-[#F2C96D] font-normal">Đang xem</span>
                  )}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiChat();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#432A1D] bg-[#F5E8D0] border border-[#E5D1B5] rounded-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#DDA33A]" />
                  <span>Trò chuyện cùng Bé Chum Bợ (AI)</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectCategory('san-pham');
                  }}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-[#FFF8E9] bg-[#6B321C] rounded-lg cursor-pointer"
                >
                  Xem danh mục sản phẩm & đặt mua
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
