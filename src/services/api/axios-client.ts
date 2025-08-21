import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { HttpClient } from './http-client'
import type { ApiResponse, RequestConfig, ApiError } from '@/types/api'
import { API_CONFIG } from '@/config/api'

/**
 * Implementação do HttpClient usando Axios
 *
 * @date 20/08/2025
 * @export
 * @class AxiosHttpClient
 * @implements {HttpClient}
 */
export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.DEFAULT_HEADERS,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Adicionado técnica de cache busting para evitar cache de browser e CDN/Proxies
        if (config.method === 'get') {
          config.params = { ...config.params, _t: Date.now() }
        }

        return config
      },
      (error) => {
        return Promise.reject(this.handleError(error))
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        return Promise.reject(this.handleError(error))
      },
    )
  }

  private transformResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
      success: response.status >= 200 && response.status < 300,
    }
  }

  private handleError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      // Erro de rede (sem resposta do servidor)
      if (error.code === 'ERR_NETWORK') {
        return {
          message: 'Erro de conexão - verifique sua internet ou tente novamente',
          status: 0,
          code: 'NETWORK_ERROR',
          details: { originalError: error.message },
        }
      }

      // Erro de timeout
      if (error.code === 'ECONNABORTED') {
        return {
          message: 'Timeout da requisição - servidor demorou para responder',
          status: 408,
          code: 'TIMEOUT_ERROR',
          details: { originalError: error.message },
        }
      }

      // Erro de CORS
      if (error.message.includes('CORS') || error.message.includes('Access-Control')) {
        return {
          message: 'Erro de CORS - problema de configuração do servidor',
          status: 0,
          code: 'CORS_ERROR',
          details: { originalError: error.message },
        }
      }

      // Outros erros do Axios
      return {
        message: error.response?.data?.message || error.message || 'Erro na requisição',
        status: error.response?.status || 500,
        code: error.code || 'AXIOS_ERROR',
        details: {
          originalError: error.message,
          responseData: error.response?.data,
        },
      }
    }

    return {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 500,
      code: 'UNKNOWN_ERROR',
      details: { originalError: error },
    }
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        params: config?.params,
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }

      const response = await this.axiosInstance.get(url, axiosConfig)
      return this.transformResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }

      const response = await this.axiosInstance.post(url, data, axiosConfig)
      return this.transformResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }

      const response = await this.axiosInstance.put(url, data, axiosConfig)
      return this.transformResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }

      const response = await this.axiosInstance.patch(url, data, axiosConfig)
      return this.transformResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        params: config?.params,
        headers: config?.headers,
        timeout: config?.timeout,
        signal: config?.signal,
      }

      const response = await this.axiosInstance.delete(url, axiosConfig)
      return this.transformResponse<T>(response)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  setBaseURL(url: string): void {
    this.axiosInstance.defaults.baseURL = url
  }
}
