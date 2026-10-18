import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';

interface BrandStoryProps {
  onLearnMore?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onLearnMore }) => {
  return (
    <section id="cau-chuyen" className="py-16 sm:py-24 bg-[#FFF8E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
            CÂU CHUYỆN LÀNG NGHỀ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
            Nghề ủ tương bên bãi bồi sông Đà & nét xưa Đất Tổ
          </h2>
          <div className="w-16 h-0.5 bg-[#DDA33A] mt-4" />
        </div>

        {/* Narrative Block 1: Asymmetric Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5D1B5] shadow-md aspect-16/10 group bg-[#F5E8D0]">
              <img
                src="/src/assets/images/chum_tuong_san_gach_nang_1792214460177.jpg"
                alt="Hàng chum sành phơi nắng sớm trên sân gạch làng Bợ"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>
            
            {/* Editorial Floating Caption Card */}
            <div className="hidden sm:block absolute -bottom-6 right-6 bg-[#432A1D] text-[#FFF8E9] p-4 rounded-xl border border-[#DDA33A]/40 shadow-xl max-w-xs">
              <p className="text-[11px] text-[#F2C96D] uppercase tracking-wider font-semibold mb-1">
                KỸ NGHỆ PHƠI NẮNG
              </p>
              <p className="font-serif text-xs italic text-[#F5E8D0]">
                &ldquo;Đón trọn nắng mai, chắt lọc tinh hoa đất trời trong từng thớ chum nung củi.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-[#79695B] leading-relaxed text-sm sm:text-base">
            <h3 className="font-serif text-2xl text-[#432A1D] font-bold">
              Chum sành cổ tích tụ tinh túy đất trời
            </h3>
            <p>
              Làng Bợ (xã Đào Xá, tỉnh Phú Thọ) từ bao đời nay đã nức tiếng gần xa với nghề làm tương nếp truyền thống. Nằm cạnh dòng sông Đà cuộn đỏ phù sa, thổ nhưỡng nơi đây đã nuôi dưỡng những vụ đậu tương ta hạt tròn căng, lòng đỗ xanh bùi và nếp cái hoa vàng dẻo ngậy.
            </p>
            <p>
              Khác với tương công nghiệp sản xuất hàng loạt, người làng Bợ giữ trọn vẹn phép ủ tương cổ truyền: đậu rang trên chảo gang chín tới, xôi nếp đồ chín ủ kín nong tre cho mọc mốc hoa cau vàng ươm, rồi đem ngả vào chum sành Hương Canh nung củi.
            </p>
            <blockquote className="border-l-2 border-[#DDA33A] pl-4 py-2 italic font-serif text-[#6B321C] text-base bg-[#F5E8D0]/50 rounded-r-lg">
              &ldquo;Một giọt tương Làng Bợ ngon là sự tổng hòa của hạt đậu đất phù sa, mốc nếp cái hoa vàng, nước giếng khơi mát ngọt và nắng gió hanh hao của vùng trung du.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Narrative Block 2: Culinary Gastronomy Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 text-[#79695B] leading-relaxed text-sm sm:text-base">
            <h3 className="font-serif text-2xl text-[#432A1D] font-bold">
              Vị ngọt bùi gắn kết mâm cơm gia đình
            </h3>
            <p>
              Qua bao thăng trầm của thời gian, Tương Làng Bợ không chỉ đơn thuần là một thứ nước chấm dân dã, mà đã trở thành sợi dây ký ức nối dài tình thân. Dù đi đâu về đâu, người con xứ Đoài, xứ Phú Thọ vẫn nhớ về bát tương sánh màu cánh gián chấm ngọn rau muống giòn tan trưa hè hay miếng bánh đúc lạc ấm nồng.
            </p>
            <p>
              Hôm nay, Tương Làng Bợ được đóng gói chỉn chu trong từng chai thủy tinh dày dặn, hũ gốm mộc mạc mang đầy đủ tiêu chuẩn vệ sinh an toàn nhưng vẫn giữ nguyên vẹn 100% linh hồn và hương vị mà cha ông để lại.
            </p>
            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B321C] hover:text-[#8A4B2A] group transition-colors cursor-pointer"
              >
                <span>Xem các dòng sản phẩm của làng Bợ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border border-[#E5D1B5] shadow-md aspect-16/10 group bg-[#F5E8D0]">
              <img
                src="/src/assets/images/editorial_tuong_banh_duc_1792214459539.jpg"
                alt="Bát tương Làng Bợ sánh óng màu cánh gián chấm bánh đúc và rau muống luộc"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
