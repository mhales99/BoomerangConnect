/**
 * Firebase Configuration
 * Shared across web and mobile apps
 */
export declare const firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};
declare const app: import("@firebase/app").FirebaseApp;
export declare const auth: import("@firebase/auth").Auth;
export declare const db: import("@firebase/firestore").Firestore;
export declare const analytics: import("@firebase/analytics").Analytics | null;
export default app;
//# sourceMappingURL=firebase.d.ts.map