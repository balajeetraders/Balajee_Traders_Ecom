
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ROOMS } from '../constants';

const Rooms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.room-scene').forEach((section: any) => {
        gsap.from(section.querySelector('.reveal-text'), {
          y: 50,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-950 min-h-screen">
      {/* Immersive Mobile-First Hub Header */}
      <section className="h-[70vh] md:h-screen relative flex items-center justify-center overflow-hidden">
         <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" 
          alt="Atmosphere"
         />
         <div className="relative z-20 text-center space-y-6 max-w-4xl px-6">
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-stone-400 block animate-pulse">Atmospheric Portals</span>
            <h1 className="text-4xl sm:text-6xl md:text-[10vw] font-serif text-white leading-tight md:leading-[0.85] tracking-tighter">
              Explore <span className="italic font-light opacity-50">Spaces</span>
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm md:text-lg italic font-serif max-w-xl mx-auto leading-relaxed">
              Step inside the architecture of life. Every room is a curated scene, every object a protagonist.
            </p>
         </div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
            <span className="text-[8px] uppercase tracking-[0.5em] text-white/40 font-black">Scroll to enter</span>
         </div>
      </section>

      {/* Edge-to-Edge Visual Storytelling */}
      <section className="pb-40">
        {ROOMS.map((room, idx) => (
          <div 
            key={room.id}
            onClick={() => navigate(`/rooms/${room.id}`)}
            className="room-scene relative h-[70vh] md:h-screen w-full cursor-pointer overflow-hidden border-b border-white/5"
          >
             <img 
              src={room.image} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3000ms]" 
              alt={room.type} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
             
             <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-end py-16 md:py-24 space-y-6 md:space-y-8">
                <div className="reveal-text space-y-3 md:space-y-4">
                   <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-400 block">Scene 0{idx + 1}</span>
                   <h3 className="text-4xl md:text-[8vw] font-serif text-white leading-none tracking-tighter">{room.type}</h3>
                   <p className="text-stone-400 text-xs md:text-xl italic font-serif max-w-md line-clamp-3 md:line-clamp-none">
                      {room.description}
                   </p>
                   <div className="pt-4 md:pt-6">
                      <button className="flex items-center gap-4 md:gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2 md:pb-3 hover:gap-10 hover:border-white transition-all duration-700">
                         Explore Space <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </section>

      {/* Philosophy Anchor */}
      <section className="py-24 md:py-40 bg-white text-stone-900 rounded-t-[2.5rem] md:rounded-t-[5rem] text-center px-6">
        <div className="container mx-auto space-y-8 md:space-y-12">
           <blockquote className="text-2xl md:text-6xl font-serif italic max-w-4xl mx-auto leading-tight font-light">
            "Design is a sensory dialogue between the inhabitant and the architecture."
           </blockquote>
           <div className="w-16 md:w-20 h-px bg-stone-100 mx-auto" />
           <p className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-300">Curatorial Statement 2025</p>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
