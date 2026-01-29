
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between border-b border-stone-100">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={20} className="text-stone-900" />
            <h2 className="text-xl font-serif">Bag ({cart.length})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 no-scrollbar">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex space-x-6 group">
                <div className="w-24 aspect-[3/4] bg-stone-50 overflow-hidden flex-shrink-0 rounded-[1.5rem] shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg text-stone-900 leading-tight">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-stone-200 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest font-black">
                    {item.selectedColor} {item.selectedSize && ` / ${item.selectedSize}`}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center border border-stone-100 rounded-full px-1.5 h-10">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 rounded-full transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 rounded-full transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-xs font-black text-stone-900">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 shadow-inner">
                <ShoppingBag size={40} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-serif text-stone-900">Your bag is empty</p>
                <p className="text-xs text-stone-400 italic">Select architectural pieces for your home.</p>
              </div>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-xl"
              >
                Browse Collection
              </button>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-stone-100 space-y-6 bg-stone-50/50">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-stone-300">
                <span>Subtotal</span>
                <span className="text-stone-900">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end text-xl font-serif text-stone-900 pt-3 border-t border-stone-100">
                <span>Total Amount</span>
                <span className="font-bold text-2xl">${total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-stone-900 text-white py-6 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-[0.98] shadow-2xl"
            >
              Continue to Settlement
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
