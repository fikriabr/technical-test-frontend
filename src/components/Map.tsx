import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

interface MapProps {
  lat: number
  lon: number
  label?: string
}

function InvalidateSize() {
  const map = useMap()
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100)
  }, [map])
  return null
}

export function Map({ lat, lon, label }: MapProps) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: 300, width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]}>{label && <Popup>{label}</Popup>}</Marker>
      <InvalidateSize />
    </MapContainer>
  )
}
