
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Users, MessageSquare, Send, User, AtSign, AlignLeft } from 'lucide-react';
import gsap from 'gsap';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-up', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
      gsap.from('.bg-text', {
        x: -100,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-hero',
          start: 'top center',
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-[#f0f7f9] text-center contact-hero">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif text-[#1a2d44] mb-4 reveal-up">Contact us</h1>
          <nav className="flex justify-center items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-stone-400 reveal-up">
            <Link to="/" className="hover:text-[#1a2d44] transition-colors">Home</Link>
            <span className="text-stone-300">/</span>
            <span className="text-[#1a2d44]">Contact us</span>
          </nav>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Office Location */}
            <div className="space-y-6 reveal-up">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <MapPin size={18} className="text-stone-900" />
                <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">Office location</h3>
              </div>
              <div className="text-sm text-stone-500 leading-relaxed">
                <p>16122 Collins street,</p>
                <p>Melbourne, Australia</p>
              </div>
            </div>

            {/* Send a Message */}
            <div className="space-y-6 reveal-up">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <Mail size={18} className="text-stone-900" />
                <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">Send a message</h3>
              </div>
              <div className="text-sm text-stone-500 leading-relaxed">
                <p>info@yourdomain.com</p>
                <p>sales@yourdomain.com</p>
              </div>
            </div>

            {/* Call us Directly */}
            <div className="space-y-6 reveal-up">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <Phone size={18} className="text-stone-900" />
                <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">Call us directly</h3>
              </div>
              <div className="text-sm text-stone-500 leading-relaxed">
                <p>1-800-222-000</p>
                <p>1-800-222-002</p>
              </div>
            </div>

            {/* Join our Team */}
            <div className="space-y-6 reveal-up">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <Users size={18} className="text-stone-900" />
                <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">Join our team</h3>
              </div>
              <div className="text-sm text-stone-500 leading-relaxed">
                <p>hire@yourdomain.com</p>
                <p>hr@yourdomain.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Visual Section */}
      <section className="relative py-40 overflow-hidden bg-white">
        {/* Background Decorative Text */}
        <div className="bg-text absolute left-0 bottom-24 pointer-events-none select-none">
          <h2 className="text-[120px] md:text-[240px] font-bold text-stone-100 leading-none whitespace-nowrap">
            Get in touch!
          </h2>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Image Wrapper */}
            <div className="w-full lg:w-3/5 h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl reveal-up">
              <img 
                src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Modern cabinet decor" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Contact Form */}
            <div className="w-full lg:w-2/5 lg:-ml-32 mt-12 lg:mt-32 reveal-up">
              <div className="bg-[#1a2d44] p-10 md:p-16 rounded-xl shadow-2xl relative">
                {/* Decoration Icon */}
                <div className="absolute top-10 right-10 opacity-20">
                  <MessageSquare size={80} className="text-white" strokeWidth={1} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-10">Say salve!</h3>
                
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative border-b border-white/20 pb-4 group">
                    <input 
                      type="text" 
                      placeholder="Your name*" 
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-stone-400 font-medium pr-10"
                    />
                    <User size={16} className="absolute right-0 top-0 text-stone-400 group-focus-within:text-white transition-colors" />
                  </div>
                  
                  <div className="relative border-b border-white/20 pb-4 group">
                    <input 
                      type="email" 
                      placeholder="Your email address*" 
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-stone-400 font-medium pr-10"
                    />
                    <AtSign size={16} className="absolute right-0 top-0 text-stone-400 group-focus-within:text-white transition-colors" />
                  </div>

                  <div className="relative border-b border-white/20 pb-4 group">
                    <textarea 
                      placeholder="Your message" 
                      rows={3}
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-stone-400 font-medium pr-10 resize-none"
                    />
                    <AlignLeft size={16} className="absolute right-0 top-0 text-stone-400 group-focus-within:text-white transition-colors" />
                  </div>

                  <button className="bg-white text-[#1a2d44] px-10 py-4 text-xs font-bold uppercase tracking-widest rounded shadow-xl hover:bg-stone-100 transition-colors flex items-center gap-3">
                    Send message
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] relative bg-stone-100 grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          title="Google Map"
          className="w-full h-full border-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531615!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db!2sCollins%20St%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625484832523!5m2!1sen!2sus"
        />
        
        {/* Map Overlay Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white p-8 shadow-2xl text-center min-w-[300px] border border-stone-50">
            <h4 className="text-xl font-serif text-stone-900 mb-2">Balajee Traders Store</h4>
            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-6 leading-relaxed">
              16122 Collins street,<br /> Melbourne, Australia
            </p>
            <button className="bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors w-full">
              View larger map
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
