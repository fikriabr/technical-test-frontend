import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Header from './components/Header'
import Pagination from './components/Pagination'
import VehicleWrapper from './components/VehicleWrapper'
import { DEFAULT_PAGE_LIMIT } from './constants/api'
import useVehicles from './hooks/useVehicles'
import { type VehicleResource } from './interfaces/Vehicles'
import { formatCounter } from './utils/formatter'
import VehicleModal from './components/VehicleModal'

function App() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT)
  const [routeId, setRouteId] = useState<string[]>([])
  const [tripId, setTripId] = useState<string[]>([])
  const [selectedVehicle, setSelectedVehicle] =
    useState<VehicleResource | null>(null)

  const { vehicles, errorMessage, isLoading, retry } = useVehicles({
    page,
    limit,
    routeId,
    tripId,
  })

  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setEnabled(false)
    const timer = setTimeout(() => {
      setEnabled(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [limit])

  const { vehicles: cData, isLoading: cLoading } = useVehicles({
    page: 0,
    limit: 1,
    routeId,
    tripId,
    enabled,
  })

  function handleToggleRoute(value: string) {
    setRouteId((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  function handleToggleTrip(value: string) {
    setTripId((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <>
      <Header />
      <section className="pt-[100px] w-full h-screen">
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="h-full w-full rounded-xl flex flex-col">
            <Filter
              handleToggleRoute={handleToggleRoute}
              handleToggleTrip={handleToggleTrip}
              routeId={routeId}
              tripId={tripId}
            />

            <VehicleWrapper
              doSelectVehicle={(val) => setSelectedVehicle(val)}
              errorMessage={errorMessage}
              isLoading={isLoading}
              retry={retry}
              vehicles={vehicles}
            />

            <Pagination
              counter={formatCounter(cData) + 1}
              changePageSize={(val) => setLimit(val)}
              pageSize={limit}
              changePage={(page) => setPage(page)}
              currentPage={page}
              counterLoading={cLoading || isLoading}
            />
          </div>
        </div>
      </section>

      {selectedVehicle && (
        <VehicleModal
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />
      )}
    </>
  )
}

export default App
