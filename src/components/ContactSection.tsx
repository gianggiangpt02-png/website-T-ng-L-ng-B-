import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <section id="lien-he" className="py-20 sm:py-28 bg-[#FFF8E9] border-t border-[#E5D1B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold mb-2">
            KẾT NỐI VỚI CHÚNG TÔI
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#432A1D] font-bold leading-tight">
            Liên hệ thăm cơ sở sản xuất Tương Làng Bợ
          </h2>
          <p className="text-[#79695B] text-base mt-2">
            Quý khách muốn ghé thăm không gian sân phơi chum sành, trải nghiệm nếm thử tương mới ngả hoặc đặt hàng số lượng lớn làm quà biếu, xin vui lòng liên hệ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#F5E8D0]/60 border border-[#E5D1B5] space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F2C96D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#432A1D]">Địa chỉ cơ sở</h4>
                  <p className="text-xs sm:text-sm text-[#79695B] mt-1 leading-relaxed">
                    Xã Đào Xá, tỉnh Phú Thọ.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#F2C96D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#432A1D]">Hotline / Zalo tư vấn</h4>
                  <a
                    href="tel:0988567892"
                    className="text-xs sm:text-sm font-semibold text-[#6B321C] hover:underline mt-1 block"
                  >
                    0988 567 892
                  </a>
                  <span className="text-[11px] text-[#79695B]">Hỗ trợ từ 07:30 - 21:00 hàng ngày</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#F2C96D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#432A1D]">Thư điện tử</h4>
                  <a
                    href="mailto:lienhe@tuonglangbo.vn"
                    className="text-xs sm:text-sm text-[#79695B] hover:text-[#6B321C] mt-1 block"
                  >
                    lienhe@tuonglangbo.vn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6B321C] text-[#FFF8E9] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#F2C96D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#432A1D]">Đón tiếp khách tham quan</h4>
                  <p className="text-xs sm:text-sm text-[#79695B] mt-1">
                    Thứ Hai — Chủ Nhật: 07:30 — 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Directions Note */}
            <div className="p-4 rounded-xl bg-[#FFF8E9] border border-[#DDA33A]/60 text-xs text-[#79695B] space-y-1">
              <span className="font-bold text-[#6B321C] block">Chỉ dẫn đường đi:</span>
              <p>Từ Hà Nội theo Đại lộ Thăng Long hoặc Quốc lộ 32 di chuyển về phía Xã Đào Xá, tỉnh Phú Thọ khoảng 70km. Quý khách có thể ghé thăm trực tiếp cơ sở sản xuất và trải nghiệm vườn chum sành ủ tương truyền thống.</p>
            </div>
          </div>

          {/* Right: Quick Contact Form */}
          <div className="lg:col-span-7 bg-[#F5E8D0]/40 p-6 sm:p-8 rounded-2xl border border-[#E5D1B5]">
            <h3 className="font-serif text-xl font-bold text-[#432A1D] mb-2">
              Gửi lời nhắn cho nghệ nhân làng Bợ
            </h3>
            <p className="text-xs sm:text-sm text-[#79695B] mb-6">
              Bạn có câu hỏi về sản phẩm, đại lý phân phối hay yêu cầu đặt riêng? Hãy để lại tin nhắn, chúng mình sẽ hồi đáp sớm nhất.
            </p>

            {sentSuccess ? (
              <div className="p-6 rounded-xl bg-[#66734A]/10 border border-[#66734A]/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#66734A] mx-auto" />
                <h4 className="font-serif text-base font-bold text-[#432A1D]">
                  Cảm ơn bạn đã gửi tin nhắn!
                </h4>
                <p className="text-xs text-[#79695B]">
                  Chúng mình sẽ liên hệ lại với bạn qua số điện thoại sớm nhất nhé.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                      Họ và tên quý khách <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                      Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0988 567 892"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                    Nội dung lời nhắn <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Quý khách muốn tìm hiểu về mẻ tương nếp ủ nắng, đăng ký tham quan hay hợp tác phân phối..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9] font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi tin nhắn</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Google Map Embed of Tuong Lang Bo, Xã Đào Xá, Phú Thọ */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-[#E5D1B5] shadow-sm bg-[#F5E8D0]">
          <div className="p-4 bg-[#FFF8E9] border-b border-[#E5D1B5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6B321C]" />
              <span className="font-serif font-bold text-sm text-[#432A1D]">Bản đồ vị trí cơ sở tại Xã Đào Xá, tỉnh Phú Thọ</span>
            </div>
            <a
              href="https://maps.google.com/maps?q=%C4%90%C3%A0o%20X%C3%A1%2C%20Ph%C3%BA%20Th%E1%BB%8D&z=15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6B321C] hover:underline font-semibold"
            >
              Mở trong Google Maps →
            </a>
          </div>
          <div className="w-full h-72 sm:h-80">
            <iframe
              src="https://maps.google.com/maps?q=%C4%90%C3%A0o%20X%C3%A1%2C%20Ph%C3%BA%20Th%E1%BB%8D&t=m&z=14&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí cơ sở Tương Làng Bợ tại Xã Đào Xá, tỉnh Phú Thọ"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
