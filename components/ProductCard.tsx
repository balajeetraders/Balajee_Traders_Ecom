
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, onToggleWishlist, className = "" }) => {
  const [activeColor, setActiveColor] = useState(product.colors?.[0]?.hex);
  const isCustomizable = (product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0);

  return (
    <div className={`relative group ${className}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-stone-50/50 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]">
          <div className="relative aspect-square overflow-hidden bg-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
            />
            
            {/* Soft Customizable Label */}
            {isCustomizable && (
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-stone-600">
                  Customizable
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6 md:p-10 space-y-2 text-center relative">
            {/* Hover Color Swatches */}
            {product.colors && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-500">
                {product.colors.map((color) => (
                  <div 
                    key={color.name}
                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-black text-stone-300 uppercase tracking-[0.4em]">
                {product.category}
              </span>
            </div>

            <h4 className="text-lg md:text-xl font-serif text-stone-900 leading-tight">
              {product.name}
            </h4>
            
            <div className="pt-2">
              <span className="text-xs md:text-sm font-light text-stone-400">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Subtle Wishlist Trigger */}
      <button 
        onClick={(e) => { e.preventDefault(); onToggleWishlist(product); }}
        className={`absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
          isWishlisted 
            ? 'bg-stone-900 text-white shadow-xl' 
            : 'bg-white/40 backdrop-blur-md text-stone-400 hover:text-stone-900 hover:bg-white'
        }`}
      >
        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} className="md:w-[20px]" />
      </button>
    </div>
  );
};

export default ProductCard;
