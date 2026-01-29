
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ROOMS } from '../constants';

const ShopByRoom: React.FC = () => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    bgRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === activeRoomIndex) {
        gsap.to(el, { opacity: 1, duration: 1, ease: 'power2.out' });
        gsap.to(el, { scale: 1, duration: 2, ease: 'power1.out' });
      } else {
        gsap.to(el, { opacity: 0, duration: 0.8, ease: 'power2.in' });
        gsap.set(el, { scale: 1.1 });
      }
    });
  }, [activeRoomIndex]);

  const handleRoomClick = (roomType: string) => {
    navigate(`/shop?room=${encodeURIComponent(roomType)}`);
  };

  return (
    <section id="rooms" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-neutral-900">
      {/* Background Images */}
      {ROOMS.map((room, idx) => (
        <div
          key={room.type}
          ref={(el) => { bgRefs.current[idx] = el; }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${room.image})`, opacity: idx === 0 ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium">Curated Spaces</h2>
            <h3 className="text-white text-5xl md:text-7xl font-serif">Shop By Room</h3>
          </div>

          <nav className="flex flex-col space-y-6">
            {ROOMS.map((room, idx) => (
              <button
                key={room.type}
                className={`group flex items-center space-x-6 text-left transition-all duration-300 ${
                  activeRoomIndex === idx ? 'opacity-100 translate-x-4' : 'opacity-40 hover:opacity-100'
                }`}
                onMouseEnter={() => setActiveRoomIndex(idx)}
                onClick={() => handleRoomClick(room.type)}
              >
                <span className="text-white text-4xl md:text-5xl font-serif italic">0{idx + 1}</span>
                <div className="flex flex-col">
                  <span className="text-white text-2xl md:text-3xl font-serif tracking-wide">{room.type}</span>
                  <span className={`text-white/60 text-sm transition-all duration-500 overflow-hidden h-0 ${
                    activeRoomIndex === idx ? 'h-5 mt-1' : ''
                  }`}>
                    {room.description}
                  </span>
                </div>
              </button>
            ))}
          </nav>
          
          <button 
            onClick={() => navigate('/rooms')}
            className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest pt-4"
          >
            Explore Rooms Hub
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="hidden lg:flex justify-end">
          <div 
            onClick={() => handleRoomClick(ROOMS[activeRoomIndex].type)}
            className="w-[450px] aspect-[4/5] relative border border-white/20 p-4 group cursor-pointer overflow-hidden"
          >
            <img 
              src={ROOMS[activeRoomIndex].image} 
              alt={ROOMS[activeRoomIndex].type}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
               <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                  <ArrowRight size={24} />
               </div>
            </div>
            <div className="absolute bottom-10 left-10 text-white">
               <span className="block text-[10px] uppercase tracking-widest mb-2">Collection</span>
               <span className="text-2xl font-serif">{ROOMS[activeRoomIndex].type} 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByRoom;
