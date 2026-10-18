import React from 'react';
import { Database, Sparkles, Award, MapPin, Phone, Mail } from 'lucide-react';
import { CategoryKey } from './TopCategoryNav';
import logoImg from '../assets/images/logo_tuong_lang_bo.png';

interface FooterProps {
  onOpenIntegrationModal: () => void;
  onSelectCategory?: (cat: CategoryKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenIntegrationModal, onSelectCategory }) => {
  const handleNav = (cat: CategoryKey) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer className="bg-[#432A1D] text-[#FFF8E9] pt-16 pb-12 border-t-2 border-[#DDA33A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FFF8E9]/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo Tương Làng Bợ"
                className="h-12 w-auto object-contain rounded bg-[#FFF8E9] p-1 shadow-xs"
              />
              <div>
                <span className="block font-serif text-2xl font-bold tracking-tight text-[#FFF8E9]">
                  Tương Làng Bợ
                </span>
                <span className="block text-xs text-[#F2C96D] tracking-wider">
                  Hương vị quê nhà, gìn giữ nét xưa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F5E8D0]/80 leading-relaxed max-w-sm">
              Đặc sản tương truyền thống ủ chum sành nung củi phơi trọn nắng trời vùng đất Tổ Phú Thọ. Nguyên liệu tự nhiên thuần khiết từ bàn tay người nông dân bãi bồi sông Đà.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F2C96D]">
              <Sparkles className="w-4 h-4 text-[#DDA33A]" />
              <span>&ldquo;Nhất Kinh kỳ, nhì Bợ Bạt&rdquo;</span>
            </div>
          </div>

          {/* Quick Nav Links matching exact 6 categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F2C96D] uppercase tracking-wider">
              Danh mục chính
            </h4>
            <ul className="space-y-2 text-xs text-[#F5E8D0]/85">
              <li>
                <button
                  onClick={() => handleNav('trang-chu')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cau-chuyen')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Câu chuyện
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quy-trinh')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Quy trình
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ocop')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Chứng nhận OCOP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('lien-he')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F2C96D] uppercase tracking-wider">
              Dòng sản phẩm chính
            </h4>
            <ul className="space-y-2 text-xs text-[#F5E8D0]/85">
              <li>
                <button
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Tương làng Bợ 500ml (30.000 đ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Tương làng Bợ 1 lít (60.000 đ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Tương làng Bợ đặc biệt (80.000 đ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('san-pham')}
                  className="hover:text-[#F2C96D] transition-colors cursor-pointer text-left"
                >
                  Hộp quà biếu Tương làng Bợ OCOP
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Policy */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F2C96D] uppercase tracking-wider">
              Cơ sở Tương Làng Bợ
            </h4>
            <div className="space-y-2 text-xs text-[#F5E8D0]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DDA33A] shrink-0 mt-0.5" />
                <span>Xã Đào Xá, tỉnh Phú Thọ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DDA33A] shrink-0" />
                <span>Hotline: 0988 567 892</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DDA33A] shrink-0" />
                <span>Email: lienhe@tuonglangbo.com</span>
              </div>
            </div>

            {/* Google Sheets / Database integration button for store admin */}
            <div className="pt-2">
              <button
                onClick={onOpenIntegrationModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B321C] hover:bg-[#8A4B2A] text-[11px] font-medium text-[#F2C96D] border border-[#DDA33A]/40 transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Tích hợp Google Sheets</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E8D0]/70">
          <p>© 2026 Tương Làng Bợ. Đặc sản nức tiếng Xã Đào Xá, tỉnh Phú Thọ.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Chính sách giao hàng</span>
            <span aria-hidden="true">·</span>
            <span>Chính sách bảo mật</span>
            <span aria-hidden="true">·</span>
            <span>Chứng nhận OCOP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
