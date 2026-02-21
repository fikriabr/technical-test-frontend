import { DEFAULT_DROPDOWN_LIMIT, ENDPOINTS } from '../constants/api'
import type { APIResponse } from '../interfaces/APIResponse'
import type { ResourceOption } from '../interfaces/General'
import type { RouteResource } from '../interfaces/Routes'
import type { TripResource } from '../interfaces/Trips'
import { httpClient } from './httpClient'

export interface TripParam {
  page: number
  limit: number
  routeId?: string[]
}

type urlParam = {
  [key: string]: string | number | null
}

const getTrips = async ({
  page = 0,
  limit = DEFAULT_DROPDOWN_LIMIT,
  routeId = [],
}: TripParam) => {
  const params: urlParam = {
    'page[offset]': page * limit,
    'page[limit]': limit,
  }

  console.log('routeId', routeId)
  if (routeId.length > 0) {
    params['filter[route]'] = routeId.join(',')
  }

  const response = await httpClient.get<APIResponse<TripResource>>(
    ENDPOINTS.TRIPS,
    { params: params }
  )

  const options: ResourceOption[] = response.data.data.map((opt) => ({
    id: opt.id,
    label: opt.attributes.headsign,
    subLabel: opt.attributes.block_id,
    color: '',
  }))

  return options
}

export { getTrips }
