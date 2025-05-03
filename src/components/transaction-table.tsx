import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getTransactions, updateTransaction } from "@/lib/api/transaction";
import { UPDATE_TRANSACTION_SCHEMA } from "@/lib/schemas/transaction.schema";
import type { Transaction } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function TransactionTable() {
    const [data, setData] = useState<Transaction[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);
    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDialogOpen(true);
    };

    const getColumns = (
        handleEdit: (t: Transaction) => void,
    ): ColumnDef<Transaction>[] => [
        {
            accessorKey: "fullName",
            header: () => (
                <div className="capitalize px-8 text-md font-semibold">
                    Name
                </div>
            ),
            cell: ({ row }) => (
                <div className="capitalize px-8 text-md font-medium">
                    {row.getValue("fullName")}
                </div>
            ),
        },
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
            accessorKey: "status",
            header: () => (
                <div className="capitalize text-center px-8 text-md font-semibold">
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
                    <div className="justify-center flex">
                        <Badge
                            className={`capitalize px-8 py-0.5 rounded-xl text-md font-medium ${badgeColor}`}
                        >
                            {String(status)}
                        </Badge>
                    </div>
                );
            },
        },
        {
            accessorKey: "price",
            header: () => (
                <div className="capitalize px-8 text-md font-semibold">
                    Price
                </div>
            ),
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("price"));
                const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(amount);
                return (
                    <div className="px-8 text-md font-medium">{formatted}</div>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => handleEdit(transaction)}
                            >
                                Edit transaction
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    useEffect(() => {
        if (selectedTransaction) {
            form.reset({
                fullName: selectedTransaction.fullName,
                packageName: selectedTransaction.packageName,
                status: selectedTransaction.status,
                price: selectedTransaction.price,
            });
        }
    }, [selectedTransaction]);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const fetchedData = await getTransactions();
                if (fetchedData) {
                    setData(fetchedData);
                }
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };
        fetchTransaction();
    }, []);

    const table = useReactTable({
        data,
        columns: getColumns(handleEdit),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const form = useForm<z.infer<typeof UPDATE_TRANSACTION_SCHEMA>>({
        resolver: zodResolver(UPDATE_TRANSACTION_SCHEMA),
    });

    const onSubmit = async (
        data: z.infer<typeof UPDATE_TRANSACTION_SCHEMA>,
    ) => {
        try {
            if (!selectedTransaction) return;
            setData((prevData) =>
                prevData.map((t) =>
                    t.id === selectedTransaction.id
                        ? { ...t, status: data.status }
                        : t,
                ),
            );
            await updateTransaction({
                id: selectedTransaction.id,
                status: data.status,
            });
            toast.success("Update transaction successfully!", {
                description: "You have successfully update transaction.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-green-500 text-white !border-none !shadow-lg",
            });
            setIsDialogOpen(false);
        } catch {
            toast.error("Update transaction failed", {
                description: "Please try again later.",
                position: "bottom-right",
                duration: 3000,
                className: "!bg-red-600 text-white !border-none !shadow-lg",
            });
        }
    };

    return (
        <>
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
                                    <TableCell
                                        key={cell.id}
                                        className="py-2.5"
                                        data-update={
                                            cell.column.id === "status"
                                                ? "optimized"
                                                : "normal"
                                        }
                                    >
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                        <DialogDescription>
                            Make changes to the transaction information here.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTransaction && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    disabled
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="packageName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Package Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Paket Hemat"
                                                    disabled
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Status
                                                            </SelectLabel>
                                                            <SelectItem value="success">
                                                                Success
                                                            </SelectItem>
                                                            <SelectItem value="pending">
                                                                Pending
                                                            </SelectItem>
                                                            <SelectItem value="failed">
                                                                Failed
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Rp. 10.000"
                                                    disabled
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        className="px-6"
                                        onClick={() => setIsDialogOpen(false)}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="px-8" type="submit">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
