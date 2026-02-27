"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DataTable } from "@/components/search/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { History, ChevronsUpDown } from "lucide-react"

interface CollapsibleTableProps<TData extends { id: string }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onDeleteSelected?: (ids: string[]) => void  
}

export function CollapsibleTable<TData extends { id: string }, TValue>({
    columns,
    data,
    onDeleteSelected
}: CollapsibleTableProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-3 w-full"
    >
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: 'rgba(13,27,62,0.55)', border: '1px solid rgba(0,212,255,0.15)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-white">Search History</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: 'rgba(0,212,255,0.12)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.25)' }}
          >
            {data.length}
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <button
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle history</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ background: 'rgba(13,27,62,0.45)', border: '1px solid rgba(0,212,255,0.12)', backdropFilter: 'blur(12px)' }}
        >
          <DataTable
            columns={columns}
            data={data} 
            onDeleteSelected={onDeleteSelected}  
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}