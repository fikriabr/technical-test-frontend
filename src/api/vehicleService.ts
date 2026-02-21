import { DEFAULT_PAGE_LIMIT, ENDPOINTS } from '../constants/api'
import type { APIResponse } from '../interfaces/APIResponse'
import type { VehicleResource } from '../interfaces/Vehicles'
import { httpClient } from './httpClient'

export interface VehicleParam {
  page: number
  limit: number
  routeId?: string[]
  tripId?: string[]
}

type urlParam = {
  [key: string]: string | number | null
}

const getVehicles = async ({
  page = 0,
  limit = DEFAULT_PAGE_LIMIT,
  routeId = [],
  tripId = [],
}: VehicleParam) => {
  const params: urlParam = {
    'page[offset]': page * limit,
    'page[limit]': limit,
  }
  if (routeId.length > 0) {
    params['filter[route]'] = routeId.join(',')
  }
  if (tripId.length > 0) {
    params['filter[trip]'] = tripId.join(',')
  }
  const response = await httpClient.get<APIResponse<VehicleResource>>(
    ENDPOINTS.VEHICLES,
    { params: params }
  )
  return response.data
}

export { getVehicles }
