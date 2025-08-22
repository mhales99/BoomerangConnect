import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}));

// FirestoreService implementation (this would typically be in src/services/FirestoreService.js)
class FirestoreService {
  static getDb() {
    return getFirestore();
  }

  static async getDocument(collectionName, docId) {
    const db = this.getDb();
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  }

  static async getCollection(collectionName, queryConstraints = []) {
    const db = this.getDb();
    const collectionRef = collection(db, collectionName);
    
    let queryRef = collectionRef;
    if (queryConstraints.length > 0) {
      queryRef = query(collectionRef, ...queryConstraints);
    }
    
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  static async addDocument(collectionName, data) {
    const db = this.getDb();
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  }

  static async updateDocument(collectionName, docId, data) {
    const db = this.getDb();
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return true;
  }

  static async deleteDocument(collectionName, docId) {
    const db = this.getDb();
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  }
}

describe('FirestoreService', () => {
  const mockDb = {};
  const mockDocRef = {};
  const mockCollectionRef = {};
  const mockQueryRef = {};

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    getFirestore.mockReturnValue(mockDb);
    doc.mockReturnValue(mockDocRef);
    collection.mockReturnValue(mockCollectionRef);
    query.mockReturnValue(mockQueryRef);
  });

  it('should get a document', async () => {
    const mockDocSnap = {
      exists: () => true,
      id: 'doc-id',
      data: () => ({ name: 'Test Document' }),
    };
    
    getDoc.mockResolvedValue(mockDocSnap);
    
    const result = await FirestoreService.getDocument('test-collection', 'doc-id');
    
    expect(getFirestore).toHaveBeenCalled();
    expect(doc).toHaveBeenCalledWith(mockDb, 'test-collection', 'doc-id');
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ id: 'doc-id', name: 'Test Document' });
  });

  it('should return null for non-existent document', async () => {
    const mockDocSnap = {
      exists: () => false,
    };
    
    getDoc.mockResolvedValue(mockDocSnap);
    
    const result = await FirestoreService.getDocument('test-collection', 'non-existent-id');
    
    expect(result).toBeNull();
  });

  it('should get a collection', async () => {
    const mockDocs = [
      {
        id: 'doc-1',
        data: () => ({ name: 'Document 1' }),
      },
      {
        id: 'doc-2',
        data: () => ({ name: 'Document 2' }),
      },
    ];
    
    const mockQuerySnapshot = {
      docs: mockDocs,
    };
    
    getDocs.mockResolvedValue(mockQuerySnapshot);
    
    const result = await FirestoreService.getCollection('test-collection');
    
    expect(getFirestore).toHaveBeenCalled();
    expect(collection).toHaveBeenCalledWith(mockDb, 'test-collection');
    expect(getDocs).toHaveBeenCalledWith(mockCollectionRef);
    expect(result).toEqual([
      { id: 'doc-1', name: 'Document 1' },
      { id: 'doc-2', name: 'Document 2' },
    ]);
  });

  it('should get a filtered collection', async () => {
    const mockDocs = [
      {
        id: 'doc-1',
        data: () => ({ name: 'Document 1', category: 'A' }),
      },
    ];
    
    const mockQuerySnapshot = {
      docs: mockDocs,
    };
    
    getDocs.mockResolvedValue(mockQuerySnapshot);
    where.mockReturnValue('where-constraint');
    orderBy.mockReturnValue('order-constraint');
    
    const queryConstraints = [
      where('category', '==', 'A'),
      orderBy('name'),
    ];
    
    const result = await FirestoreService.getCollection('test-collection', queryConstraints);
    
    expect(query).toHaveBeenCalledWith(mockCollectionRef, ...queryConstraints);
    expect(getDocs).toHaveBeenCalledWith(mockQueryRef);
    expect(result).toEqual([
      { id: 'doc-1', name: 'Document 1', category: 'A' },
    ]);
  });

  it('should add a document', async () => {
    const data = { name: 'New Document' };
    const mockNewDocRef = { id: 'new-doc-id' };
    
    addDoc.mockResolvedValue(mockNewDocRef);
    
    const result = await FirestoreService.addDocument('test-collection', data);
    
    expect(collection).toHaveBeenCalledWith(mockDb, 'test-collection');
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, data);
    expect(result).toBe('new-doc-id');
  });

  it('should update a document', async () => {
    const data = { name: 'Updated Document' };
    
    updateDoc.mockResolvedValue();
    
    const result = await FirestoreService.updateDocument('test-collection', 'doc-id', data);
    
    expect(doc).toHaveBeenCalledWith(mockDb, 'test-collection', 'doc-id');
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, data);
    expect(result).toBe(true);
  });

  it('should delete a document', async () => {
    deleteDoc.mockResolvedValue();
    
    const result = await FirestoreService.deleteDocument('test-collection', 'doc-id');
    
    expect(doc).toHaveBeenCalledWith(mockDb, 'test-collection', 'doc-id');
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBe(true);
  });
});


