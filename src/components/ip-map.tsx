import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix default marker icon issue with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

interface IPMapProps {
  lat: number
  lng: number
  label?: string
}

/** Flies the map to new coordinates whenever they change */
function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 })
  }, [lat, lng, map])
  return null
}

/** Calls invalidateSize whenever the map's DOM container is resized */
function ResizeHandler() {
  const map = useMap()
  useEffect(() => {
    const container = map.getContainer()
    const observer = new ResizeObserver(() => {
      map.invalidateSize()
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [map])
  return null
}

export function IPMap({ lat, lng, label }: IPMapProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden w-full h-full flex flex-col">
      {/* Map header */}
      <div className="flex items-center gap-2 px-4 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-sm font-medium text-white">Live Location</span>
        {label && <span className="ml-auto text-xs text-slate-400 truncate max-w-50">{label}</span>}
      </div>
      <div className="flex-1 min-h-72 w-full">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full z-0"
          style={{ background: '#050d1e' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[lat, lng]}>
            {label && <Popup>{label}</Popup>}
          </Marker>
          <FlyToLocation lat={lat} lng={lng} />
          <ResizeHandler />
        </MapContainer>
      </div>
    </div>
  )
}
