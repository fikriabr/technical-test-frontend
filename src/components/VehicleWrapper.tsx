import React from 'react'
import type { APIResponse } from '../interfaces/APIResponse'
import type { VehicleResource } from '../interfaces/Vehicles'
import Loading from './Loading'
import VehicleCard from './VehicleCard'

interface VehicleWrapperProp {
  isLoading: boolean
  errorMessage: string
  retry: () => Promise<void>
  vehicles: APIResponse<VehicleResource> | undefined
  doSelectVehicle: (val: VehicleResource) => void
}

const VehicleWrapper: React.FC<VehicleWrapperProp> = ({
  doSelectVehicle,
  errorMessage,
  isLoading,
  retry,
  vehicles,
}) => {
  return (
    <div
      id="contents"
      className="h-full bg-slate-100 rounded-b-xl p-4 overflow-y-auto relative flex flex-col gap-4 thin-scrollbar"
    >
      {isLoading && (
        <div className="absolute inset-0 m-auto size-24 w-48 h-24 bg-white rounded-xl p-4 text-center flex items-center justify-center shadow-xl">
          <Loading size="lg" loadingText="Loading..." />
        </div>
      )}

      {errorMessage && !isLoading && (
        <div className="absolute inset-0 m-auto size-24 w-80 h-fit bg-white rounded-xl p-4 text-center shadow-xl">
          {errorMessage}
          <button
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white mx-2"
            onClick={retry}
          >
            Retry
          </button>
        </div>
      )}

      <div
        id="contents-s"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 h-fit"
      >
        {vehicles?.data.map((vehicle, id) => {
          return (
            <VehicleCard
              key={id}
              vehicle={vehicle}
              onClick={(val) => doSelectVehicle(val)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VehicleWrapper
