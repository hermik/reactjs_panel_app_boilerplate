import { useState } from 'react'
import {
    type Column,
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCommentsQuery, type Comment } from '@/hooks/useCommentsQuery'

function SortableHeader<TData>({ column, label }: { column: Column<TData, unknown>; label: string }) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-3 h-8 px-2"
        >
            {label}
            <ArrowUpDown className="ml-2 size-3.5" />
        </Button>
    )
}

const columns: ColumnDef<Comment>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader column={column} label="Name" />,
        cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <SortableHeader column={column} label="Email" />,
        cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
    },
    {
        accessorKey: 'body',
        header: 'Comment',
        enableSorting: false,
        cell: ({ getValue }) => (
            <div className="max-w-sm truncate text-muted-foreground" title={getValue<string>()}>
                {getValue<string>()}
            </div>
        ),
    },
]

export default function TablePage() {
    const { data: comments, isLoading, error } = useCommentsQuery()
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data: comments ?? [],
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="w-full p-4 gap-4">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">Comments</h2>
                <p className="mt-1 text-sm text-muted-foreground">Sortable by name and email.</p>
            </div>

            {isLoading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
            {error && <p className="text-sm text-destructive">Error loading comments: {error.message}</p>}

            {comments && (
                <>
                    <div className="hidden rounded-xl border bg-card md:block">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex flex-col gap-3 md:hidden">
                        {table.getRowModel().rows.map((row) => (
                            <Card key={row.id}>
                                <CardContent className="flex flex-col gap-1">
                                    <span className="font-medium capitalize">{row.original.name}</span>
                                    <span className="text-sm text-muted-foreground">{row.original.email}</span>
                                    <p className="text-sm text-muted-foreground">{row.original.body}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
