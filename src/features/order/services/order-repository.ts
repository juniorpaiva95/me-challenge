import type { HttpClient } from '@/core/http/http-client'

export interface Contact {
  name: string
  email: string
  phone: string
  fax: string
}

export interface Document {
  type: string
  value: string
}

export interface Address {
  label: string
  name: string
  code: string | null
  address: string
  contact: Contact
}

export interface Supplier {
  code: string
  name: string
  readAt: string
  lastReplyAt: string
  document: Document
  address: string
  contact: Contact
}

export interface OrderHeader {
  number: number
  serial: number
  buyer: string
  price: number
  currency: string
  createdAt: string
  status: string
  contact: Contact
}

export interface Order {
  header: OrderHeader
  supplier: Supplier
  addresses: Address[]
}

export interface OrderRepository {
  getOrderById(id: string): Promise<Order>
}

export class ApiOrderRepository implements OrderRepository {
  constructor(private httpClient: HttpClient) {}

  async getOrderById(id: string): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await this.httpClient.get<Order>(`/orders/${id}`)
    return response.data
  }
}
