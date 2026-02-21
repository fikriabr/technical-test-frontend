import type { APIResponse } from '../interfaces/APIResponse'
import type { VehicleResource } from '../interfaces/Vehicles'

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
  return formatDateTime(dateString)
}

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}
