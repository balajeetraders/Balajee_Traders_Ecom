
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartItem, Product } from './types';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

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
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
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

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        <main className="flex-grow pb-20 lg:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Mobile Navigation */}
        <BottomNav cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </Router>
  );
};

export default App;
