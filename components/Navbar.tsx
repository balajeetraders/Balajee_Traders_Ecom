
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User as UserIcon, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Orders', href: '/orders' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-20">
          <img 
            src="/logo.png" 
            alt="Balajee Traders" 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <span className="text-lg md:text-2xl font-bold tracking-tighter text-stone-900">
            Balajee Traders
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-12">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className={`group relative text-[11px] uppercase tracking-[0.4em] font-black transition-all text-stone-900 ${
                    !isActive ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-stone-900 transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-30'
                  }`}></span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8 shrink-0 relative z-20">
          <Link to="/orders" className="text-stone-900 opacity-60 hover:opacity-100 transition-all" aria-label="Orders">
             <Package size={20} />
          </Link>

          <Link to="/wishlist" className="relative text-stone-900 opacity-60 hover:opacity-100 transition-all block" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[8px] flex items-center justify-center font-black animate-in zoom-in">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/account" className="text-stone-900 opacity-60 hover:opacity-100 transition-all" aria-label="Account">
            {user ? (
               <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
               </div>
            ) : (
               <UserIcon size={20} />
            )}
          </Link>
          
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-black transition-all shadow-lg hover:scale-105"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest">Bag</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white border-2 border-stone-900 text-stone-900 flex items-center justify-center rounded-full text-[9px] font-black">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Mobile Actions - Simplified & Account Focused */}
        <div className="flex lg:hidden items-center gap-5 relative z-20">
          <Link to="/wishlist" className="relative text-stone-900 transition-all" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-stone-900 text-white rounded-full text-[8px] flex items-center justify-center font-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/account" className="text-stone-900 transition-all" aria-label="Account">
             {user ? (
               <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
               </div>
            ) : (
               <UserIcon size={22} strokeWidth={1.5} />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
