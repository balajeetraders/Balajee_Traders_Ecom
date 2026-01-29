
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X, SlidersHorizontal, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { PRODUCTS, CATEGORIES, MATERIALS, ROOMS } from '../constants';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoryFilter = searchParams.get('category') || 'All';
  const materialFilter = searchParams.get('material') || 'All';
  const roomFilter = searchParams.get('room') || 'All';
  const priceRange = searchParams.get('price') || 'All';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchMaterial = materialFilter === 'All' || p.material === materialFilter;
      const matchRoom = roomFilter === 'All' || p.room === roomFilter;
      
      let matchPrice = true;
      if (priceRange === '0-500') matchPrice = p.price <= 500;
      else if (priceRange === '500-1500') matchPrice = p.price > 500 && p.price <= 1500;
      else if (priceRange === '1500+') matchPrice = p.price > 1500;

      return matchCategory && matchMaterial && matchRoom && matchPrice;
    });
  }, [categoryFilter, materialFilter, roomFilter, priceRange]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [categoryFilter, materialFilter, roomFilter, priceRange]);

  useEffect(() => {
    if (gridRef.current && !isLoading) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [filteredProducts, isLoading]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All') newParams.delete(key);
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => setSearchParams(new URLSearchParams());

  return (
    <div className="pt-24 pb-32 md:pt-32 md:pb-40 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Functional Catalog</span>
            <h1 className="text-5xl md:text-8xl font-serif text-stone-900 leading-none">
              Shop <span className="italic font-light opacity-50">All</span>
            </h1>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4">
            <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest">{filteredProducts.length} Pieces found</span>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Applied Filters Chips */}
        {searchParams.size > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-top-2">
             {Array.from(searchParams.entries()).map(([key, val]) => (
               <button 
                key={key} 
                onClick={() => updateFilter(key, 'All')}
                className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-stone-900"
               >
                 {val} <X size={10} />
               </button>
             ))}
             <button onClick={clearAllFilters} className="text-[10px] font-black uppercase tracking-widest text-stone-300 ml-2 hover:text-stone-900 transition-colors">Reset</button>
          </div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-stone-50 rounded-2xl" />
                <div className="h-4 w-3/4 bg-stone-50 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={product.name} 
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-900 shadow-sm">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-6 space-y-1">
                    <h3 className="text-sm md:text-lg font-serif text-stone-900 truncate">{product.name}</h3>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-stone-300">{product.category}</span>
                      <span className="text-xs md:text-base font-bold text-stone-900">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-6">
            <h2 className="text-4xl font-serif text-stone-200">No matches found</h2>
            <button onClick={clearAllFilters} className="px-10 py-4 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Clear All Selections</button>
          </div>
        )}
      </div>

      {/* Filter Modal / Bottom Sheet */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
        <div className={`absolute bottom-0 md:top-0 md:right-0 h-[80vh] md:h-full w-full md:max-w-md bg-white rounded-t-[3rem] md:rounded-none shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isFilterOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}`}>
          <div className="p-8 flex items-center justify-between border-b border-stone-50">
            <h2 className="text-2xl font-serif">Refine Collection</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors"><X size={24} /></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-8 space-y-10 no-scrollbar">
            <FilterSection title="Category" items={CATEGORIES} active={categoryFilter} onSelect={(v) => updateFilter('category', v)} />
            <FilterSection title="Room" items={ROOMS.map(r => r.type)} active={roomFilter} onSelect={(v) => updateFilter('room', v)} />
            <FilterSection title="Investment" items={['0-500', '500-1500', '1500+']} active={priceRange} onSelect={(v) => updateFilter('price', v)} />
          </div>

          <div className="p-8 bg-stone-50">
             <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-stone-900 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl"
             >
              View Results
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, items, active, onSelect }: any) => (
  <div className="space-y-4">
    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-300">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {['All', ...items].map((item: string) => (
        <button 
          key={item}
          onClick={() => onSelect(item)}
          className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
            active === item ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-900 border-stone-100 hover:border-stone-900'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default Shop;
