import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-32 md:pt-40 md:pb-40 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">
            Legal
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">
            Shipping <span className="italic font-light opacity-50">Policy</span>
          </h1>
        </div>

        <article className="prose prose-stone max-w-none space-y-8 text-stone-700">
          <p>
            The orders for the user are shipped through registered domestic courier companies and/or speed post only.
            Orders are shipped within <strong>3 days</strong> from the date of the order and/or payment or as per the
            delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier
            company / post office norms.
          </p>

          <p>
            Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority.
            Delivery of all orders will be made to the address provided by the buyer at the time of purchase.
          </p>

          <p>
            Delivery of our services will be confirmed on your email ID as specified at the time of registration. If
            there are any shipping cost(s) levied by the seller or the Platform Owner (as the case may be), the same is
            not refundable.
          </p>
        </article>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <Link to="/contact" className="text-stone-600 hover:text-stone-900 text-sm font-medium">
            Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

