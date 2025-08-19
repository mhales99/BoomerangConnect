/**
 * Authentication Service
 * Handles user authentication with Firebase
 */
export interface UserProfile {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    createdAt: Date;
    updatedAt: Date;
    trustPoints: number;
    isProvider: boolean;
    providerId?: string;
}
export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
}
export interface SignInData {
    email: string;
    password: string;
}
export declare class AuthService {
    /**
     * Sign up a new user
     */
    static signUp(data: SignUpData): Promise<UserProfile>;
    /**
     * Sign in existing user
     */
    static signIn(data: SignInData): Promise<UserProfile>;
    /**
     * Sign out current user
     */
    static signOut(): Promise<void>;
    /**
     * Send password reset email
     */
    static resetPassword(email: string): Promise<void>;
    /**
     * Get current user profile
     */
    static getCurrentUserProfile(): Promise<UserProfile | null>;
    /**
     * Get user profile by UID
     */
    static getUserProfile(uid: string): Promise<UserProfile>;
    /**
     * Update user profile
     */
    static updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void>;
    /**
     * Handle Firebase Auth errors
     */
    private static handleAuthError;
}
export default AuthService;
//# sourceMappingURL=auth.d.ts.map