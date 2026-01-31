
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryShowcase from '../components/CategoryShowcase';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product }: { product: Product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(cardRef.current, {
        y: -10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        duration: 0.4,
        ease: 'power3.out'
      });
      hoverTl.to(imageRef.current, {
        scale: 1.08,
        duration: 0.6,
        ease: 'power2.out'
      }, 0);

      const onEnter = () => hoverTl.play();
      const onLeave = () => hoverTl.reverse();

      cardRef.current?.addEventListener('mouseenter', onEnter);
      cardRef.current?.addEventListener('mouseleave', onLeave);
      return () => {
        cardRef.current?.removeEventListener('mouseenter', onEnter);
        cardRef.current?.removeEventListener('mouseleave', onLeave);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const tapTl = gsap.timeline({ paused: true });
      tapTl.to(cardRef.current, {
        scale: 0.97,
        duration: 0.15,
        ease: 'power1.out'
      });

      const onStart = () => tapTl.play();
      const onEnd = () => tapTl.reverse();

      cardRef.current?.addEventListener('touchstart', onStart, { passive: true });
      cardRef.current?.addEventListener('touchend', onEnd, { passive: true });
      return () => {
        cardRef.current?.removeEventListener('touchstart', onStart);
        cardRef.current?.removeEventListener('touchend', onEnd);
      };
    });
  }, []);

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div 
        ref={cardRef} 
        className="bg-white rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-300 border border-stone-50"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
          <img 
            ref={imageRef}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-100" 
          />
          <div className="absolute top-3 right-3 md:top-6 md:right-6">
             <div className="w-8 h-8 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-900 shadow-xl hover:bg-stone-900 hover:text-white transition-colors">
                <ArrowUpRight size={14} className="md:w-[20px]" />
             </div>
          </div>
        </div>
        <div className="p-4 md:p-8 space-y-1">
          <h4 className="text-sm md:text-xl font-serif text-stone-900 truncate">{product.name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-[9px] md:text-[11px] font-black text-stone-300 uppercase tracking-[0.2em]">{product.category}</span>
            <span className="text-sm md:text-lg font-bold text-stone-900">${product.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TabbedMerchandising = () => {
  const [activeTab, setActiveTab] = useState<'best' | 'new'>('best');
  const gridRef = useRef<HTMLDivElement>(null);

  const bestSellers = PRODUCTS.filter(p => p.featured).slice(0, 9);
  const newArrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 4);

  const displayProducts = activeTab === 'best' ? bestSellers : newArrivals;

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }
      );
    }
  }, [activeTab]);

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Tab Toggle Interface */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-8">
          <div className="flex items-center gap-8 md:gap-16 border-b border-stone-100 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('best')}
              className={`relative pb-4 transition-all ${activeTab === 'best' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
            >
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-black block mb-2">Heritage</span>
              <h2 className="text-2xl md:text-6xl font-serif text-stone-900">Best Sellers</h2>
              <div className={`absolute bottom-0 left-0 h-[3px] bg-stone-900 transition-all duration-500 ${activeTab === 'best' ? 'w-full' : 'w-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              className={`relative pb-4 transition-all ${activeTab === 'new' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
            >
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-black block mb-2">Modernity</span>
              <h2 className="text-2xl md:text-6xl font-serif text-stone-900">New Arrivals</h2>
              <div className={`absolute bottom-0 left-0 h-[3px] bg-stone-900 transition-all duration-500 ${activeTab === 'new' ? 'w-full' : 'w-0'}`} />
            </button>
          </div>
          
          <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-3 group">
            View Archive <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
          {displayProducts.map((product) => (
            <div key={`${activeTab}-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white">
      {/* 1. Hero Experience */}
      <Hero />
      
      {/* 2. Merchandising Toggle (9 Best / 4 New) - NOW FIRST */}
      <TabbedMerchandising />

      {/* 3. Featured Taxonomy (Correct Position - NOW BELOW TABS) */}
      <CategoryShowcase />

      {/* 4. Immersive Lifestyle Scene */}
      <section className="py-16 md:py-32 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
           <div className="relative aspect-[3/4] xs:aspect-square md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[3000ms]" 
                alt="Atmosphere"
              />
              <div className="absolute inset-0 bg-stone-900/40 flex flex-col items-center justify-center text-center p-8">
                 <h3 className="text-white text-3xl md:text-8xl font-serif max-w-3xl leading-none mb-8 md:mb-12 tracking-tighter">Architecture <br /> <span className="italic font-light opacity-60">of Comfort</span></h3>
                 <Link to="/rooms" className="px-8 py-3 md:px-12 md:py-5 bg-white text-stone-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-stone-100 transition-all shadow-2xl active:scale-95">
                    Explore Spaces
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Curation Philosophy */}
      <section className="py-24 md:py-56 px-6 md:px-12 bg-white flex flex-col items-center text-center">
        <div className="max-w-5xl space-y-12 md:space-y-16">
           <div className="w-16 h-[2px] bg-stone-100 mx-auto" />
           <blockquote className="text-3xl md:text-7xl font-serif leading-[1.1] text-stone-900 italic font-light tracking-tight">
            "Design is the silent dialogue <br className="hidden md:block" /> between space and soul."
           </blockquote>
           <div className="space-y-3">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-stone-300 font-black">
                Balajee Traders Heritage Statement
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
