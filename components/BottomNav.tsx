
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, LayoutGrid, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-[60] bg-white/90 backdrop-blur-xl border-t border-stone-100 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-stone-900' : 'text-stone-400'}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </NavLink>

        <NavLink 
          to="/shop" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-stone-900' : 'text-stone-400'}`}
        >
          <Compass size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Shop</span>
        </NavLink>

        <button 
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-white -mt-10 bg-stone-900 w-16 h-16 rounded-full shadow-2xl border-[6px] border-white active:scale-95 transition-transform"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingBag size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">Bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-stone-900 border-2 border-white text-white text-[9px] flex items-center justify-center rounded-full font-black">
                {cartCount}
              </span>
            )}
          </div>
        </button>

        <NavLink 
          to="/rooms" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-stone-900' : 'text-stone-400'}`}
        >
          <LayoutGrid size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Rooms</span>
        </NavLink>

        <NavLink 
          to="/account" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-stone-900' : 'text-stone-400'}`}
        >
          <User size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
