import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Globe, 
  Truck, 
  MapPin, 
  CreditCard, 
  Headphones,
  Mail,
  Phone
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      {/* Top Features Bar */}
      <div className="bg-white border-y border-stone-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-stone-100">
          <div className="flex items-center gap-5 p-10 lg:p-12">
            <Truck size={40} strokeWidth={1} className="text-stone-900" />
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">Free shipping</h4>
              <p className="text-xs text-stone-400 mt-1">Free return & exchange</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-10 lg:p-12">
            <MapPin size={40} strokeWidth={1} className="text-stone-900" />
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">Store locator</h4>
              <p className="text-xs text-stone-400 mt-1">Find nearest store</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-10 lg:p-12">
            <CreditCard size={40} strokeWidth={1} className="text-stone-900" />
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">Secure payment</h4>
              <p className="text-xs text-stone-400 mt-1">100% secure method</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-10 lg:p-12">
            <Headphones size={40} strokeWidth={1} className="text-stone-900" />
            <div>
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">Online support</h4>
              <p className="text-xs text-stone-400 mt-1">24/7 support center</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="bg-[#1a202c] text-white pt-24 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-3 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-6 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold tracking-tighter text-white">
                  Balajee Traders
                </span>
              </Link>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                We are crafting comfort for every home.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Facebook size={18} /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Globe size={18} /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Twitter size={18} /></a>
                <a href="#" className="text-white hover:opacity-70 transition-opacity"><Instagram size={18} /></a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase font-bold tracking-widest text-white">Categories</h4>
              <ul className="space-y-4 text-stone-400 text-xs">
                <li><Link to="/shop" className="hover:text-white transition-colors">Bedroom</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Living room</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Lighting</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Fabrics sofa</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs uppercase font-bold tracking-widest text-white">Information</h4>
              <ul className="space-y-4 text-stone-400 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs uppercase font-bold tracking-widest text-white">Account</h4>
              <ul className="space-y-4 text-stone-400 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">My account</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Checkout</a></li>
                <li><a href="#" className="hover:text-white transition-colors">My wishlists</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <p className="text-[10px] text-stone-500 max-w-md">
                This site is protected by reCAPTCHA and the Google <a href="#" className="underline">privacy policy</a> and terms of service apply.
              </p>
              <p className="text-[10px] text-stone-500">
                © 2026 Balajee Traders. All Rights Reserved.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">Need support?</span>
                <a href="tel:+12345678910" className="text-base font-medium hover:text-stone-300 transition-colors">+1 234 567 8910</a>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-2">Customer care</span>
                <a href="mailto:info@domain.com" className="text-base font-medium hover:text-stone-300 transition-colors">info@domain.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;