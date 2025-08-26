import type { HttpClient } from '@/core/http/http-client'
import { BaseRepository } from '../../../core/http/base-repository'
import type { IOrderResponse } from '../models/res/order.interface'

export interface OrderRepository {
  getOrderById(id: string): Promise<IOrderResponse>
}

export class ApiOrderRepository extends BaseRepository implements OrderRepository {
  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  /**
   * Get order by id
   * @http GET https://api.mercadoe.space/orders/{id}
   * @date 25/08/2025
   * @param {string} id
   * @return {*}  {Promise<IOrderResponse>}
   * @memberof ApiOrderRepository
   */
  async getOrderById(id: string): Promise<IOrderResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await this.httpClient.get<IOrderResponse>(`/orders/${id}`)
    return response.data
  }
}
