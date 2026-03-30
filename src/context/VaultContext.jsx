import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { encryptData, decryptData } from '../utils/crypto';
import { VaultContext } from './VaultContextObject';

export function VaultProvider({ children }) {
    const { currentUser } = useAuth();
    const [vaultKey, setVaultKey] = useState(null);
    const [isLocked, setIsLocked] = useState(true);

    // Reset vault when user logs out
    useEffect(() => {
        if (!currentUser && (vaultKey !== null || isLocked !== true)) {
            // Defer reset to next tick to avoid cascading render warning/error
            const timer = setTimeout(() => {
                setVaultKey(null);
                setIsLocked(true);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [currentUser, vaultKey, isLocked]);

    const unlockVault = useCallback((passphrase) => {
        if (!passphrase) return false;
        setVaultKey(passphrase);
        setIsLocked(false);
        return true;
    }, []);

    const lockVault = useCallback(() => {
        setVaultKey(null);
        setIsLocked(true);
    }, []);

    const encrypt = useCallback((text) => {
        if (isLocked || !vaultKey) return text;
        return encryptData(text, vaultKey);
    }, [isLocked, vaultKey]);

    const decrypt = useCallback((cipherText) => {
        if (isLocked || !vaultKey) return cipherText;
        return decryptData(cipherText, vaultKey);
    }, [isLocked, vaultKey]);

    const value = {
        vaultKey,
        isLocked,
        unlockVault,
        lockVault,
        encrypt,
        decrypt
    };

    return (
        <VaultContext.Provider value={value}>
            {children}
        </VaultContext.Provider>
    );
}
