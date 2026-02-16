
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SLIDES = [
  {
    id: 'living',
    title: 'The Living Sanctuary',
    subtitle: 'Architecture of Comfort',
    description: 'Curating the silent dialogue between space and soul.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2400',
    link: '/shop?room=Living Room'
  },
  {
    id: 'dining',
    title: 'The Dining Ritual',
    subtitle: 'Crafted for Connection',
    description: 'Where the alchemy of gathering meets sculptural precision.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e16208a50a?auto=format&fit=crop&q=80&w=2400',
    link: '/shop?room=Dining Room'
  },
  {
    id: 'bedroom',
    title: 'The Sleep Retreat',
    subtitle: 'Quietude Refined',
    description: 'A personal sanctuary designed for profound serenity.',
    image: 'https://images.unsplash.com/photo-1616594106291-141786d8d7f4?auto=format&fit=crop&q=80&w=2400',
    link: '/shop?room=Bedroom'
  },
  {
    id: 'kitchen',
    title: 'The Culinary Studio',
    subtitle: 'Function as Art',
    description: 'Minimalist utility meeting high-end material heritage.',
    image: 'https://images.unsplash.com/photo-1556912177-c54030739840?auto=format&fit=crop&q=80&w=2400',
    link: '/shop?category=Kitchen'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const transitionSlide = (nextIndex: number) => {
    const tl = gsap.timeline();
    
    // Out animation
    tl.to(contentRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.in' });
    tl.to(slideRef.current, { scale: 1.05, opacity: 0.8, duration: 0.8, ease: 'power2.inOut' }, "-=0.4");
    
    tl.add(() => {
      setCurrent(nextIndex);
    });

    // In animation
    tl.fromTo(slideRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' });
    tl.fromTo(contentRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8");
  };

  const nextSlide = () => transitionSlide((current + 1) % SLIDES.length);

  useEffect(() => {
    // 5 Second loop
    timerRef.current = window.setInterval(nextSlide, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  return (
    <section className="relative h-[100dvh] w-full bg-stone-900 overflow-hidden">
      {/* Background Image Container */}
      <div ref={slideRef} className="absolute inset-0 w-full h-full">
        <img 
          src={SLIDES[current].image} 
          alt={SLIDES[current].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/30 backdrop-brightness-90" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center pt-20 pb-32 md:py-0">
        <div ref={contentRef} className="max-w-4xl space-y-6 md:space-y-10">
          <div className="space-y-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] font-black text-white/60 block animate-in fade-in slide-in-from-left-4 duration-1000">
              {SLIDES[current].subtitle}
            </span>
            <h1 className="text-4xl md:text-[8vw] font-serif text-white leading-[1.1] md:leading-[0.85] tracking-tighter">
              {SLIDES[current].title.split(' ')[0]} <br />
              <span className="italic font-light opacity-60 ml-[0.2em] md:ml-[1em]">
                {SLIDES[current].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>
          
          <p className="text-white/70 text-sm md:text-xl italic font-serif max-w-lg leading-relaxed">
            {SLIDES[current].description}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4 md:pt-6">
            <button 
              onClick={() => navigate(SLIDES[current].link)}
              className="px-6 py-4 md:px-10 md:py-5 bg-white text-stone-900 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-stone-100 transition-all shadow-2xl active:scale-95 flex items-center gap-3"
            >
              Explore Room <ArrowRight size={14} className="md:w-4 md:h-4" />
            </button>
            <button 
              onClick={() => navigate('/shop')}
              className="px-6 py-4 md:px-10 md:py-5 bg-transparent text-white border border-white/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Collection
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-24 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-4">
        <div className="flex items-center gap-3">
          {SLIDES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => transitionSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'bg-white w-12' : 'bg-white/30 w-1.5'}`}
            />
          ))}
        </div>
      </div>

      {/* Side Label */}
      <div className="hidden lg:block absolute left-12 top-1/2 -rotate-90 origin-left -translate-y-1/2 z-20">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-white/20">
          Balajee Traders — Curation 2025
        </span>
      </div>
    </section>
  );
};

export default Hero;
