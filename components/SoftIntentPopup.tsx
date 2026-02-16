
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const SoftIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show if not seen in current session
    const hasSeen = sessionStorage.getItem('hasSeenIntentPopup');
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      if (popupRef.current) {
        gsap.fromTo(popupRef.current, 
          { y: 50, opacity: 0, scale: 0.95 }, 
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (path: string) => {
    sessionStorage.setItem('hasSeenIntentPopup', 'true');
    gsap.to(popupRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        navigate(path);
      }
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem('hasSeenIntentPopup', 'true');
    gsap.to(popupRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => setIsVisible(false)
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={popupRef}
      className="fixed bottom-24 md:bottom-12 right-6 md:right-12 z-[100] w-[calc(100%-3rem)] md:w-[400px] bg-stone-50/95 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 md:p-10 pointer-events-auto"
    >
      <button 
        onClick={handleDismiss}
        className="absolute top-6 right-6 p-2 text-stone-300 hover:text-stone-900 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">Personal Curation</span>
          <h3 className="text-3xl font-serif text-stone-900 leading-tight">
            What are you <br />
            <span className="italic font-light opacity-50">furnishing today?</span>
          </h3>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleChoice('/rooms')}
            className="w-full group flex items-center justify-between p-6 bg-white border border-stone-100 rounded-2xl hover:border-stone-900 transition-all text-left"
          >
            <div className="space-y-1">
              <span className="block text-xs font-black uppercase tracking-widest text-stone-900">A full room or space</span>
              <span className="block text-[11px] text-stone-400 italic">Explore atmospheric portals</span>
            </div>
            <ArrowRight size={18} className="text-stone-200 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
          </button>

          <button 
            onClick={() => handleChoice('/shop')}
            className="w-full group flex items-center justify-between p-6 bg-white border border-stone-100 rounded-2xl hover:border-stone-900 transition-all text-left"
          >
            <div className="space-y-1">
              <span className="block text-xs font-black uppercase tracking-widest text-stone-900">A single furniture piece</span>
              <span className="block text-[11px] text-stone-400 italic">Browse the curated archive</span>
            </div>
            <ArrowRight size={18} className="text-stone-200 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        <p className="text-[9px] text-stone-300 uppercase tracking-widest text-center font-black">
          Respecting your creative hesitation
        </p>
      </div>
    </div>
  );
};

export default SoftIntentPopup;
