import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-32 md:pt-40 md:pb-40 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">
            Legal
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">
            Refund &amp; <span className="italic font-light opacity-50">Cancellation Policy</span>
          </h1>
        </div>

        <article className="prose prose-stone max-w-none space-y-8 text-stone-700">
          <p>
            This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service
            that you have purchased through the Platform. Under this policy:
          </p>

          <ol className="list-decimal list-inside space-y-6 pl-2">
            <li>
              Cancellations will only be considered if the request is made within <strong>1 day</strong> of placing the order. 
              However, cancellation requests may not be entertained if the orders have been communicated to such sellers / 
              merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is 
              out for delivery. In such an event, you may choose to reject the product at the doorstep.
            </li>
            <li>
              <strong>Balajee Traders</strong> does not accept cancellation requests for perishable items like flowers, 
              eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of 
              the product delivered is not good.
            </li>
            <li>
              In case of receipt of damaged or defective items, please report to our customer service team. The request 
              would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same 
              at its own end. This should be reported within <strong>1 day</strong> of receipt of products.
            </li>
            <li>
              In case you feel that the product received is not as shown on the site or as per your expectations, you 
              must bring it to the notice of our customer service within <strong>1 day</strong> of receiving the product. 
              The customer service team after looking into your complaint will take an appropriate decision.
            </li>
            <li>
              In case of complaints regarding the products that come with a warranty from the manufacturers, please refer 
              the issue to them.
            </li>
            <li>
              In case of any refunds approved by <strong>Balajee Traders</strong>, it will take <strong>1 day</strong> for 
              the refund to be processed to you.
            </li>
          </ol>
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

export default RefundPolicy;

