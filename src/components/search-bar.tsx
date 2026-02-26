import { Search } from "lucide-react"
import React from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  defaultValue?: string
}

export function SearchBar({ onSearch, defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue)

  // sync when defaultValue loads asynchronously
  React.useEffect(() => {
    if (defaultValue) setQuery(defaultValue)
  }, [defaultValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <div className="relative flex w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Enter IP address…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-white placeholder-slate-500 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all text-sm"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,212,255,0.22)', borderRight: 'none' }}
        />
        <button
          type="submit"
          className="btn-cyan px-6 py-3 rounded-r-xl text-sm font-semibold flex items-center gap-2 shrink-0 cursor-pointer transition-all"
        >
          <Search className="h-4 w-4" />
          Locate
        </button>
      </div>
    </form>
  )
}