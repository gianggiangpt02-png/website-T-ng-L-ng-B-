export interface SanPham {
  MaSP: string;
  TenSP: string;
  MoTa: string;
  Gia: number;
  DungTich: string;
  ThanhPhan: string;
  HinhAnh: string;
  TrangThai: 'Còn hàng' | 'Số lượng giới hạn' | 'Ủ theo mùa';
  PhanLoai?: string;
  DacDiem?: string[];
  CachDung?: string;
  BaoQuan?: string;
  XacNhanThucTe: boolean;
}

export interface DonHang {
  MaDon: string;
  NgayDat: string;
  HoTen: string;
  DienThoai: string;
  DiaChi: string;
  MaSP: string;
  TenSP: string;
  SoLuong: number;
  DonGia: number;
  TongTien: number;
  TrangThai: 'Chờ xác nhận' | 'Đang chuẩn bị' | 'Đang giao' | 'Hoàn thành';
  GhiChu: string;
}

export interface CauHinh {
  ThongTin: string;
  GiaTri: string;
}

export interface CartItem {
  product: SanPham;
  quantity: number;
}

export interface OrderSubmissionPayload {
  hoTen: string;
  dienThoai: string;
  diaChi: string;
  ghiChu?: string;
  phuongThucThanhToan: 'COD' | 'BANK';
  items: Array<{
    maSP: string;
    soLuong: number;
  }>;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}
