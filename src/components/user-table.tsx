import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/lib/api/user";
import type { User } from "@/types";
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

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "fullName",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">Name</div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="px-8 text-md font-semibold">Email</div>,
        cell: ({ row }) => (
            <div className="px-8 text-md font-medium">
                {row.getValue("email")}
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: () => (
            <div className="capitalize px-8 text-md font-semibold">Role</div>
        ),
        cell: ({ row }) => (
            <div className="capitalize px-8 text-md font-medium">
                {row.getValue("role")}
            </div>
        ),
    },
];

export function UserTable() {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedData = await getUsers();
                if (fetchedData) {
                    setData(fetchedData);
                }
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };
        fetchUsers();
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
