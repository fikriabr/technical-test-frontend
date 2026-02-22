import React from 'react'
import Dropdown from './Dropdown'
import { getRoutes } from '../api/routeService'
import { getTrips } from '../api/tripService'

interface FilterProp {
  handleToggleRoute: (value: string) => void
  routeId: string[]
  handleToggleTrip: (value: string) => void
  tripId: string[]
}
const Filter: React.FC<FilterProp> = ({
  handleToggleRoute,
  handleToggleTrip,
  routeId,
  tripId,
}) => {
  return (
    <div
      id="filter"
      className="h-fit border-b flex flex-col gap-4 p-4 bg-slate-300 rounded-t-xl"
    >
      <div className="flex gap-3 w-full items-center flex-col lg:flex-row">
        <div className="text-xs uppercase font-bold text-gray-600">Filter</div>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <Dropdown
            fetchFn={getRoutes}
            onChangeValues={handleToggleRoute}
            values={routeId}
            placeholder="Please select available route"
          />
          <Dropdown
            key={JSON.stringify(routeId)}
            fetchFn={getTrips}
            onChangeValues={handleToggleTrip}
            values={tripId}
            routeId={routeId}
            disabled={!routeId.length}
            placeholder="Choose the trip"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
