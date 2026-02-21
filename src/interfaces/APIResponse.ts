export interface APIResponse<T> {
  data: T[] // Placeholder for Vehicle, Route, and Trip
  jsonapi: JsonAPI
  links?: PaginationLinks
}

export interface JsonAPI {
  version: string
}

export interface PaginationLinks {
  first: string
  last: string
  next?: string
  prev?: string
}

export type Revenue = 'REVENUE' | 'NON_REVENUE'

export interface Links {
  self: string
}

export interface RelationsLink {
  self: string
  related: string
}

export interface RelationData<T> {
  id: string
  type: T
}

export interface Relationship<T> {
  data: RelationData<T>
  links?: RelationsLink
}
