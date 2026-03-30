/**
 * Application Constants
 */

export const APP_NAME = 'MindVault';

export const COLLECTIONS = {
    ENTRIES: 'entries',
    SETTINGS: 'userSettings',
};

export const ROUTES = {
    DASHBOARD: '/dashboard',
    TIMELINE: '/timeline',
    EDITOR: '/editor',
    SETTINGS: '/settings',
    LOGIN: '/login',
    REGISTER: '/register',
};

export const VAULT_CONFIG = {
    KEY_CHECK_PREFIX: 'MV_VAULT_V1_', // Prefix to identify encrypted content
    ENCRYPTION_ALGO: 'AES-256',
};
