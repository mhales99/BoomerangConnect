/**
 * Authentication Service
 * Handles Firebase authentication operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: string; // 'email', 'google', 'apple'
  
  // Practitioner-specific fields
  role?: 'practitioner' | 'admin';
  region?: string;
  clinic?: string;
  specialties?: string[];
  acceptingReferrals?: boolean;
  trustedSourcesOnly?: boolean;
  autoBook?: boolean;
  bookingUrl?: string;
  onboardingComplete?: boolean;
  onboardingStep?: number;
  
  // Trust Points system
  trustPoints?: number;
  connectionsCount?: number;
  
  // Legacy fields (kept for backward compatibility)
  practiceName?: string;
  specialty?: string;
  licenseNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  onboardingCompleted?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  isProvider?: boolean;
  providerId?: string;
}

export class AuthService {
  /**
   * Sign up with email and password
   */
  static async signUp(email: string, password: string, displayName?: string): Promise<User> {
    try {
      console.log('AuthService: signUp called with:', { email, hasPassword: !!password, displayName });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('AuthService: Firebase signUp successful:', user.email);

      // Create user profile
      if (user) {
        console.log('AuthService: Creating user profile...');
        await this.createUserProfile(user, { displayName, provider: 'email' });
        console.log('AuthService: User profile created successfully');
      }

      return user;
    } catch (error: any) {
      console.error('AuthService: signUp error:', error);
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string): Promise<User> {
    try {
      console.log('AuthService: signIn called with:', { email, hasPassword: !!password });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('AuthService: signIn successful:', user.email);
      return user;
    } catch (error: any) {
      console.error('AuthService: signIn error:', error);
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create or update user profile
      if (user) {
        await this.createUserProfile(user, { provider: 'google' });
      }

      return user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Apple
   */
  static async signInWithApple(): Promise<User> {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');

      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create or update user profile
      if (user) {
        await this.createUserProfile(user, { provider: 'apple' });
      }

      return user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out
   */
  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    const user = auth.currentUser;
    if (!user) return null;

    return this.getUserProfile(user.uid);
  }

  /**
   * Get user profile by UID
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Create user profile
   */
  private static async createUserProfile(user: User, additionalData: Partial<UserProfile> = {}): Promise<void> {
    try {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || additionalData.displayName,
        photoURL: user.photoURL || undefined,
        phoneNumber: user.phoneNumber || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        provider: additionalData.provider || 'email',
        trustPoints: 0,
        connectionsCount: 0,
        onboardingComplete: false,
        onboardingStep: 0,
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Handle authentication errors
   */
  private static handleAuthError(error: any): Error {
    let message = 'An error occurred during authentication';

    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in was cancelled';
        break;
      case 'auth/popup-blocked':
        message = 'Sign-in popup was blocked. Please allow popups for this site';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with the same email but different sign-in credentials';
        break;
      case 'auth/operation-not-allowed':
        message = 'This sign-in method is not enabled. Please contact support';
        break;
    }

    return new Error(message);
  }
}




