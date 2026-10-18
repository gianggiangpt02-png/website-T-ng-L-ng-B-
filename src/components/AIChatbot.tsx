import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Heart, RefreshCw } from 'lucide-react';
import { sendChatMessage } from '../services/api';

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onExploreProducts?: () => void;
  onExploreOcop?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onToggle,
  onExploreProducts,
  onExploreOcop
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Ui chao! Bé Chum Bợ chào cậu nha~ (≧◡≦) ♡\n\nBé là trợ lý nhỏ xíu của Tương Làng Bợ Đất Tổ nè! Cậu đang muốn tìm tương chấm rau muống luộc, kho cá sông thơm lừng, hay muốn xem chứng nhận OCOP thì cứ hỏi Bé nha!',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cuteQuickQuestions = [
    '🍯 Tương Làng Bợ giá bao nhiêu nè?',
    '🐟 Kho cá chép dùng tương nào ngon nhất?',
    '🏅 Tương có đạt chuẩn OCOP không Bé?',
    '📦 Ship về tận nhà mất bao lâu ạ?',
    '✨ Bí quyết bảo quản tương thơm lâu?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowBubble(false);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const res = await sendChatMessage(text, historyPayload);

      // Cute polishing of response
      let botReplyText = res.reply || '';
      if (!botReplyText.includes('Bé Chum') && !botReplyText.includes('cậu')) {
        botReplyText = `Dạ Bé Chum mách cậu nè~ ✨\n\n${botReplyText}\n\nCậu cần Bé hỗ trợ thêm gì nữa hông nè? ♡`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'Dạ đường truyền của Bé Chum hơi bị gió sông Đà thổi bay chút xíu rồi ~(>_<~) Cậu nhắn lại hoặc gọi hotline 0988 567 892 cho các cô chú nghệ nhân nha!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Cute Mascot SVG Component
  const CuteMascotSvg = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chum Body */}
      <ellipse cx="50" cy="58" rx="38" ry="32" fill="#8A4B2A" />
      <ellipse cx="50" cy="56" rx="34" ry="28" fill="#6B321C" />
      <path d="M26 42 C 34 36, 66 36, 74 42" stroke="#DDA33A" strokeWidth="3" strokeLinecap="round" />
      {/* Conical Straw Hat (Nón Lá) */}
      <polygon points="50,6 18,36 82,36" fill="#F2C96D" stroke="#DDA33A" strokeWidth="2.5" />
      <polygon points="50,14 26,36 74,36" fill="#FFF8E9" opacity="0.4" />
      {/* Cute Eyes */}
      <circle cx="40" cy="54" r="4.5" fill="#FFF8E9" />
      <circle cx="41.5" cy="53" r="2" fill="#432A1D" />
      <circle cx="43" cy="52" r="1" fill="#FFF" />
      <circle cx="60" cy="54" r="4.5" fill="#FFF8E9" />
      <circle cx="61.5" cy="53" r="2" fill="#432A1D" />
      <circle cx="63" cy="52" r="1" fill="#FFF" />
      {/* Blushing Cheeks */}
      <ellipse cx="33" cy="61" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.85" />
      <ellipse cx="67" cy="61" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.85" />
      {/* Sweet Smile */}
      <path d="M46 62 Q 50 67 54 62" stroke="#FFF8E9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Little Honey Sparkle */}
      <circle cx="68" cy="46" r="3" fill="#DDA33A" />
    </svg>
  );

  return (
    <>
      {/* Floating Trigger Button with Cute Mascot & Greeting Bubble */}
      {!isOpen && (
        <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex items-end gap-3">
          {showBubble && (
            <div
              onClick={onToggle}
              className="hidden sm:flex items-center gap-2.5 bg-[#FFF8E9] px-4 py-2.5 rounded-2xl shadow-xl border-2 border-[#DDA33A] text-xs font-semibold text-[#432A1D] cursor-pointer hover:scale-103 transition-transform animate-bounce duration-1000"
            >
              <span className="text-base">🍯</span>
              <span>Cậu ơi! Cần Bé Chum chỉ chỗ tương ngon hông? ✨</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="text-[#79695B] hover:text-black ml-1 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={onToggle}
            aria-label="Trò chuyện cùng Bé Chum Bợ"
            className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8A4B2A] to-[#6B321C] text-[#FFF8E9] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#F2C96D] cursor-pointer"
          >
            <CuteMascotSvg className="w-12 h-12 transition-transform group-hover:rotate-6" />
            
            {/* Cute Notification Heart Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DDA33A] text-[#432A1D] rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
              ♥
            </span>
          </button>
        </div>
      )}

      {/* Cute Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[580px] max-h-[88vh] bg-[#FFF8E9] rounded-3xl shadow-2xl border-2 border-[#E5D1B5] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header with Cute Mascot */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#6B321C] via-[#8A4B2A] to-[#6B321C] text-[#FFF8E9] flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF8E9] p-1 flex items-center justify-center shadow-inner border border-[#DDA33A]">
                <CuteMascotSvg className="w-9 h-9" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-bold leading-none text-[#FFF8E9]">
                    Bé Chum Bợ
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#DDA33A] text-[#432A1D] text-[10px] font-extrabold">
                    AI CUTE
                  </span>
                </div>
                <span className="text-[11px] text-[#F2C96D] flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Đang online vui vẻ bên chum tương 🍯
                </span>
              </div>
            </div>

            <button
              onClick={onToggle}
              aria-label="Thu nhỏ chat"
              className="p-2 text-[#FFF8E9]/80 hover:text-[#FFF8E9] hover:bg-[#8A4B2A] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FFF8E9] scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#FFF8E9] border border-[#E5D1B5] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <CuteMascotSvg className="w-6 h-6" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#6B321C] text-[#FFF8E9] rounded-tr-none shadow-xs'
                      : 'bg-[#F5E8D0] text-[#432A1D] border border-[#E5D1B5] rounded-tl-none whitespace-pre-line shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1.5 text-right ${
                      m.sender === 'user' ? 'text-[#FFF8E9]/70' : 'text-[#79695B]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-[#79695B] bg-[#F5E8D0]/80 p-3 rounded-2xl w-fit shadow-xs">
                <CuteMascotSvg className="w-5 h-5 animate-spin" />
                <span>Bé Chum đang nghĩ câu trả lời cute cho cậu nè...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Cute Quick Suggestions */}
          <div className="px-3 py-2 bg-[#F5E8D0]/60 border-t border-[#E5D1B5] flex gap-2 overflow-x-auto scrollbar-none shrink-0">
            {cuteQuickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full bg-[#FFF8E9] border border-[#E5D1B5] hover:border-[#DDA33A] text-xs font-medium text-[#6B321C] hover:bg-[#FFF8E9] whitespace-nowrap shrink-0 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-3 bg-[#FFF8E9] border-t border-[#E5D1B5] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Hỏi Bé Chum về tương nếp, OCOP, kho cá..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#FFF8E9] border border-[#E5D1B5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#DDA33A] text-[#432A1D] placeholder-[#79695B]/70"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                aria-label="Gửi tin nhắn"
                className="p-3 rounded-2xl bg-[#6B321C] text-[#FFF8E9] hover:bg-[#8A4B2A] transition-all disabled:opacity-50 shrink-0 shadow-md cursor-pointer active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
