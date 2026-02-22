import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React from 'react'
import ReactModal from 'react-modal'
import type { VehicleResource } from '../interfaces/Vehicles'
import {
  formalDecimal,
  formatBearing,
  formatDateTime,
  formatOcupancy,
  formatSpeed,
  formatStatus,
  formatText,
} from '../utils/formatter'
import { Map } from './Map'

interface VehicleModalProp {
  isOpen: boolean
  onClose: () => void
  classes?: string
  vehicle: VehicleResource
}

const VehicleModal: React.FC<VehicleModalProp> = ({
  isOpen,
  onClose,
  vehicle: { attributes, id, type, relationships },
}) => {
  const vehicleInfo: { label: string; value: string | number | null }[] = [
    { label: 'Latitude', value: formalDecimal(attributes.latitude) },
    { label: 'Longitude', value: formalDecimal(attributes.longitude) },
    { label: 'Bearing', value: formatBearing(attributes.bearing) },
    { label: 'Speed', value: formatSpeed(attributes.speed) },
    { label: 'Occupancy', value: formatOcupancy(attributes.occupancy_status) },
    { label: 'Direction ID', value: formatText(attributes.direction_id) },
    {
      label: 'Update Date',
      value: formatDateTime(`${attributes.updated_at}`).date,
    },
    {
      label: 'Update Time',
      value: formatDateTime(`${attributes.updated_at}`).time,
    },
  ]

  const { statusStyle, statusText } = formatStatus(attributes.current_status)
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      preventScroll={true}
      overlayClassName={
        'fixed inset-0 bg-black/[.2] flex justify-center md:items-center'
      }
      className={'absolute bg-white overflow-auto outline-none p-5 rounded-2xl'}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <button
        aria-label="Close"
        className="absolute top-4 right-4 z-10 p-3 bg-zinc-200 hover:bg-red-400 transition-all rounded-full hover:text-white"
        onClick={() => onClose()}
      >
        <XMarkIcon className="size-5" />
      </button>

      <div className="w-full min-w-[700px] max-h-[calc(100vh-100px)] flex flex-col gap-2 overflow-y-auto">
        <div className="flex justify-between pr-14 items-center">
          <h1 className="uppercase text-gray-500 text-xs">
            {type} | ID: {id}
          </h1>
          <div className={statusStyle}>{statusText}</div>
        </div>
        <p className="text-3xl font-bold">{attributes.label}</p>

        <div className="flex-shrink-0 mt-6">
          <h2 className="uppercase text-gray-500 text-xs">Vehicle Map</h2>
          <Map
            lat={attributes.latitude}
            lon={attributes.longitude}
            label={`ID: ${id.toUpperCase()} | Label: ${attributes.label}`}
          />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-2 mt-4 thin-scrollbar">
          <h2 className="uppercase text-gray-500 text-xs">
            Vehicle Information
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {vehicleInfo.map((info) => {
              return (
                <div className="w-full p-4 border rounded-lg">
                  <p className="text-xs uppercase">{info.label}</p>
                  <p className="text-base">{info.value}</p>
                </div>
              )
            })}
          </div>

          <h2 className="uppercase text-gray-500 text-xs mt-4">Route & Trip</h2>
          <div className="grid grid-cols-2 gap-3">
            {relationships.route.data && (
              <div className="w-full p-4 border rounded-lg">
                <p className="text-xs uppercase">
                  {relationships.route.data.type}
                </p>
                <p className="text-base">{relationships.route.data.id}</p>
              </div>
            )}

            {relationships.trip.data && (
              <div className="w-full p-4 border rounded-lg">
                <p className="text-xs uppercase">
                  {relationships.trip.data.type}
                </p>
                <p className="text-base">{relationships.trip.data.id}</p>
              </div>
            )}

            {!relationships.trip.data && !relationships.trip.data && (
              <div>-</div>
            )}
          </div>

          <h2 className="uppercase text-gray-500 text-xs mt-4">Carriages</h2>
          {attributes.carriages.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {attributes.carriages.map((carriage) => (
                  <div className="w-full p-4 border rounded-lg flex flex-col gap-4">
                    <div>
                      <p className="text-xs uppercase text-gray-500">
                        Carriage Label
                      </p>
                      <p className="text-base">{carriage.label}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500">
                        Occupancy Status
                      </p>
                      <p className="text-sm">
                        {formatOcupancy(carriage.occupancy_status)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
    </ReactModal>
  )
}

export default VehicleModal
