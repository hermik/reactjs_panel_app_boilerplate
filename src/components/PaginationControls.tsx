import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationControlsProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
    if (totalPages <= 1) return null

    const goToPage = (event: React.MouseEvent, target: number) => {
        event.preventDefault()
        if (target < 1 || target > totalPages) return
        onPageChange(target)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={page <= 1}
                        className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                        onClick={(event) => goToPage(event, page - 1)}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            href="#"
                            isActive={pageNumber === page}
                            onClick={(event) => goToPage(event, pageNumber)}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={page >= totalPages}
                        className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                        onClick={(event) => goToPage(event, page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
