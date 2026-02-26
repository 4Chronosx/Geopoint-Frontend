# GeoPoint — IP Geolocation Platform

A full-featured IP geolocation web application built with React 19, TypeScript, and Vite. Users can log in, look up geolocation data for any IP address, view an interactive map pinpointing the location, and manage a searchable history of past lookups.

## Features

- **Authentication** — Secure login/logout backed by a REST API; session is persisted across page reloads via cookie-based auth.
- **Protected & Guest routes** — Unauthenticated users are redirected to `/login`; authenticated users are redirected away from `/login` to `/home`.
- **Auto IP detection** — On load the dashboard fetches and displays geolocation info for the current user's IP address.
- **IP search** — Enter any IPv4 or IPv6 address to instantly retrieve city, region, country, organisation, timezone, and postal code.
- **Client-side IP validation** — Invalid addresses are rejected immediately with a toast notification before any network request is made.
- **Interactive map** — A Leaflet map pins the exact coordinates of the resolved IP address.
- **Search history** — Every successful lookup is saved to the backend and displayed in a collapsible table.
  - Click any history entry to re-display its geolocation info and re-center the map.
  - Select multiple entries via checkboxes and bulk-delete them in one request.
- **Clear search** — Resets the view back to the current user's own IP geolocation.
- **Toast notifications** — Real-time feedback for loading states, success, and error events via Sonner.
- **Space-themed dark UI** — Custom Tailwind CSS design with glassmorphism cards and glowing accents.

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI / shadcn/ui |
| Table | TanStack Table v8 |
| Map | Leaflet + React-Leaflet |
| Routing | React Router v7 |
| Notifications | Sonner |
| Icons | Lucide React |
| Linting | ESLint + TypeScript-ESLint |
| Deployment | Vercel |

## Project Structure

```
src/
├── App.tsx                  # Root router with protected/guest route guards
├── main.tsx
├── index.css
├── components/
│   ├── geo-info-card.tsx    # Displays IP, city, region, country, org, timezone
│   ├── ip-map.tsx           # Leaflet map component
│   ├── search-bar.tsx       # IP input with search & clear actions
│   ├── ProtectedRoute.tsx
│   ├── search/
│   │   ├── columns.tsx      # TanStack Table column definitions
│   │   ├── data-table.tsx   # Table with checkbox selection & bulk delete
│   │   └── collapsible-table.tsx
│   └── ui/                  # shadcn/ui primitives (badge, button, card, …)
├── context/
│   └── AuthContext.tsx      # Auth state, login/logout helpers
├── lib/
│   ├── api.ts               # Centralised fetch wrapper (VITE_API_URL)
│   └── utils.ts
├── pages/
│   ├── home/HomePage.tsx    # Main dashboard
│   └── login/LoginPage.tsx  # Login form
└── services/
    ├── auth.service.ts      # login · logout · currentUser
    └── search.services.ts   # getAll · add · delete · searchGeo · getUserGeo
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A running backend API (see the companion API repository)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

> Set this to your deployed backend URL in production.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

The project is configured for Vercel. The `vercel.json` rewrites all routes to `index.html` to support client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Set the `VITE_API_URL` environment variable in your Vercel project settings to point to your hosted backend.
