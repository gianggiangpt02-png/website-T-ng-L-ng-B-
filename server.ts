import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Canonical products schema matching user requirements:
// MaSP, TenSP, MoTa, Gia, DungTich, ThanhPhan, HinhAnh, TrangThai
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

// Initial verified products dataset based on authentic Bợ village traditional soybean paste (tuonglangbo.com)
const INITIAL_SAN_PHAM: SanPham[] = [
  {
    MaSP: 'TLB-500ML',
    TenSP: 'Tương làng Bợ 500ml',
    MoTa: 'Sản phẩm đạt tiêu chuẩn OCOP 3 sao tỉnh Phú Thọ, có vị ngọt thơm của đỗ tương, gạo nếp, vị đậm đà của muối và sắc nâu vàng bắt mắt, khi ăn có cảm giác béo ngậy, thơm lừng.',
    Gia: 30000,
    DungTich: 'Chai nhựa 500ml',
    ThanhPhan: 'Đậu tương chọn lọc, gạo nếp cái hoa vàng, mốc tương truyền thống, muối biển sạch, nước giếng khơi.',
    HinhAnh: 'https://tuonglangbo.com/wp-content/uploads/sites/1009/2020/12/1.png',
    TrangThai: 'Còn hàng',
    PhanLoai: 'Tương 500ml',
    DacDiem: [
      'Chai nhựa 500ml tiện lợi, có nắp niêm phong màng co chắc chắn',
      'Giá chuẩn chính gốc HTX Tương Làng Bợ: 30.000 đ',
      'Đạt chứng nhận OCOP 3 sao tỉnh Phú Thọ'
    ],
    CachDung: 'Dùng chấm rau muống luộc, cà pháo dầm tương, bánh đúc, thịt bê, cá kho tương.',
    BaoQuan: 'Bảo quản nơi khô ráo, đậy kín nắp sau khi sử dụng.',
    XacNhanThucTe: true
  },
  {
    MaSP: 'TLB-1LIT',
    TenSP: 'Tương làng Bợ 1 lít',
    MoTa: 'Chai 1 lít tiết kiệm dùng cho cả gia đình quanh năm. Tương càng để lâu càng đỏ, càng thơm ngon, ngọt bùi. Món ăn dân dã nức tiếng vùng quê Thanh Thủy.',
    Gia: 60000,
    DungTich: 'Chai 1000ml (1 Lít)',
    ThanhPhan: 'Đậu tương rang chín vàng thơm, xôi nếp ủ mốc vàng hoa cau, muối biển hạt to sạch, nước nguồn tinh khiết.',
    HinhAnh: 'https://tuonglangbo.com/wp-content/uploads/sites/1009/2020/12/2.png',
    TrangThai: 'Còn hàng',
    PhanLoai: 'Tương 1 Lít',
    DacDiem: [
      'Dung tích 1 lít dùng lâu dài cho bữa cơm gia đình',
      'Vị đằm bùi ngọt hậu tự nhiên từ nếp và đỗ rang chín tới',
      'Thích hợp ướp cá kho, thịt rim, nấu canh'
    ],
    CachDung: 'Pha với ớt, tỏi, đường làm nước chấm hoặc gia vị kho nấu truyền thống.',
    BaoQuan: 'Nhiệt độ phòng thoáng mát, tránh ánh nắng trực tiếp.',
    XacNhanThucTe: true
  },
  {
    MaSP: 'TLB-DACBIET',
    TenSP: 'Tương làng Bợ đặc biệt',
    MoTa: 'Mẻ tương tuyển chọn kỹ lưỡng, được ủ từ loại đậu tương ta hạt mẩy và nếp cái hoa vàng thượng hạng trong chum sành phơi nắng ròng rã trên 12 tháng, nước tương sánh sệt màu nâu sẫm óng ả.',
    Gia: 80000,
    DungTich: 'Chai đặc biệt',
    ThanhPhan: '100% đậu tương ta thuần chủng bãi bồi sông Đà, gạo nếp cái hoa vàng loại 1, mốc hoa cau bí truyền, muối hầm.',
    HinhAnh: 'https://tuonglangbo.com/wp-content/uploads/sites/1009/2020/12/3dd.png',
    TrangThai: 'Số lượng giới hạn',
    PhanLoai: 'Tương đặc biệt',
    DacDiem: [
      'Dòng tương đặc biệt ủ nắng lâu năm, vị béo ngậy đậm sâu',
      'Hàm lượng đạm tự nhiên cao, sánh mịn thơm ngát',
      'Món quà trân quý gửi tặng người thân yêu'
    ],
    CachDung: 'Chấm thịt dê, thịt bê chao, rau rừng hoặc thưởng thức cùng bánh đúc nóng.',
    BaoQuan: 'Đậy chặt nút, để nơi râm mát.',
    XacNhanThucTe: true
  },
  {
    MaSP: 'TLB-GOIQUA',
    TenSP: 'Hộp quà biếu Tương làng Bợ OCOP',
    MoTa: 'Gói quà biếu trang trọng gồm các chai Tương làng Bợ đóng gói đẹp mắt theo tiêu chuẩn OCOP 3 sao của tỉnh Phú Thọ, món quà ẩm thực ý nghĩa khi ghé thăm vùng đất du lịch khoáng nóng Thanh Thủy.',
    Gia: 120000,
    DungTich: 'Set quà biếu (Kèm túi quai xách)',
    ThanhPhan: 'Tương làng Bợ chính gốc, đậu tương, nếp cái hoa vàng, muối biển sạch.',
    HinhAnh: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/goi-qua.jpg',
    TrangThai: 'Còn hàng',
    PhanLoai: 'Bộ Quà Biếu',
    DacDiem: [
      'Bao bì đẹp mắt thích hợp dùng làm quà tặng du lịch Đất Tổ',
      'Đầy đủ tem nhãn truy xuất nguồn gốc HTX Tương Làng Bợ',
      'Gói trọn sự tinh tế của người thợ làng nghề'
    ],
    CachDung: 'Làm quà biếu người thân, đối tác hoặc dùng trong gia đình.',
    BaoQuan: 'Bảo quản nơi khô ráo, tránh ẩm ướt.',
    XacNhanThucTe: true
  }
];

const INITIAL_CAU_HINH: CauHinh[] = [
  { ThongTin: 'TenThuongHieu', GiaTri: 'Tương Làng Bợ' },
  { ThongTin: 'KhauHieu', GiaTri: 'Hương vị quê nhà, gìn giữ nét xưa' },
  { ThongTin: 'DiaChi', GiaTri: 'Xã Đào Xá, tỉnh Phú Thọ' },
  { ThongTin: 'Hotline', GiaTri: '0988 567 892' },
  { ThongTin: 'Email', GiaTri: 'lienhe@tuonglangbo.vn' },
  { ThongTin: 'MienPhiVanChuyenTu', GiaTri: '300000' },
  { ThongTin: 'PhiVanChuyenTieuChuan', GiaTri: '25000' },
  { ThongTin: 'GoogleSheetsWebhookUrl', GiaTri: '' }
];

// In-memory runtime persistence
const productsDatabase: SanPham[] = [...INITIAL_SAN_PHAM];
const ordersDatabase: DonHang[] = [];
const configDatabase: CauHinh[] = [...INITIAL_CAU_HINH];

// Cache recent order signatures to prevent duplicate submissions within 15 seconds
const recentOrderHashes = new Map<string, number>();

// Gemini AI Assistant client initialization
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Error initializing Gemini AI client:', err);
  }
}

// API Routes
app.get('/api/products', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: productsDatabase
  });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = productsDatabase.find(p => p.MaSP === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }
  return res.json({ success: true, data: product });
});

app.get('/api/config', (_req: Request, res: Response) => {
  const configMap: Record<string, string> = {};
  for (const item of configDatabase) {
    configMap[item.ThongTin] = item.GiaTri;
  }
  res.json({ success: true, data: configMap });
});

// Create Order endpoint with strict server-side validation & canonical pricing
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { hoTen, dienThoai, diaChi, ghiChu, items, phuongThucThanhToan } = req.body;

    if (!hoTen || typeof hoTen !== 'string' || hoTen.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Họ tên không hợp lệ (tối thiểu 2 ký tự).' });
    }

    const cleanPhone = (dienThoai || '').toString().trim().replace(/\s+/g, '');
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ success: false, message: 'Số điện thoại không đúng định dạng (Ví dụ: 0988567892).' });
    }

    if (!diaChi || typeof diaChi !== 'string' || diaChi.trim().length < 6) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập địa chỉ nhận hàng chi tiết.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Giỏ hàng đang trống.' });
    }

    // Deduplication check
    const orderFingerprint = `${cleanPhone}_${items.map(i => `${i.maSP}x${i.soLuong}`).sort().join('_')}`;
    const now = Date.now();
    const lastPlaced = recentOrderHashes.get(orderFingerprint);
    if (lastPlaced && now - lastPlaced < 15000) {
      return res.status(429).json({ 
        success: false, 
        message: 'Đơn hàng vừa được tiếp nhận. Vui lòng không nhấn liên tục để tránh trùng lặp.' 
      });
    }
    recentOrderHashes.set(orderFingerprint, now);

    // Compute server-verified price
    let subtotal = 0;
    const validatedItems: Array<{
      maSP: string;
      tenSP: string;
      soLuong: number;
      donGia: number;
      thanhTien: number;
    }> = [];

    for (const item of items) {
      const canonicalProduct = productsDatabase.find(p => p.MaSP === item.maSP);
      if (!canonicalProduct) {
        return res.status(400).json({ 
          success: false, 
          message: `Sản phẩm mã ${item.maSP} không tồn tại trong hệ thống.` 
        });
      }

      const qty = Math.max(1, Math.min(99, parseInt(item.soLuong, 10) || 1));
      const lineTotal = canonicalProduct.Gia * qty;
      subtotal += lineTotal;

      validatedItems.push({
        maSP: canonicalProduct.MaSP,
        tenSP: canonicalProduct.TenSP,
        soLuong: qty,
        donGia: canonicalProduct.Gia,
        thanhTien: lineTotal
      });
    }

    const freeShippingThreshold = 300000;
    const shippingFee = subtotal >= freeShippingThreshold ? 0 : 25000;
    const grandTotal = subtotal + shippingFee;

    const maDon = `TLB-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const ngayDat = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // Save individual item rows matching user prompt schema:
    // MaDon, NgayDat, HoTen, DienThoai, DiaChi, MaSP, TenSP, SoLuong, DonGia, TongTien, TrangThai, GhiChu
    for (const vItem of validatedItems) {
      const orderRecord: DonHang = {
        MaDon: maDon,
        NgayDat: ngayDat,
        HoTen: hoTen.trim(),
        DienThoai: cleanPhone,
        DiaChi: diaChi.trim(),
        MaSP: vItem.maSP,
        TenSP: vItem.tenSP,
        SoLuong: vItem.soLuong,
        DonGia: vItem.donGia,
        TongTien: grandTotal,
        TrangThai: 'Chờ xác nhận',
        GhiChu: ghiChu ? ghiChu.trim() : (phuongThucThanhToan === 'BANK' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)')
      };
      ordersDatabase.push(orderRecord);
    }

    // Optional webhook forwarding to Google Sheets if configured
    const webhookEntry = configDatabase.find(c => c.ThongTin === 'GoogleSheetsWebhookUrl');
    if (webhookEntry && webhookEntry.GiaTri && webhookEntry.GiaTri.startsWith('http')) {
      try {
        fetch(webhookEntry.GiaTri, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            maDon,
            ngayDat,
            hoTen,
            dienThoai: cleanPhone,
            diaChi,
            ghiChu,
            items: validatedItems,
            subtotal,
            shippingFee,
            grandTotal
          })
        }).catch(e => console.warn('Webhook dispatch failed:', e));
      } catch (err) {
        console.warn('Webhook dispatch error:', err);
      }
    }

    return res.json({
      success: true,
      message: 'Đặt hàng thành công! Cơ sở Tương Làng Bợ sẽ liên hệ xác nhận sớm nhất.',
      data: {
        maDon,
        ngayDat,
        hoTen,
        dienThoai: cleanPhone,
        diaChi,
        items: validatedItems,
        subtotal,
        shippingFee,
        grandTotal,
        phuongThucThanhToan: phuongThucThanhToan || 'COD'
      }
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra trong quá trình ghi nhận đơn hàng. Vui lòng thử lại sau.' 
    });
  }
});

// Chatbot AI Consultation endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Nội dung tin nhắn không hợp lệ.' });
    }

    const brandKnowledgePrompt = `
Bạn là "Bé Chum Bợ" - trợ lý linh vật siêu thông minh, ngọt ngào, cute và am hiểu sâu sắc về văn hóa Tương Làng Bợ (địa chỉ tại Xã Đào Xá, tỉnh Phú Thọ).

TÍNH CÁCH CỦA BÉ CHUM BỢ:
- Đáng yêu, ấm áp, lễ phép nhưng cực kỳ thông minh và dễ thương (xưng "Bé Chum" hoặc "Bé", gọi người dùng là "cậu" hoặc "quý khách", dùng các từ cảm thán cute như "nè~", "nha cậu", "ạ", "(≧◡≦)", "♡", "🍯✨").
- Giọng văn chân thành, trong trẻo như hương vị nếp cái hoa vàng quê nhà.

THÔNG TIN XÁC THỰC VỀ TƯƠNG LÀNG BỢ & OCOP:
- Tương Làng Bợ là đặc sản cổ truyền trứ danh vùng đất Tổ Phú Thọ, gắn liền với câu ca dao: "Tương Bợ, cà La, quạt ma Đan Hà".
- ĐẠT CHUẨN CHỨNG NHẬN OCOP TỈNH PHÚ THỌ: 100% nông sản sạch bản địa vùng bãi bồi sông Đà, kiểm nghiệm ATVSTP định kỳ, không hóa chất, không phụ gia bảo quản, có tem truy xuất QR Code.
- Nguyên liệu chính gồm: Đậu tương ta (đỗ tương hạt nhỏ, lòng xanh thơm ngậy), gạo nếp cái hoa vàng thơm dẻo, men mốc tương truyền thống (lên mốc hoa cau vàng ươm), muối biển hầm sạch và nước giếng khơi trong lành.
- Quy trình: Rang đậu vàng thơm, nấu nước đậu; Nấu xôi nếp ủ mốc vàng hoa cau; Ngả đỗ vào chum sành nung củi phơi nắng ròng rã suốt 6 tháng (180 ngày).
- Hương vị đặc trưng: Nước tương sánh óng màu cánh gián đậm, mùi thơm ngọt nếp nồng đượm, vị bùi béo đậm đà lưu luyến ở hậu vị, không hề gắt hay chát.
- Ẩm thực kết hợp: Chấm rau muống luộc, rau lang, thịt lợn ba chỉ luộc, cà pháo muối giòn, thịt bê chao, ướp cá chép/cá quả kho tương, chấm bánh đúc lạc.
- Danh mục sản phẩm hiện có:
  1. Tương Nếp Làng Bợ Thượng Hạng (Chai thủy tinh 500ml): 85.000₫.
  2. Tương Làng Bợ Truyền Thống Đất Tổ (Chai gia đình 1000ml): 145.000₫.
  3. Tương Chum Sành Cổ Truyền (Hũ gốm mộc 2000ml, ủ >12 tháng): 280.000₫.
  4. Bộ Quà Tặng Tinh Hoa Đất Tổ (Combo 2x500ml kèm hộp gỗ mộc): 220.000₫.
- Chính sách giao hàng: Miễn phí vận chuyển toàn quốc cho đơn từ 300.000₫ (phí tiêu chuẩn 25.000₫). Nhận hàng kiểm tra thanh toán COD hoặc chuyển khoản.
- Địa chỉ: Xã Đào Xá, tỉnh Phú Thọ. Hotline: 0988 567 892.

QUY TẮC PHẢN HỒI:
- Trả lời bằng tiếng Việt cute, dễ thương, tự nhiên, chính xác, súc tích (khoảng 2-3 đoạn ngắn).
- Hướng dẫn khách bấm tab "Sản phẩm" hoặc mở Giỏ hàng để đặt hàng tiện lợi.
`;

    if (geminiClient) {
      try {
        const response = await geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${brandKnowledgePrompt}\n\nLịch sử trò chuyện gần nhất: ${JSON.stringify(history || [])}\n\nKhách hàng hỏi: "${message}"`
                }
              ]
            }
          ]
        });

        const reply = response.text || 'Dạ Bé Chum chào cậu nha! Cậu cần Bé giúp gì về tương nếp Làng Bợ hông nè? ♡';
        return res.json({ success: true, reply });
      } catch (geminiError) {
        console.warn('Gemini generateContent error, using domain rule engine fallback:', geminiError);
      }
    }

    // Intelligent domain fallback if API key is not active
    const lower = message.toLowerCase();
    let fallbackReply = 'Dạ Bé Chum Bợ chào cậu nè! (≧◡≦) ♡ Cậu đang tìm loại tương nếp thơm ngon hay cần Bé tư vấn món kho nấu chuẩn vị quê hương nè?';

    if (lower.includes('ocop') || lower.includes('chứng nhận') || lower.includes('tiêu chuẩn')) {
      fallbackReply = 'Dạ Tương Làng Bợ tự hào đạt chuẩn OCOP tiêu biểu của tỉnh Phú Thọ đó cậu ơi! 🏅✨ Tương được làm từ 100% đậu tương và nếp cái hoa vàng bãi bồi sông Đà, ủ nắng tự nhiên trong chum sành 6 tháng, kiểm nghiệm định kỳ an toàn thực phẩm và có tem mã vạch truy xuất nguồn gốc đầy đủ nha!';
    } else if (lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('sản phẩm')) {
      fallbackReply = 'Dạ Bé Chum mách cậu bảng giá các dòng tương nhà mình nha:\n• Tương Nếp Thượng Hạng (Chai 500ml): 85.000₫\n• Tương Truyền Thống Gia Đình (Chai 1 Lít): 145.000₫\n• Tương Chum Sành Cổ Truyền (Hũ 2 Lít ủ >12 tháng): 280.000₫\n• Hộp Quà Biếu Tinh Hoa Đất Tổ: 220.000₫.\nĐặc biệt đơn từ 300.000₫ là được miễn phí ship toàn quốc luôn đó ạ! 🍯📦';
    } else if (lower.includes('đặt hàng') || lower.includes('mua') || lower.includes('ship') || lower.includes('giao')) {
      fallbackReply = 'Dạ để đặt mua, cậu chỉ cần bấm vào mục "Sản phẩm" ở trên đầu trang rồi chọn "Thêm vào giỏ", sau đó mở Giỏ hàng điền địa chỉ là xong nè! Chúng mình giao tận nhà toàn quốc, cậu được mở ra kiểm tra tương thơm ngon mới thanh toán nha! (✿◠‿◠)';
    } else if (lower.includes('nguồn gốc') || lower.includes('ở đâu') || lower.includes('phú thọ') || lower.includes('làng bợ') || lower.includes('địa chỉ')) {
      fallbackReply = 'Dạ cơ sở Tương Làng Bợ đặt tại Xã Đào Xá, tỉnh Phú Thọ - vùng đất cội nguồn ngã ba sông Đà và sông Thao linh thiêng. Nơi đây có nghề ủ tương chum sành hàng trăm năm gắn liền câu ca dao: "Tương Bợ, cà La, quạt ma Đan Hà" đó cậu!';
    } else if (lower.includes('ăn với gì') || lower.includes('món') || lower.includes('chấm') || lower.includes('kho')) {
      fallbackReply = 'Dạ tương nếp nhà mình chấm rau muống luộc, rau lang, thịt ba chỉ luộc là "hết sảy" luôn á! Còn nếu cậu kho cá chép sông hay cá trắm thì chỉ cần ướp 2-3 thìa tương, thêm gừng riềng đun liu riu là thịt cá thơm ngậy, săn chắc, nước kho óng ả màu cánh gián ngon mê ly luôn! 🐟🍲';
    } else if (lower.includes('thành phần') || lower.includes('bảo quản') || lower.includes('làm từ')) {
      fallbackReply = 'Dạ tương làm từ 100% nguyên liệu tự nhiên: đậu tương ta lòng xanh rang chín, nếp cái hoa vàng ủ mốc hoa cau, muối biển hầm sạch và nước giếng khơi tinh khiết. Cậu chỉ cần để tương nơi khô thoáng, đậy kín nắp sau khi múc là để cả năm tương càng sánh thơm đậm đà nha! ✨';
    }

    return res.json({ success: true, reply: fallbackReply });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      success: false, 
      reply: 'Dạ hiện hệ thống đang bận một chút, bạn vui lòng liên hệ hotline 0988 567 892 để được hỗ trợ tức thì nhé!' 
    });
  }
});

// Configure Vite middleware in dev or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
