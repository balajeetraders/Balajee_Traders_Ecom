
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';

const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'best' | 'new'>('best');
  const [products, setProducts] = useState<Product[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadData();
  }, []);
  
  const displayProducts = activeTab === 'best' 
    ? products.filter(p => p.featured).slice(0, 9) 
    : products.filter(p => p.newArrival).slice(0, 9);

  useEffect(() => {
    if (products.length > 0) {
      gsap.fromTo('.product-card-wrapper', 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [activeTab, products]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      perspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  if (products.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Tabbed Header */}
        <div className="flex justify-center items-center gap-12 mb-20">
          <button 
            onClick={() => setActiveTab('best')}
            className={`text-2xl md:text-3xl font-medium pb-2 transition-all relative ${
              activeTab === 'best' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Best sellers
            {activeTab === 'best' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`text-2xl md:text-3xl font-medium pb-2 transition-all relative ${
              activeTab === 'new' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            New arrivals
            {activeTab === 'new' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900"></span>}
          </button>
        </div>

        {/* Product Grid - 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card-wrapper perspective-1000"
            >
              <Link to={`/product/${product.id}`} className="block group">
                <div 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-neutral-100 shadow-xl transition-all duration-300 group-hover:shadow-2xl will-change-transform"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphism Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-xl font-serif text-white mb-1">
                      {product.name}
                    </h4>
                    <span className="text-white/80 font-medium">₹{product.price.toLocaleString()}</span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-8 left-8">
                    {(product.newArrival || product.featured) && (
                      <div className="bg-[#4ade80] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {product.newArrival ? 'NEW' : 'BEST'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Fallback Text for Mobile/Non-hover */}
                <div className="mt-6 md:hidden text-center">
                  <h4 className="text-lg font-serif text-stone-800">{product.name}</h4>
                  <span className="text-stone-500 font-medium">₹{product.price.toLocaleString()}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-24 text-center">
          <Link 
            to="/shop" 
            className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all transform hover:scale-105 active:scale-95"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
