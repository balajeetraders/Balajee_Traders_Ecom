import React from 'react';
import { Link } from 'react-router-dom';

const ReturnPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-32 md:pt-40 md:pb-40 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">
            Legal
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">
            Return <span className="italic font-light opacity-50">Policy</span>
          </h1>
        </div>

        <article className="prose prose-stone max-w-none space-y-8 text-stone-700">
          <p>
            We offer refund / exchange within the first <strong>1 day</strong> from the date of your purchase. If{' '}
            <strong>1 day</strong> has passed since your purchase, you will not be offered a return, exchange or
            refund of any kind.
          </p>

          <p>
            In order to become eligible for a return or an exchange:
          </p>
          <ol className="list-decimal list-inside space-y-4 pl-2">
            <li>
              The purchased item should be unused and in the same condition as you received it.
            </li>
            <li>
              The item must have its original packaging.
            </li>
            <li>
              If the item that you purchased was on sale, then the item may not be eligible for a return / exchange.
            </li>
            <li>
              Only such items are replaced by us (based on an exchange request) if such items are found defective or damaged.
            </li>
          </ol>

          <p>
            You agree that there may be a certain category of products / items that are exempted from returns or
            refunds. Such categories of the products would be identified to you at the time of purchase.
          </p>

          <p>
            For exchange / return accepted request(s) (as applicable), once your returned product / item is received
            and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged
            product. Further, if the same has been approved after the quality check at our end, your request (i.e.
            return / exchange) will be processed in accordance with our policy.
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

export default ReturnPolicy;

