import type { Links, Relationship, Revenue } from './APIResponse'

export interface TripResource {
  attributes: TripAttributes
  id: string
  links: Links
  relationships: TripRelationships
  type: TripType
}

export interface TripAttributes {
  bikes_allowed: number
  block_id: string
  direction_id: number
  headsign: string
  name: string
  revenue: Revenue
  wheelchair_accessible: number
}

export interface TripRelationships {
  route: Relationship<TripRelationType>
  route_pattern: Relationship<TripRelationType>
  service: Relationship<TripRelationType>
  shape: Relationship<TripRelationType>
}

export type TripRelationType = 'route' | 'route_pattern' | 'service' | 'shape'

export type TripType = 'trip'
