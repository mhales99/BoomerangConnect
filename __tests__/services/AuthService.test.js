import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

// AuthService implementation (this would typically be in src/services/AuthService.js)
class AuthService {
  static async signIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  static async signUp(email, password, displayName) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return userCredential;
  }

  static async logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  static async resetPassword(email) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }

  static getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }
}

describe('AuthService', () => {
  const mockAuth = { currentUser: null };
  const mockUserCredential = {
    user: { uid: 'test-uid', email: 'test@example.com' }
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    getAuth.mockReturnValue(mockAuth);
    signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    updateProfile.mockResolvedValue();
    signOut.mockResolvedValue();
    sendPasswordResetEmail.mockResolvedValue();
  });

  it('should sign in a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    
    await AuthService.signIn(email, password);
    
    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
  });

  it('should sign up a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const displayName = 'Test User';
    
    await AuthService.signUp(email, password, displayName);
    
    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(updateProfile).toHaveBeenCalledWith(mockUserCredential.user, { displayName });
  });

  it('should sign up a user without displayName', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    
    await AuthService.signUp(email, password);
    
    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it('should log out a user', async () => {
    await AuthService.logout();
    
    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });

  it('should reset a user password', async () => {
    const email = 'test@example.com';
    
    await AuthService.resetPassword(email);
    
    expect(getAuth).toHaveBeenCalled();
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(mockAuth, email);
  });

  it('should get the current user', () => {
    const mockUser = { uid: 'test-uid', email: 'test@example.com' };
    mockAuth.currentUser = mockUser;
    
    const currentUser = AuthService.getCurrentUser();
    
    expect(getAuth).toHaveBeenCalled();
    expect(currentUser).toBe(mockUser);
  });

  it('should handle sign in errors', async () => {
    const email = 'test@example.com';
    const password = 'wrong-password';
    const errorMessage = 'Invalid password';
    
    signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));
    
    await expect(AuthService.signIn(email, password)).rejects.toThrow(errorMessage);
  });
});
