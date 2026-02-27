import { GeoInfoCard } from "@/components/geo-info-card"
import { IPMap } from "@/components/ip-map"
import { createColumns } from "@/components/search/columns"
import type { IPsearch } from "@/components/search/columns"
import { SearchBar } from "@/components/search-bar"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useMemo, useCallback } from "react"
import { SearchService } from "@/services/search.services"
import { CollapsibleTable } from "@/components/search/collapsible-table"
import { toast } from "sonner"
import { LogOut, Globe } from "lucide-react"

interface GeoInfoProps {
    ip: string
    hostname: string
    city: string
    region: string
    country: string
    loc: string
    org: string
    postal: string
    timezone: string
    readme: string
}

const isValidIP = (ip: string) => {
    const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return ipv4.test(ip) || ipv6.test(ip)
}

export default function HomePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [history, setHistory] = useState<IPsearch[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [geoData, setGeoData] = useState<GeoInfoProps | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    SearchService.getUserGeo()
      .then((data: GeoInfoProps) => {
        setGeoData(data)
        setSearchValue(data.ip)
      })
      .catch(() => toast.error('Failed to detect your IP address'))

    toast.loading('Loading search history...', { id: 'history' })
    SearchService.getAll()
      .then((data) => {
        const mapped: IPsearch[] = data.map((item: { id: string, ip_address: string, created_at: string }) => ({
          id: item.id,
          ipsearch: item.ip_address,
          datetime: item.created_at,
        }))
        setHistory(mapped)
        toast.success('Search history loaded', { id: 'history' })
      })
      .catch(() => toast.error('Failed to load search history', { id: 'history' }))
      .finally(() => setHistoryLoading(false))
  }, [])

  

  const handleSearch = async (ip: string) => {
    if (!ip) return

    if (!isValidIP(ip)) {
      toast.error('Invalid IP address format')
      return
    }

    const searchToast = toast.loading(`Looking up ${ip}...`)

    try {
      const data: GeoInfoProps = await SearchService.searchGeo(ip)
      setGeoData(data)

      await SearchService.add(data)

      const newEntry: IPsearch = {
        id: crypto.randomUUID(),
        ipsearch: data.ip,
        datetime: new Date().toISOString(),
      }
      setHistory(prev => [newEntry, ...prev])
      toast.success(`Found geolocation for ${ip}`, { id: searchToast })
    } catch (err: any) {
      toast.error('Search failed — please try again', { id: searchToast })
    }
  }

  

  const handleDeleteOne = useCallback(async (id: string) => {
    try {
      await SearchService.delete([id])
      setHistory(prev => prev.filter(item => item.id !== id))
      toast.success('Entry deleted')
    } catch {
      toast.error('Failed to delete entry')
    }
  }, [])

  const handleDeleteSelected = useCallback(async (ids: string[]) => {
    try {
      await SearchService.delete(ids)
      setHistory(prev => prev.filter(item => !ids.includes(item.id)))
      toast.success(`${ids.length} ${ids.length === 1 ? 'entry' : 'entries'} deleted`)
    } catch {
      toast.error('Failed to delete entries')
    }
  }, [])

  const handleLoad = useCallback(async (id: string, ip: string) => {
    try {
      const data = await SearchService.getInfo(id)
      const ip_info = data[0]
      if (ip_info) {
        const normalised: GeoInfoProps = {
          ...ip_info,
          ip: ip
        }
        setGeoData(normalised)
        setSearchValue(ip)
        toast.success('Geolocation data loaded')
      } else {
        toast.error('No data found for this entry')
      }
    } catch {
      toast.error('Failed to load entry')
    }
  }, [])

  const handleClear = useCallback(async () => {
    const clearToast = toast.loading('Restoring your location…')
    try {
      const data: GeoInfoProps = await SearchService.getUserGeo()
      setGeoData(data)
      setSearchValue(data.ip)
      toast.success('Restored your location', { id: clearToast })
    } catch {
      toast.error('Failed to restore your location', { id: clearToast })
    }
  }, [])

  const columns = useMemo(() => createColumns({
    onDelete: handleDeleteOne,
    onLoad: handleLoad,
  }), [handleDeleteOne, handleLoad])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="space-bg min-h-screen relative">
      {/* Atmospheric glow orbs */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 rounded-full bg-blue-700/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-125 h-125 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(5,13,30,0.75)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,212,255,0.12)' }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25">
              <Globe className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="font-bold text-white tracking-tight">GeoPoint</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Hero: search section */}
      <section className="relative z-10 pt-16 pb-10 flex flex-col items-center gap-4 px-4 text-center">
        <div className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-1">IP Geolocation</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight max-w-2xl">
          Locate any IP on the globe
        </h1>
        <p className="text-slate-400 max-w-md text-sm">
          Enter an IP address below to pinpoint its geographic location, ISP, and network details.
        </p>
        <div className="w-full max-w-xl mt-2">
          <SearchBar onSearch={handleSearch} defaultValue={searchValue} onClear={handleClear} />
        </div>
      </section>

      {/* Main grid: map + info card */}
      {geoData && (
        <main className="relative z-10 max-w-6xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-stretch">
            {/* Map takes the left / larger column */}
            {geoData.loc && (() => {
              const [lat, lng] = geoData.loc.split(",").map(Number)
              return !isNaN(lat) && !isNaN(lng) ? (
                <IPMap lat={lat} lng={lng} label={`${searchValue} — ${geoData.city}, ${geoData.country}`} />
              ) : null
            })()}
            {/* Geo info card on the right */}
            <GeoInfoCard data={geoData} />
          </div>
        </main>
      )}

      {/* Search history */}
      {!historyLoading && (
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
          <CollapsibleTable columns={columns} data={history} onDeleteSelected={handleDeleteSelected} />
        </section>
      )}
    </div>
  )
}