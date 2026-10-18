import React from 'react';
import { Home, ShoppingBag, BookOpen, Sun, Award, MapPin } from 'lucide-react';

export type CategoryKey = 
  | 'trang-chu'
  | 'san-pham'
  | 'cau-chuyen'
  | 'quy-trinh'
  | 'ocop'
  | 'lien-he';

interface TopCategoryNavProps {
  activeCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  productCount: number;
}

export const TopCategoryNav: React.FC<TopCategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  productCount
}) => {
  const categories = [
    {
      id: 'trang-chu' as CategoryKey,
      label: 'Trang chủ',
      sub: 'Toàn cảnh Đất Tổ',
      icon: Home
    },
    {
      id: 'san-pham' as CategoryKey,
      label: 'Sản phẩm',
      sub: `${productCount} dòng đặc sản`,
      icon: ShoppingBag
    },
    {
      id: 'cau-chuyen' as CategoryKey,
      label: 'Câu chuyện',
      sub: 'Hồn quê sông Đà',
      icon: BookOpen
    },
    {
      id: 'quy-trinh' as CategoryKey,
      label: 'Quy trình',
      sub: 'Ủ nắng 6 tháng',
      icon: Sun
    },
    {
      id: 'ocop' as CategoryKey,
      label: 'Chứng nhận OCOP',
      sub: 'Đặc sản Phú Thọ',
      icon: Award
    },
    {
      id: 'lien-he' as CategoryKey,
      label: 'Liên hệ',
      sub: 'Thăm cơ sở & Hotline',
      icon: MapPin
    }
  ];

  return (
    <div className="sticky top-[69px] sm:top-[77px] z-30 bg-[#FFF8E9]/95 backdrop-blur-md border-b border-[#E5D1B5] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 py-2 sm:py-2.5">
          {/* Category List with smooth horizontal scroll */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 w-full justify-start md:justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer ${
                    isActive
                      ? 'bg-[#6B321C] text-[#FFF8E9] border-[#6B321C] shadow-md font-semibold scale-102'
                      : 'bg-[#F5E8D0]/60 text-[#432A1D] border-[#E5D1B5] hover:bg-[#F5E8D0] hover:border-[#DDA33A]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#F2C96D]' : 'text-[#8A4B2A]'
                    }`}
                  />
                  <div className="text-left">
                    <span className="block leading-tight font-medium sm:font-semibold">
                      {cat.label}
                    </span>
                    <span
                      className={`hidden lg:block text-[10px] leading-none mt-0.5 ${
                        isActive ? 'text-[#F2C96D]/90 font-normal' : 'text-[#79695B]'
                      }`}
                    >
                      {cat.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
