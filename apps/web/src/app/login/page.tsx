"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
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

function LoginPageContent() {
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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
            BC
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-600">
            Referrals that come back to you. <span className="whitespace-nowrap">Private by default.</span>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {mode === "signup" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
              <input
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="Taylor Chen"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              placeholder="you@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {err && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {err}
            </div>
          )}

          <button
            onClick={handleEmail}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
          >
            {loading ? (mode === "signin" ? "Signing you in…" : "Creating your account…") : mode === "signin" ? "Continue" : "Create account"}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 rounded-lg transition-colors"
          >
            Continue with Google
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {mode === "signin" ? (
                <>
                  New here?{" "}
                  <button 
                    className="text-indigo-600 hover:text-indigo-700 font-medium" 
                    onClick={() => setMode("signup")}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    className="text-indigo-600 hover:text-indigo-700 font-medium" 
                    onClick={() => setMode("signin")}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Benefit bullets */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3"></div>
            Send a referral in under 60 seconds
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3"></div>
            Book directly from real-time availability
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3"></div>
            Earn rewards for growing your network
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
