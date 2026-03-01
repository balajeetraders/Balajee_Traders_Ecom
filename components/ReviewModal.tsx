
import React, { useState } from 'react';
import { X, Star, Send, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitReview } from '../lib/reviewService';

interface ReviewModalProps {
    orderId: string;
    onClose: () => void;
    onSubmitted?: () => void;
}

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

const ReviewModal: React.FC<ReviewModalProps> = ({ orderId, onClose, onSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState('');

    const active = hovered || rating;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) { setError('Please select a star rating.'); return; }
        if (!comment.trim()) { setError('Please write a comment.'); return; }
        if (!user) { setError('You need to be signed in to leave a review.'); return; }

        setError('');
        setIsSending(true);
        try {
            await submitReview({
                orderId,
                rating,
                comment: comment.trim(),
                userId: user.id,
            });
            setIsDone(true);
            onSubmitted?.();
            setTimeout(onClose, 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to submit review. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 400,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px',
                background: 'rgba(0,0,0,0.50)',
                backdropFilter: 'blur(8px)',
                animation: 'overlayIn 0.2s ease',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <style>{`
        @keyframes overlayIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp   { from { opacity:0; transform:scale(.93) translateY(28px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes popIn     { from { transform:scale(0); opacity:0 } to { transform:scale(1); opacity:1 } }
      `}</style>

            <div style={{
                background: '#fff', borderRadius: '28px',
                padding: '36px 30px 30px', width: '100%', maxWidth: '420px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
                animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                position: 'relative',
            }}>
                {/* Close */}
                <button onClick={onClose} aria-label="Close" style={{
                    position: 'absolute', top: '14px', right: '14px',
                    width: '30px', height: '30px', background: '#f3f3f3',
                    border: 'none', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888',
                }}>
                    <X size={14} />
                </button>

                {isDone ? (
                    /* ── Success State ── */
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{
                            width: '64px', height: '64px', background: '#16a34a',
                            color: '#fff', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '28px', margin: '0 auto 16px',
                            animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                        }}>✓</div>
                        <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#111', fontFamily: 'Georgia,serif', marginBottom: '8px' }}>
                            Thank You!
                        </h3>
                        <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>
                            Your review has been submitted and is <strong>pending approval</strong>.<br />
                            It will appear publicly once our team reviews it.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px', color: '#9ca3af', fontSize: '11px', fontWeight: 600 }}>
                            <ShieldCheck size={13} /> Moderated for quality
                        </div>
                    </div>
                ) : (
                    /* ── Form State ── */
                    <>
                        {/* Header */}
                        <div style={{ marginBottom: '22px' }}>
                            <img src="/logo.png" alt="Balajee Traders" style={{ height: '30px', marginBottom: '12px', objectFit: 'contain' }} />
                            <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#111', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>
                                Rate Your Experience
                            </h3>
                            <p style={{ fontSize: '12px', color: '#aaa' }}>Order #{orderId.slice(0, 8).toUpperCase()}</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Stars */}
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '6px' }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => { setRating(star); setError(''); }}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(0)}
                                        style={{
                                            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                                            transform: active >= star ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'transform 0.15s',
                                        }}
                                        aria-label={`Rate ${star} stars`}
                                    >
                                        <Star
                                            size={36}
                                            fill={active >= star ? '#f59e0b' : 'none'}
                                            color={active >= star ? '#f59e0b' : '#d1d5db'}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Label */}
                            <p style={{
                                textAlign: 'center', fontSize: '11px', fontWeight: 700,
                                color: active ? '#f59e0b' : '#d1d5db',
                                textTransform: 'uppercase', letterSpacing: '0.1em',
                                minHeight: '18px', marginBottom: '18px', transition: 'color 0.2s',
                            }}>
                                {LABELS[active]}
                            </p>

                            {/* Comment */}
                            <div style={{ marginBottom: '14px' }}>
                                <label style={{
                                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
                                    textTransform: 'uppercase', color: '#999',
                                    display: 'block', marginBottom: '6px',
                                }}>
                                    Your Review <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Share details of your experience — quality, delivery, setup..."
                                    value={comment}
                                    onChange={e => { setComment(e.target.value); setError(''); }}
                                    style={{
                                        width: '100%', padding: '11px 14px',
                                        border: `1.5px solid ${error && !comment.trim() ? '#ef4444' : '#e5e7eb'}`,
                                        borderRadius: '12px', fontSize: '13px', color: '#111',
                                        background: '#fafafa', outline: 'none', resize: 'none',
                                        fontFamily: 'inherit', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#1c1c1c'}
                                    onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p style={{ fontSize: '11px', color: '#ef4444', marginBottom: '10px', fontWeight: 600 }}>
                                    {error}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSending}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    width: '100%', height: '48px',
                                    background: '#1c1c1c', color: '#fff',
                                    border: 'none', borderRadius: '14px',
                                    fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em',
                                    textTransform: 'uppercase', cursor: isSending ? 'not-allowed' : 'pointer',
                                    opacity: isSending ? 0.7 : 1, transition: 'opacity 0.2s',
                                }}
                            >
                                {isSending
                                    ? <><Loader2 size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Submitting...</>
                                    : <><Send size={14} /> Submit Review</>
                                }
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '10px', color: '#ccc', marginTop: '10px' }}>
                                Reviews are moderated before publishing.
                            </p>
                        </form>
                    </>
                )}
            </div>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
    );
};

export default ReviewModal;
