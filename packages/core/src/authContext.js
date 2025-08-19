'use client';
/**
 * Authentication Context
 * Manages authentication state across the app
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AuthService } from './auth';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const profile = await AuthService.getUserProfile(firebaseUser.uid);
                    setUserProfile(profile);
                }
                catch (error) {
                    console.error('Error loading user profile:', error);
                    setUserProfile(null);
                }
            }
            else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const signUp = async (data) => {
        const profile = await AuthService.signUp(data);
        setUserProfile(profile);
        return profile;
    };
    const signIn = async (data) => {
        const profile = await AuthService.signIn(data);
        setUserProfile(profile);
        return profile;
    };
    const signOut = async () => {
        await AuthService.signOut();
        setUserProfile(null);
    };
    const resetPassword = async (email) => {
        await AuthService.resetPassword(email);
    };
    const updateProfile = async (updates) => {
        if (!user?.uid)
            throw new Error('No user logged in');
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
    const value = {
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
    };
    return (<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export default AuthProvider;
//# sourceMappingURL=authContext.js.map