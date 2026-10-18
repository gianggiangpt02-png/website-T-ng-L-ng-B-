import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onExploreStory
}) => {
  return (
    <section
      id="trang-chu"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FFF8E9]"
    >
      {/* Background visual asset container with subtle warm ambient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_chum_tuong_1792123231888.jpg"
          alt="Sân gạch phơi những chum tương sành truyền thống làng Bợ trong ánh nắng vàng"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.03]"
        />
        {/* Measured editorial gradient scrim ensuring WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#432A1D]/90 via-[#432A1D]/65 to-[#432A1D]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#432A1D] via-transparent to-[#FFF8E9]/20" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-left py-12 md:py-20">
        {/* Top editorial kicker - clean unboxed typography with typographic separator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8E9]/15 backdrop-blur-md border border-[#FFF8E9]/25 text-[#F2C96D] text-xs font-medium tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#DDA33A]" />
          <span>ĐẶC SẢN TRUYỀN THỐNG ĐẤT TỔ PHÚ THỌ</span>
          <span aria-hidden="true" className="opacity-60">·</span>
          <span>Ủ NẮNG TỰ NHIÊN</span>
        </div>

        {/* Main Display Headline with text-wrap: balance */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFF8E9] font-bold leading-[1.15] tracking-tight mb-6 max-w-3xl [text-wrap:balance]">
          Hương vị quê nhà, <br className="hidden sm:inline" />
          <span className="text-[#F2C96D] italic font-serif">gìn giữ nét xưa.</span>
        </h1>

        {/* Lead paragraph */}
        <p className="text-base sm:text-lg lg:text-xl text-[#F5E8D0] max-w-2xl font-light leading-relaxed mb-10">
          Từ những giá trị truyền thống của làng quê Việt, Tương Làng Bợ mang đến câu chuyện về hương vị, con người và nét văn hóa được gìn giữ qua thời gian.
        </p>

        {/* Dual Call-to-Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onExploreProducts}
            className="px-7 py-3.5 rounded-lg bg-[#DDA33A] hover:bg-[#F2C96D] text-[#432A1D] font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] text-center"
          >
            Khám phá sản phẩm
          </button>
          <button
            onClick={onExploreStory}
            className="px-7 py-3.5 rounded-lg bg-[#FFF8E9]/15 hover:bg-[#FFF8E9]/25 text-[#FFF8E9] border border-[#FFF8E9]/35 font-medium text-sm sm:text-base backdrop-blur-xs transition-all duration-200 active:scale-[0.98] text-center"
          >
            Câu chuyện làng nghề
          </button>
        </div>

        {/* Traditional heritage quote note */}
        <div className="mt-12 pt-8 border-t border-[#FFF8E9]/15 max-w-xl">
          <p className="font-serif italic text-sm text-[#F5E8D0]/90">
            &ldquo;Tương Bợ, cà La, quạt ma Đan Hà&rdquo; — Tinh hoa ủ chum sành ngả nắng bên triền sông Đà ngàn năm đất Tổ.
          </p>
        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#gia-tri"
        aria-label="Cuộn xuống tìm hiểu giá trị thương hiệu"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#FFF8E9]/70 hover:text-[#FFF8E9] transition-colors"
      >
        <span className="text-[11px] tracking-widest uppercase font-medium">Khám phá</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
