import classNames from 'classnames'
import type { APIResponse } from '../interfaces/APIResponse'
import type {
  CurrentStatus,
  OccupancyStatus,
  VehicleResource,
} from '../interfaces/Vehicles'

export const formatCounter = (data?: APIResponse<VehicleResource>) => {
  const offset = new URLSearchParams(data?.links?.last).get('page[offset]')
  return parseInt(offset || '')
}

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} detik`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam`
  return formatDateTime(dateString).dateTime
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)

  const parts = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '00'

  const dateResult = `${get('day')} ${get('month')} ${get('year')}`
  const timeResult = `${get('hour')}:${get('minute')}:${get('second')}`

  return {
    date: dateResult,
    time: timeResult,
    dateTime: `${dateResult} ${timeResult}`,
  }
}

export const formatStatus = (status: CurrentStatus) => {
  const statusStyle = {
    IN_TRANSIT_TO: 'border-blue-200 bg-blue-50 text-blue-700',
    INCOMING_AT: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    STOPPED_AT: 'border-amber-200 bg-amber-50 text-amber-700',
  }
  return {
    statusStyle: classNames(
      'w-fit h-fit inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border',
      statusStyle[status]
    ),
    statusText: status.replaceAll('_', ' '),
  }
}

export const formalDecimal = (value: number, fixed = 6) => {
  return value.toFixed(fixed)
}

export const formatBearing = (value: number | null) => {
  return value ? `${value}°` : '-'
}

export const formatSpeed = (value: number | null) => {
  return value ? `${value} m/s` : '-'
}

export const formatOcupancy = (value: OccupancyStatus | string | null) => {
  return value ? value.replaceAll('_', ' ') : '-'
}

export const formatText = (value: string | number | null) => {
  return value ? value : '-'
}
