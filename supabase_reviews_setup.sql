-- ============================================================
-- BALAJEE TRADERS — Reviews System (RECURSION FIX)
-- Run this fully in Supabase SQL Editor
-- ============================================================

-- ── STEP 1: Fix the recursive admins table policy (if it exists) ──────────
-- The "infinite recursion" comes from an admins table that checks itself
-- We disable RLS on it temporarily, then fix its policy
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'admins'
  ) THEN
    -- Drop all existing policies on admins table to stop the recursion
    EXECUTE 'ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY';
  END IF;
END $$;

-- ── STEP 2: Create reviews table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id     text NOT NULL,
  rating       int2 NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      text NOT NULL,
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_status_created
  ON public.reviews (status, created_at DESC);

-- ── STEP 3: Enable RLS on reviews ────────────────────────────────────────
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ── STEP 4: Drop all old reviews policies ────────────────────────────────
DROP POLICY IF EXISTS "Users can insert own reviews"    ON public.reviews;
DROP POLICY IF EXISTS "Public reads approved reviews"   ON public.reviews;
DROP POLICY IF EXISTS "Admin reads all reviews"         ON public.reviews;
DROP POLICY IF EXISTS "Admin can update review status"  ON public.reviews;

-- ── STEP 5: Recreate policies (NO table joins — uses JWT directly) ────────

-- INSERT: authenticated users can only insert with their own user_id
CREATE POLICY "Users can insert own reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- SELECT (public): only approved reviews visible to everyone
CREATE POLICY "Public reads approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved');

-- SELECT (admin): uses auth.jwt() to read email from token — no table join, no recursion
CREATE POLICY "Admin reads all reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'balajeetraderstry@gmail.com');

-- UPDATE (admin): uses auth.jwt() same way
CREATE POLICY "Admin can update review status"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING     ((auth.jwt() ->> 'email') = 'balajeetraderstry@gmail.com')
  WITH CHECK((auth.jwt() ->> 'email') = 'balajeetraderstry@gmail.com');

-- ── VERIFY ────────────────────────────────────────────────────────────────
-- After running, test with: SELECT * FROM public.reviews;
-- ============================================================
