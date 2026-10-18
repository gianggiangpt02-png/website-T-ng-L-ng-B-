import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopCategoryNav, CategoryKey } from './components/TopCategoryNav';
import { HeroSection } from './components/HeroSection';
import { BrandValues } from './components/BrandValues';
import { BrandStory } from './components/BrandStory';
import { ProductSection } from './components/ProductSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductionTimeline } from './components/ProductionTimeline';
import { VillageCulture } from './components/VillageCulture';
import { NewsSection } from './components/NewsSection';
import { ArticleModal } from './components/ArticleModal';
import { OcopSection } from './components/OcopSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIChatbot } from './components/AIChatbot';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { DataIntegrationModal } from './components/DataIntegrationModal';
import { SanPham, CartItem, Article } from './types';
import { INITIAL_PRODUCTS, BRAND_ARTICLES } from './data/mockData';
import { fetchProducts } from './services/api';
import { ArrowRight, Award, ShieldCheck, ShoppingBag, BookOpen, Sun, Sparkles } from 'lucide-react';

export function App() {
  const [products, setProducts] = useState<SanPham[]>(INITIAL_PRODUCTS);
  const [articles] = useState<Article[]>(BRAND_ARTICLES);

  // Exact 6 Categories State: 'trang-chu' | 'san-pham' | 'cau-chuyen' | 'quy-trinh' | 'ocop' | 'lien-he'
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('trang-chu');

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tuong_lang_bo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);

  // Active selections
  const [selectedProduct, setSelectedProduct] = useState<SanPham | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tuong_lang_bo_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Fetch verified products on mount
  useEffect(() => {
    fetchProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (product: SanPham, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.MaSP === product.MaSP);
      if (existing) {
        return prevCart.map((item) =>
          item.product.MaSP === product.MaSP
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    showToast(`Đã thêm ${quantity} x ${product.TenSP} vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.MaSP === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.MaSP !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleQuickCheckout = (product: SanPham, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  // Category switch handler: switches content view immediately (not scrolling down)
  const handleSelectCategory = (cat: CategoryKey) => {
    setActiveCategory(cat);
    // Smooth reset scroll to top of content view
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#432A1D]">
      {/* Toast message notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-[#6B321C] text-[#FFF8E9] px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-medium border border-[#DDA33A] animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCartCount}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiChat={() => setIsChatbotOpen(true)}
      />

      {/* Top Category Navigation Bar with 6 requested tabs */}
      <TopCategoryNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        productCount={products.length}
      />

      {/* Main Content Area: Renders the exact content of the selected category */}
      <main className="flex-1 animate-in fade-in duration-200">
        {/* TAB 1: TRANG CHỦ */}
        {activeCategory === 'trang-chu' && (
          <div>
            <HeroSection
              onExploreProducts={() => handleSelectCategory('san-pham')}
              onExploreStory={() => handleSelectCategory('cau-chuyen')}
            />

            <BrandValues />

            {/* Home Teaser: Featured Products */}
            <section className="py-16 sm:py-20 bg-[#FFF8E9]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8A4B2A] font-semibold block mb-1">
                      ĐẶC SẢN NỔI BẬT
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#432A1D] font-bold">
                      Các dòng tương nếp Làng Bợ ủ nắng
                    </h2>
                  </div>
                  <button
                    onClick={() => handleSelectCategory('san-pham')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6B321C] hover:text-[#8A4B2A] transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Xem tất cả sản phẩm ({products.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div
                      key={p.MaSP}
                      onClick={() => setSelectedProduct(p)}
                      className="group cursor-pointer rounded-2xl bg-[#FFF8E9] border border-[#E5D1B5] overflow-hidden hover:border-[#DDA33A] hover:shadow-md transition-all p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F5E8D0] mb-3">
                          <img
                            src={p.HinhAnh}
                            alt={p.TenSP}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[11px] text-[#79695B] font-medium block mb-1">
                          {p.DungTich} · {p.PhanLoai}
                        </span>
                        <h3 className="font-serif text-sm font-bold text-[#432A1D] group-hover:text-[#6B321C] line-clamp-2">
                          {p.TenSP}
                        </h3>
                      </div>
                      <div className="pt-3 border-t border-[#E5D1B5]/60 flex items-center justify-between mt-3">
                        <span className="font-serif text-base font-bold text-[#6B321C] tabular-nums">
                          {new Intl.NumberFormat('vi-VN').format(p.Gia)}₫
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(p, 1);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#6B321C] text-[#FFF8E9] text-xs font-semibold hover:bg-[#8A4B2A]"
                        >
                          Thêm giỏ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Home Teaser: OCOP & Heritage Banner */}
            <section className="py-14 bg-[#F5E8D0]/60 border-y border-[#E5D1B5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8A4B2A] uppercase">
                      <Award className="w-4 h-4 text-[#DDA33A]" />
                      <span>ĐẠT CHUẨN CHỨNG NHẬN OCOP TỈNH PHÚ THỌ</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#432A1D]">
                      Hương vị truyền thống gìn giữ trọn vẹn chất lượng
                    </h3>
                    <p className="text-sm text-[#79695B] leading-relaxed">
                      Tương Làng Bợ được ủ trong chum sành phơi nắng ròng rã suốt 6 tháng, 100% nguyên liệu tự nhiên không chất bảo quản, đạt chuẩn an toàn thực phẩm OCOP Đất Tổ.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-wrap gap-3 justify-start lg:justify-end">
                    <button
                      onClick={() => handleSelectCategory('ocop')}
                      className="px-5 py-2.5 rounded-xl bg-[#6B321C] hover:bg-[#8A4B2A] text-[#FFF8E9] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Xem chứng nhận OCOP
                    </button>
                    <button
                      onClick={() => handleSelectCategory('quy-trinh')}
                      className="px-5 py-2.5 rounded-xl bg-[#FFF8E9] border border-[#E5D1B5] hover:bg-[#F5E8D0] text-[#432A1D] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                    >
                      Xem quy trình 5 bước
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: SẢN PHẨM */}
        {activeCategory === 'san-pham' && (
          <div className="animate-in fade-in duration-300">
            <ProductSection
              products={products}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onViewDetail={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* TAB 3: CÂU CHUYỆN */}
        {activeCategory === 'cau-chuyen' && (
          <div className="animate-in fade-in duration-300 space-y-12">
            <BrandStory onLearnMore={() => handleSelectCategory('san-pham')} />
            <VillageCulture />
            <NewsSection onSelectArticle={(a) => setSelectedArticle(a)} />
          </div>
        )}

        {/* TAB 4: QUY TRÌNH */}
        {activeCategory === 'quy-trinh' && (
          <div className="animate-in fade-in duration-300">
            <ProductionTimeline />
          </div>
        )}

        {/* TAB 5: CHỨNG NHẬN OCOP */}
        {activeCategory === 'ocop' && (
          <div className="animate-in fade-in duration-300">
            <OcopSection onExploreProducts={() => handleSelectCategory('san-pham')} />
          </div>
        )}

        {/* TAB 6: LIÊN HỆ */}
        {activeCategory === 'lien-he' && (
          <div className="animate-in fade-in duration-300">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenIntegrationModal={() => setIsIntegrationModalOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Cute Smart AI Chatbot "Bé Chum Bợ" */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onExploreProducts={() => {
          setIsChatbotOpen(false);
          handleSelectCategory('san-pham');
        }}
        onExploreOcop={() => {
          setIsChatbotOpen(false);
          handleSelectCategory('ocop');
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onQuickCheckout={handleQuickCheckout}
      />

      {/* Article Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        articles={articles}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectArticle={(a) => setSelectedArticle(a)}
      />

      {/* Data Integration Modal for Google Sheets */}
      <DataIntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />
    </div>
  );
}

export default App;
