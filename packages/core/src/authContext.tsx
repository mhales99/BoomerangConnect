'use client';

/**
 * Authentication Context
 * Manages authentication state across the app
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AuthService, UserProfile } from './auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (data: any) => Promise<UserProfile>;
  signIn: (data: any) => Promise<UserProfile>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const profile = await AuthService.getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: any): Promise<UserProfile> => {
    const profile = await AuthService.signUp(data);
    setUserProfile(profile);
    return profile;
  };

  const signIn = async (data: any): Promise<UserProfile> => {
    const profile = await AuthService.signIn(data);
    setUserProfile(profile);
    return profile;
  };

  const signOut = async (): Promise<void> => {
    await AuthService.signOut();
    setUserProfile(null);
  };

  const resetPassword = async (email: string): Promise<void> => {
    await AuthService.resetPassword(email);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user?.uid) throw new Error('No user logged in');
    
    await AuthService.updateUserProfile(user.uid, updates);
    
    // Update local state
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        ...updates,
        updatedAt: new Date(),
      });
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
