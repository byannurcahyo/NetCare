import { HistoryTable } from "@/components/history-table";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
import Navbar from "@/layouts/Navbar";
import { getTransactionByUser } from "@/lib/api/transaction";
import type { Transaction } from "@/types";
import { useEffect, useState } from "react";

export default function Profile() {
    const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}");
    const [data, setData] = useState<Transaction[]>([]);
    const { clearSession } = useSession();
    const totalTransaction = data.length;

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

    return (
        <ThemeProvider defaultTheme="dark">
            <Navbar />
            <div className="flex flex-row justify-center h-screen pt-12 bg-topography">
                <div className="grid gap-8 xl:grid-cols-3">
                    <div className="space-y-4 xl:col-span-1">
                        <div className="bg-zinc-100 dark:bg-zinc-900 text-card-foreground flex flex-col gap-6 rounded-xl border p-6 relative">
                            <div className="flex flex-col gap-4 justify-center items-center py-8">
                                <Avatar className="h-24 w-24 rounded-full grayscale">
                                    <AvatarImage alt="profile" />
                                    <AvatarFallback className="rounded-full text-2xl">
                                        NC
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <p className="text-2xl font-bold">
                                        {savedUser.fullName}
                                    </p>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {savedUser.email}
                                    </p>
                                </div>
                                <div className="flex flex-row w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800 py-4 rounded-lg text-lg font-semibold gap-2 px-8">
                                    <span className="text-4xl font-semibold">
                                        {totalTransaction}
                                    </span>
                                    <span>Successfully transactions</span>
                                </div>
                                <Button
                                    variant="destructive"
                                    className="w-full font-semibold text-lg py-4"
                                    onClick={() => clearSession()}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 xl:col-span-2">
                        <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-8">
                            <div className="rounded-lg border">
                                <HistoryTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
