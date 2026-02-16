
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Order, CartItem } from '../types';

const Orders: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch orders with items and the associated product image
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            total,
            status,
            created_at,
            items:order_items (
              name,
              quantity,
              price,
              variant,
              product:products (
                image
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map DB response to our UI types
        const formattedOrders: Order[] = (data || []).map((order: any) => ({
          id: order.id,
          date: order.created_at,
          status: order.status,
          total: order.total,
          items: order.items.map((item: any) => ({
            id: 'archived', // ID not critical for display
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            selectedColor: item.variant?.split('/')[0]?.trim(), // Attempt to parse variant string
            image: item.product?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            category: 'Archived',
            room: 'Archived',
            style: 'Archived',
            material: 'Archived',
            description: '',
            rating: 5,
            reviewCount: 0
          } as CartItem))
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchOrders();
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!loading && orders.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.order-card', {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, orders]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 space-y-4">
        <Loader2 className="animate-spin text-stone-900" size={32} />
        <p className="text-[10px] uppercase tracking-widest font-black text-stone-400">Locating Records...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-stone-50 text-center px-6">
        <div className="max-w-md mx-auto space-y-8">
           <AlertCircle size={48} className="mx-auto text-stone-300" />
           <h2 className="text-3xl font-serif text-stone-900">Account Required</h2>
           <p className="text-stone-500">Please sign in to view your architectural acquisition history.</p>
           <Link to="/account" className="inline-block px-8 py-4 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
             Sign In
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pt-24 pb-32 md:pt-40 md:pb-40 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-4">
             <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Purchase History</span>
             <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">Your <span className="italic font-light opacity-50">Collection</span></h1>
          </div>

          {orders.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 bg-white rounded-[3rem] shadow-sm border border-stone-100">
               <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center">
                  <Package size={40} className="text-stone-300" strokeWidth={1} />
               </div>
               <div className="space-y-2">
                 <h2 className="text-2xl font-serif text-stone-900">No acquisitions yet</h2>
                 <p className="text-stone-400 text-sm max-w-xs mx-auto">Start curating your personal sanctuary. Your architectural journey begins in the shop.</p>
               </div>
               <Link to="/shop" className="px-10 py-4 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                 Explore Catalogue
               </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="order-card bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-stone-100 space-y-8">
                   {/* Order Header */}
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-50 pb-6">
                      <div className="space-y-1">
                         <div className="flex items-center gap-3">
                            <h3 className="text-lg font-black text-stone-900 uppercase tracking-widest">Order #{order.id}</h3>
                            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-bold uppercase tracking-wide flex items-center gap-1.5">
                               <CheckCircle size={10} /> {order.status}
                            </div>
                         </div>
                         <p className="text-xs text-stone-400 font-medium">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] uppercase font-black text-stone-300 block">Total Amount</span>
                         <span className="text-xl font-serif text-stone-900">₹{order.total.toLocaleString()}</span>
                      </div>
                   </div>

                   {/* Order Items */}
                   <div className="space-y-6">
                      {order.items.map((item, idx) => (
                         <div key={`${order.id}-${idx}`} className="flex gap-6 items-center">
                            <div className="w-20 h-24 bg-stone-100 rounded-2xl overflow-hidden shrink-0">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                               <h4 className="font-serif text-lg text-stone-900">{item.name}</h4>
                               <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest mt-1">
                                  Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`}
                               </p>
                            </div>
                            <div className="text-right hidden sm:block">
                               <span className="font-medium text-stone-900">₹{item.price.toLocaleString()}</span>
                            </div>
                         </div>
                      ))}
                   </div>

                   <div className="pt-4 flex justify-end">
                      <button className="text-[10px] font-black uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-all flex items-center gap-2">
                         View Receipt <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
