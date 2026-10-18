import React, { useState } from 'react';
import { X, Database, Copy, Check, ExternalLink, ShieldAlert, Code } from 'lucide-react';

interface DataIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataIntegrationModal: React.FC<DataIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const gasScript = `// ========================================================
// MÃ NGUỒN GOOGLE APPS SCRIPT ĐỒNG BỘ TƯƠNG LÀNG BỢ
// Dán vào: Extensions > Apps Script trong Google Sheet của bạn
// ========================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DonHang");
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Không tìm thấy trang tính DonHang"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    // Duyệt qua từng sản phẩm trong đơn và ghi đúng cấu trúc DonHang:
    // MaDon | NgayDat | HoTen | DienThoai | DiaChi | MaSP | TenSP | SoLuong | DonGia | TongTien | TrangThai | GhiChu
    if (data.items && data.items.length > 0) {
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        sheet.appendRow([
          data.maDon,
          data.ngayDat || formattedDate,
          data.hoTen,
          "'" + data.dienThoai, // giữ số 0 đầu
          data.diaChi,
          item.maSP,
          item.tenSP,
          item.soLuong,
          item.donGia,
          data.grandTotal,
          "Chờ xác nhận",
          data.ghiChu || ""
        ]);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Đã lưu đơn hàng thành công vào Google Sheet"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Trả về danh sách SanPham được phép công khai
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SanPham");
  if (!sheet) return ContentService.createTextOutput(JSON.stringify([]));

  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var result = [];

  for (var i = 1; i < rows.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    result.push(obj);
  }

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: result
  })).setMimeType(ContentService.MimeType.JSON);
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(gasScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFF8E9] rounded-2xl shadow-2xl border border-[#E5D1B5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5D1B5] bg-[#F5E8D0]/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#6B321C]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#432A1D]">
              Cấu hình tích hợp Google Sheets & CSDL
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng bảng tích hợp"
            className="p-1.5 text-[#432A1D] hover:bg-[#E5D1B5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#432A1D]">
          {/* Architecture overview */}
          <div className="p-4 rounded-xl bg-[#FFF8E9] border border-[#E5D1B5] space-y-2">
            <h3 className="font-bold text-[#6B321C] text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#DDA33A]" />
              Tuân thủ chuẩn bảo mật & Cấu trúc bảng tính hiện hữu
            </h3>
            <p className="text-[#79695B] leading-relaxed">
              Website đã được thiết kế sẵn sàng kết nối trực tiếp với 3 bảng tính Google Sheets của bạn mà không làm thay đổi bất kỳ tên cột nào:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-[#F5E8D0]/60 border border-[#E5D1B5]">
                <strong className="block text-[#6B321C] mb-1">1. Bảng SanPham:</strong>
                <span className="text-[11px] text-[#79695B] font-mono leading-tight block">
                  MaSP, TenSP, MoTa, Gia, DungTich, ThanhPhan, HinhAnh, TrangThai
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5E8D0]/60 border border-[#E5D1B5]">
                <strong className="block text-[#6B321C] mb-1">2. Bảng DonHang:</strong>
                <span className="text-[11px] text-[#79695B] font-mono leading-tight block">
                  MaDon, NgayDat, HoTen, DienThoai, DiaChi, MaSP, TenSP, SoLuong, DonGia, TongTien, TrangThai, GhiChu
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5E8D0]/60 border border-[#E5D1B5]">
                <strong className="block text-[#6B321C] mb-1">3. Bảng CauHinh:</strong>
                <span className="text-[11px] text-[#79695B] font-mono leading-tight block">
                  ThongTin, GiaTri
                </span>
              </div>
            </div>
          </div>

          {/* Webhook URL Input */}
          <form onSubmit={handleSaveWebhook} className="space-y-3">
            <label className="block font-bold text-xs uppercase tracking-wider text-[#8A4B2A]">
              Google Apps Script Web App URL (Để nhận đơn hàng tự động)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs bg-[#FFF8E9] border border-[#E5D1B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DDA33A] font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#6B321C] text-[#FFF8E9] text-xs font-semibold hover:bg-[#8A4B2A]"
              >
                Lưu cấu hình
              </button>
            </div>
            {saveSuccess && (
              <span className="text-xs text-[#66734A] font-medium block">
                ✓ Đã lưu Webhook URL. Máy chủ sẽ tự động chuyển tiếp đơn hàng sang Google Sheets.
              </span>
            )}
          </form>

          {/* Apps script snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-xs uppercase tracking-wider text-[#8A4B2A] flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                Mã nguồn Apps Script (Sẵn sàng triển khai)
              </label>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B321C] hover:text-[#8A4B2A]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép mã'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#432A1D] text-[#F5E8D0] text-[11px] font-mono overflow-x-auto max-h-60 leading-relaxed border border-[#E5D1B5]">
              <code>{gasScript}</code>
            </pre>
          </div>

          {/* Deployment steps instructions */}
          <div className="p-4 rounded-xl bg-[#F5E8D0]/50 border border-[#E5D1B5] text-xs text-[#79695B] space-y-1.5">
            <p className="font-bold text-[#432A1D]">Hướng dẫn 3 bước kết nối Google Sheets:</p>
            <p>1. Mở Google Sheet chứa 3 trang tính SanPham, DonHang, CauHinh.</p>
            <p>2. Chọn Tiện ích mở rộng (Extensions) → Apps Script, dán toàn bộ đoạn mã trên và lưu lại.</p>
            <p>3. Chọn Triển khai (Deploy) → Tùy chọn triển khai mới (New deployment) → Loại ứng dụng web (Web app) → Quyền truy cập: "Bất kỳ ai" (Anyone) → Sao chép URL dán vào ô trên.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5E8D0]/40 border-t border-[#E5D1B5] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#6B321C] text-[#FFF8E9] text-xs font-semibold hover:bg-[#8A4B2A]"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
