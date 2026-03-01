
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Tag, ArrowRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Popup definitions ─────────────────────────────────────────────────
const POPUPS = [
    {
        id: 'p1',
        badge: 'Welcome Offer',
        headline: '10% Off',
        sub: 'Your First Order',
        body: 'Use code at checkout on your first furniture purchase.',
        coupon: 'FIRST10',
        cta: 'Shop Now',
        ctaHref: '/shop',
    },
    {
        id: 'p2',
        badge: 'Free Delivery',
        headline: 'White-Glove',
        sub: 'Delivery Included',
        body: 'Every order includes free White-Glove delivery & professional assembly.',
        coupon: null,
        cta: 'Explore Collection',
        ctaHref: '/shop',
    },
];

// ─── Single Popup Card ──────────────────────────────────────────────────
interface PopupCardProps {
    popup: typeof POPUPS[0];
    onClose: () => void;
    autoCloseSecs?: number;
}

const PopupCard: React.FC<PopupCardProps> = ({ popup, onClose, autoCloseSecs = 9 }) => {
    const [countdown, setCountdown] = useState(autoCloseSecs);
    const [copied, setCopied] = useState(false);
    const [entered, setEntered] = useState(false);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 30);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const iv = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) { clearInterval(iv); onCloseRef.current(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(iv);
    }, []);

    const handleCopy = () => {
        if (!popup.coupon) return;
        navigator.clipboard.writeText(popup.coupon).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    return (
        <div style={{
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)',
            transform: entered ? 'translateY(0) scale(1)' : 'translateY(55px) scale(0.93)',
            opacity: entered ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
            background: '#fff',
        }}>

            {/* Soft top accent bar */}
            <div style={{
                background: 'linear-gradient(90deg, #f5f0eb, #ede8e3)',
                borderBottom: '1px solid #e8e2db',
                padding: '8px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={10} color="#9a7b5c" />
                    <span style={{ color: '#9a7b5c', fontSize: '9px', fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase' }}>
                        {popup.badge}
                    </span>
                </div>
                <span style={{ color: '#b8a99a', fontSize: '10px', fontWeight: 600 }}>
                    Closes in {countdown}s
                </span>
            </div>

            {/* White body */}
            <div style={{ background: '#fff', padding: '18px 18px 16px', position: 'relative' }}>

                {/* Close */}
                <button onClick={onClose} aria-label="Close" style={{
                    position: 'absolute', top: '11px', right: '11px',
                    width: '24px', height: '24px',
                    background: '#f5f0eb', border: 'none', borderRadius: '50%',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#b0a090',
                }}>
                    <X size={12} />
                </button>

                {/* Logo + Headline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img src="/logo.png" alt="Balajee Traders" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
                    <div>
                        <div style={{ color: '#c0b0a0', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
                            Balajee Traders
                        </div>
                        <div style={{ color: '#1c1c1c', fontSize: '17px', fontWeight: 800, fontFamily: 'Georgia,serif', lineHeight: 1.15, marginTop: '2px' }}>
                            {popup.headline}{' '}
                            <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#888' }}>{popup.sub}</span>
                        </div>
                    </div>
                </div>

                <p style={{ color: '#888', fontSize: '12px', marginBottom: '12px', lineHeight: 1.55 }}>
                    {popup.body}
                </p>

                {/* Coupon chip */}
                {popup.coupon && (
                    <button onClick={handleCopy} style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: '#fdf8f4',
                        border: '1.5px dashed #d4b896',
                        borderRadius: '9px', padding: '9px 13px', cursor: 'pointer', marginBottom: '11px',
                    }}>
                        <span style={{ color: '#b07840', fontSize: '15px', fontWeight: 900, letterSpacing: '0.14em' }}>
                            {popup.coupon}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: copied ? '#22c55e' : '#c0a888', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', transition: 'color 0.25s' }}>
                            {copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                        </span>
                    </button>
                )}

                {/* CTA */}
                <Link to={popup.ctaHref} onClick={onClose} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    width: '100%', height: '40px',
                    background: '#1c1c1c',
                    color: '#fff', borderRadius: '9px',
                    fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                }}>
                    {popup.cta} <ArrowRight size={12} />
                </Link>
            </div>

            {/* Subtle bottom progress bar */}
            <div style={{ height: '3px', background: '#f0ebe5' }}>
                <div style={{
                    height: '100%',
                    width: `${(countdown / autoCloseSecs) * 100}%`,
                    background: 'linear-gradient(90deg,#d4b896,#b07840)',
                    transition: 'width 1s linear',
                }} />
            </div>
        </div>
    );
};

// ─── Main Orchestrator ──────────────────────────────────────────────────
const DiscountPopup: React.FC = () => {
    const [currentIdx, setCurrentIdx] = useState<number>(-1);
    const isDone = currentIdx === null;

    const advanceToNext = useCallback((prevIdx: number) => {
        const next = prevIdx + 1;
        if (next >= POPUPS.length) {
            setCurrentIdx(null);
        } else {
            setTimeout(() => setCurrentIdx(next), 4000);
        }
    }, []);

    const handleClose = useCallback(() => {
        setCurrentIdx(prev => {
            if (prev === null || prev < 0) return null;
            advanceToNext(prev);
            return -1;
        });
    }, [advanceToNext]);

    useEffect(() => {
        const today = new Date().toDateString();
        const seen = localStorage.getItem('bt_dp_date');
        if (seen === today) return;

        // Show 10 seconds after page load (SoftIntentPopup shows at 5s)
        const t = setTimeout(() => {
            localStorage.setItem('bt_dp_date', today);
            setCurrentIdx(0);
        }, 10000);

        return () => clearTimeout(t);
    }, []);

    if (isDone || currentIdx < 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '16px',
            zIndex: 850,
            width: 'min(320px, calc(100vw - 20px))',
        }}>
            <PopupCard
                key={POPUPS[currentIdx].id}
                popup={POPUPS[currentIdx]}
                onClose={handleClose}
                autoCloseSecs={9}
            />
        </div>
    );
};

export default DiscountPopup;
