
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

const geoData: GeoInfoProps = {
    ip: "203.0.113.42",
    hostname: "static-203-0-113-42.isp.example",
    city: "Cebu City",
    region: "Central Visayas",
    country: "PH",
    loc: "10.3157,123.8854",
    org: "AS12345 Example Internet Services",
    postal: "6000",
    timezone: "Asia/Manila",
    readme: "https://ipinfo.io/missingauth"

};

import { GeoInfoCard } from "@/components/geo-info-card";
import type { IPsearch } from "@/components/search/columns"
import { columns } from "@/components/search/columns"
import { CollapsibleTable } from "@/components/search/collapsible-table"
import { SearchBar } from "@/components/search-bar";


const data: IPsearch[] = [
  {
    id: "1",
    ipsearch: "192.168.0.1",
    datetime: "2026-02-25T08:15:00Z",
  },
  {
    id: "2",
    ipsearch: "8.8.8.8",
    datetime: "2026-02-24T14:30:00Z",
  },
  {
    id: "3",
    ipsearch: "172.16.5.23",
    datetime: "2026-02-23T20:45:00Z",
  },
  {
    id: "4",
    ipsearch: "203.0.113.77",
    datetime: "2026-02-22T11:10:00Z",
  },
  {
    id: "5",
    ipsearch: "198.51.100.42",
    datetime: "2026-02-21T16:55:00Z",
  },
]

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <GeoInfoCard data={geoData}></GeoInfoCard>
        <SearchBar onSearch={() => {}}></SearchBar>
        <CollapsibleTable columns={columns} data={data}></CollapsibleTable>
    </div>
  )
}