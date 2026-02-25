
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

export default function Display(data : GeoInfoProps) {
    return (
        <>
        <div className="min-h-60 w-full max-w-96 p-4 my-4 border rounded-2xl flex flex-col justify-start">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">IP: <span className="font-normal">{data.ip}</span></span>
                <span className="font-semibold">Host name: <span className="font-normal">{data.hostname}</span></span>
                <span className="font-semibold">City: <span className="font-normal">{data.city}</span></span>
                <span className="font-semibold">Region: <span className="font-normal">{data.region}</span></span>
                <span className="font-semibold">Country: <span className="font-normal">{data.country}</span></span>
                <span className="font-semibold">Loc: <span className="font-normal">{data.loc}</span></span>
                <span className="font-semibold">Org: <span className="font-normal">{data.org}</span></span>
                <span className="font-semibold">Postal: <span className="font-normal">{data.postal}</span></span>
                <span className="font-semibold">Timezone: <span className="font-normal">{data.timezone}</span></span>
                <span className="font-semibold">readme: <span className="font-normal">{data.readme}</span></span>
            </div>
        </div>
        </>
    )
}