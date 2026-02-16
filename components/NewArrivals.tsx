
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';

const NewArrivals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadData();
  }, []);

  const items = products.filter(p => p.newArrival).slice(0, 3);

  useEffect(() => {
    if (items.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.reveal-item', {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Main Editorial Text */}
          <div className="md:col-span-5 space-y-8 sticky top-32 reveal-item">
            <h2 className="text-neutral-400 text-sm uppercase tracking-[0.4em] font-medium">Fresh Palette</h2>
            <h3 className="text-5xl md:text-7xl font-serif leading-tight">New Autumn <br /> <span className="italic">Curation</span></h3>
            <p className="text-neutral-600 leading-relaxed max-w-sm">
              Discover our latest collection where modern brutalism meets organic comfort. Each piece is curated to bring balance and serenity to your living spaces.
            </p>
            <div className="pt-4">
               <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 hover:text-neutral-500 hover:border-neutral-300 transition-all">
                  Browse All New Arrivals
               </Link>
            </div>
          </div>

          {/* Asymmetrical Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {items.map((product, idx) => (
              <div 
                key={product.id} 
                className={`reveal-item ${idx === 0 ? 'sm:col-span-2' : ''} ${idx === 1 ? 'sm:mt-24' : ''}`}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className={`overflow-hidden relative bg-neutral-200 ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-black text-white px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest">
                       New
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-serif group-hover:translate-x-1 transition-transform">{product.name}</h4>
                      <p className="text-neutral-400 text-sm italic">{product.material}</p>
                    </div>
                    <span className="text-lg font-serif italic">₹{product.price.toLocaleString()}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
