import { DEFAULT_DROPDOWN_LIMIT, ENDPOINTS } from '../constants/api'
import type { APIResponse } from '../interfaces/APIResponse'
import type { ResourceOption } from '../interfaces/General'
import type { RouteResource } from '../interfaces/Routes'
import { httpClient } from './httpClient'

export interface RouteParam {
  page: number
  limit: number
}

type urlParam = {
  [key: string]: string | number | null
}

const getRoutes = async ({
  page = 0,
  limit = DEFAULT_DROPDOWN_LIMIT,
}: RouteParam) => {
  const params: urlParam = {
    'page[offset]': page * limit,
    'page[limit]': limit,
  }

  const response = await httpClient.get<APIResponse<RouteResource>>(
    ENDPOINTS.ROUTES,
    { params: params }
  )

  const options: ResourceOption[] = response.data.data.map((opt) => ({
    id: opt.id,
    label: opt.attributes.long_name,
    subLabel: opt.attributes.short_name,
    color: `#${opt.attributes.color}`,
  }))

  return options
}

export { getRoutes }
