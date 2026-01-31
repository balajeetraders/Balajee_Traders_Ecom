
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Smartphone, ChevronRight, Globe, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const Account: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.account-reveal', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [mode]);

  return (
    <div ref={containerRef} className="pt-24 pb-32 md:pt-40 md:pb-40 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left: Branding & Visual */}
          <div className="w-full lg:w-1/2 space-y-8 md:space-y-12">
            <div className="space-y-4 account-reveal">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Heritage Portal</span>
              <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[0.9]">
                {mode === 'login' ? 'Welcome' : 'Join the'} <br /> 
                <span className="italic font-light opacity-50">{mode === 'login' ? 'Back' : 'Gallery'}</span>
              </h1>
              <p className="text-stone-400 text-sm md:text-lg italic font-serif max-w-sm leading-relaxed">
                Access your curated collection, order history, and architectural wishlist.
              </p>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6 account-reveal">
               <div className="p-8 bg-stone-50 rounded-3xl space-y-4">
                  <ShieldCheck size={28} className="text-stone-900" />
                  <h4 className="text-xs font-black uppercase tracking-tight">Data Integrity</h4>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">Military grade encryption for your personal sanctuary data.</p>
               </div>
               <div className="p-8 bg-stone-50 rounded-3xl space-y-4">
                  <Globe size={28} className="text-stone-900" />
                  <h4 className="text-xs font-black uppercase tracking-tight">Global Access</h4>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">Synchronized across all your architectural interfaces.</p>
               </div>
            </div>
          </div>

          {/* Right: Auth Card */}
          <div className="w-full lg:w-1/2 max-w-md account-reveal">
            <div className="bg-white border border-stone-100 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10 relative overflow-hidden">
               {/* Mode Switcher */}
               <div className="flex bg-stone-50 p-1.5 rounded-full">
                  <button 
                    onClick={() => setMode('login')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${mode === 'login' ? 'bg-white shadow-md text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${mode === 'signup' ? 'bg-white shadow-md text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
                  >
                    Register
                  </button>
               </div>

               {/* Form */}
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {mode === 'signup' && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <Input label="Full Identity Name" placeholder="Julius Wright" icon={<User size={16} />} />
                    </div>
                  )}
                  
                  <Input label="Email Address" type="email" placeholder="julius@example.com" icon={<Mail size={16} />} />
                  <Input label="Security Key" type="password" placeholder="••••••••" icon={<Lock size={16} />} />

                  {mode === 'signup' && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" icon={<Smartphone size={16} />} />
                    </div>
                  )}

                  <button className="w-full bg-stone-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl mt-4">
                    {mode === 'login' ? 'Enter Sanctuary' : 'Establish Account'} <ChevronRight size={16} />
                  </button>
               </form>

               {/* Social Divider */}
               <div className="relative flex items-center justify-center py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
                  <span className="relative px-4 bg-white text-[9px] uppercase tracking-widest font-black text-stone-200">Or Continue With</span>
               </div>

               {/* Google Auth Button */}
               <button className="w-full border-2 border-stone-50 py-5 rounded-2xl flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest hover:border-stone-200 transition-all bg-stone-50/20 group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.94 0 3.51.68 4.71 1.7l3.39-3.39C17.9 1.51 15.21.5 12 .5 7.31.5 3.28 3.17 1.39 7.06l3.96 3.07C6.21 7.22 8.86 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.86 3c2.26-2.09 3.56-5.17 3.56-8.82z" />
                    <path fill="#FBBC05" d="M5.35 14.93c-.26-.77-.4-1.6-.4-2.43 0-.83.14-1.66.4-2.43L1.39 7.06C.51 8.88 0 10.9 0 13c0 2.1.51 4.12 1.39 5.94l3.96-3.01z" />
                    <path fill="#34A853" d="M12 23.5c3.12 0 5.73-1.02 7.64-2.77l-3.86-3c-1.04.7-2.38 1.12-3.78 1.12-3.14 0-5.79-2.18-6.74-5.11l-3.96 3.01C3.28 20.83 7.31 23.5 12 23.5z" />
                  </svg>
                  Google Identity
               </button>

               <div className="text-center">
                  <p className="text-[10px] text-stone-300 font-black uppercase tracking-widest">
                    {mode === 'login' ? "Don't have a place?" : "Already part of us?"}
                    <button 
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="ml-2 text-stone-900 border-b border-stone-900"
                    >
                      {mode === 'login' ? 'Create Account' : 'Sign In'}
                    </button>
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] uppercase tracking-widest font-black text-stone-300 ml-1">{label}</label>
    <div className="relative group">
       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-stone-900 transition-colors">
          {icon}
       </div>
       <input 
        className="w-full bg-stone-50/50 border border-stone-100 rounded-xl md:rounded-2xl h-14 md:h-16 pl-12 pr-6 outline-none focus:border-stone-900 transition-all text-xs md:text-sm font-medium focus:bg-white" 
        {...props} 
       />
    </div>
  </div>
);

export default Account;
