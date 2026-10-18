import React from 'react';
import { X, Calendar, Clock, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFF8E9] rounded-2xl shadow-2xl border border-[#E5D1B5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5D1B5] bg-[#F5E8D0]/50 shrink-0">
          <span className="text-xs uppercase font-semibold text-[#8A4B2A] tracking-wider">
            {article.category}
          </span>
          <button
            onClick={onClose}
            aria-label="Đóng bài viết"
            className="p-1.5 text-[#432A1D] hover:bg-[#E5D1B5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#432A1D] leading-tight">
            {article.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-[#79695B]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#E5D1B5] aspect-16/9 bg-[#F5E8D0]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-base text-[#432A1D] leading-relaxed space-y-4">
            <p className="font-medium text-[#6B321C] text-lg font-serif italic border-l-2 border-[#DDA33A] pl-4 py-1">
              {article.excerpt}
            </p>
            <p>{article.content}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5E8D0]/40 border-t border-[#E5D1B5] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#79695B]">
            Nguồn: Ban Văn hóa Truyền thông Tương Làng Bợ
          </span>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Đã sao chép liên kết bài viết!');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B321C] hover:text-[#8A4B2A]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
