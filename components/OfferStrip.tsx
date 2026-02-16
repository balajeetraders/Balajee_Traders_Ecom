
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, MapPin, Ruler, Truck, Zap } from 'lucide-react';

const MESSAGES = [
  { text: '20% OFF ON CONTEMPORARY SEATING', icon: Zap },
  { text: '10% OFF YOUR FIRST ARCHITECTURAL PIECE', icon: Sparkles },
  { text: 'LIMITED TIME: 15% OFF DINING RITUALS', icon: Ruler },
  { text: 'VISIT OUR SHOWROOM FOR EXCLUSIVE IN-GALLERY OFFERS', icon: MapPin },
];

const OfferStrip: React.FC<{ className?: string }> = ({ className = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Create a seamless loop by cloning content
    const totalWidth = el.scrollWidth;
    
    const animation = gsap.to(el, {
      x: `-${totalWidth / 2}px`,
      duration: 35, // Slightly faster for urgency
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className={`w-full overflow-hidden bg-stone-50 border-y border-stone-100 py-4 select-none ${className}`}>
      <div ref={scrollRef} className="flex whitespace-nowrap gap-12 md:gap-24 w-max">
        {/* Render twice for seamless loop */}
        {[...MESSAGES, ...MESSAGES].map((msg, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <msg.icon size={12} className="text-stone-900" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-stone-900">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferStrip;
