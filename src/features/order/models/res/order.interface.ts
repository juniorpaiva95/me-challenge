interface IContact {
  name: string
  email: string
  phone: string
  fax: string
}

interface IDocument {
  type: string
  value: string
}

interface IAddress {
  label: string
  name: string
  code: string | null
  address: string
  contact: IContact
}

interface ISupplier {
  code: string
  name: string
  readAt: string
  lastReplyAt: string
  document: IDocument
  address: string
  contact: IContact
}

interface IOrderHeader {
  number: number
  serial: number
  buyer: string
  price: number
  currency: string
  createdAt: string
  status: string
  contact: IContact
}

export interface IOrderResponse {
  header: IOrderHeader
  supplier: ISupplier
  addresses: IAddress[]
}
