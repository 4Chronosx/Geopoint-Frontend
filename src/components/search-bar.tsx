import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import React from "react"

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = React.useState("")

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mt-8 mb-4">
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button type="submit" className="rounded-l-none">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
