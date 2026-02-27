import { Search, X } from "lucide-react"
import React from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  defaultValue?: string
  onClear?: () => void
}

export function SearchBar({ onSearch, defaultValue = '', onClear }: SearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue)

  // sync when defaultValue changes (async load or external override)
  React.useEffect(() => {
    setQuery(defaultValue)
  }, [defaultValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    onClear?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <div className="relative flex-1 flex">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Enter IP address…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all text-sm"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(0,212,255,0.22)',
            borderRight: 'none',
            borderRadius: query && onClear ? '0.75rem 0 0 0.75rem' : '0.75rem 0 0 0.75rem',
          }}
        />
      </div>
      {query && onClear && (
        <button
          type="button"
          onClick={handleClear}
          className="shrink-0 px-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(0,212,255,0.22)',
            borderLeft: 'none',
            borderRight: 'none',
          }}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        className="btn-cyan px-6 py-3 rounded-r-xl text-sm font-semibold flex items-center gap-2 shrink-0 cursor-pointer transition-all"
      >
        <Search className="h-4 w-4" />
        Locate
      </button>
    </form>
  )
}