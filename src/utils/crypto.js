// Example src/utils/crypto.js
import CryptoJS from 'crypto-js';

// Encrypt a journal entry before saving to Firebase
export const encryptData = (text, secretKey) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decrypt a journal entry after fetching from Firebase
export const decryptData = (cipherText, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
