
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LifestyleVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breathing effect on the video container
      gsap.fromTo(videoRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Fade in label when section is visible
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-stone-900"
    >
      {/* Local home footage video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        poster="https://images.unsplash.com/photo-1616489953149-7551745cae3a?auto=format&fit=crop&q=80&w=2400"
      >
        <source
          src="/assets/Video Project 3 (1).mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Filmic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />

      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div ref={labelRef} className="space-y-4 md:space-y-6">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-black text-white/50 block">
            The Philosophy of Space
          </span>
          <h2 className="text-5xl md:text-[9vw] font-serif text-white leading-tight tracking-tighter">
            Living <span className="italic font-light opacity-60">Well</span>
          </h2>
          <div className="pt-8">
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent mx-auto" />
          </div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-6 md:left-12 bottom-12 hidden lg:block">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 rotate-180 [writing-mode:vertical-lr]">
          Balajee Traders — Real Homes
        </span>
      </div>
    </section>
  );
};

export default LifestyleVideo;
