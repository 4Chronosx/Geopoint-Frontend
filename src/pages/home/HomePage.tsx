import SearchBar from "../../components/search-bar";

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

const data: GeoInfoProps = {
  ip: "203.0.113.42",
  hostname: "static-203-0-113-42.isp.example",
  city: "Cebu City",
  region: "Central Visayas",
  country: "PH",
  loc: "10.3157.123.8854",
  org: "AS12345 Example Internet Services",
  postal: "6000",
  timezone: "Asia/Manila",
  readme: "https://ipinfo.io/missingauth"
};


export default function HomePage() {
    return (
        <>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-6xl mb-24">Geopoint</h1>
            <div className="min-h-60 w-full max-w-96 p-4 my-4 border rounded-2xl flex flex-col justify-start">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                        <span className="font-semibold">{key}:</span>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            <SearchBar></SearchBar>
        </div>
        </>
    )
}