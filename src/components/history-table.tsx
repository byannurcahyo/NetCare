import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getTransactionByUser } from "@/lib/api/transaction";
import type { Transaction } from "@/types";
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

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "phoneNumber",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">
                Phone Number
            </div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("phoneNumber")}
            </div>
        ),
    },
    {
        accessorKey: "packageName",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">
                Package Name
            </div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("packageName")}
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
        accessorKey: "status",
        header: () => (
            <div className="capitalize text-center px-8 text-md font-semibold pr-16">
                Status
            </div>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status");
            let badgeColor = "bg-white";
            if (status === "success") {
                badgeColor = "bg-green-500/50 text-black dark:text-white";
            } else if (status === "pending") {
                badgeColor = "bg-yellow-500/50 text-black dark:text-white";
            } else if (status === "failed") {
                badgeColor = "bg-red-500/50 text-black dark:text-white";
            }
            return (
                <div className="justify-center flex pr-8">
                    <Badge
                        className={`capitalize px-8 py-0.5 rounded-xl text-md font-medium ${badgeColor}`}
                    >
                        {String(status)}
                    </Badge>
                </div>
            );
        },
    },
];

export function HistoryTable() {
    const [data, setData] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const savedUser = JSON.parse(
                    localStorage.getItem("user") ?? "{}",
                );
                if (savedUser?.id) {
                    const fetchedData = await getTransactionByUser(
                        savedUser.id,
                    );
                    setData(fetchedData);
                }
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        fetchTransactions();
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
