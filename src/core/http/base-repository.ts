import type { HttpClient } from './http-client'

export abstract class BaseRepository {
  protected httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
}
