import React from 'react';
import { Sun, Heart, Sparkles, Sprout } from 'lucide-react';

export const BrandValues: React.FC = () => {
  const values = [
    {
      icon: Sun,
      title: 'Hương vị truyền thống',
      desc: 'Vị ngọt đạm sâu lắng từ đậu tương lòng xanh rang vàng quyện cùng xôi nếp cái hoa vàng lên men tự nhiên.'
    },
    {
      icon: Sparkles,
      title: 'Tinh hoa làng nghề',
      desc: 'Bí quyết ủ tương trong chum sành phơi trọn nắng trời vùng Đất Tổ, chắt lọc từng giọt sánh óng màu cánh gián.'
    },
    {
      icon: Sprout,
      title: 'Trân trọng nguyên liệu',
      desc: 'Nông sản thuần Việt từ vùng bãi bồi ven sông Đà, nguồn nước giếng khơi tinh khiết, tuyệt đối không chất bảo quản.'
    },
    {
      icon: Heart,
      title: 'Gìn giữ giá trị quê hương',
      desc: 'Gắn kết các thế hệ trong gia đình qua hương vị mộc mạc, lưu giữ hồn quê mộc mạc giữa đời sống đương đại.'
    }
  ];

  return (
    <section id="gia-tri" className="py-14 sm:py-20 bg-[#F5E8D0]/60 border-y border-[#E5D1B5]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
            GIÁ TRỊ CỐT LÕI
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#432A1D] font-bold">
            Bản sắc tạo nên danh tiếng Tương Làng Bợ
          </h2>
        </div>

        {/* 4 Clean Value Columns with hairline borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-xl bg-[#FFF8E9] border border-[#E5D1B5] hover:border-[#DDA33A] hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F5E8D0] group-hover:bg-[#6B321C] group-hover:text-[#FFF8E9] text-[#6B321C] flex items-center justify-center transition-colors mb-5">
                  <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#432A1D] mb-2.5">
                  {val.title}
                </h3>
                <p className="text-sm text-[#79695B] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
