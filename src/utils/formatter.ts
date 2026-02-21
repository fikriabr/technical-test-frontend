import type { APIResponse } from '../interfaces/APIResponse'
import type { VehicleResource } from '../interfaces/Vehicles'

export const formatCounter = (data?: APIResponse<VehicleResource>) => {
  const offset = new URLSearchParams(data?.links?.last).get('page[offset]')
  return parseInt(offset || '')
}
