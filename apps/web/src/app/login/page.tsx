'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setErr(null);
      await new Promise((r) => setTimeout(r, 800));
      router.replace('/dashboard');
    } catch (e: any) {
      setErr('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setLoading(true);
      setErr(null);
      await new Promise((r) => setTimeout(r, 600));
      router.replace('/dashboard');
    } catch (e: any) {
      setErr('Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50" style={{background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #cffafe 100%)'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-transparent to-orange-100/30" style={{background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, transparent 50%, rgba(251, 146, 60, 0.3) 100%)'}}></div>
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-200/40 to-orange-200/40 blur-2xl" style={{background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.4) 0%, rgba(251, 146, 60, 0.4) 100%)', filter: 'blur(32px)'}}></div>
      <div className="absolute bottom-20 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200/40 to-cyan-200/40 blur-xl" style={{background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(34, 211, 238, 0.4) 100%)', filter: 'blur(24px)'}}></div>
      
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-100 to-orange-100 px-4 py-2 text-sm font-medium text-cyan-600" style={{background: 'linear-gradient(90deg, #cffafe 0%, #fed7aa 100%)', color: '#0891b2'}}>
            <div className="h-2 w-2 rounded-full bg-cyan-500" style={{backgroundColor: '#06b6d4'}}></div>
            Private, practitioner-first
          </div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl" style={{color: '#111827'}}>
            Referrals that{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent" style={{background: 'linear-gradient(90deg, #06b6d4 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              come back
            </span>{' '}
            to you.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed" style={{color: '#4b5563'}}>
            Find trusted practitioners. Send and receive referrals. Track outcomes—fast.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100" style={{backgroundColor: '#cffafe'}}>
                <div className="h-2 w-2 rounded-full bg-cyan-500" style={{backgroundColor: '#06b6d4'}}></div>
              </div>
              <span>Send a referral in under 60 seconds</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100" style={{backgroundColor: '#cffafe'}}>
                <div className="h-2 w-2 rounded-full bg-cyan-500" style={{backgroundColor: '#06b6d4'}}></div>
              </div>
              <span>Book directly from real-time availability</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100" style={{backgroundColor: '#cffafe'}}>
                <div className="h-2 w-2 rounded-full bg-cyan-500" style={{backgroundColor: '#06b6d4'}}></div>
              </div>
              <span>Earn 100 Trust Points for inviting your circle</span>
            </div>
          </div>
        </div>

        <div id="get-started" className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-200/40 to-orange-200/40 blur-xl" style={{background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.4) 0%, rgba(251, 146, 60, 0.4) 100%)', filter: 'blur(24px)'}}></div>
          <div className="relative rounded-3xl border border-white/20 bg-white/80 backdrop-blur-sm p-8 shadow-2xl" style={{border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900" style={{color: '#111827'}}>
                {mode === 'signin' ? 'Welcome back' : 'Let's get you set up'}
              </h2>
              <p className="text-gray-600 mt-2" style={{color: '#4b5563'}}>
                {mode === 'signin' ? 'Sign in below.' : 'It only takes a minute.'}
              </p>
            </div>

            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{color: '#111827'}}>Your name</label>
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 text-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  style={{border: '1px solid #d1d5db', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '12px', padding: '12px 16px', fontSize: '14px'}}
                  placeholder="Taylor Chen"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            )}

            <form className="space-y-4" onSubmit={handleEmail}>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{color: '#111827'}}>Email</label>
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 text-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  style={{border: '1px solid #d1d5db', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '12px', padding: '12px 16px', fontSize: '14px'}}
                  placeholder="you@clinic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{color: '#111827'}}>Password</label>
                <input
                  className="w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 text-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  style={{border: '1px solid #d1d5db', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '12px', padding: '12px 16px', fontSize: '14px'}}
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
              </div>

              {err && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4" style={{backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px'}}>
                  <p className="text-red-600 text-sm" style={{color: '#dc2626'}}>{err}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)', borderRadius: '12px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
              >
                {loading ? (mode === 'signin' ? 'Signing you in…' : 'Creating your account…') : (mode === 'signin' ? 'Sign in' : 'Create account')}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" style={{borderTop: '1px solid #d1d5db'}} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-500" style={{backgroundColor: 'white', padding: '0 16px', color: '#6b7280'}}>or</span>
              </div>
            </div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '12px', padding: '12px 24px', fontSize: '14px', fontWeight: '500', color: '#111827'}}
            >
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-600" style={{color: '#4b5563'}}>
              {mode === 'signin' ? (
                <>New here? <button className="font-medium text-cyan-600 hover:underline" style={{color: '#0891b2'}} onClick={() => setMode('signup')}>Create an account</button></>
              ) : (
                <>Already have an account? <button className="font-medium text-cyan-600 hover:underline" style={{color: '#0891b2'}} onClick={() => setMode('signin')}>Sign in</button></>
              )}
            </p>
            <p className="mt-4 text-center text-xs text-gray-500" style={{color: '#6b7280'}}>By continuing, you agree to our Terms and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
