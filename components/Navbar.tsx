
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo - Fixed color for better contrast */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-20">
          <div className="flex items-end gap-0.5 h-6">
            <div className="w-1.5 h-3 bg-stone-900 rounded-sm"></div>
            <div className="w-1.5 h-6 bg-stone-900 rounded-sm"></div>
            <div className="w-1.5 h-4 bg-stone-900 rounded-sm"></div>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-stone-900">
            Balajee Traders
          </span>
        </Link>

        {/* Core Navigation - Desktop Only, improved centering */}
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

        {/* Action Utilities */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0 relative z-20">
          <Link to="/shop" className="hidden sm:block text-stone-900 opacity-60 hover:opacity-100 transition-all">
            <Heart size={20} />
          </Link>

          <button className="hidden sm:block text-stone-900 opacity-60 hover:opacity-100 transition-all">
            <User size={20} />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-black transition-all shadow-lg scale-90 md:scale-100"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Bag</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white border-2 border-stone-900 text-stone-900 flex items-center justify-center rounded-full text-[9px] font-black">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
