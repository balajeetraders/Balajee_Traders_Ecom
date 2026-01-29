
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Lock, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Smartphone, 
  Home, 
  Package, 
  Zap,
  Globe,
  Wallet
} from 'lucide-react';
import gsap from 'gsap';

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [shippingMethod, setShippingMethod] = useState('white-glove');
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      gsap.fromTo('.success-modal', 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [isSuccess]);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="pt-24 pb-32 md:pt-32 md:pb-40 bg-[#fafafa] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <Link to="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-stone-400 hover:text-stone-900 transition-colors">
            <ChevronLeft size={16} /> Return to Shop
          </Link>
          <div className="flex items-center gap-3">
             <Lock size={14} className="text-stone-300" />
             <span className="text-[10px] uppercase tracking-widest font-black text-stone-300">Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-24">
          
          {/* Checkout Steps */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            
            {/* Progression Bar */}
            <div className="flex items-center justify-between pb-8 md:pb-12 border-b border-stone-100">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`flex items-center gap-3 md:gap-4 ${step >= i ? 'text-stone-900' : 'text-stone-300'}`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black border-2 transition-all ${step >= i ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100'}`}>
                       {step > i ? <CheckCircle size={16} /> : i}
                    </div>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black hidden xs:block">
                       {i === 1 ? 'Info' : i === 2 ? 'Logistics' : 'Payment'}
                    </span>
                 </div>
               ))}
            </div>

            <form onSubmit={handleNext} className="space-y-10 md:space-y-12">
               {step === 1 && (
                 <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl md:text-4xl font-serif">Delivery Identity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <Input label="First Name" placeholder="John" required />
                       <Input label="Last Name" placeholder="Doe" required />
                       <div className="md:col-span-2"><Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" required /></div>
                       <div className="md:col-span-2"><Input label="Street Address" placeholder="123 Architectural Way" required /></div>
                       <Input label="City" placeholder="New York" required />
                       <Input label="Postal Code" placeholder="10001" required />
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl md:text-4xl font-serif">Logistics Selection</h2>
                    <div className="space-y-3 md:space-y-4">
                       <ShippingOption 
                        id="white-glove"
                        icon={<Package className="text-stone-900" size={20} />}
                        title="White-Glove Delivery" 
                        price="Free" 
                        desc="Includes in-room assembly and packaging removal." 
                        active={shippingMethod === 'white-glove'}
                        onSelect={() => setShippingMethod('white-glove')}
                       />
                       <ShippingOption 
                        id="express"
                        icon={<Zap className="text-orange-500" size={20} />}
                        title="Priority Express" 
                        price="$85.00" 
                        desc="Guaranteed doorstep arrival within 48 hours." 
                        active={shippingMethod === 'express'}
                        onSelect={() => setShippingMethod('express')}
                       />
                       <ShippingOption 
                        id="standard"
                        icon={<Globe className="text-blue-500" size={20} />}
                        title="Standard Freight" 
                        price="Free" 
                        desc="Eco-friendly consolidation shipping (7-10 days)." 
                        active={shippingMethod === 'standard'}
                        onSelect={() => setShippingMethod('standard')}
                       />
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl md:text-4xl font-serif">Settlement</h2>
                    
                    {/* Payment Method Selector */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <CreditCard size={18} /> Card
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'upi' ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <Wallet size={18} /> UPI
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'cod' ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <Truck size={18} /> COD
                      </button>
                    </div>

                    <div className="p-6 md:p-8 bg-white border border-stone-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm space-y-6 md:space-y-8">
                       {paymentMethod === 'card' && (
                         <div className="space-y-6 animate-in fade-in duration-300">
                            <Input label="Cardholder Name" required />
                            <Input label="Card Number" placeholder="•••• •••• •••• ••••" required />
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                               <Input label="Expiry (MM/YY)" required />
                               <Input label="CVC" required />
                            </div>
                         </div>
                       )}
                       {paymentMethod === 'upi' && (
                         <div className="space-y-6 animate-in fade-in duration-300">
                            <Input label="UPI ID" placeholder="username@bank" required />
                            <p className="text-[10px] text-stone-400 italic">You will receive a notification in your UPI app to authorize the payment.</p>
                         </div>
                       )}
                       {paymentMethod === 'cod' && (
                         <div className="space-y-4 animate-in fade-in duration-300 py-4 text-center">
                            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-2">
                               <Truck size={24} className="text-stone-900" />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-tight">Cash on Delivery</h4>
                            <p className="text-xs text-stone-400 italic">Please keep the exact amount ready. Our logistics partner will collect payment upon delivery.</p>
                         </div>
                       )}
                    </div>
                 </div>
               )}

               <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-stone-900 text-white py-5 md:py-6 rounded-full flex items-center justify-center gap-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
               >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      {step < 3 ? 'Proceed to Next Phase' : 'Authorize Acquisition'}
                      <ArrowRight size={16} />
                    </>
                  )}
               </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
             <div className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem] border border-stone-100 shadow-sm space-y-8 md:space-y-10 lg:sticky lg:top-32">
                <h3 className="text-xl md:text-2xl font-serif">Curation Summary</h3>
                <div className="space-y-6">
                   <div className="flex gap-4 md:gap-6 items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 aspect-square rounded-xl md:rounded-2xl bg-stone-50 overflow-hidden flex-shrink-0">
                         <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Item" />
                      </div>
                      <div className="flex-grow space-y-1">
                         <h4 className="text-xs md:text-sm font-black uppercase tracking-tight">Aurum Velvet Sofa</h4>
                         <p className="text-[9px] text-stone-400 uppercase tracking-widest">Emerald / 3-Seater</p>
                         <div className="flex justify-between items-center pt-2">
                            <span className="text-xs font-black">$1,850.00</span>
                            <span className="text-[10px] text-stone-300 font-black">Qty: 1</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-stone-50 space-y-4">
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-stone-400">
                      <span>Subtotal</span>
                      <span className="text-stone-900">$1,850.00</span>
                   </div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-stone-400">
                      <span>Logistics</span>
                      <span className="text-stone-900">{shippingMethod === 'express' ? '$85.00' : 'Complimentary'}</span>
                   </div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-stone-400">
                      <span>VAT (20%)</span>
                      <span className="text-stone-900">$370.00</span>
                   </div>
                   <div className="pt-6 border-t border-stone-50 flex justify-between items-end">
                      <span className="text-base md:text-lg font-serif">Total Amount</span>
                      <span className="text-xl md:text-2xl font-black">${(1850 + 370 + (shippingMethod === 'express' ? 85 : 0)).toLocaleString()}.00</span>
                   </div>
                </div>

                <div className="p-4 md:p-6 bg-stone-50 rounded-xl md:rounded-2xl flex items-center gap-4">
                   <Truck size={20} className="text-stone-900 shrink-0" />
                   <p className="text-[9px] text-stone-400 uppercase tracking-widest leading-relaxed">
                      Signature required upon white-glove delivery to ensure piece integrity.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" />
          <div className="success-modal relative bg-white w-full max-w-lg rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center shadow-2xl space-y-8 overflow-hidden">
            {/* Celebration elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-stone-900" />
            
            <div className="w-20 h-20 md:w-24 md:h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-stone-900" strokeWidth={1} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Purchase Accomplished</h2>
              <p className="text-stone-400 text-sm md:text-base italic font-serif leading-relaxed max-w-xs mx-auto">
                Your architectural pieces are now being prepared for transport. We've sent a detailed confirmation to your device.
              </p>
            </div>
            
            <div className="pt-4 space-y-4">
              <button 
                onClick={handleReturnHome}
                className="w-full bg-stone-900 text-white py-5 rounded-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
              >
                Return to Gallery <Home size={16} />
              </button>
              <p className="text-[9px] text-stone-300 uppercase tracking-widest font-black">Order ID: BT-{Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-stone-300 ml-1">{label}</label>
    <input 
      className="w-full bg-white border border-stone-100 rounded-xl md:rounded-2xl h-12 md:h-14 px-5 md:px-6 outline-none focus:border-stone-900 transition-all text-xs md:text-sm font-medium" 
      {...props} 
    />
  </div>
);

const ShippingOption = ({ id, icon, title, price, desc, active, onSelect }: any) => (
  <div 
    onClick={onSelect}
    className={`p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] border-2 transition-all flex justify-between items-center cursor-pointer group ${active ? 'border-stone-900 bg-white shadow-lg' : 'border-stone-100 bg-white/50 hover:border-stone-200'}`}
  >
    <div className="flex gap-4 md:gap-5 items-center">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-stone-50' : 'bg-white shadow-sm'}`}>
        {icon}
      </div>
      <div className="space-y-1 md:space-y-2">
        <h4 className="text-xs md:text-sm font-black uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] md:text-xs text-stone-400 italic leading-relaxed max-w-[180px] xs:max-w-none">{desc}</p>
      </div>
    </div>
    <div className="text-right shrink-0">
      <span className={`text-xs md:text-sm font-black transition-colors ${active ? 'text-stone-900' : 'text-stone-400'}`}>{price}</span>
      {active && (
        <div className="mt-1 flex justify-end">
           <CheckCircle size={14} className="text-stone-900" />
        </div>
      )}
    </div>
  </div>
);

export default Checkout;
