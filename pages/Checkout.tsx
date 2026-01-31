
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
  Wallet,
  Building2,
  Calendar
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
      }, 2500);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      gsap.fromTo('.success-modal-overlay', 
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
      gsap.fromTo('.success-modal-content', 
        { scale: 0.8, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.2 }
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
             <span className="text-[10px] uppercase tracking-widest font-black text-stone-300">Secure Settlement</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-24">
          
          {/* Checkout Steps */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            
            {/* Progression Bar */}
            <div className="flex items-center justify-between pb-8 md:pb-12 border-b border-stone-100">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${step >= i ? 'text-stone-900' : 'text-stone-300'}`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black border-2 transition-all duration-500 ${step >= i ? 'border-stone-900 bg-stone-900 text-white shadow-xl shadow-stone-200' : 'border-stone-100'}`}>
                       {step > i ? <CheckCircle size={18} /> : i}
                    </div>
                    <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black hidden xs:block">
                       {i === 1 ? 'Identity' : i === 2 ? 'Logistics' : 'Payment'}
                    </span>
                 </div>
               ))}
            </div>

            <form onSubmit={handleNext} className="space-y-10 md:space-y-12">
               {step === 1 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                       <h2 className="text-4xl md:text-5xl font-serif">Delivery Identity</h2>
                       <p className="text-stone-400 text-sm italic font-serif">Enter your architectural destination details.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <Input label="First Name" placeholder="Julius" required />
                       <Input label="Last Name" placeholder="Wright" required />
                       <div className="md:col-span-2">
                          <Input label="Mobile Phone Number" type="tel" placeholder="+91 00000 00000" required />
                       </div>
                       <div className="md:col-span-2">
                          <Input label="Structural Address" placeholder="Suite 402, Architectural Plaza" required />
                       </div>
                       <Input label="City / Region" placeholder="Mumbai" required />
                       <Input label="Postal Code" placeholder="400001" required />
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                       <h2 className="text-4xl md:text-5xl font-serif">Logistics Selection</h2>
                       <p className="text-stone-400 text-sm italic font-serif">Select your preferred transport methodology.</p>
                    </div>
                    <div className="space-y-4">
                       <ShippingOption 
                        id="white-glove"
                        icon={<Package className="text-stone-900" size={24} />}
                        title="White-Glove Delivery" 
                        price="Free" 
                        desc="Includes in-room assembly, placement, and packaging removal." 
                        active={shippingMethod === 'white-glove'}
                        onSelect={() => setShippingMethod('white-glove')}
                       />
                       <ShippingOption 
                        id="express"
                        icon={<Zap className="text-orange-500" size={24} />}
                        title="Priority Express" 
                        price="$95.00" 
                        desc="Accelerated dispatch with doorstep arrival in 48 hours." 
                        active={shippingMethod === 'express'}
                        onSelect={() => setShippingMethod('express')}
                       />
                       <ShippingOption 
                        id="standard"
                        icon={<Building2 className="text-blue-500" size={24} />}
                        title="Standard Freight" 
                        price="Free" 
                        desc="Reliable transit for architectural pieces (5-7 business days)." 
                        active={shippingMethod === 'standard'}
                        onSelect={() => setShippingMethod('standard')}
                       />
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                       <h2 className="text-4xl md:text-5xl font-serif">Settlement</h2>
                       <p className="text-stone-400 text-sm italic font-serif">Finalize the acquisition of your curated selection.</p>
                    </div>
                    
                    {/* Payment Method Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-5 px-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'card' ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <CreditCard size={24} /> 
                        <span className="text-[10px] font-black uppercase tracking-widest">Credit Card</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`py-5 px-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'upi' ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <Wallet size={24} /> 
                        <span className="text-[10px] font-black uppercase tracking-widest">UPI ID</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`py-5 px-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === 'cod' ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100 bg-white text-stone-400 hover:border-stone-200'}`}
                      >
                        <Truck size={24} /> 
                        <span className="text-[10px] font-black uppercase tracking-widest">C.O.D</span>
                      </button>
                    </div>

                    <div className="p-8 bg-white border border-stone-100 rounded-[2rem] md:rounded-[3rem] shadow-sm space-y-8 min-h-[300px] flex flex-col justify-center">
                       {paymentMethod === 'card' && (
                         <div className="space-y-6 animate-in fade-in duration-500">
                            <Input label="Name on Card" placeholder="JULIUS WRIGHT" required />
                            <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                               <Input label="Expiry Date" placeholder="MM / YY" required />
                               <Input label="Security Code" placeholder="CVC" required />
                            </div>
                         </div>
                       )}
                       {paymentMethod === 'upi' && (
                         <div className="space-y-6 animate-in fade-in duration-500 text-center">
                            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                               <Smartphone size={32} className="text-stone-900" />
                            </div>
                            <Input label="VPA / UPI ID" placeholder="username@bank" required />
                            <p className="text-[11px] text-stone-400 italic max-w-xs mx-auto">Authorize the transaction within your preferred UPI mobile application after clicking finish.</p>
                         </div>
                       )}
                       {paymentMethod === 'cod' && (
                         <div className="space-y-6 animate-in fade-in duration-500 text-center py-6">
                            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                               <Truck size={32} className="text-stone-900" />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-stone-900">Cash on Delivery</h4>
                            <p className="text-[11px] text-stone-400 italic max-w-xs mx-auto leading-relaxed">Please ensure the exact amount is available at the time of delivery. Our agents will contact you prior to arrival.</p>
                         </div>
                       )}
                    </div>
                 </div>
               )}

               <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-stone-900 text-white py-6 md:py-8 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-2xl ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
               >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    <>
                      {step < 3 ? 'Proceed to Next Phase' : 'Complete Transaction'}
                      <ArrowRight size={18} />
                    </>
                  )}
               </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-stone-100 shadow-sm space-y-10 lg:sticky lg:top-32">
                <div className="flex items-center justify-between border-b border-stone-50 pb-6">
                   <h3 className="text-2xl font-serif">Curated Pieces</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Order Ref: #BT-0092</span>
                </div>
                
                <div className="space-y-8 max-h-[400px] overflow-y-auto no-scrollbar">
                   <div className="flex gap-6 items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 aspect-square rounded-3xl bg-stone-50 overflow-hidden flex-shrink-0">
                         <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Item" />
                      </div>
                      <div className="flex-grow space-y-1">
                         <h4 className="text-sm font-black uppercase tracking-tight text-stone-900">Aurum Velvet Sofa</h4>
                         <p className="text-[10px] text-stone-400 uppercase tracking-widest">Heritage Emerald / 3-Seater</p>
                         <div className="flex justify-between items-center pt-2">
                            <span className="text-sm font-bold text-stone-900">$1,850.00</span>
                            <span className="text-[10px] text-stone-300 font-black">Qty: 01</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-stone-50 space-y-5">
                   <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-stone-400">
                      <span>Base Value</span>
                      <span className="text-stone-900">$1,850.00</span>
                   </div>
                   <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-stone-400">
                      <span>Logistics Fee</span>
                      <span className="text-stone-900">{shippingMethod === 'express' ? '$95.00' : 'Complimentary'}</span>
                   </div>
                   <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-stone-400">
                      <span>VAT Allocation</span>
                      <span className="text-stone-900">$370.00</span>
                   </div>
                   <div className="pt-8 border-t border-stone-50 flex justify-between items-end">
                      <div className="space-y-1">
                         <span className="block text-[10px] uppercase tracking-widest font-black text-stone-300">Total Settlement</span>
                         <span className="text-4xl font-serif text-stone-900 tracking-tighter">${(1850 + 370 + (shippingMethod === 'express' ? 95 : 0)).toLocaleString()}.00</span>
                      </div>
                      <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full mb-1">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Verified</span>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-stone-50 rounded-3xl flex items-center gap-5 border border-stone-100">
                   <Calendar size={24} className="text-stone-900 shrink-0" strokeWidth={1} />
                   <p className="text-[10px] text-stone-400 uppercase tracking-[0.1em] font-medium leading-relaxed italic">
                      Anticipated arrival between <span className="text-stone-900 font-bold">Sept 24 - Sept 28</span>.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Success Modal */}
      {isSuccess && (
        <div className="success-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-xl" />
          <div className="success-modal-content relative bg-white w-full max-w-xl rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 text-center shadow-2xl space-y-10 overflow-hidden border border-white/20">
            {/* Visual Confetti-like elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-200 via-stone-900 to-stone-200" />
            
            <div className="w-24 h-24 md:w-32 md:h-32 bg-stone-50 rounded-full flex items-center justify-center mx-auto border-8 border-stone-100 shadow-inner">
              <CheckCircle size={64} className="text-stone-900" strokeWidth={1} />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Heritage Acquired</h2>
              <p className="text-stone-500 text-sm md:text-lg italic font-serif leading-relaxed max-w-sm mx-auto">
                Your architectural selection has been authorized. A detailed manifesto of your order is en route to your device.
              </p>
            </div>
            
            <div className="pt-8 space-y-6">
              <button 
                onClick={handleReturnHome}
                className="w-full bg-stone-900 text-white py-6 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                Return to Home Gallery <Home size={18} />
              </button>
              <div className="flex items-center justify-center gap-3">
                 <div className="h-px w-8 bg-stone-100" />
                 <p className="text-[10px] text-stone-300 uppercase tracking-[0.3em] font-black">Ref: BT-{Math.floor(Math.random() * 900000) + 100000}</p>
                 <div className="h-px w-8 bg-stone-100" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, ...props }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-300 ml-1">{label}</label>
    <input 
      className="w-full bg-white border border-stone-100 rounded-2xl md:rounded-3xl h-14 md:h-16 px-6 md:px-8 outline-none focus:border-stone-900 focus:shadow-lg focus:shadow-stone-100 transition-all text-sm font-medium" 
      {...props} 
    />
  </div>
);

const ShippingOption = ({ id, icon, title, price, desc, active, onSelect }: any) => (
  <div 
    onClick={onSelect}
    className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 transition-all duration-500 flex justify-between items-center cursor-pointer group hover:-translate-y-1 ${active ? 'border-stone-900 bg-white shadow-2xl shadow-stone-200' : 'border-stone-100 bg-white/50 hover:border-stone-200'}`}
  >
    <div className="flex gap-6 md:gap-8 items-center">
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${active ? 'bg-stone-900 text-white rotate-6' : 'bg-white shadow-sm text-stone-400 group-hover:text-stone-600'}`}>
        {icon}
      </div>
      <div className="space-y-1.5 md:space-y-3">
        <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-stone-900">{title}</h4>
        <p className="text-[11px] md:text-xs text-stone-400 italic font-serif leading-relaxed max-w-[200px] sm:max-w-xs">{desc}</p>
      </div>
    </div>
    <div className="text-right shrink-0">
      <div className={`text-base md:text-xl font-serif font-bold transition-colors duration-500 ${active ? 'text-stone-900' : 'text-stone-300'}`}>{price}</div>
      {active && (
        <div className="mt-2 flex justify-end animate-in zoom-in duration-500">
           <CheckCircle size={20} className="text-stone-900" />
        </div>
      )}
    </div>
  </div>
);

export default Checkout;
