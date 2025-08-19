/**
 * Authentication Context
 * Manages authentication state across the app
 */
import React, { ReactNode } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from './auth';
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
interface AuthProviderProps {
    children: ReactNode;
}
export declare const AuthProvider: React.FC<AuthProviderProps>;
export declare const useAuth: () => AuthContextType;
export default AuthProvider;
//# sourceMappingURL=authContext.d.ts.map