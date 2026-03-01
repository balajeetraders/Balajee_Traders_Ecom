
import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { fetchApprovedReviews } from '../lib/reviewService';

interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
}

const ReviewsSection: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApprovedReviews()
            .then(setReviews)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading || reviews.length === 0) return null;

    return (
        <section className="py-16 md:py-32 bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
                    <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-stone-300 block">
                            Verified Customers
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-none">
                            What They <span className="italic font-light opacity-50">Say</span>
                        </h2>
                    </div>
                    <p className="text-stone-400 text-sm italic font-serif max-w-xs md:text-right">
                        Every review is verified and moderated for authenticity.
                    </p>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    const date = new Date(review.created_at).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric',
    });

    return (
        <div className="bg-white rounded-[2rem] p-7 shadow-sm border border-stone-100 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300">
            {/* Quote icon */}
            <Quote size={22} className="text-stone-200" strokeWidth={1.5} />

            {/* Stars */}
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                    <Star
                        key={s}
                        size={14}
                        fill={s <= review.rating ? '#f59e0b' : 'none'}
                        color={s <= review.rating ? '#f59e0b' : '#e5e7eb'}
                        strokeWidth={1.5}
                    />
                ))}
            </div>

            {/* Comment */}
            <p className="text-stone-700 text-sm leading-relaxed font-serif italic flex-grow line-clamp-5">
                "{review.comment}"
            </p>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-3 border-t border-stone-50">
                {/* Avatar initial */}
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center uppercase select-none">
                    V
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">Verified Buyer</p>
                    <p className="text-[9px] text-stone-400">{date}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;
