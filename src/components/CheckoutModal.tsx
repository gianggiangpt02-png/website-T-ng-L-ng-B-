import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { createOrder } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [hoTen, setHoTen] = useState('');
  const [dienThoai, setDienThoai] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState<'COD' | 'BANK'>('COD');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300000;
  const STANDARD_SHIPPING_FEE = 25000;

  const subtotal = items.reduce((acc, cur) => acc + cur.product.Gia * cur.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;

  const formatVND = (num: number) => new Intl.NumberFormat('vi-VN').format(num) + '₫';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validations
    if (!hoTen.trim() || hoTen.trim().length < 2) {
      setErrorMessage('Vui lòng nhập họ và tên người nhận.');
      return;
    }

    const cleanPhone = dienThoai.trim().replace(/\s+/g, '');
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage('Số điện thoại không hợp lệ (Ví dụ: 0988567892).');
      return;
    }

    if (!diaChi.trim() || diaChi.trim().length < 6) {
      setErrorMessage('Vui lòng nhập chi tiết số nhà, thôn xóm, xã/phường, quận/huyện, tỉnh thành.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        hoTen: hoTen.trim(),
        dienThoai: cleanPhone,
        diaChi: diaChi.trim(),
        ghiChu: ghiChu.trim(),
        phuongThucThanhToan,
        items: items.map((i) => ({
          maSP: i.product.MaSP,
          soLuong: i.quantity
        }))
      };

      const result = await createOrder(payload);

      if (result.success) {
        setConfirmedOrder(result.data);
        onOrderSuccess(result.data);
      } else {
        setErrorMessage(result.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.');
      }
    } catch (err: any) {
      setErrorMessage('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFF8E9] rounded-2xl shadow-2xl border border-[#E5D1B5] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5D1B5] bg-[#F5E8D0]/60">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#432A1D]">
            {confirmedOrder ? 'Đặt hàng thành công!' : 'Thông tin giao hàng Tương Làng Bợ'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Đóng biểu mẫu"
            className="p-1.5 text-[#432A1D] hover:bg-[#E5D1B5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {confirmedOrder ? (
          /* Confirmation Receipt Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#66734A]/15 text-[#66734A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8A4B2A] mb-1">
                ĐƠN HÀNG ĐÃ ĐƯỢC TIẾP NHẬN
              </p>
              <h3 className="font-serif text-2xl font-bold text-[#432A1D]">
                Mã đơn: <span className="text-[#6B321C]">{confirmedOrder.maDon}</span>
              </h3>
              <p className="text-sm text-[#79695B] mt-2 max-w-md mx-auto">
                Cảm ơn bạn đã tin yêu hương vị truyền thống Tương Làng Bợ. Bộ phận chăm sóc khách hàng sẽ liên hệ qua số <strong>{confirmedOrder.dienThoai}</strong> để xác nhận và đóng gói gửi tới bạn.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#F5E8D0]/50 p-4 rounded-xl border border-[#E5D1B5] text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[#79695B]">Người nhận:</span>
                <span className="font-semibold text-[#432A1D]">{confirmedOrder.hoTen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79695B]">Địa chỉ giao:</span>
                <span className="font-semibold text-[#432A1D] max-w-[260px] text-right truncate">
                  {confirmedOrder.diaChi}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79695B]">Phương thức:</span>
                <span className="font-semibold text-[#432A1D]">
                  {confirmedOrder.phuongThucThanhToan === 'BANK' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5D1B5] text-sm font-bold">
                <span>Tổng tiền:</span>
                <span className="text-[#6B321C] font-serif text-base">
                  {formatVND(confirmedOrder.grandTotal)}
                </span>
              </div>
            </div>

            {/* Bank details if bank transfer selected */}
            {confirmedOrder.phuongThucThanhToan === 'BANK' && (
              <div className="p-4 rounded-xl bg-[#FFF8E9] border border-[#DDA33A] text-left text-xs space-y-1.5 text-[#432A1D]">
                <p className="font-bold text-[#6B321C]">Thông tin chuyển khoản:</p>
                <p>• Ngân hàng: Vietcombank - Chi nhánh Phú Thọ</p>
                <p>• Số tài khoản: <strong>0988567892</strong></p>
                <p>• Chủ tài khoản: CO SO TUONG TRUYEN THONG LANG BO</p>
                <p>• Cú pháp: <strong>{confirmedOrder.maDon} {confirmedOrder.dienThoai}</strong></p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#6B321C] text-[#FFF8E9] font-semibold text-sm hover:bg-[#8A4B2A] transition-colors"
            >
              Tiếp tục dạo xem website
            </button>
          </div>
        ) : (
          /* Form Input Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                  Họ và tên người nhận <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={hoTen}
                  onChange={(e) => setHoTen(e.target.value)}
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
                  placeholder="Ví dụ: 0988567892"
                  value={dienThoai}
                  onChange={(e) => setDienThoai(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                Địa chỉ nhận hàng chi tiết <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Số nhà, đường, thôn/xóm, phường/xã, quận/huyện, tỉnh/thành phố"
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#432A1D] mb-1">
                Ghi chú giao hàng (Tùy chọn)
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A]"
              />
            </div>

            {/* Payment method selector */}
            <div>
              <label className="block text-xs font-semibold text-[#432A1D] mb-2">
                Phương thức thanh toán
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    phuongThucThanhToan === 'COD'
                      ? 'border-[#6B321C] bg-[#F5E8D0]/60'
                      : 'border-[#E5D1B5] bg-[#FFF8E9]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={phuongThucThanhToan === 'COD'}
                    onChange={() => setPhuongThucThanhToan('COD')}
                    className="accent-[#6B321C]"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-[#432A1D]">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                    <span className="text-[11px] text-[#79695B]">
                      Kiểm tra hàng trước khi gửi tiền
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    phuongThucThanhToan === 'BANK'
                      ? 'border-[#6B321C] bg-[#F5E8D0]/60'
                      : 'border-[#E5D1B5] bg-[#FFF8E9]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={phuongThucThanhToan === 'BANK'}
                    onChange={() => setPhuongThucThanhToan('BANK')}
                    className="accent-[#6B321C]"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-[#432A1D]">
                      Chuyển khoản ngân hàng
                    </span>
                    <span className="text-[11px] text-[#79695B]">
                      Quét mã QR chuyển khoản nhanh
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Cart snapshot summary */}
            <div className="p-4 rounded-xl bg-[#F5E8D0]/50 border border-[#E5D1B5] space-y-2 text-xs">
              <div className="flex justify-between text-[#79695B]">
                <span>Tổng tiền hàng ({items.reduce((a, b) => a + b.quantity, 0)} món):</span>
                <span className="font-semibold text-[#432A1D] tabular-nums">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#79695B]">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold text-[#432A1D] tabular-nums">
                  {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#432A1D] pt-2 border-t border-[#E5D1B5]">
                <span>Tổng thanh toán dự kiến:</span>
                <span className="font-serif text-lg text-[#6B321C] tabular-nums">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-[#79695B]">
              <ShieldCheck className="w-4 h-4 text-[#66734A] shrink-0" />
              <span>Thông tin của quý khách chỉ sử dụng phục vụ mục đích liên hệ giao hàng và bảo mật tuyệt đối.</span>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl border border-[#E5D1B5] text-xs font-semibold text-[#79695B] hover:bg-[#F5E8D0]"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9] font-semibold text-sm transition-all shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi đơn hàng...</span>
                  </>
                ) : (
                  <span>Xác nhận gửi đơn đặt hàng ({formatVND(grandTotal)})</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
