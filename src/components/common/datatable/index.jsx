import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useSearch } from '@tanstack/react-router'
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Loader } from 'lucide-react'
import Pagination from './pagination'
import { useState } from 'react'


const DataTable = ({ data = [], columns = [], pagination = true, totalItems, loader, containerClassName, enableRowSelection = false }) => {
  const { page, limit } = useSearch({ strict: false })

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    enableRowSelection,
    manualPagination: !pagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
  })

  return (
    <div className='space-y-2'>
      <div className={cn("no-scrollbar h-full flex flex-col overflow-x-scroll overflow-y-hidden", containerClassName)}>
        {!loader ? (
          <>
            <Table className="border-separate border-spacing-y-3">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{width:`${header.getSize()}px`}}
                          className={cn(
                            'h-auto px-4 text-xs font-medium text-text-4',
                            header.id.includes('-align-start') ? 'text-start' : 'text-center'
                          )}
                        >
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}
                      className="border-none bg-white hover:bg-white [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-lg data-[state=selected]:bg-white"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-4 py-2 text-text-1 text-xs text-center"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-white">
                    <TableCell
                      colSpan={columns.length}
                      className="w-full h-[65vh] text-text-1 flex items-center justify-center text-lg font-semibold"
                    >
                      Data Not Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader className="small-loader-container text-2xl" />
          </div>
        )}
      </div>
      {pagination && !loader && <Pagination totalRecords={totalItems} table={table} />}
    </div>
  )
}

export default DataTable
