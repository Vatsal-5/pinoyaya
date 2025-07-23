import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearch } from "@tanstack/react-router"

const Pagination = ({ totalRecords, table }) => {
  const { page, limit, ...rest } = useSearch({ strict: false })

  const totalPages = Math.ceil(totalRecords / limit)
  return (
    <PaginationComponent className="justify-start">
      <PaginationContent className="gap-2">
        <PaginationItem className="w-full min-w-8 size-8 mr-3 aspect-square flex items-center justify-center bg-text-6 rounded-full">
          <PaginationPrevious
            to="."
            search={{ page: page - 1, limit, ...rest }}
            className="!p-0 has-[>svg]:size-4 has-[>svg]:min-w-4 has-[>svg]:min-h-4 text-text-1 hover:bg-transparent hover:text-text-1"
            disabled={table ? !table?.getCanPreviousPage() : page <= 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
          return (
            <PaginationItem key={index} className="w-full aspect-square flex items-center justify-center bg-text-6 rounded-full">
              <PaginationLink
                to="."
                search={{ page: index + 1, limit, ...rest }}
                className="min-w-8 size-8 text-sm text-text-1 bg-transparent rounded-full border-none hover:bg-transparent hover:text-text-1"
                isActive={index + 1 === page}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem className="w-full min-w-8 size-8 ml-3 aspect-square flex items-center justify-center bg-text-6 rounded-full">
          <PaginationNext
            to="."
            search={{ page: page + 1, limit, ...rest }}
            className="!p-0 has-[>svg]:size-4 has-[>svg]:min-w-4 has-[>svg]:min-h-4 text-text-1 hover:bg-transparent hover:text-text-1"
            disabled={table ? !table?.getCanNextPage() : page >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}

export default Pagination