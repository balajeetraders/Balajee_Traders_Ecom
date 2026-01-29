
import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SLIDES = [
  {
    id: 1,
    title: 'Corby',
    subtitle: 'sofas',
    price: '$199.00',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'bg-[#dae5e9]',
  },
  {
    id: 2,
    title: 'Verona',
    subtitle: 'sofas',
    price: '$259.00',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'bg-[#e5e1da]',
  },
  {
    id: 3,
    title: 'Lewis',
    subtitle: 'collection',
    price: '$349.00',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'bg-[#f2efe9]',
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const nextSlide = () => {
    const nextIndex = (current + 1) % SLIDES.length;
    const tl = gsap.timeline();
    
    tl.to([textRef.current, imgRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(nextIndex);
        gsap.fromTo(textRef.current, 
          { opacity: 0, y: -20 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo(imgRef.current, 
          { opacity: 0, x: 50 }, 
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        );
      }
    });
  };

  const nextItem = SLIDES[(current + 1) % SLIDES.length];

  return (
    <section className={`relative h-[85vh] md:h-screen w-full flex items-center overflow-hidden transition-colors duration-1000 ${SLIDES[current].bgColor}`}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center flex-grow">
          {/* Left Content */}
          <div ref={textRef} className="space-y-4 md:space-y-10 max-w-xl flex flex-col items-start">
            <div className="space-y-[-5px] md:space-y-[-15px]">
              <h1 className="text-5xl md:text-[140px] font-serif font-medium leading-[0.9] tracking-tighter text-stone-900">
                {SLIDES[current].title}
              </h1>
              <h2 className="text-4xl md:text-[120px] font-serif font-light leading-[0.9] italic text-stone-800 opacity-90">
                {SLIDES[current].subtitle}
              </h2>
            </div>
            
            <div className="space-y-3 md:space-y-8">
              <p className="text-stone-500 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">
                Acquisition from <span className="text-stone-900 ml-1">{SLIDES[current].price}</span>
              </p>
              
              <button 
                onClick={() => navigate('/shop')}
                className="flex items-center gap-3 md:gap-5 bg-stone-900 text-white px-6 py-3 md:px-12 md:py-6 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] group transition-all hover:bg-black shadow-2xl scale-90 md:scale-100 origin-left"
              >
                Shop Now
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-2 md:w-[20px]" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] md:max-w-[700px] aspect-video lg:aspect-square flex items-center justify-center">
              <img
                ref={imgRef}
                src={SLIDES[current].image}
                alt={SLIDES[current].title}
                className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] md:drop-shadow-[0_45px_45px_rgba(0,0,0,0.15)] transition-transform duration-1000"
              />
            </div>
          </div>
        </div>

        {/* Navigation Indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={nextSlide}
            className="flex items-center gap-3 md:gap-6 group bg-white/20 hover:bg-white/90 p-1 md:p-2 pr-4 md:pr-10 rounded-full transition-all backdrop-blur-xl border border-white/40 shadow-xl"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src={nextItem.image} alt="Next" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="text-left hidden xs:block">
              <span className="block text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black text-stone-400">Next</span>
              <span className="block text-xs md:text-base font-serif font-bold text-stone-900">{nextItem.title} curation</span>
            </div>
            <ChevronRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform md:w-[20px]" />
          </button>
        </div>
      </div>

      {/* Vertical Page Dots */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-6 z-20">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-[2px] md:w-[4px] transition-all duration-700 rounded-full ${current === idx ? 'h-8 md:h-12 bg-stone-900' : 'h-[2px] md:h-[4px] bg-stone-400/40 hover:bg-stone-900'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
