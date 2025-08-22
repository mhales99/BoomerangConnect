"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@boomerang/core";
import { collection, getDocs, limit, query, runTransaction, where, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@boomerang/core";

async function acceptInviteIfPresent(inviteeUid: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("invite");
  if (!token) return;

  // find the invite by token
  const q = query(collection(db, "invites"), where("token", "==", token), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return;
  const inviteRef = snap.docs[0].ref;
  const invite = snap.docs[0].data() as any;

  // atomic: mark accepted + add points to inviter + (optional) connect users
  await runTransaction(db, async (tx) => {
    const inviteDoc = await tx.get(inviteRef);
    if (!inviteDoc.exists()) return;
    const data = inviteDoc.data() as any;
    if (data.status !== "pending") return;

    tx.update(inviteRef, { status: "accepted", acceptedAt: serverTimestamp(), inviteeUid });

    const inviterRef = doc(db, "users", data.inviterId);
    const inviterSnap = await tx.get(inviterRef);
    const currentPts = (inviterSnap.data()?.trustPoints ?? 0) as number;
    tx.set(inviterRef, { trustPoints: currentPts + 100, updatedAt: serverTimestamp() }, { merge: true });

    // OPTIONAL: record a simple connection (both directions)
    const connA = doc(collection(db, "connections"));
    tx.set(connA, { a: data.inviterId, b: inviteeUid, createdAt: serverTimestamp(), source: "invite" });
  });
}

function prettyFirebaseError(e: any) {
  const m = e?.message || "";
  if (m.includes("auth/invalid-credential")) return "Invalid email or password.";
  if (m.includes("auth/email-already-in-use")) return "That email is already in use. Try signing in.";
  if (m.includes("auth/weak-password")) return "Please use a stronger password (6+ chars).";
  if (m.includes("auth/user-not-found")) return "No account found with this email address.";
  if (m.includes("auth/wrong-password")) return "Incorrect password.";
  if (m.includes("auth/invalid-email")) return "Invalid email address.";
  if (m.includes("auth/popup-closed-by-user")) return "Sign-in was cancelled.";
  if (m.includes("auth/popup-blocked")) return "Sign-in popup was blocked. Please allow popups for this site.";
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const modeParam = sp.get("mode");
  const [mode, setMode] = useState<"signin" | "signup">(modeParam === "signup" ? "signup" : "signin");

  const { signUp, signIn, signInWithGoogle, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if already authenticated
    if (!authLoading && !loading) {
      // This will be handled by the main page redirect logic
    }
  }, [authLoading, loading]);

  const title = useMemo(() => (mode === "signin" ? "Welcome back" : "Create your account"), [mode]);

  async function handleGoogle() {
    try {
      setLoading(true);
      setErr(null);
      const user = await signInWithGoogle();
      
      // Check for invite token and award points if present
      if (mode === "signup") {
        await acceptInviteIfPresent(user.uid);
      }
      
      router.push("/dashboard");
    } catch (e: any) {
      setErr(prettyFirebaseError(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleEmail() {
    try {
      setLoading(true);
      setErr(null);
      console.log('Attempting authentication:', { mode, email, hasPassword: !!password });
      
      if (mode === "signin") {
        console.log('Signing in...');
        const user = await signIn(email, password);
        console.log('Sign in successful:', user.email);
        router.push("/dashboard");
      } else {
        // For signup, we need to collect more data
        if (!displayName.trim()) {
          setErr("Please enter your name");
          return;
        }
        
        console.log('Signing up...');
        const user = await signUp(email, password, displayName);
        console.log('Sign up successful:', user.email);
        
        // Check for invite token and award points if present
        await acceptInviteIfPresent(user.uid);
        
        router.push("/onboarding/practitioner"); // start practitioner wizard
        return;
      }
    } catch (e: any) {
      console.error('Authentication error:', e);
      setErr(prettyFirebaseError(e));
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page flex">
      <div className="mx-auto w-full max-w-md px-6 py-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-2xl bg-brand text-white grid place-items-center font-semibold">BC</div>
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          <p className="text-sm text-muted mt-1">
            Referrals that come back to you. <span className="whitespace-nowrap">Private by default.</span>
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          {mode === "signup" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-ink">Your name</label>
              <input
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink placeholder-muted focus:border-brand focus:outline-none bg-page"
                placeholder="Taylor Chen"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-ink">Email</label>
            <input
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink placeholder-muted focus:border-brand focus:outline-none bg-page"
              placeholder="you@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-ink">Password</label>
            <input
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-ink placeholder-muted focus:border-brand focus:outline-none bg-page"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

          <button
            onClick={handleEmail}
            disabled={loading}
            className="mt-4 w-full rounded-md bg-brand hover:bg-brand-600 disabled:bg-muted px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            {loading ? (mode === "signin" ? "Signing you in…" : "Creating your account…") : mode === "signin" ? "Continue" : "Create account"}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full rounded-md border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-page disabled:opacity-50 transition-colors"
          >
            Continue with Google
          </button>

          <p className="mt-4 text-center text-sm text-muted">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button className="underline" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button className="underline" onClick={() => setMode("signin")}>
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="mt-6 text-center text-xs text-muted">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>

        {/* Benefit bullets */}
        <ul className="mt-6 grid gap-2 text-sm text-muted">
          <li>• Send a referral in under 60 seconds</li>
          <li>• Book directly from real-time availability</li>
          <li>• Earn rewards for growing your network</li>
        </ul>
      </div>
    </main>
  );
}
