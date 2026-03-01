
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, X, Loader2, MessageSquare } from 'lucide-react';

// --- CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN as string) || '';
const TELEGRAM_CHAT_ID = (process.env.TELEGRAM_CHAT_ID as string) || '';
const WHATSAPP_NUMBER = '916380473964';

// --- WhatsApp SVG Icon ---
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.334.633 4.62 1.834 6.618L2.667 29.333l6.9-1.808A13.258 13.258 0 0016.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.266a11.0 11.0 0 01-5.642-1.553l-.404-.24-4.1 1.074 1.093-3.988-.262-.413A10.98 10.98 0 015.0 16C5.0 9.925 9.927 5 16.003 5S27.0 9.925 27.0 16 22.08 26.933 16.003 26.933zm6.036-8.198c-.33-.165-1.953-.963-2.255-1.072-.303-.11-.522-.164-.742.165s-.852 1.072-1.044 1.292-.384.247-.714.082c-.33-.165-1.394-.513-2.657-1.638-.982-.874-1.644-1.953-1.836-2.283-.192-.33-.02-.508.144-.672.148-.148.33-.385.495-.578.165-.192.22-.33.33-.549.11-.22.055-.413-.027-.578-.083-.165-.742-1.787-1.017-2.447-.268-.642-.54-.554-.742-.565l-.632-.011c-.22 0-.578.082-.88.413-.303.33-1.155 1.128-1.155 2.75s1.182 3.19 1.347 3.41c.165.219 2.327 3.554 5.638 4.984.788.34 1.403.543 1.882.695.79.252 1.51.216 2.08.131.634-.094 1.953-.799 2.228-1.57.275-.77.275-1.43.192-1.57-.082-.137-.302-.22-.633-.385z" />
  </svg>
);

const FloatingActions: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', message: '' });
  const [floatY, setFloatY] = useState(0);

  // Gentle floating bob animation
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const amplitude = 7;
    const period = 3200;
    const tick = (ts: number) => {
      if (!start) start = ts;
      setFloatY(Math.sin(((ts - start) / period) * 2 * Math.PI) * amplitude);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      alert('Telegram not configured. Please contact us directly.');
      return;
    }
    setIsSending(true);
    try {
      const text = `📩 <b>NEW SHOWROOM ENQUIRY — Balajee Traders</b>\n\n👤 <b>Name:</b> ${formData.name}\n📞 <b>Phone:</b> ${formData.phone}\n🏙️ <b>City:</b> ${formData.city || 'Not provided'}\n💬 <b>Message:</b> ${formData.message || 'No message'}`;
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
      });
      if (!res.ok) throw new Error('Telegram API error');
      setIsSuccess(true);
      setFormData({ name: '', phone: '', city: '', message: '' });
      setTimeout(() => { setIsSuccess(false); setIsEnquiryOpen(false); }, 2500);
    } catch {
      alert('Failed to send. Please try WhatsApp or call us directly.');
    } finally {
      setIsSending(false);
    }
  };

  // Only render on home page
  if (!isHomePage) return null;

  return (
    <>
      {/* ===== FLOATING BUTTONS — RIGHT SIDE, 50% PEEK ===== */}
      <div
        className="fab-container"
        style={{ transform: `translateY(calc(-50% + ${floatY}px))` }}
      >
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="fab-btn fab-whatsapp"
          title="Chat on WhatsApp"
          aria-label="WhatsApp"
        >
          <span className="fab-icon"><WhatsAppIcon /></span>
          <span className="fab-text">WhatsApp Us</span>
        </a>

        {/* Book Enquiry */}
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="fab-btn fab-enquiry"
          title="Book an Enquiry"
          aria-label="Book Enquiry"
        >
          <span className="fab-icon"><MessageSquare size={20} strokeWidth={2.2} /></span>
          <span className="fab-text">Book Enquiry</span>
        </button>
      </div>

      {/* ===== ENQUIRY MODAL ===== */}
      {isEnquiryOpen && (
        <div
          className="fab-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setIsEnquiryOpen(false); }}
        >
          <div className="fab-modal">
            <button className="fab-close" onClick={() => setIsEnquiryOpen(false)} aria-label="Close">
              <X size={16} />
            </button>

            {isSuccess ? (
              <div className="fab-success">
                <div className="fab-success-icon">✓</div>
                <h3>Enquiry Sent!</h3>
                <p>We'll contact you shortly to plan your showroom visit.</p>
              </div>
            ) : (
              <>
                <div className="fab-modal-head">
                  <span className="fab-tag">Balajee Traders</span>
                  <h3>Book a Showroom Visit</h3>
                  <p>Fill in your details and we'll confirm your visit.</p>
                </div>
                <form onSubmit={handleEnquiry} className="fab-form">
                  <div className="fab-field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your name" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="fab-field">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required pattern="[0-9+\s\-]{7,15}"
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="fab-field">
                    <label>City</label>
                    <input type="text" placeholder="Your city" value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  </div>
                  <div className="fab-field">
                    <label>What are you looking for?</label>
                    <textarea rows={3} placeholder="E.g. Sofa, Bed, Dining set..." value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={isSending} className="fab-submit">
                    {isSending ? <><Loader2 size={15} className="fab-spin" /> Sending...</> : <><Send size={15} /> Send Enquiry</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== STYLES ===== */}
      <style>{`
        /* ── Container: right edge, vertically centred ── */
        .fab-container {
          position: fixed;
          right: 0;
          top: 50%;
          z-index: 900;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;   /* let children handle events */
        }

        /* ── Single button ── */
        .fab-btn {
          pointer-events: all;
          display: flex;
          align-items: center;
          gap: 0;
          height: 48px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          border-radius: 28px 0 0 28px;  /* pill, open on right */
          box-shadow: -3px 4px 18px rgba(0,0,0,0.22);
          overflow: hidden;
          /* By default: only the icon (48px) is visible; the text is hidden to the right */
          /* We translate RIGHT so only half the button (24px) peeks out */
          transform: translateX(calc(100% - 48px + 24px)); /* 50% hidden = 24px peek */
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease;
          white-space: nowrap;
        }

        .fab-btn:hover,
        .fab-btn:focus-within {
          transform: translateX(0);
          box-shadow: -4px 6px 24px rgba(0,0,0,0.30);
        }

        .fab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .fab-text {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding-right: 16px;
          opacity: 1;
        }

        /* ── WhatsApp ── */
        .fab-whatsapp { background: #25D366; color: #fff; }

        /* ── Enquiry ── */
        .fab-enquiry { background: #1a1a1a; color: #fff; }

        /* ── Mobile: smaller icon, less peek ── */
        @media (max-width: 640px) {
          .fab-btn {
            height: 42px;
            transform: translateX(calc(100% - 42px + 21px));
          }
          .fab-btn:hover, .fab-btn:focus-within {
            transform: translateX(0);
          }
          .fab-icon { width: 42px; height: 42px; }
          .fab-text { font-size: 10px; padding-right: 12px; }
        }

        /* ── Modal overlay ── */
        .fab-overlay {
          position: fixed; inset: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          background: rgba(0,0,0,0.52);
          backdrop-filter: blur(6px);
          animation: fabFadeIn .22s ease;
        }
        @keyframes fabFadeIn { from{opacity:0} to{opacity:1} }

        /* ── Modal box ── */
        .fab-modal {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 30px 26px 26px;
          width: 100%; max-width: 400px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          animation: fabSlideUp .3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes fabSlideUp {
          from{opacity:0;transform:scale(.9) translateY(16px)}
          to{opacity:1;transform:scale(1) translateY(0)}
        }
        @media(max-width:480px){ .fab-modal{ padding:22px 16px 18px; border-radius:16px; } }

        /* ── Close button ── */
        .fab-close {
          position:absolute; top:12px; right:12px;
          width:30px; height:30px;
          display:flex; align-items:center; justify-content:center;
          background:#f3f3f3; border:none; border-radius:50%;
          cursor:pointer; color:#555;
          transition: background .2s,color .2s;
        }
        .fab-close:hover{ background:#1a1a1a; color:#fff; }

        /* ── Modal header ── */
        .fab-modal-head{ margin-bottom:18px; }
        .fab-tag{ display:inline-block; font-size:10px; font-weight:800; letter-spacing:.12em;
          text-transform:uppercase; color:#aaa; margin-bottom:4px; }
        .fab-modal-head h3{ font-size:20px; font-weight:700; color:#111; margin:0 0 5px;
          font-family:Georgia,serif; }
        .fab-modal-head p{ font-size:12px; color:#999; margin:0; }

        /* ── Form ── */
        .fab-form{ display:flex; flex-direction:column; gap:12px; }
        .fab-field{ display:flex; flex-direction:column; gap:4px; }
        .fab-field label{ font-size:10px; font-weight:700; letter-spacing:.06em;
          text-transform:uppercase; color:#777; }
        .fab-field input, .fab-field textarea{
          width:100%; padding:10px 13px; border:1.5px solid #e8e8e8;
          border-radius:10px; font-size:13px; color:#111; background:#fafafa;
          outline:none; transition:border-color .2s; box-sizing:border-box;
          font-family:inherit; resize:none;
        }
        .fab-field input:focus, .fab-field textarea:focus{
          border-color:#1a1a1a; background:#fff;
        }

        /* ── Submit ── */
        .fab-submit {
          display:flex; align-items:center; justify-content:center; gap:7px;
          width:100%; height:46px;
          background:#1a1a1a; color:#fff;
          border:none; border-radius:12px;
          font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
          cursor:pointer; transition:background .2s,transform .15s;
          margin-top:4px;
        }
        .fab-submit:hover:not(:disabled){ background:#333; transform:translateY(-1px); }
        .fab-submit:disabled{ opacity:.6; cursor:not-allowed; }
        .fab-spin{ animation:fabSpin .8s linear infinite; }
        @keyframes fabSpin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* ── Success ── */
        .fab-success{ text-align:center; padding:16px 0 8px; }
        .fab-success-icon{
          width:56px; height:56px; background:#25D366; color:#fff;
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          font-size:26px; font-weight:700; margin:0 auto 14px;
          animation:fabPop .4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes fabPop{ from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .fab-success h3{ font-size:18px; font-weight:700; color:#111; margin:0 0 6px;
          font-family:Georgia,serif; }
        .fab-success p{ font-size:13px; color:#888; margin:0; }
      `}</style>
    </>
  );
};

export default FloatingActions;
