// Configuração da API que funciona tanto em desenvolvimento quanto em produção
const isDevelopment = import.meta.env.DEV

// URL base da API - em desenvolvimento usa proxy local, em produção usa Netlify Function
const getBaseUrl = () => {
  // Se tiver uma variável de ambiente específica, usa ela
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }

  // Caso contrário, usa a lógica padrão
  if (isDevelopment) {
    return '/api'
  }

  // Em produção, usa a Netlify Function como proxy
  // A URL será relativa ao domínio do Netlify
  return '/.netlify/functions/api-proxy'
}

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),

  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),

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
