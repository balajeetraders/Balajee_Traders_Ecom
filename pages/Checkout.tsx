
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Lock, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Package, 
  Smartphone,
  QrCode,
  Loader2,
  Building2,
  MessageCircle
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { simulatePhonePePayment, generateUPIIntentLink } from '../lib/phonepe';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (order: Order) => void;
}

// --- CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = '8589328757:AAGj2NyxJjC32NJT2aREQawFcytZdpM3gnc'; // Paste your Bot Token from BotFather
const TELEGRAM_CHAT_ID = '8528414005'; // Paste the ID you got from @userinfobot
const BOOKING_AMOUNT = 2000;

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'card' | 'cod'>('phonepe');
  const [shippingMethod, setShippingMethod] = useState('white-glove');
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const navigate = useNavigate();
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Payment Step
      if (paymentMethod === 'phonepe') {
        initiatePhonePeFlow();
      } else {
        processOrder();
      }
    }
  };

  // --- TELEGRAM NOTIFICATION LOGIC ---
  const sendTelegramNotification = async (order: Order) => {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes('YOUR_BOT_TOKEN')) return;

    try {
      // 1. Format the Items List
      const itemsList = order.items
        .map((item, index) => {
          const variants = [item.selectedColor, item.selectedSize].filter(Boolean).join(' / ');
          return `${index + 1}. ${item.name}\n   Qty: ${item.quantity} | ₹${item.price.toLocaleString()}\n   ${variants ? `(${variants})` : ''}`;
        })
        .join('\n\n');

      // 2. Construct the Message
      const messageText = `
📦 <b>NEW ORDER RECEIVED</b>
<b>Order ID:</b> #${order.id}
<b>Total:</b> ₹${order.total.toLocaleString()}

👤 <b>CUSTOMER</b>
<b>Name:</b> ${formData.firstName} ${formData.lastName}
<b>Phone:</b> ${formData.phone}
<b>City:</b> ${formData.city} (${formData.zip})
<b>Address:</b> ${formData.address}

🛒 <b>ITEMS</b>
${itemsList}

--------------------------------
<b>Payment:</b> ${paymentMethod.toUpperCase()}
      `.trim();

      // 3. Send to Telegram
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const params = new URLSearchParams();
      params.append('chat_id', TELEGRAM_CHAT_ID);
      params.append('text', messageText);
      params.append('parse_mode', 'HTML');

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

    } catch (error) {
      console.error("Telegram Error:", error);
    }
  };

  const processOrder = async () => {
    setIsProcessing(true);
    
    // 1. Generate ID
    const orderId = `BT-${Math.floor(Math.random() * 900000) + 100000}`;
    
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'Processing',
      items: [...cart],
      total: cartTotal
    };

    try {
      // 2. Insert into Supabase 'orders' table
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: user?.id || null, // Link to auth user if logged in
          customer_details: formData,
          total: cartTotal,
          status: 'Processing'
        });

      if (orderError) throw orderError;

      // 3. Insert into Supabase 'order_items' table
      const orderItems = cart.map(item => ({
        order_id: orderId,
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        variant: [item.selectedColor, item.selectedSize].filter(Boolean).join(', ')
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 4. Send Telegram & Finish
      await sendTelegramNotification(newOrder);
      
      onPlaceOrder(newOrder);
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error("Order Failed:", error.message);
      setIsProcessing(false);
      alert("There was an issue saving your order. Please try again.");
    }
  };

  const initiatePhonePeFlow = async () => {
    setIsProcessing(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = await simulatePhonePePayment(BOOKING_AMOUNT);
    
    if (success) {
      processOrder();
    } else {
      setIsProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  // Generate a dummy UPI link for the current cart
  const dummyOrderForLink: Order = {
    id: `BT-TEMP`,
    date: new Date().toISOString(),
    status: 'Processing',
    items: cart,
    total: BOOKING_AMOUNT
  };
  const upiLink = generateUPIIntentLink(dummyOrderForLink);

  return (
    <div className="pt-24 pb-32 md:pt-32 md:pb-40 bg-[#fafafa] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <Link to="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-stone-400 hover:text-stone-900 transition-colors">
            <ChevronLeft size={16} /> Return to Shop
          </Link>
          <div className="flex items-center gap-3">
             <Lock size={14} className="text-stone-300" />
             <span className="text-[10px] uppercase tracking-widest font-black text-stone-300">Secure Reservation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-24">
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="flex items-center justify-between pb-8 md:pb-12 border-b border-stone-100">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${step >= i ? 'text-stone-900' : 'text-stone-300'}`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black border-2 transition-all duration-500 ${step >= i ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100'}`}>
                       {step > i ? <CheckCircle size={18} /> : i}
                    </div>
                    <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black hidden xs:block">{i === 1 ? 'Identity' : i === 2 ? 'Logistics' : 'Deposit'}</span>
                 </div>
               ))}
            </div>

            <form onSubmit={handleNext} className="space-y-10 md:space-y-12">
               {step === 1 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-4xl md:text-5xl font-serif">Delivery Identity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <Input 
                         name="firstName" 
                         label="First Name" 
                         placeholder="Julius" 
                         value={formData.firstName} 
                         onChange={handleInputChange} 
                         required 
                       />
                       <Input 
                         name="lastName" 
                         label="Last Name" 
                         placeholder="Wright" 
                         value={formData.lastName} 
                         onChange={handleInputChange} 
                         required 
                       />
                       <div className="md:col-span-2">
                         <Input 
                           name="phone" 
                           label="Mobile Phone Number" 
                           type="tel" 
                           placeholder="+91 63904 73964" 
                           value={formData.phone} 
                           onChange={handleInputChange} 
                           required 
                         />
                       </div>
                       <div className="md:col-span-2">
                         <Input 
                           name="address" 
                           label="Structural Address" 
                           placeholder="Suite 402, Architectural Plaza" 
                           value={formData.address} 
                           onChange={handleInputChange} 
                           required 
                         />
                       </div>
                       <Input 
                         name="city" 
                         label="City" 
                         placeholder="Tiruchirappalli" 
                         value={formData.city} 
                         onChange={handleInputChange} 
                         required 
                       />
                       <Input 
                         name="zip" 
                         label="Postal Code" 
                         placeholder="620017" 
                         value={formData.zip} 
                         onChange={handleInputChange} 
                         required 
                       />
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-4xl md:text-5xl font-serif">Logistics Preference</h2>
                    <div className="space-y-4">
                       <ShippingOption id="white-glove" icon={<Package size={24} />} title="White-Glove Delivery" price="Free" desc="Includes assembly and layout." active={shippingMethod === 'white-glove'} onSelect={() => setShippingMethod('white-glove')} />
                       <ShippingOption id="showroom" icon={<Building2 size={24} />} title="Showroom Pickup" price="Free" desc="Visit our Srinivasa Nagar gallery." active={shippingMethod === 'showroom'} onSelect={() => setShippingMethod('showroom')} />
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-4xl md:text-5xl font-serif">Booking Deposit</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      {/* PhonePe Option */}
                      <button type="button" onClick={() => setPaymentMethod('phonepe')} className={`py-5 px-6 rounded-3xl border-2 transition-all relative overflow-hidden ${paymentMethod === 'phonepe' ? 'border-[#5f259f] bg-[#5f259f]/5' : 'border-stone-100 bg-white text-stone-400'}`}>
                        {paymentMethod === 'phonepe' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#5f259f] animate-pulse" />}
                        <div className="flex flex-col items-center">
                           <div className="w-8 h-8 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-lg mb-2">Pe</div>
                           <span className={`text-[10px] font-black uppercase ${paymentMethod === 'phonepe' ? 'text-[#5f259f]' : ''}`}>PhonePe</span>
                        </div>
                      </button>

                      <button type="button" onClick={() => setPaymentMethod('card')} className={`py-5 px-6 rounded-3xl border-2 transition-all ${paymentMethod === 'card' ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100 bg-white text-stone-400'}`}><CreditCard size={24} /><span className="text-[10px] font-black uppercase mt-3 block">Card</span></button>
                      <button type="button" onClick={() => setPaymentMethod('cod')} className={`py-5 px-6 rounded-3xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-stone-900 bg-stone-900 text-white shadow-xl' : 'border-stone-100 bg-white text-stone-400'}`}><Truck size={24} /><span className="text-[10px] font-black uppercase mt-3 block">Shop</span></button>
                    </div>
                    
                    <div className="p-8 bg-white border border-stone-100 rounded-[2rem] shadow-sm animate-in zoom-in duration-300">
                       
                       {paymentMethod === 'phonepe' && (
                         <div className="text-center space-y-6">
                            <h4 className="text-sm font-black uppercase text-[#5f259f]">Secure UPI Payment</h4>
                            <p className="text-[11px] text-stone-400 leading-relaxed max-w-xs mx-auto">
                              You will be redirected to the PhonePe gateway to complete your transaction safely.
                            </p>
                            <div className="flex justify-center gap-4">
                               <div className="flex flex-col items-center gap-2 p-4 bg-stone-50 rounded-xl">
                                  <Smartphone size={24} className="text-[#5f259f]" />
                                  <span className="text-[9px] font-bold uppercase text-stone-400">App</span>
                               </div>
                               <div className="flex flex-col items-center gap-2 p-4 bg-stone-50 rounded-xl">
                                  <QrCode size={24} className="text-[#5f259f]" />
                                  <span className="text-[9px] font-bold uppercase text-stone-400">QR Code</span>
                               </div>
                            </div>
                            
                            {/* Mobile Only: UPI Intent Link */}
                            <div className="md:hidden pt-4">
                              <a href={upiLink} className="inline-block border-b border-[#5f259f] text-[#5f259f] text-[10px] font-bold uppercase tracking-widest pb-1">
                                Open PhonePe App Directly
                              </a>
                            </div>
                         </div>
                       )}

                       {paymentMethod === 'card' && <div className="space-y-6"><Input label="Card Number" placeholder="0000 0000 0000 0000" /><div className="grid grid-cols-2 gap-4"><Input label="Expiry" placeholder="MM / YY" /><Input label="CVC" placeholder="000" /></div></div>}
                       {paymentMethod === 'cod' && <div className="text-center py-6"><h4 className="text-sm font-black uppercase">Pay at Showroom</h4><p className="text-[10px] text-stone-400 italic">Visit our gallery to finalize.</p></div>}
                    </div>
                 </div>
               )}

               <button 
                type="submit" 
                disabled={isProcessing} 
                className={`w-full py-6 md:py-8 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all ${paymentMethod === 'phonepe' ? 'bg-[#5f259f] hover:bg-[#4b1d7f] text-white' : 'bg-stone-900 hover:bg-black text-white'}`}
               >
                  {isProcessing ? (
                    <span className="flex items-center gap-3">
                      <Loader2 size={16} className="animate-spin" /> 
                      {paymentMethod === 'phonepe' ? 'Contacting PhonePe...' : 'Processing...'}
                    </span>
                  ) : step < 3 ? 'Proceed to Logistics' : `Pay ₹${BOOKING_AMOUNT.toLocaleString()} Deposit`}
                  {!isProcessing && <ArrowRight size={18} />}
               </button>
            </form>
          </div>

          <div className="lg:col-span-5">
             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-10 lg:sticky lg:top-32">
                <h3 className="text-2xl font-serif">Curated Design</h3>
                <div className="pt-8 border-t border-stone-50 space-y-5">
                   <div className="flex justify-between text-[11px] uppercase font-black text-stone-400"><span>Required Booking Deposit</span><span className="text-stone-900">₹{BOOKING_AMOUNT.toLocaleString()}.00</span></div>
                   <div className="pt-8 border-t border-stone-50 flex justify-between items-end">
                      <div className="space-y-1"><span className="block text-[10px] uppercase font-black text-stone-300">Amount to Pay Now</span><span className="text-4xl font-serif text-stone-900">₹{BOOKING_AMOUNT.toLocaleString()}.00</span></div>
                      <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full mb-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /><span className="text-[9px] font-black uppercase text-stone-400">Booking Open</span></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] p-8 md:p-16 text-center shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-700 ease-out">
            <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"><CheckCircle size={40} className="text-white" /></div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Design Reserved</h2>
                <p className="text-stone-400 text-[10px] uppercase tracking-[0.5em] font-black">Success Code: #{cart[0] ? `BT-${Math.floor(Math.random()*90000)+10000}` : 'ORDER'}</p>
              </div>
              <div className="py-8 px-6 bg-stone-50 rounded-[2rem] border border-stone-100 space-y-6">
                <h4 className="text-stone-900 font-serif text-xl md:text-2xl">Visit Our Showroom</h4>
                <p className="text-stone-500 text-sm italic font-serif leading-relaxed mx-auto max-w-xs">"A warm greeting awaits you at Balajee Traders. Experience architectural comfort in person."</p>
                <div className="flex items-center justify-center gap-3 text-stone-900 text-left"><MapPin size={18} className="shrink-0" /><p className="text-[10px] uppercase tracking-widest font-black leading-relaxed">No.4, 5th main street, 7th cross, <br />Vayalur Rd, Srinivasa Nagar, <br />Tiruchirappalli, TN 620017</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+916390473964" className="bg-stone-100 text-stone-900 py-5 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition-all"><Phone size={16} /> Call</a>
                <a href="https://wa.me/916390473964" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-5 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-green-200"><MessageCircle size={16} /> WhatsApp</a>
              </div>
              <button onClick={handleViewOrders} className="w-full bg-stone-900 text-white py-6 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all">
                View My Orders <ArrowRight size={18} />
              </button>
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
    <input className="w-full bg-white border border-stone-100 rounded-2xl h-14 md:h-16 px-6 md:px-8 outline-none focus:border-stone-900 transition-all text-sm font-medium" {...props} />
  </div>
);

const ShippingOption = ({ id, icon, title, price, desc, active, onSelect }: any) => (
  <div onClick={onSelect} className={`p-6 md:p-10 rounded-[2rem] border-2 transition-all cursor-pointer ${active ? 'border-stone-900 bg-white shadow-xl' : 'border-stone-100 bg-white/50 hover:border-stone-200'}`}>
    <div className="flex gap-6 items-center">
      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${active ? 'bg-stone-900 text-white' : 'bg-white text-stone-400'}`}>{icon}</div>
      <div className="space-y-1"><h4 className="text-sm md:text-base font-black uppercase text-stone-900">{title}</h4><p className="text-[11px] text-stone-400 italic">{desc}</p></div>
    </div>
    <div className="text-right"><div className={`text-base font-serif font-bold ${active ? 'text-stone-900' : 'text-stone-300'}`}>{price}</div></div>
  </div>
);

export default Checkout;
