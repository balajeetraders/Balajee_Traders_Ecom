
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogIn } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, onToggleWishlist, className = "" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthToast, setShowAuthToast] = useState(false);
  const isCustomizable = (product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthToast(true);
      setTimeout(() => {
        setShowAuthToast(false);
        navigate('/account');
      }, 1800);
      return;
    }
    onToggleWishlist(product);
  };

  return (
    <div className={`relative group ${className}`}>

      {/* Auth Toast — appears when unauthenticated user clicks wishlist */}
      {showAuthToast && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: '10px',
          background: '#1c1c1c', color: '#fff', padding: '12px 20px',
          borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap',
          animation: 'pcToastIn 0.3s ease',
        }}>
          <LogIn size={15} />
          <span>Please sign in to save items</span>
          <span style={{ color: '#888', fontSize: '11px' }}>· Redirecting...</span>
          <style>{`@keyframes pcToastIn{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
        </div>
      )}

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

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isWishlisted
            ? 'bg-stone-900 text-white shadow-xl'
            : 'bg-white/40 backdrop-blur-md text-stone-400 hover:text-stone-900 hover:bg-white'
          }`}
        title={user ? (isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist') : 'Sign in to save'}
      >
        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} className="md:w-[20px]" />
      </button>
    </div>
  );
};

export default ProductCard;
