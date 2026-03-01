
import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Smartphone, ChevronRight, Globe, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const { user, profile, loading: authLoading, signOut, signInWithGoogle, oauthLoading } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!authLoading && containerRef.current) {
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
    }
  }, [mode, authLoading]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            },
          },
        });
        if (error) throw error;
        alert('Account created! Please check your email to verify.');
        setMode('login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // ── Screens ─────────────────────────────────────────────────────────────

  // Full-screen overlay shown during Google OAuth redirect
  if (oauthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
        <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-stone-900">Redirecting to Google</p>
          <p className="text-xs text-stone-400">You'll be signed in automatically when you return.</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-stone-900" size={32} />
      </div>
    );
  }

  // --- LOGGED IN VIEW ---
  if (user) {
    return (
      <div ref={containerRef} className="pt-32 pb-40 bg-white min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-12 account-reveal">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-stone-100 pb-8 gap-6">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Personal Portal</span>
                <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
                  Welcome back, <br /> <span className="italic text-stone-400">{profile?.first_name || user.email?.split('@')[0]}</span>
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-stone-50 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-serif">Profile Details</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-black text-stone-400 tracking-widest">Email</label>
                    <p className="text-stone-900 font-medium">{user.email}</p>
                  </div>
                  {profile?.phone && (
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-stone-400 tracking-widest">Phone</label>
                      <p className="text-stone-900 font-medium">{profile.phone}</p>
                    </div>
                  )}
                  <div className="pt-4">
                    <button className="text-[10px] uppercase font-black tracking-widest border-b border-stone-900 pb-1">Edit Information</button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-stone-900 text-white rounded-[2rem] space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif">Order History</h3>
                  <p className="text-stone-400 text-sm">Track your architectural acquisitions.</p>
                </div>
                <button onClick={() => navigate('/orders')} className="w-full bg-white text-stone-900 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-stone-200 transition-colors">
                  View Orders <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGIN / SIGNUP VIEW ---
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
            <div className="bg-white border border-stone-100 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl space-y-5 relative overflow-hidden">
              {/* Mode Switcher */}
              <div className="flex bg-stone-50 p-1.5 rounded-full">
                <button
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${mode === 'login' ? 'bg-white shadow-md text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${mode === 'signup' ? 'bg-white shadow-md text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
                >
                  Register
                </button>
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              {/* ── Google Sign-In ── primary CTA at top ── */}
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 h-14 bg-white border-2 border-stone-200 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                  </g>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
                <span className="relative px-4 bg-white text-[9px] uppercase tracking-widest font-black text-stone-300">Or continue with email</span>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleAuth}>
                {mode === 'signup' && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" placeholder="ram" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} required />
                      <Input label="Last Name" placeholder="kumar" value={lastName} onChange={(e: any) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                )}

                <Input label="Email Address" type="email" placeholder="ram@example.com" icon={<Mail size={16} />} value={email} onChange={(e: any) => setEmail(e.target.value)} required />
                <Input label="Security Key" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={password} onChange={(e: any) => setPassword(e.target.value)} required />

                {mode === 'signup' && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" icon={<Smartphone size={16} />} value={phone} onChange={(e: any) => setPhone(e.target.value)} />
                  </div>
                )}

                <button
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl mt-4 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      {mode === 'login' ? 'Enter Sanctuary' : 'Establish Account'} <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
              {/* (old divider + google button removed — now at top) */}

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
      {icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-stone-900 transition-colors">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-stone-50/50 border border-stone-100 rounded-xl md:rounded-2xl h-14 md:h-16 ${icon ? 'pl-12' : 'pl-6'} pr-6 outline-none focus:border-stone-900 transition-all text-xs md:text-sm font-medium focus:bg-white`}
        {...props}
      />
    </div>
  </div>
);

export default Account;
