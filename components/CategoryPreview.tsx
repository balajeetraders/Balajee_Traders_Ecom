
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ROOMS } from '../constants';

const CategoryPreview: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro animation for the whole section
    gsap.from('.category-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      }
    });
  }, { scope: sectionRef });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const reassuranceLines: Record<string, string> = {
    'Living Room': 'Designed for everyday gathering.',
    'Bedroom': 'Architectural peace for your retreat.',
    'Dining Room': 'A stage for meaningful connection.',
    'Office': 'Precision meets creative flow.'
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-300 block">The Emotional Path</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">
              Shop by <span className="italic font-light opacity-50">Atmosphere</span>
            </h2>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto md:block">
            <p className="text-stone-400 text-sm md:text-base italic font-serif max-w-xs md:text-right hidden md:block">
              Every room tells a story. Select your next chapter.
            </p>
            
            {/* Mobile Navigation Buttons */}
            <div className="flex md:hidden gap-3">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef} 
          className="w-full overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory"
        >
          <div className="flex gap-6 md:gap-8 md:grid md:grid-cols-4 w-max md:w-full pb-8 md:pb-0 px-1">
            {ROOMS.map((room) => (
              <div 
                key={room.id}
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="category-card group w-[80vw] md:w-auto min-w-[280px] md:min-w-0 cursor-pointer space-y-6 snap-center"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-stone-50 shadow-sm border border-stone-100/50">
                  <img 
                    src={room.image} 
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-700" />
                  
                  {/* Minimal Overlay Button */}
                  <div className="absolute bottom-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <ArrowRight size={18} className="text-stone-900" />
                    </div>
                  </div>
                </div>

                <div className="px-2 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-900">{room.type}</h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest font-black text-stone-300 italic group-hover:text-stone-900 transition-colors">
                    {reassuranceLines[room.type] || 'Designed for everyday living.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPreview;
