import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getPackages } from "@/lib/api/packages";
import { getTransactions } from "@/lib/api/transaction";
import { getUsers } from "@/lib/api/user";
import type { Package, Transaction, User } from "@/types";
import { useEffect, useState } from "react";

export function SectionCards() {
    const [user, setUser] = useState<User[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [transaction, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await getUsers();
                const fetchedPackages = await getPackages();
                const fetchedTransaction = await getTransactions();
                if (fetchedUser) {
                    setUser(fetchedUser);
                }
                if (fetchedPackages) {
                    setPackages(fetchedPackages);
                }
                if (fetchedTransaction) {
                    setTransaction(fetchedTransaction);
                }
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };
        fetchData();
    }, []);

    const totalUsers = user.length;
    const totalPackages = packages.length;
    const totalTransactions = transaction.length;

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total User</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalUsers}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="default">User's</Badge>
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Packages</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalPackages}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="default">Package's</Badge>
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Transactions</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalTransactions}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="default">Transaction's</Badge>
                    </CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}
