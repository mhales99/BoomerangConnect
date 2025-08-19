import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from '../config/firebase';

class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.firestore = null;
    this.analytics = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);
      
      // Initialize Firebase Authentication
      this.auth = getAuth(this.app);
      
      // Initialize Firestore
      this.firestore = getFirestore(this.app);
      
      // Initialize Analytics if supported
      if (await isSupported()) {
        this.analytics = getAnalytics(this.app);
      }
      
      this.initialized = true;
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  }

  // Authentication methods
  async signIn(email, password) {
    try {
      if (!this.initialized) await this.initialize();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signUp(email, password) {
    try {
      if (!this.initialized) await this.initialize();
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      if (!this.initialized) await this.initialize();
      const { signOut } = await import('firebase/auth');
      return await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Firestore methods
  async getCollection(collectionName) {
    try {
      if (!this.initialized) await this.initialize();
      const { collection, getDocs } = await import('firebase/firestore');
      const querySnapshot = await getDocs(collection(this.firestore, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      throw error;
    }
  }

  async getDocument(collectionName, documentId) {
    try {
      if (!this.initialized) await this.initialize();
      const { doc, getDoc } = await import('firebase/firestore');
      const docRef = doc(this.firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${documentId} from ${collectionName}:`, error);
      throw error;
    }
  }

  async addDocument(collectionName, data) {
    try {
      if (!this.initialized) await this.initialize();
      const { collection, addDoc } = await import('firebase/firestore');
      const docRef = await addDoc(collection(this.firestore, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  async updateDocument(collectionName, documentId, data) {
    try {
      if (!this.initialized) await this.initialize();
      const { doc, updateDoc } = await import('firebase/firestore');
      const docRef = doc(this.firestore, collectionName, documentId);
      await updateDoc(docRef, data);
      return true;
    } catch (error) {
      console.error(`Error updating document ${documentId} in ${collectionName}:`, error);
      throw error;
    }
  }

  async deleteDocument(collectionName, documentId) {
    try {
      if (!this.initialized) await this.initialize();
      const { doc, deleteDoc } = await import('firebase/firestore');
      const docRef = doc(this.firestore, collectionName, documentId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting document ${documentId} from ${collectionName}:`, error);
      throw error;
    }
  }

  // Analytics methods
  async logEvent(eventName, eventParams) {
    try {
      if (!this.analytics) {
        if (await isSupported()) {
          this.analytics = getAnalytics(this.app);
        } else {
          console.log('Analytics not supported in this environment');
          return;
        }
      }
      
      const { logEvent } = await import('firebase/analytics');
      logEvent(this.analytics, eventName, eventParams);
    } catch (error) {
      console.error(`Error logging event ${eventName}:`, error);
    }
  }

  // Get current user
  getCurrentUser() {
    return this.auth?.currentUser || null;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    if (!this.initialized) {
      this.initialize().then(() => {
        return this.auth.onAuthStateChanged(callback);
      });
    } else {
      return this.auth.onAuthStateChanged(callback);
    }
  }
}

// Export singleton instance
const firebaseService = new FirebaseService();
export default firebaseService;
