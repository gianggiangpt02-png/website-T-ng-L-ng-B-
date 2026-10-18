import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/mockData';
import { Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductionTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="quy-trinh" className="py-20 sm:py-28 bg-[#F5E8D0]/50 border-t border-[#E5D1B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
            KỸ NGHỆ GIA TRUYỀN
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
            Quy trình ủ tương công phu qua từng mùa nắng
          </h2>
          <p className="text-[#79695B] text-base mt-3">
            Để có được mẻ tương ngọt bùi, óng màu cánh gián, người làng Bợ phải tuân thủ nghiêm ngặt 5 công đoạn thủ công chắt lọc qua hàng trăm năm.
          </p>
        </div>

        {/* Step Selector for quick navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {TIMELINE_STEPS.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeStep === idx
                  ? 'bg-[#6B321C] text-[#FFF8E9] border-[#6B321C] shadow-md scale-102'
                  : 'bg-[#FFF8E9] text-[#432A1D] border-[#E5D1B5] hover:bg-[#F5E8D0]'
              }`}
            >
              <span className={`block font-serif text-lg font-bold ${activeStep === idx ? 'text-[#F2C96D]' : 'text-[#8A4B2A]'}`}>
                {item.step}
              </span>
              <span className="block text-xs font-medium truncate mt-1">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Highlight Showcase */}
        <div className="bg-[#FFF8E9] rounded-2xl border border-[#E5D1B5] p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E8D0] text-[#6B321C] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#DDA33A]" />
                <span>CÔNG ĐOẠN {TIMELINE_STEPS[activeStep].step}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8A4B2A]">{TIMELINE_STEPS[activeStep].highlight}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#432A1D]">
                {TIMELINE_STEPS[activeStep].title}
              </h3>

              <p className="text-[#79695B] leading-relaxed text-base sm:text-lg">
                {TIMELINE_STEPS[activeStep].desc}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#66734A]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kinh nghiệm làng nghề Đất Tổ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#DDA33A]" />
                  <span>Lên men hiếu khí tự nhiên</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#E5D1B5] aspect-4/3 shadow-xs bg-[#F5E8D0]">
                <img
                  src={TIMELINE_STEPS[activeStep].image || "/src/assets/images/village_craft_process_1792123233967.jpg"}
                  alt={TIMELINE_STEPS[activeStep].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Connected Flow Diagram */}
        <div className="relative border-l-2 border-[#DDA33A]/60 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {TIMELINE_STEPS.map((s, index) => (
            <div key={s.step} className="relative group">
              {/* Dot Anchor */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1 w-5 h-5 rounded-full border-2 transition-all ${
                  activeStep === index
                    ? 'bg-[#6B321C] border-[#DDA33A] scale-125'
                    : 'bg-[#FFF8E9] border-[#8A4B2A]'
                }`}
              />

              <div
                onClick={() => setActiveStep(index)}
                className="cursor-pointer p-5 rounded-xl bg-[#FFF8E9] border border-[#E5D1B5] hover:border-[#DDA33A] hover:shadow-xs transition-all max-w-3xl"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-serif text-sm font-bold text-[#8A4B2A]">
                    Bước {s.step}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#432A1D] group-hover:text-[#6B321C] transition-colors">
                    {s.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#79695B] leading-relaxed line-clamp-2">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
