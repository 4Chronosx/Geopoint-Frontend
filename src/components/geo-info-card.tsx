import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


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

export function GeoInfoCard({ data }: { data: GeoInfoProps }) {
  const [lat, lng] = data.loc?.split(",") ?? []

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          IP Geolocation
          <Badge variant="secondary">{data.ip}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-muted-foreground">Host Name</dt>
            <dd className="font-medium">{data.hostname ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Country</dt>
            <dd className="font-medium">{data.city ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Region</dt>
            <dd className="font-medium">{data.region ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Country</dt>
            <dd className="font-medium">{data.country ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Postal</dt>
            <dd className="font-medium">{data.postal ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Timezone</dt>
            <dd className="font-medium">{data.timezone ?? "—"}</dd>
          </div>

          
        </dl>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground">ISP / Organization</p>
          <p className="font-medium">{data.org ?? "—"}</p>
        </div>


        {lat && lng && (
          <div>
            <p className="text-sm text-muted-foreground">Coordinates</p>
            <p className="font-medium">
              {lat}, {lng}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
