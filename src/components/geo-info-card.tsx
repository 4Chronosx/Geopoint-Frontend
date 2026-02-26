import { MapPin, Globe, Building2, Clock, Mail, Monitor, Navigation } from "lucide-react"

interface GeoInfoProps {
    ip: string,
    hostname: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    org: string,
    postal: string,
    timezone: string,
    readme: string
}

interface InfoRowProps {
    icon: React.ReactNode
    label: string
    value: string | undefined
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-start gap-3 py-2.5 border-b" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
            <span className="mt-0.5 text-cyan-400 shrink-0">{icon}</span>
            <div className="min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-medium text-white truncate">{value ?? "—"}</p>
            </div>
        </div>
    )
}

export function GeoInfoCard({ data }: { data: GeoInfoProps }) {
    const [lat, lng] = data.loc?.split(",") ?? []

    return (
        <div className="glass-card rounded-2xl p-5 w-full flex flex-col gap-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25">
                        <Globe className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="font-semibold text-white text-sm">IP Geolocation</span>
                </div>
                <span
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,212,255,0.12)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)' }}
                >
                    {data.ip}
                </span>
            </div>

            {/* Info rows */}
            <InfoRow icon={<Monitor className="h-3.5 w-3.5" />} label="Hostname" value={data.hostname} />
            <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="City" value={data.city} />
            <InfoRow icon={<Navigation className="h-3.5 w-3.5" />} label="Region" value={data.region} />
            <InfoRow icon={<Globe className="h-3.5 w-3.5" />} label="Country" value={data.country} />
            <InfoRow icon={<Mail className="h-3.5 w-3.5" />} label="Postal" value={data.postal} />
            <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Timezone" value={data.timezone} />
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="ISP / Org" value={data.org} />
            {lat && lng && (
                <InfoRow icon={<Navigation className="h-3.5 w-3.5" />} label="Coordinates" value={`${lat}, ${lng}`} />
            )}
        </div>
    )
}
