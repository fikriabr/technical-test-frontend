import type { Links, Relationship } from './APIResponse'

export interface RouteResource {
  attributes: RouteAttributes
  id: string
  links: Links
  relationships: RouteRelationships
  type: RouteType
}

export interface RouteAttributes {
  color: string
  description: string
  direction_destinations: string[]
  direction_names: string[]
  fare_class: string
  listed_route: boolean
  long_name: string
  short_name: string
  sort_order: number
  text_color: string
  type: number
}

export interface RouteRelationships {
  agency: Relationship<RouteRelationType>
  line: Relationship<RouteRelationType>
  route_patterns: Relationship<RouteRelationType>
}

export type RouteRelationType = 'agency' | 'line' | 'route_patterns'

export type RouteType = 'route'
