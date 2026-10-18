import { SanPham, Article } from '../types';

export const INITIAL_PRODUCTS: SanPham[] = [
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

export const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Tuyển chọn đậu tương & rang chín đều',
    desc: 'Đỗ mua về đãi sạch được rang thơm chín rồi xay nhuyễn, thêm nước sôi để nguội ủ trong 10 ngày. Khi rang đỗ phải rang làm sao cho hạt đỗ chín đều từ trong ra bên ngoài, tránh hiện tượng hạt bên trong còn trắng mà bên ngoài vàng sẽ làm tương bị chua.',
    highlight: 'Đỗ tương rang thơm ngậy tự nhiên',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/Phoi-tuong.jpg'
  },
  {
    step: '02',
    title: 'Nấu xôi nếp & ủ mốc vàng hoa cau',
    desc: 'Gạo chọn lọc kỹ loại gạo thật ngon, ngâm khoảng 8 - 9 tiếng rồi cho vào xôi chín. Xôi xong đổ ra các nong, trải đều để nguội rồi đem dãi nong cho thật tơi. Dùng 2 nong úp lại ủ kín trong 3 ngày đến 1 tuần cho lên mốc vàng tươi hoa cau.',
    highlight: 'Men mốc hoa cau bí truyền',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/phoi-moc.jpg'
  },
  {
    step: '03',
    title: 'Ngả đỗ vào chum sành trộn cùng gạo nếp',
    desc: 'Sau khi gạo ủ mốc đạt chuẩn, chuyển mốc ra chum sành Hương Canh/Bát Tràng trộn cùng đỗ tương đã ngâm nước muối sạch theo tỷ lệ gia truyền 10kg gạo : 2kg muối biển.',
    highlight: 'Chum sành nung củi truyền thống',
    image: 'https://tuonglangbo.com/wp-content/uploads/sites/1009/2022/03/9bacd70ee713284d71022-370x265.jpg'
  },
  {
    step: '04',
    title: 'Phơi nắng tự nhiên và khuấy tương đều tay',
    desc: 'Tương cho vào chum phơi nắng ít nhất từ 20 ngày đến 6 tháng. Hằng ngày mở nắp chum đón nắng sớm, nghệ nhân dùng đũa khuấy đều tay để tương lên men đều. Càng phơi nhiều nắng thì tương càng thơm ngon và ngả màu đỏ cánh gián.',
    highlight: 'Đón nắng mai & hấp thụ khí trời',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/SP-tuong.jpg'
  },
  {
    step: '05',
    title: 'Thẩm định chất lượng & đóng chai thành phẩm',
    desc: 'Khi tương sánh mịn, dậy mùi thơm ngọt bùi béo ngậy, tương được chiết rót vào các chai 500ml (30.000 đ), chai 1 lít (60.000 đ), chai đặc biệt và dán tem OCOP 3 sao trước khi gửi tới tay người tiêu dùng.',
    highlight: 'Đóng chai nhãn mác OCOP 3 sao',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/sp-moi.jpg'
  }
];

export const BRAND_ARTICLES: Article[] = [
  {
    id: 'tin-1',
    title: 'Tương làng Bợ - Đặc sản nức tiếng vùng quê Thanh Thủy',
    category: 'Văn hóa ẩm thực',
    date: 'Tháng 10/2020',
    readTime: '5 phút đọc',
    excerpt: '“Nhất kinh kỳ, nhì Bợ Bạt” là câu ca truyền miệng nói về làng Bợ xa xưa nổi tiếng trên bến, dưới thuyền, trong đó có nghề làm tương truyền đời.',
    content: 'Làng Bợ (xã Đào Xá, tỉnh Phú Thọ) với gần 400 hộ dân, nghề làm tương đã có ở nơi đây từ nhiều đời cha truyền con nối. Năm 2019, HTX Tương làng Bợ được chứng nhận là Sản phẩm công nghiệp nông thôn tiêu biểu cấp tỉnh và được chứng nhận sản phẩm đạt 3 sao OCOP tỉnh Phú Thọ tháng 10 năm 2020. Tương làng Bợ càng để lâu càng đỏ, càng thơm ngon, ngọt bùi, là thứ nước chấm không thể thiếu khi ăn bánh đúc, rau muống luộc, thịt bê, cà muối và kho cá.',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/SP-tuong.jpg'
  },
  {
    id: 'tin-2',
    title: 'Du khách về thăm làng Bợ & trải nghiệm nghề làm tương',
    category: 'Du lịch trải nghiệm',
    date: '12/10/2026',
    readTime: '4 phút đọc',
    excerpt: 'Du khách đến với Thanh Thủy vui chơi tại Đảo Ngọc Xanh, Vườn Vua resort thường ghé làng Bợ để tham quan sân phơi chum sành và mua tương làm quà.',
    content: 'Nghề làm tương ở làng Bợ không chỉ giúp người dân địa phương nâng cao thu nhập mà còn là điểm nhấn quảng bá văn hóa ẩm thực độc đáo. Những hàng chum sành nâu sẫm phơi đều tăm tắp dưới nắng vàng, mùi thơm ngọt ngào của mốc nếp hoa cau và đậu rang lan tỏa khắp các ngõ xóm. Du khách về đây được tự tay mở vung chum nếm thử từng thìa tương sóng sánh, mua những chai tương 500ml nhỏ gọn hay những gói quà biếu chỉn chu mang về biếu gia đình.',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/trung-bay.jpg'
  },
  {
    id: 'tin-3',
    title: 'Bí quyết món cá chép kho tương làng Bợ chuẩn vị mẹ nấu',
    category: 'Mẹo kho nấu',
    date: '08/10/2026',
    readTime: '3 phút đọc',
    excerpt: 'Vị béo ngậy ngọt đượm từ đậu tương rang chín tới giúp thịt cá chép sông Đà săn chắc, ngọt thơm nức mũi.',
    content: 'Để có niêu cá chép kho tương ngon chuẩn vị, chọn cá chép sông tươi rói làm sạch, ướp cùng 3 muỗng canh Tương làng Bợ (chai 500ml hoặc 1 lít), vài lát gừng tươi, riềng đập dập và chút ớt hiểm. Lót mía hoặc cuộng riềng dưới đáy nồi đất, đun nhỏ lửa liu riu cho đến khi nước tương cô lại sánh vàng. Thịt cá ngấm trọn vị tương béo ngậy, thơm lừng gian bếp, ăn cùng cơm trắng nóng hổi trong những ngày mát trời thì không gì sánh bằng.',
    image: 'https://dulichtaybac.vn/wp-content/uploads/2021/07/khach-1.jpg'
  }
];
