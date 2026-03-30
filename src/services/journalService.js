import { db } from '../firebase/firebase';
import { toJSDate } from '../utils/formatDate';
import { COLLECTIONS } from '../utils/constants';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

export const journalService = {
  // Create a new entry (Encrypted)
  async createEntry(userId, entryData, encryptFn) {
    try {
      const dataToSave = { ...entryData };
      
      // Encrypt sensitive fields if encrypt function is provided
      if (encryptFn) {
        if (dataToSave.content) dataToSave.content = encryptFn(dataToSave.content);
        if (dataToSave.title) dataToSave.title = encryptFn(dataToSave.title);
        dataToSave.isEncrypted = true;
      }

      const docRef = await addDoc(collection(db, COLLECTIONS.ENTRIES), {
        userId,
        ...dataToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  },

  // Update an existing entry (Encrypted)
  async updateEntry(entryId, entryData, encryptFn) {
    try {
      const dataToUpdate = { ...entryData };
      
      if (encryptFn) {
        if (dataToUpdate.content) dataToUpdate.content = encryptFn(dataToUpdate.content);
        if (dataToUpdate.title) dataToUpdate.title = encryptFn(dataToUpdate.title);
        dataToUpdate.isEncrypted = true;
      }

      const docRef = doc(db, COLLECTIONS.ENTRIES, entryId);
      await updateDoc(docRef, {
        ...dataToUpdate,
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
      const docRef = doc(db, COLLECTIONS.ENTRIES, entryId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  },

  // Get all entries for a user (Decrypted)
  async getEntries(userId, decryptFn) {
    try {
      const q = query(
        collection(db, COLLECTIONS.ENTRIES), 
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const entry = {
          id: doc.id,
          ...data,
          createdAt: toJSDate(data.createdAt),
          updatedAt: toJSDate(data.updatedAt),
        };

        // Decrypt if necessary
        if (data.isEncrypted && decryptFn) {
          if (entry.content) entry.content = decryptFn(entry.content);
          if (entry.title) entry.title = decryptFn(entry.title);
        }

        return entry;
      });
      
      // Sort in-memory to avoid mandatory composite index
      return entries.sort((a, b) => {
        const dateA = a.createdAt || 0;
        const dateB = b.createdAt || 0;
        return dateB - dateA;
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  },

  // Get a single entry by ID (Decrypted)
  async getEntry(entryId, decryptFn) {
    try {
      const docRef = doc(db, COLLECTIONS.ENTRIES, entryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const entry = { id: docSnap.id, ...data };
        
        if (data.isEncrypted && decryptFn) {
          if (entry.content) entry.content = decryptFn(entry.content);
          if (entry.title) entry.title = decryptFn(entry.title);
        }
        
        return entry;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  }
};
