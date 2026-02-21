import { useCallback, useRef, useState } from 'react'
import type { ResourceOption } from '../interfaces/General'
import { DEFAULT_DROPDOWN_LIMIT } from '../constants/api'
import type { TripParam } from '../api/tripService'

export type FetchFn = ({
  limit,
  page,
  routeId,
}: TripParam) => Promise<ResourceOption[]>

export function useLoopApi(fetchFn: FetchFn, routeId?: string[]) {
  const [options, setOptions] = useState<ResourceOption[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(0)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const data = await fetchFn({
        limit: DEFAULT_DROPDOWN_LIMIT,
        page: pageRef.current,
        routeId,
      })
      setOptions((prev) => [...prev, ...data])
      pageRef.current += 1
      setHasMore(data.length === DEFAULT_DROPDOWN_LIMIT)
    } catch (err) {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, fetchFn, routeId])

  return { options, loading, hasMore, loadMore }
}
