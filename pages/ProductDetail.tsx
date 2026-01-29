
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Minus, Plus, ArrowRight, Share2, Heart } from 'lucide-react';
import gsap from 'gsap';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product & { selectedColor?: string, selectedSize?: string, quantity?: number }) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const product = PRODUCTS.find((p) => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!product) return;
    setSelectedColor(product.colors?.[0]?.name);
    setSelectedSize(product.sizes?.[0]);

    const ctx = gsap.context(() => {
      gsap.from('.pdp-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out'
      });
      
      // Depth effect on image
      gsap.fromTo(imageRef.current, {
        scale: 1.1,
      }, {
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id, product]);

  if (!product) return <div className="pt-40 text-center font-serif text-3xl">Product not found.</div>;

  return (
    <div ref={containerRef} className="pt-24 pb-32 md:pt-40 md:pb-40 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Gallery - Stacked on Mobile */}
          <div className="lg:col-span-7 space-y-6">
             <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-stone-50 shadow-sm pdp-reveal">
                <img 
                  ref={imageRef}
                  src={product.image} 
                  className="w-full h-full object-cover" 
                  alt={product.name} 
                />
             </div>
             {/* Mobile: Swipe indication or thumbnails could go here */}
             <div className="grid grid-cols-2 gap-4 md:gap-6 pdp-reveal">
                <div className="aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-stone-50">
                   <img src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60" alt="Detail" />
                </div>
                <div className="aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-stone-50">
                   <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60" alt="Detail" />
                </div>
             </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-40 h-fit">
            <div className="space-y-4 pdp-reveal">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-300">{product.category}</span>
                  <div className="flex items-center gap-1.5 text-stone-900">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-black tracking-widest">{product.rating} ({product.reviewCount})</span>
                  </div>
               </div>
               <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">{product.name}</h1>
               <p className="text-2xl font-serif text-stone-400 italic">${product.price.toLocaleString()}</p>
            </div>

            <p className="text-stone-500 text-sm leading-relaxed pdp-reveal">{product.description}</p>

            {/* Config: Color */}
            {product.colors && (
              <div className="space-y-4 pdp-reveal">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-stone-300">Available Finishes</h4>
                 <div className="flex gap-4">
                    {product.colors.map(c => (
                      <button 
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group flex flex-col items-center gap-2`}
                      >
                        <div className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${selectedColor === c.name ? 'border-stone-900' : 'border-transparent'}`}>
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity ${selectedColor === c.name ? 'opacity-100' : 'opacity-0'}`}>{c.name}</span>
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {/* Config: Size */}
            {product.sizes && (
              <div className="space-y-4 pdp-reveal">
                 <h4 className="text-[10px] uppercase tracking-widest font-black text-stone-300">Dimensions</h4>
                 <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button 
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedSize === s ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-100 hover:border-stone-900'}`}
                      >
                        {s}
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {/* CTA Group */}
            <div className="space-y-6 pt-6 border-t border-stone-50 pdp-reveal">
               <div className="flex gap-4">
                  <div className="flex items-center bg-stone-50 rounded-full px-2 h-14 md:h-16">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-white rounded-full transition-colors"><Minus size={14} /></button>
                     <span className="w-10 text-center text-sm font-black">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-white rounded-full transition-colors"><Plus size={14} /></button>
                  </div>
                  <button 
                    onClick={() => onAddToCart({ ...product, quantity, selectedColor, selectedSize })}
                    className="flex-1 bg-stone-900 text-white rounded-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all active:scale-[0.98]"
                  >
                    Acquire Piece <ArrowRight size={16} />
                  </button>
               </div>
               
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-300">
                  <button className="flex items-center gap-2 hover:text-stone-900 transition-colors"><Heart size={16} /> Add to Saved</button>
                  <button className="flex items-center gap-2 hover:text-stone-900 transition-colors"><Share2 size={16} /> Curate Gallery</button>
               </div>
            </div>

            {/* Utility Info */}
            <div className="grid grid-cols-2 gap-4 pt-10 pdp-reveal">
               <div className="p-6 bg-stone-50 rounded-2xl flex flex-col gap-3">
                  <Truck size={24} className="text-stone-900" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest">Global Logistics</h5>
                  <p className="text-[10px] text-stone-400 italic">Complimentary white-glove delivery in urban hubs.</p>
               </div>
               <div className="p-6 bg-stone-50 rounded-2xl flex flex-col gap-3">
                  <ShieldCheck size={24} className="text-stone-900" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest">Heritage Guarantee</h5>
                  <p className="text-[10px] text-stone-400 italic">Structural architectural warranty for 10 years.</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
