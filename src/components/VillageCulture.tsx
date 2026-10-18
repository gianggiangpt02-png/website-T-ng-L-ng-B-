import React from 'react';
import { Compass, BookOpen, SunMedium } from 'lucide-react';

export const VillageCulture: React.FC = () => {
  return (
    <section id="van-hoa" className="py-20 sm:py-28 bg-[#FFF8E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
            KHÔNG GIAN VĂN HÓA
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
            Vùng đất Tổ Phú Thọ & cội nguồn phù sa sông Đà
          </h2>
          <div className="w-16 h-0.5 bg-[#DDA33A] mt-4" />
        </div>

        {/* Panoramic Landscape Hero */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E5D1B5] shadow-lg aspect-16/9 mb-12 group">
          <img
            src="/src/assets/images/lang_que_phu_tho_1792123233959.jpg"
            alt="Toàn cảnh làng quê thanh bình miền đất Tổ Phú Thọ bên bờ sông Đà"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#432A1D]/80 via-transparent to-black/20" />
          <div className="absolute bottom-6 left-6 right-6 text-[#FFF8E9] max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#F2C96D] font-semibold block mb-1">
              ĐỊA LINH NHÂN KIỆT
            </span>
            <p className="font-serif text-lg sm:text-2xl font-bold leading-snug">
              Nơi sông Đà hòa vào sông Hồng, bồi đắp nên những mùa màng trĩu hạt và nghề ủ tương cổ truyền.
            </p>
          </div>
        </div>

        {/* 3 Cultural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-[#F5E8D0]/50 border border-[#E5D1B5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#F2C96D]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#432A1D]">
              Khí hậu & Thổ nhưỡng đặc hữu
            </h3>
            <p className="text-sm text-[#79695B] leading-relaxed">
              Vùng bãi bồi ven sông Đà sở hữu lớp đất phù sa tơi xốp, giàu khoáng chất, giúp cây đậu tương hạt đẫy đà và bùi ngậy hơn các vùng khác.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F5E8D0]/50 border border-[#E5D1B5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center">
              <SunMedium className="w-5 h-5 text-[#F2C96D]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#432A1D]">
              Nắng hanh và gió sông thanh sạch
            </h3>
            <p className="text-sm text-[#79695B] leading-relaxed">
              Những đợt nắng hanh vàng của vùng trung du Bắc Bộ tạo môi trường tối ưu cho các chủng men vi sinh trong tương nếp phát triển tự nhiên, khử vị chua và làm tăng vị ngọt đạm.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F5E8D0]/50 border border-[#E5D1B5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#F2C96D]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#432A1D]">
              Hồn cốt ẩm thực đất Vua Hùng
            </h3>
            <p className="text-sm text-[#79695B] leading-relaxed">
              Tương nếp Làng Bợ luôn hiện diện trang trọng trong các mâm cỗ cúng gia tiên, lễ hội đền Hùng và mâm cơm đón khách quý phương xa về thăm Phú Thọ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
