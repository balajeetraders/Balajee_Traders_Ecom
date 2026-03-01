
import React, { useState } from 'react';
import { X, Star, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface FeedbackModalProps {
    orderId: string;
    customerName: string;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ orderId, customerName, onClose }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSending(true);
        try {
            await supabase.from('feedback').insert({
                order_id: orderId,
                user_id: user?.id || null,
                customer_name: customerName || user?.email || 'Anonymous',
                rating,
                comment: comment.trim() || null,
                created_at: new Date().toISOString(),
            });
            setIsDone(true);
            setTimeout(onClose, 2500);
        } catch (err) {
            console.error('Feedback error:', err);
            // fail silently — don't block the user
            onClose();
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 300,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px',
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(6px)',
                animation: 'fbOverlayIn 0.25s ease',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div style={{
                background: '#fff', borderRadius: '24px',
                padding: '32px 28px 28px', width: '100%', maxWidth: '400px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
                animation: 'fbSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                position: 'relative',
            }}>
                <style>{`
          @keyframes fbOverlayIn{from{opacity:0}to{opacity:1}}
          @keyframes fbSlideUp{from{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
          @keyframes fbPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        `}</style>

                {/* Close */}
                <button onClick={onClose} aria-label="Close"
                    style={{ position: 'absolute', top: '14px', right: '14px', width: '30px', height: '30px', background: '#f3f3f3', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                    <X size={15} />
                </button>

                {isDone ? (
                    /* Success state */
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                        <div style={{ width: '60px', height: '60px', background: '#25D366', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 700, margin: '0 auto 16px', animation: 'fbPop 0.4s ease' }}>✓</div>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111', fontFamily: 'Georgia,serif', marginBottom: '6px' }}>Thank You!</h3>
                        <p style={{ fontSize: '13px', color: '#888' }}>Your feedback helps us serve you better.</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div style={{ marginBottom: '20px' }}>
                            <img src="/logo.png" alt="Balajee Traders" style={{ height: '32px', marginBottom: '12px', objectFit: 'contain' }} />
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111', fontFamily: 'Georgia,serif', marginBottom: '4px' }}>How was your experience?</h3>
                            <p style={{ fontSize: '12px', color: '#999' }}>Order #{orderId} · {customerName}</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Stars */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(0)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'transform 0.15s', transform: (hovered || rating) >= star ? 'scale(1.18)' : 'scale(1)' }}
                                    >
                                        <Star
                                            size={34}
                                            fill={(hovered || rating) >= star ? '#f59e0b' : 'none'}
                                            color={(hovered || rating) >= star ? '#f59e0b' : '#d1d5db'}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Label */}
                            <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: (hovered || rating) ? '#f59e0b' : '#ccc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em', minHeight: '16px', transition: 'color 0.2s' }}>
                                {labels[hovered || rating]}
                            </p>

                            {/* Comment */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '5px' }}>
                                    Additional Comments (optional)
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Tell us about your experience..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #e8e8e8', borderRadius: '10px', fontSize: '13px', color: '#111', background: '#fafafa', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSending || rating === 0}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', width: '100%', height: '46px', background: rating > 0 ? '#1a1a1a' : '#e5e7eb', color: rating > 0 ? '#fff' : '#9ca3af', border: 'none', borderRadius: '12px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: rating > 0 ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
                            >
                                {isSending ? <><Loader2 size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending...</> : <><Send size={14} /> Submit Feedback</>}
                            </button>
                        </form>
                    </>
                )}
            </div>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
    );
};

export default FeedbackModal;
