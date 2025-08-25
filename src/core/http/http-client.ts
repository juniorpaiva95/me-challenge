/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse, RequestConfig } from '@/core/http/api.types'

/**
 * Interface para o cliente HTTP
 * Seguindo o princípio de inversão de dependência (SOLID)
 */
export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>>
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>>
  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>>
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>

  setBaseURL(url: string): void
}
