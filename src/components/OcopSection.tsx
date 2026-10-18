import React from 'react';
import { Award, ShieldCheck, CheckCircle2, FileText, QrCode, Sparkles, Droplets, SunMedium } from 'lucide-react';

interface OcopSectionProps {
  onExploreProducts: () => void;
}

export const OcopSection: React.FC<OcopSectionProps> = ({ onExploreProducts }) => {
  const ocopPillars = [
    {
      icon: Award,
      title: 'Đặc sản OCOP tỉnh Phú Thọ',
      desc: 'Sản phẩm tương truyền thống đại diện cho làng Bợ (Xã Đào Xá, tỉnh Phú Thọ), được đánh giá và công nhận đạt chuẩn chương trình Mỗi Xã Một Sản Phẩm (OCOP).'
    },
    {
      icon: ShieldCheck,
      title: '100% Nông sản bản địa sạch',
      desc: 'Canh tác tự nhiên trên bãi bồi sông Đà: đậu tương ta thuần chủng lòng xanh hạt tròn, gạo nếp cái hoa vàng thơm dẻo, tuyệt đối không biến đổi gen (Non-GMO).'
    },
    {
      icon: Droplets,
      title: 'Lên men vi sinh tự nhiên',
      desc: 'Bí quyết ủ men mốc vàng hoa cau thuần khiết trong chum sành nung củi phơi trọn nắng hanh vùng trung du, hoàn toàn không sử dụng chất phụ gia hay phẩm màu công nghiệp.'
    },
    {
      icon: QrCode,
      title: 'Tem truy xuất & Chỉ dẫn địa lý',
      desc: 'Mỗi chai tương đều có tem nhãn truy xuất nguồn gốc rõ ràng, ghi rõ ngày ngả tương, thời gian ủ nắng và thông tin cơ sở sản xuất tại Phú Thọ.'
    }
  ];

  const qualityMetrics = [
    { label: 'Hàm lượng đạm Acid Amin tự nhiên', value: '≥ 15 g/L', note: 'Từ đậu tương lên men kỹ' },
    { label: 'Tỷ lệ muối biển sạch hầm', value: '12% – 14%', note: 'Bảo quản tương tự nhiên quanh năm' },
    { label: 'Chất bảo quản tổng hợp', value: '0.00%', note: 'Cam kết tuyệt đối không Benzoat' },
    { label: 'Phẩm màu công nghiệp', value: '0.00%', note: 'Màu cánh gián óng ả từ nắng và mốc nếp' },
    { label: 'Thời gian ủ nắng tối thiểu', value: '180 ngày', note: 'Phơi trọn 6 tháng trong chum sành' },
    { label: 'Nguồn nước ủ tương', value: 'Giếng khơi tinh khiết', note: 'Nguồn nước ngầm mát lành làng Bợ' }
  ];

  return (
    <section id="ocop" className="py-16 sm:py-24 bg-[#FFF8E9] border-t border-[#E5D1B5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E8D0] text-[#6B321C] text-xs font-semibold mb-3 border border-[#E5D1B5]">
            <Award className="w-4 h-4 text-[#DDA33A]" />
            <span>CHƯƠNG TRÌNH MỖI XÃ MỘT SẢN PHẨM (OCOP)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
            Chứng nhận OCOP & Tiêu chuẩn chất lượng Tương Làng Bợ
          </h2>
          <p className="text-[#79695B] text-base mt-3 leading-relaxed">
            Mỗi giọt tương vàng óng màu cánh gián là lời cam kết trọn vẹn của người làng Bợ về an toàn thực phẩm, nguồn gốc Đất Tổ và tinh hoa ẩm thực truyền đời.
          </p>
          <div className="w-16 h-0.5 bg-[#DDA33A] mt-4" />
        </div>

        {/* Hero OCOP Banner with Visual Certificate Framing */}
        <div className="bg-[#F5E8D0]/60 rounded-2xl border-2 border-[#DDA33A]/60 p-6 sm:p-10 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA33A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A4B2A] tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-[#DDA33A]" />
                <span>NIỀM TỰ HÀO NÔNG SẢN ĐẤT TỔ PHÚ THỌ</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#432A1D]">
                Chứng nhận OCOP Phú Thọ — Gìn giữ tinh hoa, vươn tầm hiện đại
              </h3>
              <p className="text-[#79695B] text-sm sm:text-base leading-relaxed">
                Tương Làng Bợ vinh dự được cơ quan quản lý nông nghiệp và phát triển nông thôn tỉnh Phú Thọ đánh giá cao trong chương trình OCOP, nhờ quy trình sản xuất thủ công chuẩn mực kết hợp nhà xưởng đảm bảo tiêu chuẩn an toàn vệ sinh thực phẩm (ATVSTP).
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#432A1D] font-medium">
                <div className="flex items-center gap-2 bg-[#FFF8E9] p-3 rounded-xl border border-[#E5D1B5]">
                  <CheckCircle2 className="w-4 h-4 text-[#66734A] shrink-0" />
                  <span>Cơ sở đủ điều kiện ATTP theo quy định</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FFF8E9] p-3 rounded-xl border border-[#E5D1B5]">
                  <CheckCircle2 className="w-4 h-4 text-[#66734A] shrink-0" />
                  <span>Kiểm nghiệm định kỳ vi sinh & kim loại nặng</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FFF8E9] p-3 rounded-xl border border-[#E5D1B5]">
                  <CheckCircle2 className="w-4 h-4 text-[#66734A] shrink-0" />
                  <span>Chỉ dẫn địa lý Làng Bợ, Xã Đào Xá, tỉnh Phú Thọ</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FFF8E9] p-3 rounded-xl border border-[#E5D1B5]">
                  <CheckCircle2 className="w-4 h-4 text-[#66734A] shrink-0" />
                  <span>Tem mã vạch & QR Code chống hàng giả</span>
                </div>
              </div>
            </div>

            {/* Right Badge / Showcase */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FFF8E9] rounded-xl border border-[#DDA33A] text-center shadow-xs">
              <div className="w-20 h-20 rounded-full bg-[#6B321C] text-[#FFF8E9] flex flex-col items-center justify-center border-4 border-[#DDA33A] shadow-md mb-3">
                <span className="font-serif text-xl font-bold text-[#F2C96D]">OCOP</span>
                <span className="text-[10px] tracking-widest text-[#FFF8E9]">PHÚ THỌ</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#432A1D]">
                Đặc Sản Tương Làng Bợ
              </h4>
              <p className="text-xs text-[#79695B] mt-1">
                Sản phẩm OCOP tiêu biểu của Xã Đào Xá, tỉnh Phú Thọ
              </p>
              <button
                onClick={onExploreProducts}
                className="mt-4 px-4 py-2 rounded-lg bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9] text-xs font-semibold transition-colors cursor-pointer"
              >
                Đặt mua sản phẩm OCOP
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Quality Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ocopPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFF8E9] border border-[#E5D1B5] hover:border-[#DDA33A] hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5E8D0] text-[#6B321C] group-hover:bg-[#6B321C] group-hover:text-[#FFF8E9] flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#432A1D] mb-2">
                  {p.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#79695B] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical Quality Benchmark Table */}
        <div className="bg-[#FFF8E9] rounded-2xl border border-[#E5D1B5] overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 bg-[#F5E8D0]/60 border-b border-[#E5D1B5] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#432A1D]">
                Bảng chỉ tiêu chất lượng công bố
              </h3>
              <p className="text-xs text-[#79695B] mt-0.5">
                Các chỉ tiêu cảm quan, lý hóa và vi sinh được kiểm định định kỳ
              </p>
            </div>
            <FileText className="w-5 h-5 text-[#8A4B2A]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#F5E8D0]/30 text-[#432A1D] font-bold border-b border-[#E5D1B5]">
                  <th className="py-3.5 px-4 sm:px-6">Chỉ tiêu kiểm định</th>
                  <th className="py-3.5 px-4 sm:px-6">Mức công bố</th>
                  <th className="py-3.5 px-4 sm:px-6">Ý nghĩa chất lượng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D1B5]/60 text-[#79695B]">
                {qualityMetrics.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F5E8D0]/20 transition-colors">
                    <td className="py-3 px-4 sm:px-6 font-medium text-[#432A1D]">{row.label}</td>
                    <td className="py-3 px-4 sm:px-6 font-bold text-[#6B321C] font-mono tabular-nums">{row.value}</td>
                    <td className="py-3 px-4 sm:px-6 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#F5E8D0]/40 border-t border-[#E5D1B5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#79695B]">
            <span>Đơn vị công bố: Cơ sở sản xuất Tương truyền thống Làng Bợ</span>
            <button
              onClick={onExploreProducts}
              className="text-xs font-semibold text-[#6B321C] hover:text-[#8A4B2A] flex items-center gap-1 cursor-pointer"
            >
              <span>Trải nghiệm ngay hương vị chuẩn OCOP</span>
              <Award className="w-3.5 h-3.5 text-[#DDA33A]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
