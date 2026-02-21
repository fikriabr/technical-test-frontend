import { useEffect, useState } from 'react'
import Dropdown from './components/Dropdown'
import Header from './components/Header'
import useVehicles from './hooks/useVehicles'
import { DEFAULT_PAGE_LIMIT } from './constants/api'
import VehicleCard from './components/VehicleCard'
import Pagination from './components/Pagination'
import { formatCounter } from './utils/formatter'

function App() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT)
  const { vehicles, errorMessage, isLoading } = useVehicles({
    page,
    limit,
  })

  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setEnabled(false)
    const timer = setTimeout(() => {
      setEnabled(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [vehicles])

  const { vehicles: cData, isLoading: cLoading } = useVehicles({
    page: 0,
    limit: 1,
    enabled,
  })

  return (
    <>
      <Header />
      <section className="pt-[100px] w-full h-screen">
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="h-full w-full rounded-xl flex flex-col">
            <div
              id="filter"
              className="h-fit border-b flex flex-col gap-4 p-4 bg-slate-300 rounded-t-xl"
            >
              <div className="flex gap-3 w-full items-center flex-col lg:flex-row">
                <div className="text-xs uppercase font-bold text-gray-600">
                  Filter
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-4">
                  <Dropdown />
                  <Dropdown />
                </div>
              </div>
            </div>
            <div
              id="contents"
              className="h-full bg-slate-100 rounded-b-xl p-4 overflow-y-auto relative flex flex-col gap-4"
            >
              {isLoading && (
                <div className="absolute inset-0 m-auto size-24 w-48 h-24 bg-white rounded-xl p-4 text-center flex items-center justify-center shadow-xl">
                  Loading...
                </div>
              )}

              {errorMessage && !isLoading && (
                <div className="absolute inset-0 m-auto size-24 w-80 h-fit bg-white rounded-xl p-4 text-center shadow-xl">
                  {errorMessage}
                </div>
              )}

              <div
                id="contents-s"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 h-fit"
              >
                {vehicles?.data.map((vehicle, id) => {
                  return <VehicleCard key={id} {...vehicle} />
                })}
              </div>
            </div>

            <Pagination
              counter={formatCounter(cData)}
              changePageSize={(val) => setLimit(val)}
              pageSize={limit}
              changePage={(page) => setPage(page)}
              currentPage={page}
              counterLoading={cLoading || isLoading}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default App
