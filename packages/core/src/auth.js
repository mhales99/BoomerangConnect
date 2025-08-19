/**
 * Authentication Service
 * Handles user authentication with Firebase
 */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
export class AuthService {
    /**
     * Sign up a new user
     */
    static async signUp(data) {
        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            // Update display name
            await updateProfile(user, {
                displayName: `${data.firstName} ${data.lastName}`
            });
            // Create user profile in Firestore
            const userProfile = {
                uid: user.uid,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                createdAt: new Date(),
                updatedAt: new Date(),
                trustPoints: 0,
                isProvider: false,
            };
            await setDoc(doc(db, 'users', user.uid), userProfile);
            return userProfile;
        }
        catch (error) {
            console.error('Sign up error:', error);
            throw this.handleAuthError(error);
        }
    }
    /**
     * Sign in existing user
     */
    static async signIn(data) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            return await this.getUserProfile(user.uid);
        }
        catch (error) {
            console.error('Sign in error:', error);
            throw this.handleAuthError(error);
        }
    }
    /**
     * Sign out current user
     */
    static async signOut() {
        try {
            await signOut(auth);
        }
        catch (error) {
            console.error('Sign out error:', error);
            throw this.handleAuthError(error);
        }
    }
    /**
     * Send password reset email
     */
    static async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
        }
        catch (error) {
            console.error('Password reset error:', error);
            throw this.handleAuthError(error);
        }
    }
    /**
     * Get current user profile
     */
    static async getCurrentUserProfile() {
        const user = auth.currentUser;
        if (!user)
            return null;
        return await this.getUserProfile(user.uid);
    }
    /**
     * Get user profile by UID
     */
    static async getUserProfile(uid) {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (!userDoc.exists()) {
                throw new Error('User profile not found');
            }
            return userDoc.data();
        }
        catch (error) {
            console.error('Get user profile error:', error);
            throw error;
        }
    }
    /**
     * Update user profile
     */
    static async updateUserProfile(uid, updates) {
        try {
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, {
                ...updates,
                updatedAt: new Date(),
            }, { merge: true });
        }
        catch (error) {
            console.error('Update user profile error:', error);
            throw error;
        }
    }
    /**
     * Handle Firebase Auth errors
     */
    static handleAuthError(error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return new Error('An account with this email already exists');
            case 'auth/invalid-email':
                return new Error('Please enter a valid email address');
            case 'auth/weak-password':
                return new Error('Password should be at least 6 characters');
            case 'auth/user-not-found':
                return new Error('No account found with this email');
            case 'auth/wrong-password':
                return new Error('Incorrect password');
            case 'auth/too-many-requests':
                return new Error('Too many failed attempts. Please try again later');
            case 'auth/network-request-failed':
                return new Error('Network error. Please check your connection');
            default:
                return new Error('Authentication failed. Please try again');
        }
    }
}
export default AuthService;
//# sourceMappingURL=auth.js.map