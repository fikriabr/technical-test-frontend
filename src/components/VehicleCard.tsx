import React from 'react'
import type { VehicleResource } from '../interfaces/Vehicles'
import classNames from 'classnames'
import {
  formalDecimal,
  formatBearing,
  formatDateTime,
  formatRelativeTime,
  formatSpeed,
  formatStatus,
} from '../utils/formatter'

interface CardProp {
  onClick: (vehicleId: VehicleResource) => void
  vehicle: VehicleResource
  className?: string
}

const VehicleCard: React.FC<CardProp> = ({ className, vehicle, onClick }) => {
  const { attributes, type, id } = vehicle
  const { statusStyle, statusText } = formatStatus(attributes.current_status)
  return (
    <article
      role="button"
      onClick={() => onClick(vehicle)}
      tabIndex={0}
      className={classNames(
        'w-full h-fit bg-white rounded-lg p-4 flex flex-col gap-4 shadow-lg',
        className
      )}
    >
      <div className="flex justify-between w-full">
        <div className="block">
          <div className="text-xs text-gray-700 uppercase">
            {type} | ID: {id}
          </div>
          <div className="text-xl font-semibold">{attributes.label}</div>
        </div>
        <div className={statusStyle}>{statusText}</div>
      </div>

      <div className=" grid grid-cols-2 gap-4 border-b border-b-gray-500/20">
        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Lat</div>
          <div className="text-base">{formalDecimal(attributes.latitude)}</div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Lon</div>
          <div className="text-base">{formalDecimal(attributes.longitude)}</div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Bearing</div>
          <div className="text-base">{formatBearing(attributes.bearing)}</div>
        </div>

        <div className="block">
          <div className="text-xs text-gray-700 uppercase">Speed</div>
          <div className="text-base">{formatSpeed(attributes.speed)}</div>
        </div>
      </div>

      <div className="flex text-xs gap-3 justify-between">
        <span className="text-gray-700 uppercase">Last Updated</span>
        {formatDateTime(String(attributes.updated_at)).time}
      </div>
    </article>
  )
}

export default VehicleCard
