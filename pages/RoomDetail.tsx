
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ROOMS, PRODUCTS } from '../constants';

const RoomDetail: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const room = ROOMS.find(r => r.id === roomId);
  const roomProducts = PRODUCTS.filter(p => p.room === room?.type);
  const roomCategories = Array.from(new Set(roomProducts.map(p => p.category)));

  const filteredProducts = activeCategory 
    ? roomProducts.filter(p => p.category === activeCategory)
    : [];

  useEffect(() => {
    if (!room) return;
    const ctx = gsap.context(() => {
      gsap.from('.scene-content', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [room]);

  useEffect(() => {
    if (activeCategory && gridRef.current) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(1.2)' }
      );
    }
  }, [activeCategory]);

  if (!room) return null;

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Immersive Scene Header */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-stone-900">
         <img 
          src={room.image} 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          alt={room.type} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
         
         <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-between py-12 md:py-24">
            <button 
              onClick={() => navigate('/rooms')}
              className="scene-content flex items-center gap-2 text-white/60 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> All Portals
            </button>

            <div className="space-y-10">
               <div className="space-y-4">
                  <span className="scene-content text-[10px] uppercase tracking-[0.5em] font-black text-stone-400 block">Atmospheric Interior</span>
                  <h1 className="scene-content text-5xl md:text-[9vw] font-serif text-white leading-none tracking-tighter">
                     Explore <br /> <span className="italic font-light opacity-50">{room.type}</span>
                  </h1>
               </div>
               
               {/* Mobile Category Chips */}
               <div className="scene-content flex flex-wrap gap-3">
                  {roomCategories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                      className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                        activeCategory === cat 
                          ? 'bg-white text-stone-900 border-white shadow-2xl scale-105' 
                          : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Progressive Grid Reveal */}
      {activeCategory && (
        <section className="py-20 md:py-32 bg-[#fafafa] animate-in slide-in-from-bottom-10 duration-1000">
           <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-12 border-b border-stone-100 pb-10">
                 <h2 className="text-4xl font-serif text-stone-900">{activeCategory} <span className="italic font-light opacity-30">Selection</span></h2>
                 <Link to="/shop" className="text-[9px] font-black uppercase tracking-widest text-stone-300 hover:text-stone-900">View All</Link>
              </div>

              <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                 {filteredProducts.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group block">
                       <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 mb-6 rounded-[2rem] shadow-sm">
                          <img 
                           src={product.image} 
                           className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                           alt={product.name} 
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                             <div className="bg-white/95 backdrop-blur-md text-stone-900 px-6 py-3 rounded-full flex items-center gap-2 text-[9px] font-black uppercase tracking-widest shadow-xl">
                                Acquire <ArrowUpRight size={14} />
                             </div>
                          </div>
                       </div>
                       <div className="text-center space-y-1">
                          <h3 className="text-lg font-serif text-stone-900 truncate">{product.name}</h3>
                          <p className="text-[9px] uppercase tracking-widest font-black text-stone-300">${product.price.toLocaleString()}</p>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      )}

      {!activeCategory && (
        <section className="py-32 text-center">
           <div className="w-px h-20 bg-stone-100 mx-auto animate-pulse mb-8" />
           <p className="text-stone-300 text-[9px] uppercase tracking-[0.6em] font-black">Choose a portal to browse pieces</p>
        </section>
      )}
    </div>
  );
};

export default RoomDetail;
