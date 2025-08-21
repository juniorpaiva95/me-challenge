/* eslint-disable @typescript-eslint/no-explicit-any */
// Tipos base para a API
export interface ApiResponse<T = any> {
  data: T
  status: number
  message?: string
  success: boolean
}

export interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, any>
  timeout?: number
  signal?: AbortSignal
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Tipos para tratamento de erros
export interface ApiError {
  message: string
  status: number
  code?: string
  details?: Record<string, any>
}

// Tipos para interceptors
export interface RequestInterceptor {
  onFulfilled?: (config: any) => any
  onRejected?: (error: any) => any
}

export interface ResponseInterceptor {
  onFulfilled?: (response: any) => any
  onRejected?: (error: any) => any
}
