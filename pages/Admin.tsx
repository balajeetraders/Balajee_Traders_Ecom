
import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Loader2, Star, ShieldAlert, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchPendingReviews, approveReview, rejectReview } from '../lib/reviewService';

const ADMIN_EMAIL = 'balajeetraderstry@gmail.com';

interface PendingReview {
    id: string;
    user_id: string | null;
    order_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

const Admin: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState<PendingReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionMap, setActionMap] = useState<Record<string, 'approving' | 'rejecting'>>({});

    const isAdmin = user?.email === ADMIN_EMAIL;

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchPendingReviews();
            setReviews(data as PendingReview[]);
        } catch (err) {
            console.error('Failed to load pending reviews:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading && isAdmin) load();
        else if (!authLoading) setLoading(false);
    }, [authLoading, isAdmin, load]);

    const handleApprove = async (id: string) => {
        setActionMap(prev => ({ ...prev, [id]: 'approving' }));
        try {
            await approveReview(id);
            setReviews(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setActionMap(prev => { const n = { ...prev }; delete n[id]; return n; });
        }
    };

    const handleReject = async (id: string) => {
        setActionMap(prev => ({ ...prev, [id]: 'rejecting' }));
        try {
            await rejectReview(id);
            setReviews(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setActionMap(prev => { const n = { ...prev }; delete n[id]; return n; });
        }
    };

    // ── Auth Loading ──
    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 className="animate-spin text-stone-400" size={32} />
            </div>
        );
    }

    // ── Not Admin ──
    if (!isAdmin) {
        return (
            <div className="min-h-screen pt-40 pb-20 bg-stone-50 flex flex-col items-center justify-center gap-5 px-6">
                <ShieldAlert size={48} className="text-stone-300" strokeWidth={1.2} />
                <h1 className="text-3xl font-serif text-stone-900">Access Restricted</h1>
                <p className="text-stone-400 text-sm text-center max-w-xs">
                    This page is only accessible to store administrators.
                </p>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-40 bg-stone-50 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                {/* Header */}
                <div className="mb-12 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-stone-300 block">
                        Admin Panel
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-none">
                        Review <span className="italic font-light opacity-40">Moderation</span>
                    </h1>
                    <p className="text-stone-400 text-sm">
                        Pending reviews — approve to publish, reject to discard.
                    </p>
                </div>

                {/* Empty state */}
                {reviews.length === 0 && (
                    <div className="py-24 bg-white rounded-[3rem] border border-stone-100 flex flex-col items-center gap-5 text-center">
                        <Clock size={40} className="text-stone-200" strokeWidth={1} />
                        <div className="space-y-2">
                            <p className="font-serif text-2xl text-stone-900">All caught up!</p>
                            <p className="text-stone-400 text-sm">No pending reviews right now.</p>
                        </div>
                        <button
                            onClick={load}
                            className="px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                        >
                            Refresh
                        </button>
                    </div>
                )}

                {/* Review cards */}
                <div className="space-y-5">
                    {reviews.map(review => {
                        const action = actionMap[review.id];
                        const date = new Date(review.created_at).toLocaleString('en-IN', {
                            dateStyle: 'medium', timeStyle: 'short',
                        });

                        return (
                            <div key={review.id} className="bg-white rounded-[2rem] p-6 md:p-8 border border-stone-100 shadow-sm">
                                {/* Meta */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                                            Order #{review.order_id.slice(0, 8).toUpperCase()}
                                        </p>
                                        <p className="text-[9px] text-stone-300">{date}</p>
                                        {review.user_id && (
                                            <p className="text-[9px] text-stone-300 font-mono">UID: {review.user_id.slice(0, 16)}…</p>
                                        )}
                                    </div>
                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={16}
                                                fill={s <= review.rating ? '#f59e0b' : 'none'}
                                                color={s <= review.rating ? '#f59e0b' : '#e5e7eb'}
                                                strokeWidth={1.5}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="text-stone-700 text-sm leading-relaxed font-serif italic mb-6 border-l-2 border-stone-100 pl-4">
                                    "{review.comment}"
                                </p>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => handleReject(review.id)}
                                        disabled={!!action}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        {action === 'rejecting'
                                            ? <Loader2 size={13} className="animate-spin" />
                                            : <XCircle size={13} />
                                        }
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleApprove(review.id)}
                                        disabled={!!action}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white hover:bg-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        {action === 'approving'
                                            ? <Loader2 size={13} className="animate-spin" />
                                            : <CheckCircle size={13} />
                                        }
                                        Approve
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Admin;
