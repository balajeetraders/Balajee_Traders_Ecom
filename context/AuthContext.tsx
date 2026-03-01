
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  first_name: string;
  last_name: string;
  phone: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;         // true while initial session is being resolved
  oauthLoading: boolean;    // true while OAuth redirect is in progress
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  oauthLoading: false,
  signOut: async () => { },
  signInWithGoogle: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [oauthLoading, setOauthLoading] = useState(false);

  // ── Fetch profile row from `profiles` table ──────────────────────────
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) setProfile(data);
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Bootstrap: resolve existing session on mount ──────────────────────
  useEffect(() => {
    // 1. Get any persisted session immediately (avoids flash of unauthenticated state)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for all auth events: login, logout, token refresh, OAuth callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      }

      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
        setOauthLoading(false);
      }

      // OAuth redirect completed — clear the loading spinner
      if (event === 'SIGNED_IN') {
        setOauthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // ── Google OAuth sign-in ─────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    setOauthLoading(true);
    // Dynamic redirectTo: works in both dev (localhost:3000) and production
    const redirectTo = `${window.location.origin}${window.location.pathname}#/account`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        // Request profile scopes needed to auto-populate profile name
        scopes: 'openid email profile',
        queryParams: {
          access_type: 'offline',  // gives us a refresh_token for persistence
          prompt: 'select_account', // always show account selector
        },
      },
    });

    if (error) {
      console.error('Google OAuth error:', error.message);
      setOauthLoading(false);
    }
    // If no error, browser redirects to Google — oauthLoading stays true
    // until SIGNED_IN event fires after redirect back
  }, []);

  // ── Sign out ─────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, oauthLoading, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
