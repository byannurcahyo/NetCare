import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getPackages } from "@/lib/api/packages";
import type { Package } from "@/types";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Package>[] = [
    {
        accessorKey: "name",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">Name</div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "data",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">Data</div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("data")}
            </div>
        ),
    },
    {
        accessorKey: "duration",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">
                Duration
            </div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("duration")}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">Price</div>
        ),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
            return <div className="px-8 text-md font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "description",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">
                Description
            </div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("description")}
            </div>
        ),
    },
];

export function PackageTable() {
    const [data, setData] = useState<Package[]>([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const fetchedData = await getPackages();
                if (fetchedData) {
                    setData(fetchedData);
                }
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };
        fetchPackages();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="w-full">
            <Table className="w-full rounded-lg">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="py-4">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="py-4">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
