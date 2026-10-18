import React from 'react';
import { BRAND_ARTICLES } from '../data/mockData';
import { Article } from '../types';
import { ArrowRight, Clock } from 'lucide-react';

interface NewsSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="tin-tuc" className="py-20 sm:py-28 bg-[#F5E8D0]/40 border-t border-[#E5D1B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
              TRI THỨC & ẨM THỰC
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
              Góc văn hóa làng Bợ & nét xưa xứ Đoài
            </h2>
            <p className="text-[#79695B] text-base mt-2 max-w-xl">
              Khám phá công thức nấu ăn cổ truyền, bí quyết kết hợp tương nếp trong mâm cơm và chuyện nghề làm tương truyền đời.
            </p>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND_ARTICLES.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group cursor-pointer rounded-2xl bg-[#FFF8E9] border border-[#E5D1B5] overflow-hidden hover:border-[#DDA33A] hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#F5E8D0]">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFF8E9]/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#6B321C]">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  {/* Clean unboxed metadata with typographic separator */}
                  <div className="flex items-center gap-2 text-xs text-[#79695B] mb-2 font-medium">
                    <span>{art.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#432A1D] group-hover:text-[#6B321C] transition-colors line-clamp-2 leading-snug mb-3">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#79695B] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#E5D1B5]/50 flex items-center justify-between text-xs font-semibold text-[#6B321C] group-hover:text-[#8A4B2A]">
                <span>Đọc toàn bộ bài viết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
