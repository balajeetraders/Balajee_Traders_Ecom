import { supabase } from './supabase';

const TELEGRAM_BOT_TOKEN = '8589328757:AAGj2NyxJjC32NJT2aREQawFcytZdpM3gnc';
const TELEGRAM_CHAT_ID = '8528414005';

// ── Telegram notification ────────────────────────────────────────────────
async function notifyTelegram(review: {
    user_id: string | null;
    order_id: string;
    rating: number;
    comment: string;
}) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    const stars = '⭐'.repeat(review.rating);
    const msg = [
        `📝 *New Review — Pending Approval*`,
        ``,
        `${stars} (${review.rating}/5)`,
        `📦 Order: \`${review.order_id}\``,
        `👤 User: \`${review.user_id ?? 'Guest'}\``,
        `💬 Comment: ${review.comment}`,
        ``,
        `_Approve at: /admin_`,
    ].join('\n');

    await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: msg,
                parse_mode: 'Markdown',
            }),
        }
    ).catch(console.error); // non-blocking
}

// ── Submit a new review ───────────────────────────────────────────────────
export async function submitReview(params: {
    orderId: string;
    rating: number;
    comment: string;
    userId: string;
}) {
    const { orderId, rating, comment, userId } = params;

    const { data, error } = await supabase
        .from('reviews')
        .insert({
            user_id: userId,
            order_id: orderId,
            rating,
            comment,
            status: 'pending',
        })
        .select()
        .single();

    if (error) throw error;

    // Non-blocking Telegram ping
    notifyTelegram({
        user_id: userId,
        order_id: orderId,
        rating,
        comment,
    });

    return data;
}

// ── Fetch approved reviews (for landing page) ──────────────────────────
export async function fetchApprovedReviews() {
    const { data, error } = await supabase
        .from('reviews')
        .select('id, rating, comment, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) throw error;
    return data ?? [];
}

// ── Fetch pending reviews (admin) ──────────────────────────────────────
export async function fetchPendingReviews() {
    const { data, error } = await supabase
        .from('reviews')
        .select('id, user_id, order_id, rating, comment, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data ?? [];
}

// ── Approve a review ───────────────────────────────────────────────────
export async function approveReview(id: string) {
    const { error } = await supabase
        .from('reviews')
        .update({ status: 'approved' })
        .eq('id', id);
    if (error) throw error;
}

// ── Reject a review ────────────────────────────────────────────────────
export async function rejectReview(id: string) {
    const { error } = await supabase
        .from('reviews')
        .update({ status: 'rejected' })
        .eq('id', id);
    if (error) throw error;
}

// ── Check if user has already reviewed an order ────────────────────────
export async function hasReviewedOrder(orderId: string, userId: string): Promise<boolean> {
    const { count } = await supabase
        .from('reviews')
        .select('id', { count: 'exact', head: true })
        .eq('order_id', orderId)
        .eq('user_id', userId);
    return (count ?? 0) > 0;
}
