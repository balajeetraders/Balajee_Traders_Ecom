
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Heart, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface WishlistProps {
  wishlist: Product[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (product: Product & { selectedColor?: string; selectedSize?: string; quantity?: number }) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlist, onToggleWishlist, onAddToCart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insectRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wish-reveal', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      if (insectRef.current) {
        gsap.to(insectRef.current, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [wishlist.length]);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert("Please sign in to shop.");
      navigate('/account');
      return;
    }
    onAddToCart({ ...product, quantity: 1 });
  };

  return (
    <div ref={containerRef} className="pt-24 pb-32 md:pt-40 md:pb-40 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4 wish-reveal">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Curated Pieces</span>
            <h1 className="text-5xl md:text-8xl font-serif text-stone-900 leading-none">
              Your <span className="italic font-light opacity-50">Wishlist</span>
            </h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="py-20 md:py-32 flex flex-col items-center justify-center text-center space-y-12 wish-reveal">
              <div ref={insectRef} className="relative w-32 h-32 md:w-48 md:h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full text-stone-900">
                  <ellipse cx="100" cy="110" rx="40" ry="30" fill="currentColor" opacity="0.1" />
                  <circle cx="100" cy="100" r="35" fill="currentColor" />
                  <path d="M85 70 Q70 40 50 50" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M115 70 Q130 40 150 50" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="85" cy="90" r="4" fill="white" />
                  <circle cx="115" cy="90" r="4" fill="white" />
                  <path d="M80 82 Q85 80 90 82" fill="none" stroke="white" strokeWidth="1.5" />
                  <path d="M110 82 Q115 80 120 82" fill="none" stroke="white" strokeWidth="1.5" />
                  <path d="M90 115 Q100 110 110 115" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M70 110 L50 120" stroke="currentColor" strokeWidth="2" />
                  <path d="M130 110 L150 120" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center shadow-lg border border-stone-100 rotate-12">
                  <Heart size={20} className="text-stone-200" />
                </div>
              </div>
              <div className="space-y-4 max-w-sm">
                <p className="text-xl md:text-2xl font-serif text-stone-900">"Nothing was on your wishlist..."</p>
                <p className="text-xs md:text-sm text-stone-400 italic leading-relaxed">Our scout is waiting to safeguard your architectural inspirations. Start exploring the collection.</p>
              </div>
              <Link to="/shop" className="px-12 py-5 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl">
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              <div className="flex items-center gap-8 bg-stone-50 p-8 rounded-[2.5rem] md:rounded-[3.5rem] wish-reveal border border-stone-100">
                <div ref={insectRef} className="w-24 h-24 md:w-32 md:h-32 shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-stone-900">
                    <circle cx="100" cy="110" r="45" fill="currentColor" opacity="0.1" />
                    <circle cx="100" cy="100" r="35" fill="currentColor" />
                    <path d="M85 70 Q70 30 60 40" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M115 70 Q130 30 140 40" fill="none" stroke="currentColor" strokeWidth="3" />
                    <circle cx="85" cy="90" r="6" fill="white" />
                    <circle cx="115" cy="90" r="6" fill="white" />
                    <circle cx="87" cy="88" r="2" fill="currentColor" />
                    <circle cx="117" cy="88" r="2" fill="currentColor" />
                    <path d="M85 110 Q100 125 115 110" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="70" cy="105" r="4" fill="#fb7185" opacity="0.6" />
                    <circle cx="130" cy="105" r="4" fill="#fb7185" opacity="0.6" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900">"You have selected like a pro!"</h3>
                  <p className="text-[10px] md:text-xs text-stone-400 uppercase tracking-widest font-black">Our scout has approved {wishlist.length} architectural pieces for your sanctuary.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 wish-reveal">
                {wishlist.map((product) => (
                  <div key={product.id} className="group space-y-6">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-stone-50 shadow-sm border border-stone-100">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                      <button onClick={() => onToggleWishlist(product)} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-900 shadow-xl hover:bg-stone-900 hover:text-white transition-all"><X size={16} /></button>
                    </div>
                    <div className="space-y-3 px-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-serif text-stone-900 leading-tight">{product.name}</h4>
                        <span className="text-sm font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                      </div>
                      <button onClick={() => handleAddToCart(product)} className="w-full py-4 border-2 border-stone-900 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-all">Add to Bag <ShoppingBag size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
