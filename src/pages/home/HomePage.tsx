
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
import type { Payment } from "@/components/search/columns"
import { columns } from "@/components/search/columns"
import { DataTable } from "@/components/search/data-table"


const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <GeoInfoCard data={geoData}></GeoInfoCard>
        <div className="w-full max-w-md">
            <DataTable columns={columns} data={data} />
        </div>
    </div>
  )
}