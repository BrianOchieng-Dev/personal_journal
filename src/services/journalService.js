import { db } from '../firebase/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

const COLLECTION_NAME = 'entries';

export const journalService = {
  // Create a new entry
  async createEntry(userId, entryData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        userId,
        ...entryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  },

  // Update an existing entry
  async updateEntry(entryId, entryData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, entryId);
      await updateDoc(docRef, {
        ...entryData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  },

  // Delete an entry
  async deleteEntry(entryId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, entryId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  },

  // Get all entries for a user
  async getEntries(userId) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to JS Date if possible
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  },

  // Get a single entry by ID
  async getEntry(entryId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, entryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  }
};
