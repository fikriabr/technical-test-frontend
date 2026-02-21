import type { Links, Relationship, Revenue } from './APIResponse'

export interface VehicleResource {
  attributes: VehicleAttributes
  id: string
  links: Links
  relationships: VehicleRelationships
  type: VehicleType
}

export interface VehicleAttributes {
  bearing: number | null
  carriages: Carriage[]
  current_status: CurrentStatus
  current_stop_sequence: number
  direction_id: number
  label: string
  latitude: number
  longitude: number
  occupancy_status: OccupancyStatus | null
  revenue: Revenue
  speed: number | null
  updated_at: Date
}

export interface Carriage {
  label: string
  occupancy_status: string
  occupancy_percentage: null
}

export type CurrentStatus = 'IN_TRANSIT_TO' | 'INCOMING_AT' | 'STOPPED_AT'

export type OccupancyStatus =
  | 'FEW_SEATS_AVAILABLE'
  | 'MANY_SEATS_AVAILABLE'
  | 'NO_DATA_AVAILABLE'
  | 'FULL'

export type CarriageOccupancyStatus =
  | OccupancyStatus
  | 'EMPTY'
  | 'STANDING_ROOM_ONLY'
  | 'CRUSHED_STANDING_ROOM_ONLY'
  | 'NOT_ACCEPTING_PASSENGERS'
  | 'NOT_BOARDABLE'

export interface VehicleRelationships {
  route: Relationship<VehicleRelationType>
  stop: Relationship<VehicleRelationType>
  trip: Relationship<VehicleRelationType>
}

export type VehicleRelationType = 'route' | 'stop' | 'trip'

export type VehicleType = 'vehicle'
