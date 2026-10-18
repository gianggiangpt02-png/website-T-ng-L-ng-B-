import { SanPham, OrderSubmissionPayload } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

export async function fetchProducts(): Promise<SanPham[]> {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Không thể tải danh sách sản phẩm');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    console.warn('API error or server offline, using local verified products dataset:', error);
    return INITIAL_PRODUCTS;
  }
}

export async function createOrder(payload: OrderSubmissionPayload) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Network error during createOrder:', error);
    // If backend isn't available, provide realistic feedback
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ nhận đơn. Vui lòng kiểm tra kết nối mạng hoặc liên hệ hotline 0988 567 892.'
    };
  }
}

export async function sendChatMessage(message: string, history: Array<{ role: string; content: string }>) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      success: true,
      reply: 'Dạ chào bạn, Tương Làng Bợ rất vui được đón tiếp bạn. Bạn có thể cho mình biết bạn đang tìm hiểu dòng tương nếp 500ml dùng thử hay tương hũ sành 2 lít ạ?'
    };
  }
}
