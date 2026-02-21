import React from 'react'
import type { VehicleResource } from '../interfaces/Vehicles'
import classNames from 'classnames'
import { formatRelativeTime } from '../utils/formatter'

interface CardProp extends VehicleResource {
  className?: string
}

const VehicleCard: React.FC<CardProp> = ({ className, attributes, type }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      className={classNames(
        'w-full h-fit bg-gray-200 rounded-lg p-4 flex flex-col gap-4 border border-gray-500 shadow-lg',
        className
      )}
    >
      <div className="flex justify-between w-full">
        <div className="block">
          <div className="text-xs text-gray-700 uppercase">{type}</div>
          <div className="text-base">{attributes.label}</div>
        </div>
        <div>{attributes.current_status}</div>
      </div>

      <div className=" grid grid-cols-2 gap-4 border-b border-b-gray-500">
        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Lat</div>
          <div className="text-base">{attributes.latitude}</div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Lon</div>
          <div className="text-base">{attributes.longitude}</div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Bearing</div>
          <div className="text-base">
            {attributes.bearing ? attributes.bearing + '°' : '-'}
          </div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Speed</div>
          <div className="text-base">
            {attributes.speed ? `${attributes.speed} m/s` : '-'}
          </div>
        </div>
      </div>

      <div>{formatRelativeTime(String(attributes.updated_at))}</div>
    </article>
  )
}

export default VehicleCard
