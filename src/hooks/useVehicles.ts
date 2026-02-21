import { useCallback, useEffect, useState } from 'react'
import { getVehicles, type VehicleParam } from '../api/vehicleService'
import { type VehicleResource } from '../interfaces/Vehicles'
import { type APIResponse } from '../interfaces/APIResponse'

interface VehicleProp extends VehicleParam {
  enabled?: boolean
}
const useVehicles = ({
  page,
  limit,
  routeId = [],
  tripId = [],
  enabled = true,
}: VehicleProp) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [vehicles, setVehicles] = useState<APIResponse<VehicleResource>>()

  // fetch all vehicle
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getVehicles({
        limit,
        page,
        routeId,
        tripId,
      })
      setErrorMessage('')
      setVehicles(data)
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        console.log(err)
      }
    } finally {
      setIsLoading(false)
    }
  }, [limit, page, JSON.stringify(routeId), JSON.stringify(tripId)])
  //  JSON.stringify(routeId), JSON.stringify(tripId)

  useEffect(() => {
    if (!enabled) return
    fetchData()
  }, [fetchData, enabled])

  return {
    vehicles,
    isLoading,
    errorMessage,
    retry: fetchData,
  }
}

export default useVehicles
