import { ref, readonly } from 'vue'
import { AxiosHttpClient } from '@/services/api'
import { ApiOrderRepository } from '@/services/api/repositories'
import type { Order } from '@/services/api/repositories'

const order = ref<Order | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useOrder() {
  const httpClient = new AxiosHttpClient()
  const orderRepository = new ApiOrderRepository(httpClient)

  /**
   * @description Recupera um pedido por ID
   * @date 20/08/2025
   * @param {string} id
   */
  const fetchOrderById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      order.value = await orderRepository.getOrderById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar pedido'
      throw err
    } finally {
      loading.value = true
    }
  }

  const clearOrder = () => {
    order.value = null
    error.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    order: readonly(order),
    loading: readonly(loading),
    error: readonly(error),

    fetchOrderById,
    clearOrder,
    clearError,
  }
}
