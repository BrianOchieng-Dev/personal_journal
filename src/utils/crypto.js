import CryptoJS from 'crypto-js';

/**
 * Encrypts a string using AES with a given secret key.
 * @param {string} text - The plain text to encrypt.
 * @param {string} secretKey - The user's vault master key.
 * @returns {string} - The encrypted cipher text.
 */
export const encryptData = (text, secretKey) => {
    if (!text || !secretKey) return text;
    try {
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    } catch (error) {
        console.error("Encryption failed:", error);
        return text;
    }
};

/**
 * Decrypts a cipher text using AES with a given secret key.
 * @param {string} cipherText - The encrypted text.
 * @param {string} secretKey - The user's vault master key.
 * @returns {string} - The decrypted plain text.
 */
export const decryptData = (cipherText, secretKey) => {
    if (!cipherText || !secretKey) return cipherText;
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        
        // If decryption results in empty string but input wasn't empty, it failed
        if (!decrypted && cipherText) return "[Encrypted Content - Vault Locked]";
        
        return decrypted;
    } catch (error) {
        console.error("Decryption failed:", error);
        return "[Decryption Failed - Check Vault Key]";
    }
};

/**
 * Derives a simpler key check for validation.
 * (Optional: can be used to check if a passphrase is correct without decrypting everything)
 */
export const deriveKeyHash = (secretKey) => {
    return CryptoJS.SHA256(secretKey).toString();
};
