/**
 * Firebase Configuration
 * Shared across web and mobile apps
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDRiHLC-n3IGQNPPxR71FjXfFdogv00CgI",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "boomerang-connect-cf9a4.firebaseapp.com",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://boomerang-connect-cf9a4-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "boomerang-connect-cf9a4",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "boomerang-connect-cf9a4.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "118741245968",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:118741245968:web:762b3b96117f1a489baa95",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-47XZ2PPFTB",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
//# sourceMappingURL=firebase.js.map