
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryPreview from '../components/CategoryPreview';
import SoftIntentPopup from '../components/SoftIntentPopup';
import OfferStrip from '../components/OfferStrip';
import LifestyleVideo from '../components/LifestyleVideo';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { fetchProducts } from '../services/productService'; // Updated import
import gsap from 'gsap';
import { ArrowUpRight, Loader2 } from 'lucide-react';

const TabbedMerchandising = ({ wishlist, onToggleWishlist }: { wishlist: Product[], onToggleWishlist: (p: Product) => void }) => {
  const [activeTab, setActiveTab] = useState<'best' | 'new'>('best');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const bestSellers = products.filter(p => p.featured).slice(0, 8);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  const displayProducts = activeTab === 'best' ? bestSellers : newArrivals;

  useEffect(() => {
    if (gridRef.current && !loading) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }
      );
    }
  }, [activeTab, loading]);

  if (loading) {
    return (
      <section className="py-32 bg-stone-50/50 flex justify-center">
        <Loader2 className="animate-spin text-stone-300" />
      </section>
    );
  }

  return (
    <section className="py-16 md:py-32 bg-stone-50/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-8">
          <div className="flex items-center gap-8 md:gap-16 border-b border-stone-100 w-full md:w-auto">
            <button onClick={() => setActiveTab('best')} className={`relative pb-4 transition-all ${activeTab === 'best' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-black block mb-2">Heritage</span>
              <h2 className="text-2xl md:text-6xl font-serif text-stone-900">Best Sellers</h2>
              <div className={`absolute bottom-0 left-0 h-[3px] bg-stone-900 transition-all duration-500 ${activeTab === 'best' ? 'w-full' : 'w-0'}`} />
            </button>
            <button onClick={() => setActiveTab('new')} className={`relative pb-4 transition-all ${activeTab === 'new' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-black block mb-2">Modernity</span>
              <h2 className="text-2xl md:text-6xl font-serif text-stone-900">New Arrivals</h2>
              <div className={`absolute bottom-0 left-0 h-[3px] bg-stone-900 transition-all duration-500 ${activeTab === 'new' ? 'w-full' : 'w-0'}`} />
            </button>
          </div>
          <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-3 group">
            View Archive <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {displayProducts.map((product) => (
            <div key={`${activeTab}-${product.id}`}>
              <ProductCard 
                product={product} 
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC<{ wishlist: Product[], onToggleWishlist: (p: Product) => void }> = ({ wishlist, onToggleWishlist }) => {
  return (
    <div className="overflow-hidden bg-white">
      <Hero />
      <OfferStrip />
      
      {/* Primary Emotional Entry Point */}
      <CategoryPreview />
      
      <TabbedMerchandising wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
      
      <OfferStrip />
      
      <LifestyleVideo />

      {/* Repurposed Brand Storytelling Section (Non-Interactive) */}
      <section className="py-16 md:py-32 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
           <div className="relative aspect-[3/4] xs:aspect-square md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
                className="w-full h-full object-cover scale-105" 
                alt="Atmosphere" 
              />
              <div className="absolute inset-0 bg-stone-900/40 flex flex-col items-center justify-center text-center p-8">
                 <h3 className="text-white text-3xl md:text-8xl font-serif max-w-3xl leading-none mb-6 md:mb-8 tracking-tighter">
                   Architecture <br /> <span className="italic font-light opacity-60">of Comfort</span>
                 </h3>
                 <div className="w-12 h-px bg-white/30" />
                 <p className="mt-6 text-white/60 text-[10px] uppercase tracking-[0.5em] font-black">A Balajee Traders Heritage Perspective</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final Heritage Statement */}
      <section className="py-24 md:py-56 px-6 md:px-12 bg-white flex flex-col items-center text-center">
        <div className="max-w-5xl space-y-12 md:space-y-16">
           <div className="w-16 h-[2px] bg-stone-100 mx-auto" />
           <blockquote className="text-3xl md:text-7xl font-serif leading-[1.1] text-stone-900 italic font-light tracking-tight">
             "Design is the silent dialogue <br className="hidden md:block" /> between space and soul."
           </blockquote>
           <p className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-stone-300 font-black">Balajee Traders Heritage Statement</p>
        </div>
      </section>

      <SoftIntentPopup />
    </div>
  );
};

export default Home;
