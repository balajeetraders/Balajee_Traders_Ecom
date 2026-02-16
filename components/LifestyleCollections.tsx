
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const ROOM_COLLECTIONS = [
  { name: 'Living Room', subtitle: 'The Heart of Gathering', path: '/rooms/living-room' },
  { name: 'Bedroom', subtitle: 'The Sanctuary of Sleep', path: '/rooms/bedroom' },
  { name: 'Dining Room', subtitle: 'The Stage for Connection', path: '/rooms/dining-room' },
  { name: 'Home Office', subtitle: 'The Forge of Ambition', path: '/rooms/office' },
];

const LifestyleCollections: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the image
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text reveal
      gsap.from('.collection-text-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Large Lifestyle Image */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] md:aspect-[3/2] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-stone-100">
              <div ref={imageRef} className="absolute inset-0 -top-20 h-[120%] w-full">
                <img 
                  src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Curated Living Space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-stone-900/10" />
            </div>
          </div>

          {/* Text Content Block */}
          <div className="w-full lg:w-2/5 space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <span className="collection-text-reveal text-[10px] uppercase tracking-[0.6em] font-black text-stone-300 block">Atmosphere</span>
              <h2 className="collection-text-reveal text-5xl md:text-7xl font-serif text-stone-900 leading-[0.9] tracking-tighter">
                Furnish <br /> <span className="italic font-light opacity-50">Every Corner</span>
              </h2>
              <p className="collection-text-reveal text-stone-500 text-sm md:text-lg italic font-serif leading-relaxed max-w-sm">
                Your home is more than a structure; it is a living canvas of your personal journey. We curate pieces that breathe life into every nook and cranny.
              </p>
            </div>

            {/* Room List */}
            <nav className="space-y-8 pt-8">
              {ROOM_COLLECTIONS.map((room) => (
                <button
                  key={room.name}
                  onClick={() => navigate(room.path)}
                  className="collection-text-reveal group flex items-end justify-between w-full text-left border-b border-stone-100 pb-6 transition-all hover:border-stone-900"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-300 group-hover:text-stone-900 transition-colors">
                      {room.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-900">{room.name}</h3>
                  </div>
                  <ArrowRight size={20} className="text-stone-200 group-hover:text-stone-900 group-hover:translate-x-2 transition-all" />
                </button>
              ))}
            </nav>

            <div className="pt-8 collection-text-reveal">
              <button 
                onClick={() => navigate('/rooms')}
                className="px-12 py-5 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center gap-4"
              >
                Explore Collections <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LifestyleCollections;
