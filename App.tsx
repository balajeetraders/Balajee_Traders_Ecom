
import React, { useEffect, useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingActions from './components/FloatingAction';
import { CartItem, Product, Order } from './types';

// ── Protected Route ─────────────────────────────────────────────────────────
// Shows spinner → redirects to /account (login) → or renders children
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/account" replace />;

  return <>{children}</>;
};


gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Hook for dynamic rendering based on viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders are now managed via Supabase in the Orders page directly, 
  // but we keep the callback to clear the cart.
  const [isCartOpen, setIsCartOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const addToCart = (product: Product & { selectedColor?: string, selectedSize?: string, quantity?: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) =>
        item.id === product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 } as CartItem];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleOrderPlaced = (newOrder: Order) => {
    // We only need to clear the cart now, as orders are fetched from DB
    setCart([]);
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar
          cartCount={cart.length}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<Shop wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout cart={cart} onPlaceOrder={handleOrderPlaced} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
          </Routes>
        </main>
        <Footer />
        {/* Dynamic Rendering: Only render BottomNav on mobile devices to reduce DOM weight on desktop */}
        {isMobile && (
          <BottomNav cartCount={cart.length} wishlistCount={wishlist.length} onOpenCart={() => setIsCartOpen(true)} />
        )}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={(id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i))}
          onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))}
        />
        <FloatingActions />
      </Router>
    </AuthProvider>
  );
};

export default App;
