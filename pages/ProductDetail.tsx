
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Minus, Plus, ArrowRight, Share2, Heart, ChevronLeft, Sparkles, Loader2, Calendar, ShoppingBag, Check } from 'lucide-react';
import gsap from 'gsap';
import { Product } from '../types';
import { fetchProductById } from '../services/productService';

interface ProductDetailProps {
  onAddToCart: (product: Product & { selectedColor?: string, selectedSize?: string, quantity?: number }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, wishlist, onToggleWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Zoom State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Delivery Date Calculation (Next 5-7 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // 1. Fetch Product Data
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      
      if (data) {
        setSelectedColor(data.colors?.[0]?.name);
        setSelectedSize(data.sizes?.[0]);
        // Set initial active image from gallery or main image
        setActiveImage(data.images?.[0] || data.image);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  // 2. Animation
  useEffect(() => {
    if (!loading && product && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.pdp-reveal', { 
          y: 30, 
          opacity: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power3.out' 
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, product]);

  const handleImageChange = (img: string) => {
    if (activeImage === img) return;
    gsap.to(imageRef.current, { opacity: 0, duration: 0.2, onComplete: () => {
      setActiveImage(img);
      gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
    }});
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
    setIsZooming(true);
  };

  const handleBuyNow = () => {
    if (!product) return;
    onAddToCart({ ...product, quantity, selectedColor, selectedSize });
    navigate('/checkout');
  };

  const isWishlisted = wishlist.some(p => p.id === product?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-stone-50">
        <Loader2 className="animate-spin text-stone-900" size={32} />
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Loading Piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-stone-50">
        <h1 className="text-4xl font-serif text-stone-900">Piece Not Found</h1>
        <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-2">Return to Archive</Link>
      </div>
    );
  }

  const isCustomizable = (product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0);
  const galleryImages = product.images || [product.image];

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50/60 backdrop-blur-3xl pt-24 pb-32 md:pt-36 md:pb-40 selection:bg-stone-900 selection:text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-8 md:mb-12 pdp-reveal">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 hover:text-stone-900 transition-colors">
              <ChevronLeft size={14} /> Back to Collection
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-6 pdp-reveal sticky top-24">
             {/* Main Image with Zoom */}
             <div 
                ref={imageContainerRef}
                className="relative aspect-square md:max-h-[70vh] rounded-[2rem] overflow-hidden bg-white shadow-xl group border border-stone-100 cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZooming(false)}
             >
                <img 
                  ref={imageRef}
                  src={activeImage} 
                  className={`w-full h-full object-contain transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`} 
                  alt={product.name}
                  loading="eager"
                />
                
                {/* Zoomed Image Overlay */}
                {isZooming && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}

                <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                   {isCustomizable && (
                     <div className="bg-stone-900/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-stone-900 flex items-center gap-2">
                       <Sparkles size={10} /> Bespoke
                     </div>
                   )}
                </div>
             </div>

             {/* Thumbnails */}
             {galleryImages.length > 1 && (
               <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {galleryImages.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleImageChange(img)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border shrink-0 transition-all ${activeImage === img ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-100 opacity-70 hover:opacity-100'}`}
                    >
                       <img src={img} className="w-full h-full object-cover" alt={`Detail ${i}`} />
                    </button>
                  ))}
               </div>
             )}

             {/* Reviews Section (Desktop Position) */}
             <div className="hidden lg:block pt-8 border-t border-stone-200">
                <ReviewsSection rating={product.rating} count={product.reviewCount} />
             </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-6 space-y-8 bg-white/80 p-6 md:p-10 rounded-[2.5rem] border border-white shadow-lg pdp-reveal">
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300">{product.category}</span>
                  <div className="flex items-center gap-1.5 text-stone-900 bg-stone-50 px-3 py-1 rounded-full">
                    <Star size={12} fill="currentColor" className="text-yellow-500" />
                    <span className="text-[10px] font-black tracking-widest">{product.rating} <span className="text-stone-300 font-medium">({product.reviewCount} Reviews)</span></span>
                  </div>
               </div>
               <div className="space-y-2">
                 <h1 className="text-3xl md:text-5xl font-serif text-stone-900 leading-none tracking-tighter">{product.name}</h1>
                 <span className="text-2xl md:text-3xl font-serif text-stone-900 block">₹{product.price.toLocaleString()}</span>
               </div>
               <p className="text-stone-500 text-sm leading-relaxed font-light">
                 {product.description} A centerpiece of functional sculpture for your personal architectural sanctuary.
               </p>
               
               {/* Specs / Dimensions */}
               <div className="bg-stone-50 rounded-xl p-5 space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900 flex items-center gap-2">
                    <Check size={12} /> Product Specifications
                  </h4>
                  <ul className="text-xs text-stone-500 space-y-2 font-medium">
                    {product.dimensions && <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5"/>Dimensions: {product.dimensions}</li>}
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5"/>Material: {product.material}</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5"/>Style: {product.style}</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5"/>Room: {product.room}</li>
                  </ul>
               </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-stone-100">
               {product.colors && (
                 <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-300">Select Finish</span>
                    <div className="flex flex-wrap gap-3">
                       {product.colors.map(color => (
                         <button 
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${selectedColor === color.name ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-300'}`}
                         >
                           <div className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: color.hex }} />
                           <span className="text-[10px] font-bold uppercase tracking-wide text-stone-600 group-hover:text-stone-900">{color.name}</span>
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {product.sizes && (
                 <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-300">Select Configuration</span>
                    <div className="flex flex-wrap gap-2">
                       {product.sizes.map(size => (
                         <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedSize === size ? 'bg-stone-900 text-white border-stone-900 shadow-md' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900'}`}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {/* Delivery Date */}
               <div className="flex items-center gap-3 text-stone-500 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <Calendar size={18} className="text-stone-900" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-900">Estimated Delivery</span>
                    <span className="text-xs font-medium">{formattedDelivery}</span>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col gap-4">
                 <div className="flex gap-4">
                    <div className="flex items-center bg-stone-100 rounded-xl px-2 h-12 md:h-14">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                       <span className="w-8 text-center text-sm font-black">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
                    </div>
                    
                    {/* Responsive Buttons: Stack on mobile, Row on desktop */}
                    <div className="flex flex-1 flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => onAddToCart({ ...product, quantity, selectedColor, selectedSize })} 
                        className="flex-1 border-2 border-stone-900 text-stone-900 bg-transparent rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-stone-50 transition-all h-12 md:h-14"
                      >
                        <ShoppingBag size={16} /> Add to Bag
                      </button>
                      <button 
                        onClick={handleBuyNow}
                        className="flex-1 bg-stone-900 text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all h-12 md:h-14"
                      >
                        Buy Now <ArrowRight size={16} />
                      </button>
                    </div>
                 </div>
                 
                 <div className="flex items-center justify-between pt-2">
                    <button 
                      onClick={() => onToggleWishlist(product)}
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${isWishlisted ? 'text-red-500' : 'text-stone-400 hover:text-stone-900'}`}
                    >
                      <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} /> 
                      {isWishlisted ? 'Added to Wishlist' : 'Save for Later'}
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all flex items-center gap-2">
                      <Share2 size={16} /> Share Design
                    </button>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-100 text-stone-500">
               <div className="flex flex-col gap-2 p-4 bg-stone-50 rounded-2xl text-center">
                  <Truck size={24} strokeWidth={1} className="mx-auto text-stone-900" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Free Shipping</span>
               </div>
               <div className="flex flex-col gap-2 p-4 bg-stone-50 rounded-2xl text-center">
                  <ShieldCheck size={24} strokeWidth={1} className="mx-auto text-stone-900" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Warranty Included</span>
               </div>
            </div>

            {/* Reviews Mobile Position */}
            <div className="lg:hidden pt-8 border-t border-stone-200">
                <ReviewsSection rating={product.rating} count={product.reviewCount} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reviews Component
const ReviewsSection = ({ rating, count }: { rating: number, count: number }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-stone-900">Client Reviews</h3>
        <button className="text-[10px] font-black uppercase tracking-widest border-b border-stone-900">Write a Review</button>
      </div>
      
      <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-2xl">
        <div className="text-center px-4 border-r border-stone-200">
          <span className="text-3xl font-serif text-stone-900 block leading-none">{rating}</span>
          <div className="flex gap-0.5 text-yellow-500 my-1 justify-center">
            {[...Array(5)].map((_, i) => (
               <Star key={i} size={10} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[9px] text-stone-400 uppercase font-bold">{count} Reviews</span>
        </div>
        
        <div className="flex-1 space-y-2">
           <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-stone-900 w-[85%]"></div>
           </div>
           <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-stone-900 w-[10%]"></div>
           </div>
           <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-stone-900 w-[5%]"></div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="border-b border-stone-100 pb-6 last:border-0">
             <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center text-[10px] font-bold">AB</div>
                   <div>
                      <span className="text-xs font-bold block text-stone-900">Arjun B.</span>
                      <span className="text-[9px] text-stone-400 uppercase">Verified Buyer</span>
                   </div>
                </div>
                <span className="text-[10px] text-stone-400">2 days ago</span>
             </div>
             <div className="flex text-yellow-500 mb-2">
               {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
             </div>
             <p className="text-xs text-stone-600 leading-relaxed">
               "Absolutely stunning piece. The craftsmanship matches the images perfectly. Delivered on time with great packaging."
             </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
