export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',

  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),

  AUTH: {
    ENABLED: import.meta.env.VITE_AUTH_ENABLED === 'true',
    TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
  },

  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  ENDPOINTS: {
    ORDERS: '/orders',
    USERS: '/users',
    AUTH: '/auth',
  },
} as const
