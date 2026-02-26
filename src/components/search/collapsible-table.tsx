"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DataTable } from "@/components/search/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { History, ChevronsUpDown } from "lucide-react"

interface CollapsibleTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

export function CollapsibleTable<TData, TValue>({
    columns,
    data
}: CollapsibleTableProps<TData, TValue>) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2 w-full max-w-md"
    >
      <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span className="text-muted-foreground">
          <History className="h-4 w-4" />
        </span>
        <span className="font-medium">
          <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle details</span>
          </Button>
        </CollapsibleTrigger>
        </span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="w-full max-w-md">
            <DataTable columns={columns} data={data} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
